phantom.injectJs('data/sitedata.js');

var testsFile = 'http://hallvord.com/temp/moz/stdTests.js';
var date = new Date();
var outfile = 'results-'+date.getFullYear()+'-'+leadZ(date.getMonth()+1)+'-'+leadZ(date.getDate())+'.csv';
var results=[];
var uadata = require('data/uadata.json');

var page = require('webpage').create();
var ua = page.settings.userAgent = "Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0";
page.customHeaders = {
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
"Accept-Language": "en-us,en;q=0.5",
"Accept-Encoding": "gzip, deflate",
"Connection": "keep-alive"
};
page.viewportSize = { width:360, height:640 };

var runSpecificsBugTest = null;
if(phantom.args.length > 0){
	console.log('Will run tests for bugs '+phantom.args)
	runSpecificsBugTest = phantom.args; // we can pass in a bug number on the command line to run that test only..
}

var bugIdx=-1, currentTest=0, bug;
var bugs = Object.keys(bugdata);
var jobFallbackTimeout, xhrTestUrl;
function jobTime(doJob, delay){
    delay = delay || 500;
    clearTimeout(jobFallbackTimeout);
    jobFallbackTimeout = setTimeout(doJob, delay);
}

page.onResourceRequested = function (req) {
	//SlimerJS or Gecko has a bug where navigator.userAgent doesn't actually reflect the HTTP UA header.. 
    page.evaluateJavaScript('navigator.__defineGetter__("userAgent", function(){return "'+ua+'"})');
    if(bug && bugdata[bug] && bugdata[bug].injectScript){
    	//console.log('injecting: '+bugdata[bug].injectScript)
    	page.evaluateJavaScript(bugdata[bug].injectScript);
    }
};

page.onResourceError = function (res) {
	//var desc = 'received: '+res.url+'\n '+res.contentType;
    //console.log('received: ' + desc);
}
page.onResourceReceived = function (res) {
    //console.log(JSON.stringify(res, null, 4))
	if(/application\/vnd\.wap(\.xhtml\+xml|\.wml|)/i.test(res.contentType)){
		console.log('WAP! FAILURE!')
		registerTestResult(false, 'WAP content');
		page.stop()
		jobTime(nextBug, 5);
	}else if(xhrTestUrl && res.url === xhrTestUrl){
		var obj = {text: res.body, headers:{}}
		for(var i in res.headers)obj.headers[res.headers[i].name] = res.headers[i].value;
		var result = bugdata[bug].steps[0](obj);
		registerTestResult(result);
		jobTime(nextBug, 10);
	}
};

page.onLoadFinished = function (status, url, isFrame) {
	//console.log('onLoadFinished '+status+' '+url+' '+isFrame);
	
	if(xhrTestUrl){
		if(page.content === '<html><head></head><body></body></html>'){
			// would be a lot nicer to discover this by MIME type in the onResourceReceived (or onResourceError) handlers, but..
			registerTestResult(false, 'WAP content');
			jobTime(nextBug, 10);
		}else{
			registerTestResult(true, 'no WAP here, right?!');
			// if next page is XHR, loading appears to fail *and* we'd see the source of the previous page.. Hence, load about:blank first
			page.open('about:blank');
			jobTime(nextBug, 10);
		}
	}else{
		if(!isFrame)jobTime(runTestStep, 800);
	}
}

page.onAlert = page.onPrompt = page.onConfirm = function () {return true;}

jobTime(nextBug, 200);

function nextBug () {
	if(runSpecificsBugTest && runSpecificsBugTest.length > 0){
		bugIdx = bugs.indexOf(runSpecificsBugTest.shift());
	}else if(runSpecificsBugTest && runSpecificsBugTest.length === 0){ // we were testing a specified subset of bugs only, and we're done!
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
		page.open('data:text/html,<html><body><form method="post" action="http://arewecompatibleyet.hallvord.com/data/testing/upload.php"><input type=submit><textarea style="visibility:hidden" name="csvdata">'+encodeURIComponent(csvStr)+'</textarea></form><pre>'+encodeURIComponent(csvStr));
		console.log('Done. Results were written to '+outfile)
	}else if (bugdata[bug]) {
		ua = page.settings.userAgent = uadata[bugdata[bug].ua]['general.useragent.override'];
		console.log('Will test '+bug)
		if (bugdata[bug].testType === 'xhr') {
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
	jobTime(function(){
		console.log('TIMEOUT! for '+bug);
		nextBug();
	}, 20000); // backup timeout in case we get stuck at some point..
	page.open(bugdata[bug].url, function (status) {
		if(status == 'success'){
			if(!xhrTestUrl){
				page.includeJs(testsFile, function(){
					jobTime(runTestStep, 100);
				});
			}
		}else{
			console.log('Failed to load site for '+bug+' '+bugdata[bug].url);
			registerTestResult(false, 'Site failed to load'); // Sites fail due to for example redirect problems, better label them as failures..
			bugIdx++;
			jobTime(nextBug,10); // move on
		}
	});
}
var retryCount=0
function runTestStep () {
	jobTime(nextBug, 20000); // backup timeout in case we get stuck at some point..
	if(xhrTestUrl)return; // handled elsewhere..
	if (page.evaluateJavaScript('typeof hasViewportMeta === "function"')) {
		if (bugdata[bug] && bugdata[bug].steps.length>currentTest) {
			try{
				page.evaluateJavaScript('var unsafeWindow=window;');
				//console.log('('+bugdata[bug].steps[currentTest].toString()+')()')
				result = page.evaluateJavaScript('try{('+bugdata[bug].steps[currentTest].toString()+')()}catch(e){"EXCEPTION: "+e}');
				// Somewhat unexpectedly, evaluateJavaScript doesn't throw if the script throws..
				//console.log('result now '+result)
				if(/^EXCEPTION:/.test(result))throw result;
				if(result == 'delay-and-retry' && retryCount<5){
					jobTime(runTestStep, 1000);
					console.log('scheduling new attempt, page is not ready.. '+retryCount+'/5');
					retryCount++
					return;
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
	console.log(bug+' result: '+result+' '+(bugdata[bug].title||'')+' '+(comment||''));
	results.push([bug, datetime(), ua, result, bugdata[bug].title, comment]);
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
    if(runSpecificsBugTest && runSpecificsBugTest.length === 0){
    	console.log(results);
    	phantom.exit();
    }
}
