def set_mozilla_pref(marionette_instance, name, value):
 	marionette_instance.set_context(marionette_instance.CONTEXT_CHROME)
	js = """
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		str.data = "%s";
		pref.setComplexValue("%s", Components.interfaces.nsISupportsString, str)
	""" % (value, name)
	print js
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