self.port.on("run-sitetest-step", function(data) {
  try{
      var host=data.host, bug=data.bug, stepIndex=data.step;
      console.log('injected script will run test '+host+', '+bug+', '+stepIndex);
      // TODO: implement "login screen detection" with auto-login for given site(s)
      // Allow individual tests to check for expected host name - 
      // sometimes redirects are expected
      /*var idx = location.hostname.indexOf(host);
      if(!(idx>-1 && idx+host.length === location.hostname.length)){
          self.port.emit("sitetest-error", {bug:bug,ua:navigator.userAgent,message:'unexpected hostname: '+location.hostname+' (wanted: '+host+')'})
          return;
      }*/
      var data = bugdata[bug];
      stepIndex = stepIndex||0;
      if(data.steps[stepIndex+1]){
          // This is not the last step to complete the test for this site
          // We can assume (with 99% certainty) that the test is split into several steps
          // because *this* step will cause some new page to load
          // In the common case, the ready event of that new page will automatically trigger 
          // the next step - however, we ask the extension to set up a fallback timeout
          self.port.emit("sitetest-nextstep", stepIndex+1) // ask extension to schedule next step fallback
          data.steps[stepIndex]();
      }else{
          result = data.steps[stepIndex]();
          self.port.emit("sitetest-result", {result:result,bug:bug,ua:navigator.userAgent});
      }
  }catch(e){
      self.port.emit("sitetest-result", {result:"exception while testing", bug:bug, ua:navigator.userAgent, exception:e});
  }
});
self.port.on('try-login', function (service){
    if((Object.keys(service).length<2))throw 'Insufficient auth details for '+location.href;
    for(var field in service){
        var elm = document.getElementById(field) || document.getElementsByName(field)[0];
        if(elm){
            elm.value = service[field];
        }else{
            // We're likely to sometimes end up here simply because we're logged in already..
            // Note it and move on..
            console.log('WARNING: no element found for '+field);
        }
    }
    self.port.emit("sitetest-nextstep", 0); // same logic as above..
    if(elm)elm.form.submit();
});

//console.log('sitetest')