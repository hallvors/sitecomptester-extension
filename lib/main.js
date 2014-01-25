// The main module of the Site compat checker
// Expected sequence:
// 1) widget click => data initialized, tab opens for about:blank
// 2) about:blank ready event runs initTest, kicks off first "job" (through jobTime() timeout) which loads first test site
// 3) test site ready event runs initTest again, jobTime() fires of first test
// 4) content script gets a message, runs test step, fires back either sitetest-result or next-step
// 5) sitetest-result or next-step handler schedules a new job, which either sends a new message or loads a new page
var Widget = require("sdk/widget").Widget;
var data = require("sdk/self").data;
var timers = require("sdk/timers");
eval(data.load('sitedata.js'));
var jobs=[], testTab, testTabWorker, testResults;
var jobLimit = 0; // for testing the extension, if set: run only first n tests before reporting results
const {Cc,Ci} = require("chrome");
exports.main = function() {
    var tabs = require('sdk/tabs');
    var jobFallbackTimeout;
    
    function jobTime(delay){
        delay = delay || 500;
        timers.clearTimeout(jobFallbackTimeout);
        jobFallbackTimeout = timers.setTimeout(doJob, delay);
    }
    
    function doJob(){ console.info('jobs left: '+jobs.length)
        timers.clearTimeout(jobFallbackTimeout);
        var job = jobs.shift();
        if(!job)return allTestsDone();
        if(job.openURL){
            spoofAs(job.spoof);
            testTab.url=job.openURL; // when loaded, another onReady->initTest will make sure we call doJob again
            checkLoaded = true;
            // set a long timeout to "fall back" if page load fails?
            jobTime(120000);
        }else if(job.loginRequired){
            var loginInfo = lookupLogin();
            testTabWorker.port.emit("try-login", loginInfo);
        }else{
            if(job.testType === 'xhr'){
                // start an XHR request
                runXHRTest(job);
            }else{
                testTabWorker.port.emit("run-sitetest-step", job);
            }
        }
    }
    function lookupLogin(){
        var url = testTab.url;
        var match = url.match(/^(https?:\/\/[^\/]+)\//), hostname, formSubmitURL, httprealm=null;
        console.log('url '+match[1]);
        hostname = formSubmitURL = match[1];
        var username, password;
        try {
                // Get Login Manager 
                var myLoginManager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);
                  
                // Find users for the given parameters
                var logins = myLoginManager.findLogins({}, hostname, formSubmitURL, httprealm);
                var loginInfo = {};
                // Grab details of first user from returned array of nsILoginInfo objects
                if(logins[0]){
                    loginInfo[logins[0].usernameField] = logins[0].username;
                    loginInfo[logins[0].passwordField] = logins[0].password;
                }
                return loginInfo;
        }
        catch(ex) {
                // This will only happen if there is no nsILoginManager component class
        }        
    }

    function startTesting(){
        if(!testTab){
            tabs.open({url:'about:blank', onReady:initTest, onClose:function(){
                testTab=null;
                testTabWorker.destroy();
                spoofAs('default'); // cleanup..
            }})
        }
    }
    
    function initTest(tab) { // DOMContentLoaded event for some page we want to test..
      if(!testTab){ // first onReady for this tab, remember it
          testTab = tab;
      }
      if(testTabWorker){ // we need to set up new workers for each page being loaded
          testTabWorker.destroy();
      }
      testTabWorker = tab.attach({
        contentScriptFile: [data.url("sitedata.js"),data.url("sitetest.js")]
      });
      testTabWorker.port.on("sitetest-result", function(result) {
          console.log(result.bug, result.result, result.ua);
          testResults.push([result.bug, datetime(), result.ua, result.result]);
          // Important: if the test job we just attempted caused an exception,
          // we'll skip any other test steps for that bug.. there is a chance
          // we'll not be on the right page or other preconditions will be wrong
          if( result.exception ){
            while(jobs[0] && jobs[0].bug === result.bug){
              jobs.shift();
            }
          }
          jobTime();
        });
      testTabWorker.port.on("sitetest-nextstep", function(idx){
          jobTime(15000); // the only real reason one would split a test into several steps is 
          // to load some new page. Typically the new page's ready event will take care of 
          // triggering the next step, but we'll have a fallback
      });
      testTabWorker.port.on("sitetest-error", function(result){
          testResults.push([result.bug, datetime(), result.ua, result.message]);
          jobTime();
        });
      jobTime(); // whenever a page is ready, we want to kick off testing
    }
    
    function allTestsDone(){// yay!
        if(testResults.length>0){
            var csvStr = '';
            for(var i=0; i<testResults.length; i++){
                csvStr+='"'+(testResults[i].join('","'))+'"';
                csvStr+='\n';
            }  
/*            var fs = require('io/file');
            var resultfilename = fs.join('tmp', 'moz-sitetest-results-'+Date.now()+'.csv');
            if(resultfilename.indexOf('\\')>-1){resultfilename = 'c:\\'+resultfilename;} // Yes, I'm on Windows.. :-/
            var textW = fs.open(resultfilename, 'w');
            textW.write(csvStr);
            textW.close();
            console.log(i+' test results written to '+resultfilename);*/
          tabs.open({url:'data:text/html,<html><body><form method="post" action="http://arewecompatibleyet.com/data/testing/upload.php"><input type=submit><textarea style="visibility:hidden" name="csvdata">'+encodeURIComponent(csvStr)+'</textarea></form><pre>'+encodeURIComponent(csvStr)});
            
        }
    }
    
    function spoofAs(ua){
        var prefs = require("sdk/preferences/service");
        var uadata = JSON.parse(data.load("uadata.json"));
        for(prop in uadata[ua]){
            if(uadata[ua][prop]){
                prefs.set(prop, uadata[ua][prop]);
            }else{
                prefs.reset(prop);
            }
        }
        if(uadata[ua]) return uadata[ua]["general.useragent.override"];
    }
    function runXHRTest(data){
        // TODO: what happens in the Request API if the request can't complete
        // like a never-ending redirect loop or something..?
        var Request = require("sdk/request").Request;
        var ua = spoofAs(data.ua), result=true;
        var req = Request({
            url: data.url,
            headers : {'User-Agent':ua},
            onComplete: function (response) {//tabs.open('data:text/plain,'+encodeURIComponent(JSON.stringify(response.headers)));
                for(var i=0;i<data.steps.length;i++){
                    result = result && data.steps[i](response);
                }
                testResults.push([data.bug, datetime(), ua, result]);
                jobTime();
            }
        }).get();
    }
    function datetime(){
        var date = new Date();
        return date.getFullYear()+'-'+leadZ(date.getMonth()+1)+'-'+leadZ(date.getDate())+ ' '+leadZ(date.getHours())+':'+leadZ(date.getMinutes())+':'+leadZ(date.getSeconds()); // YYYY-MM-DD HH:MM:SS
    }
    function leadZ(num){
        return ('0'+num).slice(-2);
    }

    // Widget documentation: https://addons.mozilla.org/en-US/developers/docs/sdk/latest/modules/sdk/widget.html

    new Widget({
        // Mandatory string used to identify your widget in order to
        // save its location when the user moves it in the browser.
        // This string has to be unique and must not be changed over time.
        id: "hallvord-sitecompat-checker-urlplayer",

        // A required string description of the widget used for
        // accessibility, title bars, and error reporting.
        label: "Site compatibility checker - tests: "+Object.keys(bugdata).length,


        // An optional string URL to content to load into the widget.
        // This can be local content or remote content, an image or
        // web content. Widgets must have either the content property
        // or the contentURL property set.
        //
        // If the content is an image, it is automatically scaled to
        // be 16x16 pixels.
        contentURL: "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAsHCAoIBwsKCQoMDAsNEBsSEA8PECEYGRQbJyMpKScjJiUsMT81LC47LyUmNko3O0FDRkdGKjRNUkxEUj9FRkP%2F2wBDAQwMDBAOECASEiBDLSYtQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P%2FwAARCAAgACADASIAAhEBAxEB%2F8QAFwABAQEBAAAAAAAAAAAAAAAABQYHBP%2FEAC8QAAICAAQDBgUFAQAAAAAAAAECAwQFESExAAYSE0FhcYGCFCJCUZEjJGKSoeH%2FxAAYAQACAwAAAAAAAAAAAAAAAAABAwIEBf%2FEACERAAMAAgIABwAAAAAAAAAAAAECAwARBDEhQYGRwdHw%2F9oADAMBAAIRAxEAPwDVrtyChVks2pVihiGbu2w%2F74d%2FE%2FJzNZsPlTqxwx9zWWPWfYu3q2fhwVzpiPxGNx1Cf0qjKFU7GZlJz9F6QPFzx14JXiirNasBmUOEVVy6nbfLXw4QXJbQzUlxppEUoNk9Z1pzHcrn9zVhsL3%2FAA7FXHkjaH%2B3D1G7XxCstirIJI20zGhB7wQdQfA8T92GDEI5VhikgsRoZAjEMHUb5EE67fngrlXEWr8wdiGzjst2Mq56doELq3nkrKfb9uCHKkA%2BeB%2BMlJF0GiO%2F31hnP9eRMYvdX1PHYXI7qUVP8MZ%2FI4SwK3JX5bjGOW4KptS9dF5zkXHTu2Wy%2FwAj99dxm%2FzdhkGIVVcyrDahB7J2UlWB3RgPpOQ8QQD3ZHMbkcRlCy2zE8ahFSy7MEUbBX26ddBp5DhLgzYtrvLHHstorInWvf0%2BcrbPMEGF0rEvx1C1eljMdeOjIZVQn62b8aZD17ieSKrzYnRHzktZMxO%2FyojZsfcyD3cCwQVi4BsrYYnSOvrn5sflA9eNM5OwyvShaftEltSqFJRT0xINQikjbPUnvPkABMNRgSPAZLkWnCTIp2Wz%2F9k%3D",

        // Add a function to trigger when the Widget is clicked.
        onClick: function(event) {
            testResults = [];
            var jobLimitWasSet = jobLimit > 0;
            // process the data, make a queue of actions
            for(var host in hosts){
                for(var i=0,bug;bug=hosts[host][i];i++){
                    if(bugdata[bug].testType==='xhr'){
                        // we don't need to set up separate job steps for an XHR test
                        // all steps run from the XHR onload anyway. Just pass on the 
                        // test data object
                        bugdata[bug].bug = bug; // remember bug number, not initially part of  this object..
                        jobs.push( bugdata[bug] );
                    }else{
                        // setup test by pushing an "openURL" job to launch the right site
                        jobs.push( {'spoof':bugdata[bug].ua,'openURL':bugdata[bug].url,'bug':bug} );
                        if(bugdata[bug].loginRequired){ // Before we continue working on this, we need to try to log in to the site
                            jobs.push(bugdata[bug]);
                        }
                       for(var j=0;j<bugdata[bug].steps.length;j++){
                            jobs.push({'host':host,'bug':bug,'step':j});
                        }
                    }
                    if(jobLimitWasSet){ // for testing the extension: only do first n tests
                        jobLimit --;
                        if(jobLimit <=0 )break;
                    }
                }
                if(jobLimitWasSet){
                    if(jobLimit <=0 )break;
                }
            }
            console.log(JSON.stringify(jobs));
            startTesting();
        }
    });
};
