from marionette import Marionette
import base64, json, re, os, subprocess, time, urlparse

dirname = 'C:\\mozilla\\testing\\video\\'
filename = dirname + 'sites.txt'
start_at = 0
run_until = None
if not os.path.exists(dirname+'comp'):
    os.mkdir(dirname+'comp')

m = Marionette(host='localhost', port=2828)
m.start_session()

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
    set_mozilla_pref(m, 'general.useragent.override', 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a Safari/419.3')
    set_mozilla_pref(m, 'general.useragent.appName', 'Netscape')
    set_mozilla_pref(m, 'general.useragent.vendor', 'Apple Computer, Inc.')
    set_mozilla_pref(m, 'general.useragent.platform', 'iPhone')

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

def empty_firefox_cache(marionette_instance):
    marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
    marionette_instance.execute_script('Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);')
    marionette_instance.execute_script('Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService).evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);')
    marionette_instance.execute_script('Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).removeAll();')
    marionette_instance.set_context(marionette_instance.CONTEXT_CONTENT)

def load_and_check(url, type=''):
    #print url
    hostname = urlparse.urlparse(url)[1]
    try:
        m.delete_all_cookies()
        m.delete_session()
        m.start_session()
        m.navigate(url)
    except:
        try:
            print 'Failed loading '+url+', trying again with www.'
            m.navigate(re.sub('://', '://www.', url))
            url = re.sub('://', '://www.', url)
        except:
            print 'Error loading '+url
            return
    time.sleep(1)
    ss = base64.b64decode(m.screenshot())
    ss_f = open(dirname+type+("%03d-"%i)+hostname+'.png', 'wb')
    ss_f.write(ss)
    ss_f.close()
    check_results = inject_js()
    return check_results


i=0
has_bug_data = False
out_obj = {}
out_missing = {}
with open(filename, 'r') as handle:
    for url in handle:
        parts = url.split("\t")
        if len(parts) == 2:
            continue # We're loading a tab-separated file with bug \t summary \t url, and there is no URL..
        elif len(parts) == 3:
            url = parts[2]
            has_bug_data = True
    	if i<start_at or url.strip() == '':
    		i+=1
    		continue
        empty_firefox_cache(m)
        spoof_firefox_os()
        url = url.strip()
        if not ('http://' in url or 'https://' in url):
            url = "http://%s" % url
        print str(i) + ' : ' + url
        fxresults = load_and_check(url)
        #print 'firefox spoof results: '+fxresults
        empty_firefox_cache(m)
        spoof_safari_ios()
        wkresults = load_and_check(url, 'wk-spoof')
        #print 'AppleWebKit spof results', wkresults
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
        f = ("%03d"%i)+'.png'
        if os.path.exists(dirname+os.sep+'wk-spoof'+f) and os.path.exists(dirname+os.sep+f) and os.path.exists("c:\\Program Files (x86)\\IrfanView\\"):
            subprocess.call(["c:\\Program Files (x86)\\IrfanView\\i_view32.exe", '/panorama=(1,%s%s,%swk-spoof%s)' % (dirname,f,dirname,f), '/convert %scomp\\%s' % (dirname,f)], bufsize=100)

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
