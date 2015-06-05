from marionette import Marionette
import base64, json, re, os, subprocess, time, urlparse, tldextract, difflib, argparse, glob, requests, traceback
from PIL import Image
import pdb

dirname = 'c:\\mozilla\\testing\\test\\'
scriptdir = os.path.dirname(os.path.realpath(__file__)) + os.path.sep
filename = dirname + 'sites.txt'
DB_SERVER = 'http://compatentomology.com.paas.allizom.org/data/'
#DB_SERVER = 'http://localhost:8000/data/' # for local testing..
AWCY_DATA_URL = 'http://arewecompatibleyet.com/data/' # for reading lists from AWCY - json files live here
ENABLE_SPECIAL_SCREENSHOTS = False
start_at = 0
run_until = None
manual_complete_test = False
replay_data = None
all_data = {}
title_map = {}
active_sessions = {}

ignored_bugs = []
for line in open(scriptdir+'..'+os.path.sep+'ignored_bugs.txt'):
    if line[0] == '#':
        continue
    ignored_bugs.append(line.strip())
parser = argparse.ArgumentParser(description=("Test a list of sites, make screenshots"))
parser.add_argument("-i", dest='index', type=int, help="the index in the list of the site you want to test, 0-based", default=None)
parser.add_argument("-s", dest='start_at', type=int, help="start at a certain index in list, 0-based", default=0)
parser.add_argument("-m", dest='manual', type=int, help="pass -m 1 to only proceed to next site on manual input", default=0)
parser.add_argument("-r", dest='replay_file', type=str, help="pass -r file.json to use 'replay data' from file", default=None)
parser.add_argument("-a", dest='awcy_list', type=str, help="pass -a jp50 to run through the 'jp50' list on AWCY", default=None)
parser.add_argument("-o", dest='output_dir', type=str, help="path to dir where results should be saved - remember final slash!", default=None)
args = parser.parse_args()
if args.index:
    start_at = args.index
    run_until = args.index
if args.start_at is not 0:
    start_at = args.start_at
if args.manual is 1:
    manual_complete_test = True
if args.replay_file:
    replay_data = read_json_file(args.replay_file)
if args.output_dir:
    dirname = args.output_dir
    if not os.path.exists(dirname):
        os.mkdir(dirname)
    filename = dirname + 'sites.txt'
if args.awcy_list: # download data from AWCY, write sites.txt
    awcy_url = "%s%s.json" % (AWCY_DATA_URL, args.awcy_list)
    print(awcy_url)
    req = requests.get(awcy_url)
    f = open(filename, 'w')
    f.write('\n'.join(json.loads(req.text)['data']))
    f.close()

if not os.path.exists(dirname+'comp'):
    os.mkdir(dirname+'comp')
if not os.path.exists(dirname+'comp/.htaccess'):
    # Screenshots and information lives on hallvord.com for now, so it needs to be CORS-friendly
    # so that AWCY can reference everything - including JSON data. Write a .htaccess file setting
    # CORS headers
    f = open(dirname+'comp/.htaccess', 'w')
    f.write("""Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT\"""")
    f.close()


def set_mozilla_pref(marionette_instance, name, value):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    if type(value) is str:
        js = """
            var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            str.data = "%s";
            pref.setComplexValue("%s", Components.interfaces.nsISupportsString, str)
        """ % (value, name)
    elif type(value) is bool:
        js = """
            var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            pref.setBoolPref("%s", %s)
        """ % (name, str(value).lower())
    elif type(value) is int:
        js = """
            var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            pref.setIntPref("%s", %s)
        """ % (name, str(value))
    marionette_instance.execute_script(js)
    m.set_context(m.CONTEXT_CONTENT)

def spoof_firefox_os():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (Mobile; rv:32.0) Gecko/32.0 Firefox/32.0')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Mozilla')
    set_mozilla_pref(m, 'general.useragent.platform', '')

def spoof_firefox_android():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (Android; Mobile; rv:38.0) Gecko/38.0 Firefox/38.0')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Mozilla')
    set_mozilla_pref(m, 'general.useragent.platform', '')

def spoof_firefox_android_device_id():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (Android 4.4.4; Mobile; SH-01G Build/S4020; rv:38.0) Gecko/38.0 Firefox/38.0')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Mozilla')
    set_mozilla_pref(m, 'general.useragent.platform', '')

def spoof_safari_ios():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/546.10 (KHTML, like Gecko) Version/6.0 Mobile/7E18WD Safari/8536.25')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.appVersion', '5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/546.10 (KHTML, like Gecko) Version/6.0 Mobile/7E18WD Safari/8536.25')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Apple Computer, Inc.')
    set_mozilla_pref(m, 'general.useragent.platform', 'iPhone')

def spoof_android_browser():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; HTC_ONE_X Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.appVersion', '5.0 (Linux; U; Android 4.1.1; en-us; HTC_ONE_X Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Google Inc.')
    set_mozilla_pref(m, 'general.useragent.platform', 'Linux armv71')

def setup_console_logging(marionette_instance):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    marionette_instance.execute_script("""window.consoleMessages = [];
if(window._consoleListenerAdded)return;
var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
var theConsoleListener = {
   observe:function( aMessage ) {   window.consoleMessages.push(aMessage);  },
    QueryInterface: function (iid) {
    if (!iid.equals(Components.interfaces.nsIConsoleListener) &&
            !iid.equals(Components.interfaces.nsISupports)) {
        throw Components.results.NS_ERROR_NO_INTERFACE;
        }
        return this;
    }
};

var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"]
        .getService(Components.interfaces.nsIConsoleService);
    aConsoleService.registerListener(theConsoleListener);
    window._consoleListenerAdded = true;
 """)
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)

def get_and_empty_console_log(marionette_instance, results):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    console_data = marionette_instance.execute_script("""
var cm = window.consoleMessages;
window.consoleMessages = [];
return cm;
    """)
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)
    # The console data comes in a somewhat messy format -
    # the 'message' string contains all the data we're interested in
    # but it takes some parsing to actually get it..
    if 'js_problems' not in results:
        results['js_problems'] = []
    if 'css_problems' not in results:
        results['css_problems'] = []
    if 'ssl_problems' not in results:
        results['ssl_problems'] = []
    rx_message = re.compile(': "(.+)" \{file: "(.+)" line: (\d+)(?: column: (\d+) source: "(.+)"|)\}', re.DOTALL)
    rx_propval = re.compile('([\w-]+)\s*:\s*(.+)')
    rx_propval_alternate = re.compile('in parsing value for ["\'](.+)["\'].*source: "(.+)"')
    seen_messages = [] # we don't need more than one instance of each message..
    for error in console_data:
        if 'character encoding of the HTML document' in error['message']:
            continue # we may one day want to track this, but..
        if error['message'] in seen_messages:
            continue
        seen_messages.append(error['message'])
        try:
            match = re.search(rx_message, error['message'])
            print(error['message'])
            if match:
                if 'Error in parsing value' in error['message'] or 'Declaration dropped.' in error['message'] or 'Skipped to next declaration.' in error['message']:
                    match2 = re.search(rx_propval, match.group(5))
                    if match2:
                        results['css_problems'].append({'file':match.group(2) + ':' + match.group(3) + ':' + match.group(4), 'property': match2.group(1), 'value': match2.group(2), 'selector': None})
                    else:
                        # propval regexp failed with this string. Source part
                        # does not have property:value format
                        match2 = re.search(rx_propval_alternate, error['message'])
                        results['css_problems'].append({'file':match.group(2) + ':' + match.group(3) + ':' + match.group(4), 'property': match2.group(1), 'value': match2.group(2), 'selector': None})
                elif 'signature algorithms' in error['message']:
                    results['ssl_problems'].append({'message':match.group(1), 'file':match.group(2)})
                else:
                    results['js_problems'].append({'message': match.group(1) + ' - ' + match.group(5), 'stack':match.group(2) + ':' + match.group(3) + ':' + match.group(4)})
        except Exception,e:
            print('WARNING: exception when parsing console data with regexp')
            print error['message']
            print(e)

def inject_js(m):
    m.set_context(m.CONTEXT_CONTENT)
    js = """o={hasHandheldFriendlyMeta: false, hasViewportMeta: false, hasMobileOptimizedMeta:false,
        mobileLinkOrScriptUrl: false, hasVideoTags:false, pageWidthFitsScreen: false, hasHtmlOrBodyMobileClass: false}
    try{
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/HandheldFriendly/i.test(el.getAttribute('name')) && /true/i.test(el.getAttribute('content')))o.hasHandheldFriendlyMeta=true;
    }
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/viewport/i.test(el.getAttribute('name')))o.hasViewportMeta = true;
    }
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/MobileOptimized/i.test(el.getAttribute('name')) && /(width|\d+)/i.test(el.getAttribute('content')))o.hasMobileOptimizedMeta = true;
    }
    str = 'mobile';
    for(var i=0,el; el=document.scripts[i];i++){if(el.src&&el.src.indexOf(str)>-1){o.mobileLinkOrScriptUrl = true;}}
    for(var i=0,el,elms=document.getElementsByTagName('link'); el=elms[i];i++){if(el.href&&el.href.indexOf(str)>-1){o.mobileLinkOrScriptUrl = true;}}
    o.hasVideoTags = !!document.getElementsByTagName('video').length;
    var docwidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    if(docwidth > (window.innerWidth * 1.02))o.pageWidthFitsScreen = true; // page is more than 2 percentage points wider than than window width
    ['mobile', 'touch'].forEach(function(str){
        if(document.documentElement.classList.contains(str) || document.body.classList.contains(str)) o.hasHtmlOrBodyMobileClass = true;
    });
    }catch(e){o.error=e.message}
    o.uastring = navigator.userAgent;
    o.hostname = location.hostname;
    return JSON.stringify(o);
    """
    return m.execute_script(js)

def diff_ratio(s1, s2):
    s = difflib.SequenceMatcher(None, s1, s2)
    return s.quick_ratio()

def read_json_file(path):
    if os.path.exists(path):
        idx_f = open(path)
        try:
            data = json.loads(idx_f.read())
        except Exception, e:
            data = json.loads(idx_f.read())
        idx_f.close()
    else:
        data = {}
    return data

def empty_firefox_cache(marionette_instance):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    try:
        marionette_instance.execute_script('Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).evictEntries(Components.interfaces.nsICache.STORE_ANYWHERE);')
    except Exception, e:
        marionette_instance.execute_script('Components.classes["@mozilla.org/netwerk/cache-storage-service;1"].getService(Components.interfaces.nsICacheStorageService).clear()')
    marionette_instance.execute_script('Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).removeAll();')
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)

def host_from_url(url):
    tmp = tldextract.extract(url)
    if not tmp.subdomain in ['www', '', 'm']:
        tmp = '%s.%s.%s' % (tmp.subdomain, tmp.domain, tmp.suffix)
    else:
        tmp = '%s.%s' % (tmp.domain, tmp.suffix)
    return tmp

def try_replay_actions(m, hostname, replay_data):
    elm_sel = replay_data["elmRef"][0]
    elm_idx = replay_data["elmRef"][1]
    try:
        elm = m.find_elements('css selector', elm_sel)
        if elm and len(elm) > 0:
            elm = elm[elm_idx]
    except:
        if replay_data["type"] == "exists":
            return False
        raise 'element not found'

    if replay_data["type"] == "click":
        elm.click()
        wait_for_readystate_complete(m)
    elif replay_data["type"] == "exists":
        return True

def load_and_check(url, hostname, rndr_engine='', sub_test_id='', testdata={}, clear_session=True, file_desc={}):
    if url:
        try:
            if clear_session:
                m.delete_all_cookies()
            #m.delete_session()
            #m.start_session()
            print "now loading "+url
            m.set_context(m.CONTEXT_CONTENT)
            m.navigate(url)
            # if we have some special sauce commands for this host, we can try them out here..
            print('loaded %s' % m.get_url())
            if replay_data and hostname in replay_data:
                for action in replay_data[hostname]:
                    try_replay_action(m, hostname, action)
                    wait_for_readystate_complete(m)
            if manual_complete_test:
                raw_input('Interact with the website if required, press any key to continue')
        except:
            try:
                print 'Failed loading '+url+', trying again with www.'
                m.delete_session()
                m.start_session()
                url = re.sub('://', '://www.', url)
                m.navigate(url)
            except:
                print 'Error loading '+url
                return
    time.sleep(2)
    wait_for_readystate_complete(m)
    if 'inject_js_before' in testdata:
        try:
            m.execute_script(testdata['inject_js_before'])
        except:
            print 'exception when executing pre_script '+testdata['inject_js_before']
    time.sleep(1)
    rs = m.execute_script('return document.readyState')
    if rs != 'complete':
        print 'readyState is ' + rs + ', sleep..'
        time.sleep(3)
        rs = m.execute_script('return document.readyState')
        if rs != 'complete':
            print 'readyState is ' + rs + ', sleep 2..'
            time.sleep(3)
    # I want a screenshot of the viewport. For this purpose, I consider that better than getting the full page
    # However, WebDriver spec says implementations *should* do the full page thing, and AFAIK there's no convenient way
    # to opt-in to only take the viewport..
    # May 2015: OK, changed my mind. Layout problems sometimes are "below the fold"..
    elm = None
#    try:
#        m.execute_script('(function(){var elm=document.createElement(\'overlay\');elm.setAttribute(\'style\', \'display:block; position:fixed;top:0;left:0;right:0;bottom:0\');document.body.appendChild(elm)})()')
#        elm = m.find_elements('tag name', 'overlay')
#    except:
#        pass
    if elm:
        elm = elm[0]
        ss = base64.b64decode(m.screenshot(element=elm))
    else:
        ss = base64.b64decode(m.screenshot())
    if rndr_engine:
        rndr_engine = rndr_engine +'-'
    fname = dirname+rndr_engine+("%03d-"%i)+hostname + sub_test_id + '.png'
    check_results = json.loads(inject_js(m))
    check_results['file_desc'] = {os.path.basename(fname): {'full_path': fname,  'engine': 'gecko', 'ua': check_results['uastring']}}
    title_map[fname] = ''
    if 'title' in testdata:
        title_map[fname] = testdata['title']
        file_desc[fname]['title'] = testdata['title']
    ss_f = open(fname, 'wb')
    ss_f.write(ss)
    ss_f.close()
    if 'inject_js_after' in testdata:
        m.execute_script(testdata['inject_js_after'])
    check_results['final_url'] = m.get_url()
    get_and_empty_console_log(m, check_results)
    return check_results

def try_login(marionette_instance, hostname, extra_delay_time):
    # check if we have login data for hostname
    print 'will try to log in to ' + hostname
    if not hostname in login_data:
        raise Exception("No stored password for "+hostname)
    # check if hostname in marionette instance ends with 'hostname'
    # it's also possible to define a loginDomains:[] array in the login data object for sites
    # (like Google, Yahoo) where login is handled on a dedicated host name
    cur_url = marionette_instance.get_url()
    tmp = host_from_url(url)
    if not tmp.endswith(hostname):
        if (not 'loginDomains' in login_data[hostname]) or login_data[hostname]['loginDomains'].count(tmp):
            raise Exception("Log in to "+hostname+" requested, but loaded site is " + tmp + '. Sure this is safe? I\'m not..')
    marionette_instance.navigate(login_data[hostname]['url']) # Load the URL it's best to log in from (might not be the one you want to screenshot)
    time.sleep(1 * extra_delay_time)
    wait_for_readystate_complete(marionette_instance)
    # find and click any elements in the clickMeFirst list
    #pdb.set_trace()
    if 'clickMeFirst' in login_data[hostname]:
        print '  we need to start clickin..'
        try_click_elms(marionette_instance, login_data[hostname]['clickMeFirst'])
    # TODO: not sure if we can detect whether that click did anything..like navigation..?
    time.sleep(1 * extra_delay_time)
    wait_for_readystate_complete(marionette_instance)
    # then wait some more..
    time.sleep(1 * extra_delay_time)
    # look up usernameElm, passwordElm, set their values to u and p
    if 'usernameElm' in login_data[hostname]:
        elm = findElm(marionette_instance, login_data[hostname]['usernameElm'])
        if elm:
            elm.clear()
            elm.send_keys(login_data[hostname]['u'])
        else:
            print 'no user name field found!'
            return False
    if 'passwordElm' in login_data[hostname]:
        elm = findElm(marionette_instance, login_data[hostname]['passwordElm'])
        if elm:
            elm.clear();
            elm.send_keys(login_data[hostname]['p'])
    # if otherElms, look them up and set values
    if 'otherElms' in login_data[hostname] and login_data[hostname]['otherElms']:
        elm = findElm(marionette_instance, login_data[hostname]['otherElms'])
        if elm:
            elm.clear()
            elm.send_keys(login_data[hostname]['otherElmValue'])
    # Look up submitElm
    #pdb.set_trace()
    elm = findElm(marionette_instance, login_data[hostname]['submitElm'])
    if elm:
        print ' found submit elm:'
        print elm
        print ' clickin\' again'
        clickElm(marionette_instance, elm)
    else:
        print ' no elm, will try to send enter'
        elm = findElm(marionette_instance, login_data[hostname]['usernameElm'])
        if elm:
            elm.send_keys("\n")
    # TODO: not sure if we can detect whether logging in did anything..like navigation..?
    time.sleep(1 * extra_delay_time)
    wait_for_readystate_complete(marionette_instance)
    if 'clickMeLast' in login_data[hostname]:
        print '  we need to go out clickin..'
        try_click_elms(marionette_instance, login_data[hostname]['clickMeLast'])

    #active_sessions[hostname] = True
    return True

def wait_for_readystate_complete(marionette_instance):
    for x in xrange(1,10):
        s = marionette_instance.execute_script('return document.readyState')
        if not 'complete' in s:
            print 'sleeping because readyState is now '+s + ' (' + str(x) + '/10)'
            time.sleep(5)
    # readyState is now complete. Let's check if the BODY element is 'displayed'
    for x in xrange(1,10):
        elm = findElm(marionette_instance, {"selector":"frameset"})
        if not elm:
            elm = findElm(marionette_instance, {"selector":"body"})
        if elm and elm.is_displayed():
            return
        else:
            print 'sleeping because body is not shown yet  (' + str(x) + '/10)'
            time.sleep(5)

def findElm(marionette_instance, targets):
    """
    This method takes a list of objects with id and/or name and/or selector properties
    It returns the first matching element
    [{"id":"foo", "name":"bar", "selector":"body nav ol"}]
    """
    if not isinstance(targets, list):
        targets = [targets]
    for target in targets:
        if 'id' in target:
            #print 'id '+ target['id']
            try:
                return marionette_instance.find_element('id', target['id'])
            except:
                pass
        if 'name' in target:
            #print 'name '+target['name']
            try:
                return marionette_instance.find_element('name', target['name'])
            except:
                pass
        if 'selector' in target:
            #print 'selector '+target['selector']
            try:
                return marionette_instance.find_element('css selector', target['selector'])
            except:
                pass

def try_click_elms(marionette_instance, elms):
    if isinstance(elms, list):
        for cmf in elms:
            elm = findElm(marionette_instance, cmf)
            print cmf
            print elm
            if elm and elm.is_enabled():
                print '  clickin\''
                clickElm(marionette_instance, elm)
    else:
        elm = findElm(marionette_instance, elms)
        print '  click me first:'
        print elm
        if elm:
            print '  clickin\''
            clickElm(marionette_instance, elm)


def clickElm(marionette_instance, elm):
    marionette_instance.execute_script('arguments[0].scrollIntoView()', [elm])
    if elm.is_enabled():
        elm.click()
    else:
        marionette_instance.execute_script('arguments[0].click()', [elm])

def save_data_to_db(domain_name, url, testdata_fx, testdata_wk):
    destination_url = '%s%s' % (DB_SERVER, domain_name)
    file_desc = testdata_fx['file_desc']
    file_desc.update(testdata_wk['file_desc'])
    multiple_files = []
    data = {testdata_fx['uastring']:{'gecko':{'plugin_results':{}}},testdata_wk['uastring']:{'gecko':{'plugin_results':{}}}}
    for prop in testdata_fx:
        if prop in ['uastring', 'file_desc', 'engine', 'final_url']:
            continue
        # errors from error console are not where we want them..
        if prop in ['css_problems', 'js_problems']:
            data[testdata_fx['uastring']]['gecko'][prop] = testdata_fx[prop]
            continue
        data[testdata_fx['uastring']]['gecko']['plugin_results'][prop] = testdata_fx[prop]
    del testdata_fx['css_problems']
    del testdata_fx['js_problems']
    data[testdata_fx['uastring']]['gecko']['final_url'] = testdata_fx['final_url']
    for prop in testdata_wk:
        if prop in ['uastring', 'file_desc', 'engine', 'final_url']:
            continue
        if prop in ['css_problems', 'js_problems']:
            data[testdata_wk['uastring']]['gecko'][prop] = testdata_wk[prop]
            continue
        data[testdata_wk['uastring']]['gecko']['plugin_results'][prop] = testdata_wk[prop]
    del testdata_wk['css_problems']
    del testdata_wk['js_problems']
    data[testdata_wk['uastring']]['gecko']['final_url'] = testdata_wk['final_url']
    multiple_files = []
    for filename in file_desc:
        multiple_files.append(('screenshot',(os.path.basename(filename),open(file_desc[filename]['full_path'], 'rb'), 'image/png')))
        del file_desc[filename]['full_path'] # don't leak local directory paths onto the internet..
    post_data = {}
    post_data['initial_url'] = url
    post_data['data'] = json.dumps(data)
    post_data['file_desc'] = json.dumps(file_desc)
    print('about to send data to %s' % destination_url)
    req = requests.post(destination_url, files=multiple_files, data=post_data)
    print("Posted to DB server, response: %s" % req.text)

m = Marionette(host='localhost', port=2828)
m.start_session()
m.set_search_timeout(1000)
setup_console_logging(m)
file_index = []

i=0
has_bug_data = False
# If we don't start at 0, we must take care to not overwrite old results..
if start_at > 0 and os.path.exists(dirname+'comp'+os.path.sep+'idx.js'):
    file_index = read_json_file(dirname+'comp'+os.path.sep+'idx.js')
# Get current test data..
all_data = read_json_file(dirname+'..'+os.path.sep+'data.js')
out_obj = read_json_file(dirname+'sitedata-automated.js')
out_missing = read_json_file(dirname+'sitedata-missing.js')
# This file is incompleread_json_filete in the Git repo - for obvious reasons.. Will have to be filled with user names and passwords
login_data = read_json_file(scriptdir+'..'+os.path.sep + "data" + os.path.sep +'logins.json')
# This file will contain per-site instructions for "special" named screenshots
special_screenshots = read_json_file(scriptdir+'..'+os.path.sep+'special_screenshots.json')
print "will play urls from %s" % filename
with open(filename, 'r') as handle:
    for url in handle:
        parts = url.split("\t")
        if len(parts) == 2:
            i+=1
            continue # We're loading a tab-separated file with bug \t summary \t url, and there is no URL..
        elif len(parts) == 3:
            url = parts[2]
            has_bug_data = True
            if parts[0] in ignored_bugs: # sorry, we're just not interested in you..
                i+=1
                continue
    	if i<start_at or url.strip() == '':
    		i+=1
    		continue
        if not '://' in url:
            url = 'http://%s' % url
        url = url.strip().rstrip('\r\n')
        location = urlparse.urlparse(url)
        hostname = location.hostname.rstrip('\r\n')
        print str(i) + ' : ' + url
        if False and has_bug_data and hostname in all_data and len(all_data[hostname]) > 0: # we have some test data stored from earlier, we might use them..
            compsteps = all_data[hostname]
        else:
            try:
                empty_firefox_cache(m)
                spoof_firefox_android()
                fxresults = load_and_check(url, hostname, '')
                #print('firefox spoof results: ', fxresults)
                empty_firefox_cache(m)
                spoof_firefox_android_device_id()
                wkresults = load_and_check(url, hostname, 'wk-spoof')
                #print('AppleWebKit spof results', wkresults)
                save_data_to_db(hostname, url, fxresults, wkresults)
            except Exception, e:
                traceback.print_exc()
                print(e)
                try:
                    m.delete_session()
                except:
                    pass
                try:
                    m.start_session()
                except:
                    pass
                i+=1
                continue
            compsteps = []
            if fxresults is not None and wkresults is not None:
                for name in fxresults:
                    print name, wkresults[name] , fxresults[name]
                    if not wkresults[name] == fxresults[name]:
                        if name == 'hostname':
                            compsteps.append('location.hostname === "'+wkresults["hostname"]+'"')
                        else:
                            compsteps.append(name+'()')
                if 'example.com' in fxresults['hostname']: # TODO: find a better way to identify WAP sites than manually loading example.com when it hangs
                    compsteps=['noWapContentPlease']

                all_data[location.hostname.rstrip('\r\n')] = compsteps
                jsf = open(dirname+'..'+os.path.sep+'data.js', 'w')
                jsf.write(json.dumps(all_data, indent=4))
                jsf.close();

        # This might be a suitable place to hack in *sub*tests
        # i.e. tests described in a domain-specific list of "other" stuff
        # Screenshots only, or should these affect site status?
        if hostname in special_screenshots and ENABLE_SPECIAL_SCREENSHOTS:
            for ss_index,testdata in enumerate(special_screenshots[hostname]):
                for rndr_engine in ['', 'wk-spoof']:
                    empty_firefox_cache(m)
                    if rndr_engine is '':
                        spoof_firefox_android()
                    else:
                        spoof_safari_ios()
                    if 'login_first' in testdata and testdata['login_first'] and hostname not in active_sessions:
                        login_status = try_login(m, hostname, 1)
                        if login_status == False: # we'll wait 5 times longer between navigation if first time failed..
                            login_status = try_login(m, hostname, 5)
                    elif hostname not in active_sessions:
                        m.delete_all_cookies()
                    # TODO: don't drop the return value from load_and_check on the floor, find a way to use it..
                    load_and_check(testdata['url'], hostname, rndr_engine, str(ss_index), testdata, False, file_desc)

        if has_bug_data:
            if len(compsteps) > 0:
                print 'function(){return '+ ' && '.join(compsteps) +';}'
                if compsteps[0] is 'noWapContentPlease':
                   out_obj[parts[0]] = {
                        'url':url,
                        'ua':'FirefoxOS',
                        'steps': ['noWapContentPlease'],
                        'testType':'xhr',
                        'title':parts[1]
                    }
                else:
                    out_obj[parts[0]] = {
                        'url':url,
                        'ua':'FirefoxOS',
                        'steps': ['function(){return '+ ' && '.join(compsteps) +';}'],
                        'title':parts[1]
                    }
            else:
                out_missing[parts[0]] = {
                    'url':url,
                    'steps':['function(){return }'],
                    'ua': 'FirefoxOS',
                    'title':parts[1]
                }
        # If we have two screenshots, join them
        host = location.hostname.rstrip('\r\n')
        tmp = host_from_url(url)
        for f in glob.glob(dirname + '*' + host + '*.png'): # Process all screenshots related to hostname
            f = os.path.basename(f)
            if 'wk-spoof' in f: # we handle this screenshot when we find the corresponding one
                continue

            if os.path.exists(dirname+'wk-spoof-' + f) and os.path.exists(dirname + f):
                ss_a = open(dirname + f, 'rb')
                ss_b = open(dirname + 'wk-spoof-' + f, 'rb')
                if diff_ratio(ss_a.read(), ss_b.read()) < 1.0:
                    img1 = Image.open(dirname + f)
                    img2 = Image.open(dirname + 'wk-spoof-' + f)
                    new_width = img1.size[0] + img2.size[0] + 3
                    new_height = img1.size[1] + img2.size[1]
                    #pdb.set_trace()
                    img_combined = Image.new(img1.mode, (new_width,new_height), '#fff')
                    img_combined.paste(img1, (0,0,img1.size[0],img1.size[1]))
                    # 3px black line between images
                    img_combined.paste(Image.new(img1.mode, (3,new_height), '#000'), (img1.size[0], 0, img1.size[0] + 3, new_height))
                    img_combined.paste(img2, (img1.size[0] + 3,0,img2.size[0] + img1.size[0] + 3,img2.size[1]))
                    img_combined.save(dirname + 'comp' + os.path.sep + f)
                    if run_until is None: # We only want to overwrite the index if we're not doing a "partial" run..
                        if dirname+f not in title_map:
                            title_map[dirname+f] = ''
                            print 'lacking title for %s%s' % (dirname, f)
                        file_index.append({'name':f,'hostname':tmp, 'fullurl':url, 'title': title_map[dirname+f]})
                        jsf = open(dirname+'comp'+os.path.sep+'idx.js', 'w')
                        jsf.write(json.dumps(file_index, indent=4))
                        jsf.close();
                ss_a.close()
                ss_b.close()
        i+=1
        if has_bug_data:
            f = open(dirname+'sitedata-automated.js', 'w')
            json_str = json.dumps(out_obj, indent=4)
            json_str = json_str.replace('"function', 'function').replace(';}"', ';}').replace('\\"', '"') #we're not shipping JSON, we're shipping JS..
            f.write(json_str)
            f.close()
            f = open(dirname+'sitedata-missing.js', 'w')
            f.write(json.dumps(out_missing, indent=4))
            f.close()
        if(run_until and i > run_until):
            quit()
