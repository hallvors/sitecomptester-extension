/* NOTE: This file is not used. It's replaced by code using the browser's built-in password
manager
*/

/* 
Log in fields data structure documents 

Modus operandi: 
* Sitedata optionally contains the loginRequired field, value being the service we want a session with
* On testing, extension first calls loginfields[%service%].isLoginPage()
* If true, proceeds to call onbeforefillin, 
*  - if it returns true, set user name, password fields
*  - call onbeforelogin
*    -  if it returns true, send click event to submit element

*/

var logindata = {
    'google' : {
        'isLoginPage':function(){
            return location.hostname === 'accounts.google.com' && location.pathname.indexOf('/ServiceLogin') > -1;
        },
        'onbeforefillin':function(){ return true; },
        'username_field':'Email',
        'password_field':'Passwd',
        'submit':'signIn',
        'onbeforelogin':function(){return true;}
    },
    'facebook' : {
        'isLoginPage':function(){
            return location.hostname.indexOf('facebook.com') >-1 && document.getElementById('login_form') !== null;
        },
        'onbeforefillin':function(){ return true; },
        'username_field':'email',
        'password_field':'pass',
        'submit':'u_0_b',
        'onbeforelogin':function(){return true;}
    }
}

self.port.on("login-data-comes-here", function(data) {
    for(var service in logindata){
        if(data[service+'-username'])logindata[service].username = data[service+'-username'];
        if(data[service+'-password'])logindata[service].password = data[service+'-password'];
    }
});

function tryLoginIfNeeded(serviceID){
    var service;
    if(service = logindata[serviceID]){
        if(service.isLoginPage()){
            if(!(service.username && service.password))throw 'Insufficient auth details for '+serviceID;
            var u = document.getElementById(service.username_field) || document.getElementsByName(service.username_field)[0];
            var p = document.getElementById(service.password_field) || document.getElementsByName(service.password_field)[0];
            if(!(u&&p))throw 'User name field and/or password field not found in '+serviceID+' login page, wrong IDs on file?';
            u.value = service.username, p.value=service.password;
            var l = document.getElementById(service.submit) || document.getElementsByName(service.submit)[0];
            if(l && l.click){
                l.click();
            }else{
                u.form.submit();
            }
        }
    }else{
        throw 'No login data known for '+serviceID;
    }
}