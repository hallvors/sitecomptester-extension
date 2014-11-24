phantom.injectJs('data/sitedata.js');

var testsFile = 'http://arewecompatibleyet.com/js/stdTests.js';
var date = new Date();
var outfile = 'results-'+date.getFullYear()+'-'+leadZ(date.getMonth()+1)+'-'+leadZ(date.getDate())+'.csv';
var results=[];
var uadata = require('data/uadata.json');
var ua, consoleMessages = [];
var page = createPage();
var httpResources=[];
var runSpecificBugTest = null;
if(phantom.args.length > 0){
	if(phantom.args.length > 1)console.log('Will run tests for bugs '+phantom.args)
	runSpecificBugTest = phantom.args; // we can pass in a bug number on the command line to run that test only..
}

var bugIdx=-1, currentTest=0, bug;
var bugs = Object.keys(bugdata);
// temporary hack to start from given bug..
var startAtBugID = null; //"971576";
if(startAtBugID && ! runSpecificBugTest){
	bugIdx = bugs.indexOf(startAtBugID)-1;
}
var jobFallbackTimeout, xhrTestUrl;
function jobTime(doJob, delay){
	//console.log('scheduling ' + doJob.name + ' in ' + delay + 'ms')
    delay = delay || 500;
    clearTimeout(jobFallbackTimeout);
    jobFallbackTimeout = setTimeout(doJob, delay);
}


jobTime(nextBug, 200);

function nextBug () {
	if(runSpecificBugTest && runSpecificBugTest.length > 0){
		bugIdx = bugs.indexOf(runSpecificBugTest.shift());
		if(bugIdx === -1){
			console.log('ERROR: no test data for given bug id!')
			setTimeout( function(){ phantom.exit(); }, 2000);
		}
	}else if(runSpecificBugTest && runSpecificBugTest.length === 0){ // we were testing a specified subset of bugs only, and we're done!
		bugIdx = bugs.length+1; // not so subtle hack..
	}else{
		bugIdx++;
	}
//	console.log('bugIdx '+bugIdx)
//	console.log(JSON.stringify(bugdata[bugs[bugIdx]]))
	currentTest=0;
	bug = bugs[bugIdx];
	// tmp: run only xhr bugs
	/*
	while(bugdata[bug].testType != 'xhr'){
		if (bugIdx<bugs.length-1) {
			bugIdx++; bug = bugs[bugIdx];
		}else{
			phantom.quit()
		}
	}*/
	// end tmp: run only xhr bugs
	if(bugIdx >= bugs.length || ! bug in bugdata){
		//page.open('data:text/html,<html><body><form method="post" action="http://arewecompatibleyet.hallvord.com/data/testing/upload.php"><input type=submit><textarea style="visibility:hidden" name="csvdata">'+encodeURIComponent(csvStr)+'</textarea></form><pre>'+encodeURIComponent(csvStr));
		console.log('Done. Results were written to '+outfile)
	}else if (bugdata[bug]) {
		ua = page.settings.userAgent = uadata[bugdata[bug].ua]['general.useragent.override'];
		console.log('Will test '+bug+', set userAgent to ' + ua)
		if (bugdata[bug].testType === 'xhr') {
			page.close();
			page = createPage();
			console.log('xhr test..');
			page.open('about:blank');
			xhrTestUrl = bugdata[bug].url;
			loadSite();
		}else{
			xhrTestUrl='';
			loadSite();
		}
	};
}

function loadSite(){
	consoleMessages = []; // per-site, clear them before loading the next one
	httpResources = []; // also per-site
	jobTime(function(){
		console.log('TIMEOUT! for '+bug);
		if (page.url.indexOf(bugdata[bug].url)>-1) { // we're not done loading, but let's try to run those tests anyway..
			runTestStep();
		}else{
			registerTestResult('TIMEOUT - page did not load');
			nextBug();
		}
	}, 60000); // backup timeout in case we get stuck at some point..
	console.log('Now opening '+bugdata[bug].url)
	page.open(bugdata[bug].url, function (status) {
		if(status == 'success'){
			console.log('success for '+page.url);
			if(!xhrTestUrl){
				if(bug && bugdata[bug] && bugdata[bug].testType === 'mixed-content-blocking'){
					// let's check this test result in onLoadFinished for the main URL to make sure we catch late-loading HTTP resources
				}else{
					page.includeJs(testsFile, function(){
						jobTime(runTestStep, 100);
					});
				}
			}
		}else{
			console.log(page.url)
		}
		 /*else{
			// for some reason you might get a "fail" message even though the page will load fine eventually..
			// why? and what to do about it??
			console.log('Failed to load site for '+bug+' '+bugdata[bug].url);
			registerTestResult(false, 'Site failed to load: '+status); // Sites fail due to for example redirect problems, better label them as failures..
			bugIdx++;
			jobTime(nextBug,10); // move on
		}*/
	});
}
var retryCount=0
function runTestStep () {
	jobTime(nextBug, 30000); // backup timeout in case we get stuck at some point..
	if(xhrTestUrl || bugdata[bug].testType === 'mixed-content-blocking')return; // handled elsewhere..
	if(page.title === 'Page Load Error')return registerTestResult(false); // assume failure for loading errors (and fail early because
		//sometimes we're not allowed to inject JS into the error document)
	if (page.evaluateJavaScript('typeof hasViewportMeta === "function"')) {
		if (bugdata[bug] && bugdata[bug].steps.length>currentTest) {
			try{
				page.evaluateJavaScript('var unsafeWindow=window;');
				//console.log('('+bugdata[bug].steps[currentTest].toString()+')()')
				result = page.evaluateJavaScript('try{('+bugdata[bug].steps[currentTest].toString()+')()}catch(e){"EXCEPTION: "+e}');
				// Somewhat unexpectedly, evaluateJavaScript doesn't throw if the script throws..
				//console.log('result now '+result)
				if(/^EXCEPTION:/.test(result))throw result;
				if(result == 'delay-and-retry'){
					if(retryCount<10){
						jobTime(runTestStep, 2500);
						console.log('scheduling new attempt, page is not ready.. '+retryCount+'/10');
						retryCount++
						return;
					}else{
						registerTestResult('TIMEOUT - page ready test failed after 5 attempts');
						return;
					}
				}
				currentTest++;
				retryCount=0;
				if (bugdata[bug].steps[currentTest]) {
					// can we get back to this?
					// TODO: do something more clever than a timeout..
					console.log('will wait for next test..');
					return setTimeout(runTestStep, 500)
				}
			}catch(e){
				result = e;
			}
			registerTestResult(result);
			jobTime(nextBug, 10);
		};
	}else{
		console.log('needs to include test file')
		page.includeJs(testsFile, runTestStep);
	}
}

    function datetime(){
        var date = new Date();
        return date.getFullYear()+'-'+leadZ(date.getMonth()+1)+'-'+leadZ(date.getDate())+ ' '+leadZ(date.getHours())+':'+leadZ(date.getMinutes())+':'+leadZ(date.getSeconds()); // YYYY-MM-DD HH:MM:SS
    }
    function leadZ(num){
        return ('0'+num).slice(-2);
    }

function registerTestResult (result, comment) {
	if(bugdata[bug]){
		console.log(bug+' result: '+result+' '+(bugdata[bug].title||'')+' '+(comment||''));
		results.push([bug, datetime(), ua, result, bugdata[bug].title, comment]);
	}
	writeResultsToFile();
}

function writeResultsToFile(){
	// all done!?
    var csvStr = '';
	if(results.length>0){
        for(var i=0; i<results.length; i++){
            csvStr+='"'+(results[i].join('","'))+'"';
            csvStr+='\n';
        }
    }
    var fs = require('fs');
    var f = fs.open(outfile, 'w');
    f.write(csvStr);
    f.close();
    if(runSpecificBugTest && runSpecificBugTest.length === 0){
    	console.log(results);
    	setTimeout( function(){ phantom.exit(); }, 32000);
    }
}
function injectJS(page, ua){
	if(page.title === 'Page Load Error')return;
	try{
		//SlimerJS or Gecko has a bug where navigator.userAgent doesn't actually reflect the HTTP UA header..
	    page.evaluateJavaScript('navigator.__defineGetter__("userAgent", function(){return "' + ua + '"})');
	    // pretend touch is enabled..
	    page.evaluateJavaScript('window.ontouchstart = function(){}');
	    // pretend we're using a small screen
	    page.evaluateJavaScript('window.screen.__defineGetter__("width", function(){return 360})');
	    page.evaluateJavaScript('window.screen.__defineGetter__("height", function(){return 640})');
	    page.evaluateJavaScript('window.__defineGetter__("devicePixelRatio", function(){return 1.5})');
	    if(bug && bugdata[bug] && bugdata[bug].injectScript){
	        //console.log('injecting: '+bugdata[bug].injectScript)
	        page.evaluateJavaScript(bugdata[bug].injectScript);
	    }
	}catch(e){
		//console.log(e);
	}

}


function createPage(){
	var page = require('webpage').create();
	ua = page.settings.userAgent = "Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0";
	page.customHeaders = {
	"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Language": "en-us,en;q=0.5",
	"Accept-Encoding": "gzip, deflate",
	"Connection": "keep-alive"
	};
	page.viewportSize = { width:360, height:525 };
	page.onInitialized = function (req) {
		injectJS(page, ua);
	};
	page.onError = function(msg, line, source){
		console.log('ERROR reported to slimertester.js: '+msg+' '+line+' '+source);
		console.log(JSON.stringify(line));
		consoleMessages.push(msg);
	}

	page.onResourceError = function (res) {
		var desc = 'resource error - received: '+res.url+'\n '+res.contentType;
	    console.log('received: ' + desc);
	    if(/http:\/\//.test(res.url)){
	    	//console.log('HTTP URL! '+res.url);
			httpResources.push(res.url);
		}
	}
	page.onResourceReceived = function (res) {
		if(res.status == 301 || res.status == 302)return; // this is just an intermediate redirect response, wait for the real deal
	    //console.log(JSON.stringify(res, null, 4))
	    //injectJS(page, ua);
	    var result;
		if(/application\/vnd\.wap(\.xhtml\+xml|\.wml|)/i.test(res.contentType)){
			console.log('WAP! FAILURE!')
			registerTestResult(false, 'WAP content');
			page.stop()
			jobTime(nextBug, 5);
		}else if(xhrTestUrl && res.url === xhrTestUrl){
			if (res.status == 200 && res.body === '' && ! ('contentType' in res)) {
				// walks like a WAP, quacks like a WAP
				result = false;
			}else{
				var obj = {text: res.body, headers:{}}
				for(var i in res.headers)obj.headers[res.headers[i].name] = res.headers[i].value;
				console.log(JSON.stringify(obj, null,2))
				result = bugdata[bug].steps[0](obj); // typically calls noWapContentPlease ..
			}
			registerTestResult(result, 'header check complete');
			jobTime(nextBug, 10);
		}else if(/http:\/\//.test(res.url)){
			httpResources.push(res.url);
	    	//console.log('HTTP URL! '+res.url);
		}
	};

	page.onLoadFinished = function (status, url, isFrame) {
		console.log('onLoadFinished '+status+' '+url+' '+isFrame);

		if(xhrTestUrl){
			if(page.content === '<html><head></head><body></body></html>'){
				// would be a lot nicer to discover this by MIME type in the onResourceReceived (or onResourceError) handlers, but..
				registerTestResult(false, 'WAP content (empty page)');
				jobTime(nextBug, 10);
			}else{
				//console.log(page.content)
				registerTestResult(true, 'no WAP here, right?!');
				xhrTestUrl = '';
				// if next page is XHR, loading appears to fail *and* we'd see the source of the previous page.. Hence, load about:blank first
				page.open('about:blank');
				jobTime(nextBug, 10);
			}
		}else if(bugdata[bug].testType === 'mixed-content-blocking'){
			setTimeout(function(){
				registerTestResult(!httpResources.length,  (httpResources.length ? httpResources.length + ' http: resources loaded on this https: page' : ''));
				nextBug();
			}, 2000)
		}else{
			if(!isFrame)jobTime(runTestStep, 800);
		}
	}

	page.onAlert = page.onPrompt = page.onConfirm = function (str) {console.log(str);return true;}
	return page;
}
