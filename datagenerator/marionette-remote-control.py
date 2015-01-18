from marionette import Marionette
import base64, json, re, os, subprocess, time, urlparse, tldextract, difflib, argparse, glob, types
import pdb
import cherrypy

cherrypy.config.update({'server.socket_host':'0.0.0.0'}) # If worried about security, something specific like 192.168.1.16 and limiting clients to another known local IP might be better

class MarionetteReplayTester(object):
	def __init__(self, marionette_instance):
		self.marionette_instance = marionette_instance
	@cherrypy.expose
	def load_url(self, data):
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		url = data['details']['url']
		self.marionette_instance.navigate(url)
		return 'OK'

	@cherrypy.expose
	def click(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
		data = json.loads(data)
		elm = self.find_elm(data)
		try:
			elm.click()
		except:
			self.marionette_instance.execute_script('arguments[0].scrollIntoView();arguments[0].click();', [elm])
		return 'OK'

	@cherrypy.expose
	def scroll(self, data):
		data = json.loads(data)
		self.marionette_instance.execute_script('window.scrollTo(%i, %i)' % (data['details']['left'], data['details']['top']))
		return 'OK'

	@cherrypy.expose
	def attributes(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		try:
			elm = self.find_elm(data)
		except:
			return 'Element not found'
		issues = []
		if not elm:
			return 'Element not found (II)'
		for key in data['details']:
			value = data['details'][key]
			if not elm.get_attribute(key) == value:
				issues.append('%s had value "%s", expected "%s"' % (key, str(elm.get_attribute(key)), value))
		if len(issues) > 0:
			return json.dumps(issues)
		return 'OK'

	@cherrypy.expose
	def assert_style_contains(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
#		pdb.set_trace()
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		try:
			elm = self.find_elm(data)
		except:
			return 'Element not found'
		issues = []
		if not elm:
			return 'Element not found (II)'
		for key in data['details']:
			value = data['details'][key]
			if value not in elm.value_of_css_property(key):
				issues.append('%s had value "%s", expected to contain "%s"' % (key, str(elm.value_of_css_property(key)), value))
		if len(issues) > 0:
			return json.dumps(issues)
		return 'OK'

	@cherrypy.expose
	def exists(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		try:
			elm = self.find_elm(data)
		except:
			return 'ELEMENT NOT FOUND'
		if elm:
			return 'ELEMENT FOUND'
		else:
			return 'ELEMENT NOT FOUND'

	@cherrypy.expose
	def keypress(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		try:
			elm = self.find_elm(data)
			if elm:
				self.marionette_instance.execute_script('if(arguments[0] && arguments[0].focus)arguments[0].focus()') # no way to focus() from Marionette's API..?
		except:
			pass
		self.marionette_instance.send_keys(data['key'])

	@cherrypy.expose
	def checklist(self, data):
		cherrypy.response.headers['Content-Type'] = 'text/plain; charset=UTF-8'
		if isinstance(data, types.StringTypes):
			data = json.loads(data)
		results = {'exists':[], 'attributes':[], 'assert_style_contains':[]}
		stats = {'exists': {'pass': 0,'fail': 0}, 'attributes': {'pass': 0,'fail': 0}, 'assert_style_contains': {'pass': 0,'fail': 0}}
		#pdb.set_trace()
		for entry in data['details']:
			entry['frame'] = data['frame']
			if entry['type'] == 'exists':
				result = self.exists(entry)
				if result == 'OK':
					stats['exists']['pass'] += 1
				else:
					stats['exists']['fail'] += 1
			elif entry['type'] == 'attributes':
				result = self.attributes(entry)
				if result == 'OK':
					stats['attributes']['pass'] += 1
				else:
					stats['attributes']['fail'] += 1
			elif entry['type'] == 'assert_style_contains':
				result = self.assert_style_contains(entry)
				if result == 'OK':
					stats['assert_style_contains']['pass'] += 1
				else:
					stats['assert_style_contains']['fail'] += 1

			results[entry['type']].append({"type": entry['type'], "cssSelector": entry['data']['cssSelector'], 'result': result})
		return json.dumps({"stats": stats, "results": results})

	def find_elm(self, data):
		frame = None
		# pdb.set_trace()
		if 'data' in data: # sorry, some of the calls add an extra level to the object hierarchy
			# TODO: fix this to be consistent everywhere
			elm_sel = ' '.join(data["data"]['cssSelector'])
			elm_idx = data["data"]['index']
			elm_frame = data["frame"]
		else:
			elm_sel = ' '.join(data['cssSelector'])
			elm_idx = data['index']
			elm_frame = data["frame"]
		if elm_frame != None and elm_frame != '':
			print "switching to frame %s" % elm_frame
			self.marionette_instance.switch_to_frame(elm_frame, False)
		else: # make sure we're at the top-level if nothing else is specified
			self.marionette_instance.switch_to_frame(None, False)

		elm = self.marionette_instance.find_elements('css selector', elm_sel)
		print elm
		if len(elm) == 0:
			raise Exception('no elements found')
		if elm and len(elm) > 0:
			elm = elm[elm_idx]
		return elm

if __name__ == '__main__':
	m = Marionette(host='localhost', port=2829)
	m.start_session()
	cherrypy.quickstart(MarionetteReplayTester(m))