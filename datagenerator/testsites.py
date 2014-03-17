from marionette import Marionette
import base64, json, re, os, subprocess, time, urlparse, tldextract, difflib, argparse

dirname = 'C:\\mozilla\\testing\\missing-2014-03-17\\'
filename = dirname + 'sites.txt'
start_at = 0
run_until = None
all_data = {}

ignored_bugs = []
for line in open(dirname+'..'+os.path.sep+'ignored_bugs.txt'):
    if line[0] == '#':
        continue
    ignored_bugs.append(line.strip())
parser = argparse.ArgumentParser(description=("Test a list of sites, make screenshots"))
parser.add_argument("-i", dest='index', type=int, help="the index in the list of the site you want to test, 0-based", default=None)
args = parser.parse_args()
if args.index is not None:
    start_at = args.index
    run_until = args.index

if not os.path.exists(dirname+'comp'):
    os.mkdir(dirname+'comp')
if not os.path.exists(dirname+'comp/.htaccess'):
    f = open(dirname+'comp/.htaccess', 'w')
    f.write("""Header add Access-Control-Allow-Origin "*"
Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT\"""")
    f.close()

m = Marionette(host='localhost', port=2828)
m.start_session()
file_index = []

def set_mozilla_pref(marionette_instance, name, value):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    js = """
        var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        str.data = "%s";
        pref.setComplexValue("%s", Components.interfaces.nsISupportsString, str)
    """ % (value, name)
    marionette_instance.execute_script(js)
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)

def spoof_firefox_os():
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (Mobile; rv:23.0) Gecko/23.0 Firefox/23.0')
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

def inject_js():
    m.set_context(m.CONTEXT_CONTENT)
    js = """o={hasHandheldFriendlyMeta: false, hasViewportMeta: false, hasMobileOptimizedMeta:false, mobileLinkOrScriptUrl: false, hasVideoTags:false}
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
    }catch(e){o.error=e.message}
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
        data = json.loads(idx_f.read())
        idx_f.close()
    else:
        data = {} 
    return data

def empty_firefox_cache(marionette_instance):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    marionette_instance.execute_script('Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);')
    marionette_instance.execute_script('Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);')
    marionette_instance.execute_script('Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).removeAll();')
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)

def load_and_check(url, type=''):
    #print url
    location = urlparse.urlparse(url)
    try:
        m.delete_all_cookies()
        #m.delete_session()
        #m.start_session()
        m.navigate(url)
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
    time.sleep(3)
    # I want a screenshot of the viewport. For this purpose, I consider that better than getting the full page
    # However, WebDriver spec says implementations *should* do the full page thing, and AFAIK there's no convenient way
    # to opt-in to only take the viewport..
    elm = None
    try:
        m.execute_script('(function(){var elm=document.createElement(\'overlay\');elm.setAttribute(\'style\', \'display:block; position:fixed;top:0;left:0;right:0;bottom:0\');document.body.appendChild(elm)})()')
        elm = m.find_elements('tag name', 'overlay')
    except:
        pass
    if elm:
        elm = elm[0]
        ss = base64.b64decode(m.screenshot(element=elm))
    else:
        ss = base64.b64decode(m.screenshot())
    ss_f = open(dirname+type+("%03d-"%i)+location.hostname+'.png', 'wb')
    ss_f.write(ss)
    ss_f.close()
    check_results = inject_js()
    return check_results


i=0
has_bug_data = False
# If we don't start at 0, we must take care to not overwrite old results..
if start_at > 0 and os.path.exists(dirname+'comp'+os.path.sep+'idx.js'):
    file_index = read_json_file(dirname+'comp'+os.path.sep+'idx.js')
# Get current test data..
all_data = read_json_file(dirname+'..'+os.path.sep+'data.js')
out_obj = read_json_file(dirname+'sitedata-automated.js')
out_missing = read_json_file(dirname+'sitedata-missing.js')

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
        if has_bug_data and hostname in all_data and len(all_data[hostname]) > 0: # we have some test data stored from earlier, we might use them..
            compsteps = all_data[hostname]
        else:
            try:
                empty_firefox_cache(m)
                spoof_firefox_os()
                fxresults = load_and_check(url)
                #print 'firefox spoof results: '+fxresults
                empty_firefox_cache(m)
                spoof_safari_ios()
                wkresults = load_and_check(url, 'wk-spoof-')
                #print 'AppleWebKit spof results', wkresults
            except:
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
                fxresults = json.loads(fxresults)
                wkresults = json.loads(wkresults)
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
        f = ("%03d-"%i)+(location.hostname.rstrip('\r\n'))+'.png'
        tmp = tldextract.extract(url)
        if os.path.exists(dirname+'wk-spoof-'+f) and os.path.exists(dirname+f) and os.path.exists("c:\\Program Files (x86)\\IrfanView"):
            ss_a = open(dirname+f, 'rb')
            ss_b = open(dirname+'wk-spoof-'+f, 'rb')
            if diff_ratio(ss_a.read(), ss_b.read()) < 1.0:     
                subprocess.call(["c:\\Program Files (x86)\\IrfanView\\i_view32.exe", '/panorama=(1,%s%s,%swk-spoof-%s)' % (dirname,f,dirname,f), '/convert %scomp\\%s' % (dirname,f)], bufsize=100)
                if run_until is None: # We only want to overwrite the index if we're not doing a "partial" run..
                # 
                    if not tmp.subdomain in ['www', '']:
                        tmp = '%s.%s.%s' % (tmp.subdomain, tmp.domain, tmp.suffix)
                    else:
                        tmp = '%s.%s' % (tmp.domain, tmp.suffix)
                    file_index.append({'name':f,'hostname':tmp, 'fullurl':url})
                    jsf = open(dirname+'comp'+os.path.sep+'idx.js', 'w')
                    jsf.write(json.dumps(file_index, indent=4))
                    jsf.close();

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
