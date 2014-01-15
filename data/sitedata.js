var hosts = {};
/*
,
    '' : {
        url:'',
        ua:'',
        steps:[function(){}]
    },


*/
var bugdata = {
    "957440" : {
        url: 'http://sina.cn/',
         ua: "FirefoxOS",
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    "934857" : {
		url: 'http://m.txu.com/',
		 ua: "FirefoxOS",
		steps:[noWapContentPlease],
		testType:'xhr'
	},
    "827632" : {
		url: 'http://tecmundo.com.br',
		 ua: "FirefoxOS",
         /* This was oddly passing, though site was not fixed. Trying to add a check for the number of scripts.. */
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() && document.getElementsByTagName('script').length<15}]
	},
    "936479" : {
		url: 'http://www.tamiltvshows.net/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() }]
	},
    "935472" : {
		url: 'http://blip.tv/commercialbreak/selling-out-colleen-ryan-6687803',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/ && document.getElementsByTagName('video').length > 0}]
	},
    '924386' : {
        url:'https://mobile.twitter.com/trutherbot',
        ua:'FirefoxAndroid',
        steps:[function(){
            var elm = document.getElementsByClassName('media-strip')[0];
            return elm && elm.getElementsByTagName('picture').length>0?true:false;
        }]
    },
    '868298' : {
        url:'http://www.bing.com/videos/search?q=cats&FORM=HDRSC3',
        ua:'FirefoxAndroid',
        steps:[function(){return document.getElementById('rfPaneIn')!=null}]
    },
    "913590" : {
		url: 'http://www.lepoint.fr',
		 ua: "FirefoxOS1.1",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "907518" : {
		url: 'http://info.3g.qq.com/',
		 ua: "FirefoxAndroid",
		steps:[function(){return document.body.className.indexOf('index')>-1;}]
	},
	"922289" : {
		url: 'http://info.3g.qq.com/',
		 ua: "FirefoxOS",
		steps:[noWapContentPlease],
		testType:'xhr'
	},
	"788535" : {
		url: 'http://bravestman.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.pathname.indexOf('/unsupported')===-1;}]
	},
	"798769" : {
		url: 'http://m.novinky.cz/articleDetails?aId=280744',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() && hasVideoTags()}]
	},
	"754092" : {
		url: 'http://icloud.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() && location.pathname.indexOf('unsupported_')===-1}]
	},
	"916250" : {
		url: 'http://litedetection.apachemobilefilter.org/index.php?amf=Mozilla%2F5.0+%28Mobile%3B+rv%3A18.0%29+Gecko%2F18.0+Firefox%2F18.0',
		 ua: "FirefoxOS",
		steps:[function(){return document.body.textContent.match(/TOUCH\s*false/)?false:true;}]
	},
    '799635' : {
        url:'https://mail.mozilla.com',
        ua:'FirefoxOS',
        steps:[function(){return document.getElementById('client').value === 'mobile'}]
    },
    '795319' : {
        url:'http://m.bing.com/maps',
        ua:'FirefoxOS',
        steps:[function(){ return document.scripts.length > 0; }]
    },
    '899541' : {
        url:'http://blackberry.com',
        ua:'FirefoxOS',
        /* "mobile" browsers get a <select> country-selector */
        steps:[function(){ return document.getElementById('mySelectbox')!=null }]
    },
    '905627' : {
        url:'http://www.nhk.or.jp',
        ua:'FirefoxOS',
        steps:[function(){ return location.pathname.indexOf('/sp/')>-1 && window.g_ua && window.g_ua.SmartPhone; }]
    },
    '922357' : {
        url:'http://fidelity.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('fidelity.mobi'===-1);}]
    },
    '813365' : {
        url:'http://techcrunch.com',
        ua:'FirefoxOS',
        /* Re-load loop.. We never get to render the <nav id="navigation"> due to the redirects */
        steps:[function(){ return document.getElementById('navigation')!=null; }]
    },
    '804994' : {
        url:'http://twitch.tv',
        ua:'FirefoxAndroid',
        /* Note: this should be the right pass condition after we sort out M3U8-handling */
        steps:[hasVideoTags]
    },
    '909420' : {
        url:'http://plugins.svn.wordpress.org/wptouch/trunk/wptouch.php',
        ua:'FirefoxOS',
        steps:[function(){ return unsafeWindow.document.body.textContent.indexOf('Firefox')>-1 }]
    },
    '907371' : {
        url:'http://s.huffpost.com/assets/css.php?f=mobileweb%2Fdev%2Fnormalize.css%2Cmobileweb%2Fdev%2Fapp.css%2Cbasic.css%2Cbuttons.css%2Cmobileweb%2Fnews%2Fauth.css&v=1380134457',
        ua:'FirefoxOS',
        steps:[function(response){
            return ! /@font-face\s*\{\s*font-family:\s*"hpmobileweb";\s*src:\s*url\("\/images\/mobileweb\/hpmobileweb\.eot"\);\s*src:\s*url\("\/images\/mobileweb\/hpmobileweb\.eot\?#iefix"\) format\("embedded-opentype"\),\s*url\("\/images\/mobileweb\/hpmobileweb\.svg#hpmobileweb"\) format\("svg"\);\s*font-weight:\s*normal;\s*font-style:\s*normal;\s*/.test(response.text)
        }],
        testType:'xhr'
    },
    '766035' : {
        url:'http://m.zipscene.com/pjs-coffee/albums/album/738550521-simply-the-best',
        ua:'FirefoxAndroid',
        steps:[function(){ try{unsafeWindow.$(".zse-photo-thumbs a").photoSwipe();return true;}catch(e){if(e.message == "e.navigator.userAgent.match(...) is null")return false;} return 'indeterminate'; }]
    },
    '878647' : {
        url:'http://www.sat.gob.mx/',
        ua:'FirefoxOS',
        steps:[function(){ return unsafeWindow.Dmovil ? unsafeWindow.Dmovil() : location.pathname.indexOf('default2.htm')>-1 }]
    },
    '878632' : {
        url:'http://www.banorte.com',
        ua:'FirefoxOS',
        steps:[function(){return location.pathname.indexOf('/mobile/')>-1}]
    },
    '794629' : {
        url:'http://www.centrum.cz',
        ua:'FirefoxOS',
        steps:[function(){return location.href.indexOf('m.centrum')>-1}]
    },
    "732957" : {
    	url: 'http://adventureworld.net.au/',
		 ua: "FirefoxAndroid",
        /* Site thinks Firefox is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
	},
    "867258" : {
		url: 'http://m.fool.com',
		 ua: "FirefoxAndroid",
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
	},
    '914252' : {
        url:'https://www.google.com/calendar/',
        ua:'FirefoxAndroid',
        steps:[function(){return location.pathname.indexOf('calendar/m')===-1 /* sniffing part */ && cssCheck(['ci-btn-reg', 'ci-btn-back', 'ci-btn-right', 'ci-icn-reload', 'ci-icn-plus', 'ci-icn-right-ip'], 'borderImageSource') /* -webkit-border-image part */}],
        loginRequired:true /* this test requires logging in to Google */
    },
        '905120' : {
        url:'http://lufthansa.de',
        ua:'FirefoxOS',
        /* We should be redirected to mobile.lufthansa.com where the first page is a country/language selector,
        we must bypass it to get to the page with the problem */
        steps:[
            function(){var tmp;if(tmp=document.getElementById('language')){ if(tmp.tagName === 'SELECT')tmp.form.submit(); }},
            function(){ return location.hostname.indexOf('mobile.lufthansa')>-1 && mobileLinkOrScriptUrl('airportlist.do') }
        ]
    },
    "755879" : {
            url: 'http://pitchfork.com/',
             ua: "FirefoxOS",
            steps:[function(){return location.hostname.indexOf("m.pitchfork.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() && cssCheck(['auto'], 'transition')}]
    },
    "884874" : {
            url: 'http://technabob.com',
             ua: "FirefoxOS",
            steps:[function(){return mobileLinkOrScriptUrl('wptouch.js')&& hasViewportMeta()}]
    },
    '828431' : {
        url:'http://espn.go.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('m.espn')>-1}]
    },
    '809796' : {
        url:'http://espn.go.com',
        ua:'FirefoxAndroid',
        steps:[function(){return document.getElementsByClassName('main-story-headlines').length > 0}]
    },
    '828439' : {
        url:'http://movistar.com.ve/',
        ua:'FirefoxOS',
        steps:[hasHandheldFriendlyMeta]
    },
    "843137" : {
    	url: 'http://nytimes.com',
		 ua: "FirefoxOS",
         /* The "Mobile banner" (suggesting switching to mobile site) is added from JS, so there is a race condition here */
		steps:[function(){return document.getElementById('mobileBanner')?true:false;}]
	},
    '826845' : {
        url:'http://techtudo.com.br/',
        ua:'FirefoxOS',
        /*Note: the redirect is done from JS, so there is a chance of a race condition - hopefully the second test, running the JS directly, will handle it*/
        steps:[function(){if(location.hostname.indexOf('m.techtudo.com')>-1)return true; try{ return glb.behavior.redirectToMobile.isMobile(navigator.userAgent);}catch(e){return 'test 826845 needs update, throws';}}]
    },
	"828430" : {
		url: 'http://meridiano.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.href.indexOf('wap.')>-1 /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    '827634' : {
        url:'http://www.imdb.com',
        ua:'FirefoxOS',
        steps:[function(){return hasHandheldFriendlyMeta() && hasViewportMeta()  /*regression test, expected to pass*/}]
    },
    '826512' : {
        url:'http://www.amazon.com',
        ua:'FirefoxOS',
        steps:[function(){return document.documentElement.classList.contains('a-touch') /*regression test, expected to pass*/}]
    },
    '826514' : {
        url:'http://estadao.com.br',
        ua:'FirefoxOS',
        steps:[function(){return (location.hostname.indexOf('m.estadao')>-1 || mob.isMobile(navigator.userAgent)) ? true : false;}]
    },
    '826330' : {
        url:'http://www.uol.com.br/',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('m.uol.')>-1}]
    },
    '826343' : {
        url:'http://www.ig.com.br/',
        ua:'FirefoxOS',
        steps:[mobileLinkOrScriptUrl]
    },
    "881072" : {
		url: 'https://vine.co/v/b3Enwh79mdj',
		 ua: "FirefoxOS",
         /* We'd like the <video>, not Flash, please..*/
		steps:[function(){return document.getElementsByTagName('video').length>0 && document.getElementsByTagName('video')[0].src != '' ; }]
	},
    "826361" : {
		url: 'http://tumblr.com',
		 ua: "FirefoxOS",
		steps:[function(){return document.body.classList.contains('is_mobile') && document.body.classList.contains('is_mobile_handset') /*(regression test, expected to pass)*/}]
	},
    "896014" : {
        /* Requires two-step testing because the PayPal API requires that you "configure"
        the express checkout from a backend script before taking the user to the payment screen.
        First URL here is a "configuration" URL, returns a token that is required for the next step.

        Note that the test runs against the PayPal developer "sandbox", which can in theory
        be somewhat different from the live site.
        */
		url: 'https://api-3t.sandbox.paypal.com/nvp?METHOD=SetExpressCheckout&VERSION=93&USER=sdk-three_api1.sdk.com&PWD=QFZCWN5HZM8VBG7Q&SIGNATURE=A-IzJhZZjhg29XQ2qnhapuwxIDzyAZQ92FRP5dqBzVesOkzbdUONzmOU&PAYMENTREQUEST_0_AMT=5.00&PAYMENTREQUEST_0_CURRENCYCODE=USD&PAYMENTREQUEST_0_PAYMENTACTION=Sale&RETURNURL=http://www.example.org&CANCELURL=http://www.example.org',
		 ua: "FirefoxOS",
         /* Try to use the token to redirect to mobile express payment screen - if it redirects to express-payment, it's a fail */
		steps:[function(){ var token = decodeURIComponent(document.body.textContent.match(/TOKEN=([^&]*)/)[1]); location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout-mobile&token="+token }, function(){ return location.href.indexOf('express-checkout-mobile')>-1 }]
	},
    "843153" : {
		url: 'http://games.com',
		 ua: "FirefoxOS",
         /* detect <body class="... mobile touch"> */
		steps:[function(){return document.body.classList.contains('mobile') && document.body.classList.contains('touch') }]
	},
    "826353" : {
		url: 'http://itau.com.br',
		 ua: "FirefoxOS",
         /* /M is for Mobile in their URLs, it seems */
		steps:[function(){return location.pathname.indexOf('/M')===0}]
	},
    "828376" : {
		url: 'http://plotek.pl',
		 ua: "FirefoxOS",
         /* there is some server-side sniffing and some JS involved. This JS variable is defined by the backend browser sniffing code */
		steps:[function(){return window.gazeta_pl && gazeta_pl.mobileInfo && gazeta_pl.mobileInfo.isMobileDevice?true:false;}]
	},
    "826335" : {
		url: 'http://globo.com',
		 ua: "FirefoxOS",
         /* Globo redirects to m.globo from JS. The test below may run before or after redirect */
		steps:[function(){if(location.hostname.indexOf('m.globo.com')>-1)return true; try{ return unsafeWindow.glb.behavior.redirectToMobile.isMobile(navigator.userAgent);}catch(e){return 'test 826335 needs update, throws';}}]
	},
    '891032' : {
        url:'http://www.summitracing.com',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '821021' : {
        url:'http://www.evernote.com/m/',
        ua:'FirefoxOS',
        /* This site has two mobile versions, we want the fancier one for FxOS - the simpler one has a HandheldFriendly meta tag */
        steps:[ function(){return !hasHandheldFriendlyMeta();} ]
    },
    '843165' : {
        url:'http://virginatlantic.com',
        ua:'FirefoxOS',
        steps:[function(){ return location.hostname.indexOf('mobile.virginatlantic.com')>-1 }]
    },
    '840896' : {
        url:'http://nextbuses.mobi',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '843176' : {
        url:'http://tylted.com',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '843158' : {
        url:'http://www.starwoodhotels.com',
        ua:'FirefoxOS',
        /*Redirects to some text-only site on a different host*/
        steps:[function(){ return location.hostname.indexOf('starwoodhotels.com')>-1 }]
    },
    '828448' : {
        url:'http://www.petardas.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('petardashd')>-1;}]
    },
    '833841' : {
        url:'http://www.santander.com.br',
        ua:'FirefoxOS',
        /* The problem is a reload loop, eventually causing an error page. If we end up on the real page with the ASP form, we're OK */
        steps:[function(){ return document.getElementById('__VIEWSTATE')!=null; }]
    },
    '883863' : {
        url:'http://m.easyjet.com',
        ua:'FirefoxOS',
        /* EasyJet thinks FirefoxOS is a Wap browser.. */
        /* TODO: should have another test for this bug, checking that www. redirects to m. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '841715' : {
        url:'http://lufthansa.de',
        ua:'FirefoxAndroid',
        steps:[function(){return location.hostname.indexOf('mobile.lufthansa.com')>-1}]
    },
    '878630' : {
        url:'http://ask.com',
        ua:'FirefoxOS',
        steps:[hasViewportMeta]
    },
    '856662' : {
        url:'http://el-nacional.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('m.el-nacional.com')>-1;}]
    },
    '878262' : {
        url:'http://download.com',
        ua:'FirefoxOS',
        steps:[function(){ return location.hostname.indexOf('m.download.cnet.com')>-1 && hasViewportMeta(); }]
    },
    '766951' : {
        url:'http://cnn.com',
        ua:'FirefoxAndroid',
        /* CNN has two mobile sites, we'd prefer not to get the simplistic one on cnnmobile.com */
        steps:[function(){return location.hostname.indexOf('edition.cnn.com')>-1 && mobileLinkOrScriptUrl();}]
    },
    '806518' : {
        url:'http://bradesco.com.br',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('bradescocelular.com.br')>-1;}]
    },
    '828418' : {
        url:'http://bbva.es',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('bbva.mobi')>-1;}]
    },
    '841432' : {
        url:'http://m.cumhuriyet.com.tr',
        ua:'FirefoxAndroid',
        /* We'd rather not get a Content-Type: application/vnd.wap.xhtml+xml; charset=iso-8859-9 */
        steps:[noWapContentPlease],
        testType : 'xhr'
    },
    '857119' : {
        url: 'http://m.photobucket.com/images/?searchTerm=black+and+white',
        ua: 'FirefoxOS',
        /* we expect more than 10 images on a smartish phone.. */
		steps: [ function(){ return document.images.length>=10 } ]
    },
    '729556' : {
        url:'http://m.photobucket.com/',
        ua: 'FirefoxOS',
        /* server-side sniffing sets an "isAndroid" variable in JS */
        steps: [function(){ return unsafeWindow.cfg ? unsafeWindow.cfg.isAndroid ? true : false : false /* if the object is absent, we consider it a failure - means it's a lo-fi, script-free page */}]
    },
    '759111' : {
        url:'http://www.live.com/',
        ua: 'FirefoxAndroid',
        /* URL of login page contains a redirect back to the /m/ URL for the mobile site */
        steps: [function(){ return location.href.indexOf('wreply=https:%2F%2Fmail.live.com%2Fm%2F')>-1 }]
    },
    '957853' : {
        url:'http://www.live.com/',
        ua: 'FirefoxOS',
        /* URL of login page contains a redirect back to the /m/ URL for the mobile site */
        steps: [function(){ return location.href.indexOf('wreply=https:%2F%2Fmail.live.com%2Fm%2F')>-1 }]
    },
    '890864' : {
        url:'http://www.mibebeyyo.com/',
        ua:'FirefoxOS',
        steps:[function(){return document.getElementsByClassName('contenedormobile').length>0;}]
    },
    '888706' : {
        url:'http://m.plus.pl/',
        ua:'FirefoxOS',
        steps:[hasHandheldFriendlyMeta]
    },
    '888701' : {
        url:'http://m.cinecolombia.com/movil/',
        ua:'FirefoxOS',
        steps:[function(){return mobileLinkOrScriptUrl('s_code_movil')}]
    },
    '241688' : {
        url:'http://online.sainsburysbank.co.uk/',
        ua:'default',
        /* we expect a redirect to a correctly formatted https:// URL (problem is a redirect to https:\\ ...  */
        steps:[function(){ return location.protocol === 'https:'  && location.hostname === 'online.sainsburysbank.co.uk' }]
    },
    '827622' : {
        url:'http://bing.com',
        ua:'FirefoxOS',
        /* Bing is expected to redirect FirefoxOS browser to m.bing.com */
        steps:[function(){ return location.href.indexOf('m.bing.')>-1 }]
    },
    '896951' : {
        url:'http://www.orkut.com',
        ua:'FirefoxOS',
        /* Log in, then test (pardon the pw - it's a throwaway testing account) */
        steps:[function(){document.getElementById('Email').value='mozwebcompat';document.getElementById('Passwd').value='PoliceTheInternet';document.getElementById('signIn').click();}, function(){return location.hostname.indexOf('m.orkut')>-1}]
    },
    '827869' : {
        url:'http://mail.google.com',
        ua:'FirefoxOS',
        /* Log in, then test (pardon the pw - it's a throwaway testing account) */
        steps:[function(){if(document.getElementById('Email')){document.getElementById('Email').value='mozwebcompat';document.getElementById('Passwd').value='PoliceTheInternet';document.getElementById('signIn').click();}else{return document.documentElement.className+document.body.className === ''}}, function(){return document.documentElement.className+document.body.className === ''}]
    },
    '826347' : {
        url:'http://www.msn.com',
        ua:'FirefoxOS',
        steps:[function(){return location.href.indexOf('mobile.msn.')>-1 || hasViewportMeta()}]
    },
    '896951' : {
        url:'http://www.spiegel.de',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('ml.spiegel')>-1}]
    },
        "843143" : {
		url: 'http://foxnewsinsider.com',
		 ua: "FirefoxOS",
         /* site runs a nice, responsive Drupal design, so it doesn't need a mobile version :) */
		steps:[function(){return Drupal.settings.omega.layouts.order[0]==='narrow';}]
	}
};

/* Below are auto-generated tests. They will be merged into bugdata, but
if both objects have test data for the same bug, the existing one in bugdata is kept
(presuming that is a hand-written, manually vetted one..)*/
var automated_tests={
    "843129" : {
    	url: 'http://11870.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "828389" : {
		url: 'http://20minutos.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.20minutos.es")>-1}]
	},
	"804715" : {
		url: 'http://163.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"866577" : {
		url: 'http://3g.qq.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("info.3g.qq.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826502" : {
		url: 'http://4shared.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826344" : {
		url: 'http://abril.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"805164" : {
		url: 'http://accounts.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828412" : {
		url: 'http://amazon.co.uk',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826511" : {
		url: 'http://amazon.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828388" : {
		url: 'http://amazon.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828399" : {
		url: 'http://antena3.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.antena3.com")>-1 && hasViewportMeta()}]
	},
	"766979" : {
		url: 'http://apple.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878220" : {
		url: 'http://aprod.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843149" : {
		url: 'http://arstechnica.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878222" : {
		url: 'http://arukereso.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.arukereso.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878630" : {
		url: 'http://ask.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843119" : {
		url: 'http://askthebuilder.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827674" : {
		url: 'http://avianca.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.avianca.com")>-1}]
	},
	"828437" : {
		url: 'http://avn.info.ve',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878650" : {
		url: 'http://b92.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"878224" : {
		url: 'http://badoo.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("meu1.badoo.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878224" : {
		url: 'http://badoo.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("meu1.badoo.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826711" : {
		url: 'http://bb.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bb.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878226" : {
		url: 'http://bet365.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.bet365.com")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"939035" : {
		url: 'http://beyond.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827622" : {
		url: 'http://bing.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878258" : {
		url: 'http://blackhatteam.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878228" : {
		url: 'http://blikk.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.blikk.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827627" : {
		url: 'http://bol.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bol.uol.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828420" : {
		url: 'http://booking.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884290" : {
		url: 'http://broadway.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878634" : {
		url: 'http://buenastareas.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828445" : {
		url: 'http://bumeran.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bumeran.com.ve")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"815442" : {
		url: 'http://carsensor.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878260" : {
		url: 'http://cdm.me',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cdm.me")>-1 && hasViewportMeta()}]
	},
	"828357" : {
		url: 'http://ceneo.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ceneo.pl")>-1 && hasViewportMeta()}]
	},
	"843168" : {
		url: 'http://cheaptickets.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"843197" : {
		url: 'http://cheezburger.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843186" : {
		url: 'http://chevrolet.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.chevrolet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843151" : {
		url: 'http://citibank.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878230" : {
		url: 'http://citromail.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.citromail.hu")>-1 && hasViewportMeta()}]
	},
	"826949" : {
		url: 'http://clickjogos.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827631" : {
		url: 'http://climatempo.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.climatempo.com.br")>-1 && hasViewportMeta()}]
	},
	"784450" : {
		url: 'http://cnet.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cnet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843132" : {
		url: 'http://comunio.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.comunio.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843139" : {
		url: 'http://consumersearch.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"848854" : {
		url: 'http://deadline.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"828380" : {
		url: 'http://deser.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.deser.pl")>-1 && hasViewportMeta()}]
	},
	"828443" : {
		url: 'http://despegar.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.despegar.com.ve")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843136" : {
		url: 'http://deviantart.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887751" : {
		url: 'http://di.com.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"815374" : {
		url: 'http://directv.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"784450" : {
		url: 'http://download.cnet.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cnet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827676" : {
		url: 'http://dropbox.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826958" : {
		url: 'http://ebay.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ebay.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828386" : {
		url: 'http://ebay.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ebay.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"876423" : {
		url: 'http://economist.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843146" : {
		url: 'http://edmunds.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843160" : {
		url: 'http://ehow.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843114" : {
		url: 'http://einforma.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828397" : {
		url: 'http://elconfidencial.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827664" : {
		url: 'http://elespectador.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.elespectador.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887782" : {
		url: 'http://elimpulso.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887224" : {
		url: 'http://elmundo.es/movil2',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827670" : {
		url: 'http://elpais.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.elpais.com.co")>-1}]
	},
	"827670" : {
		url: 'http://elpais.com.co/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.elpais.com.co")>-1}]
	},
	"878637" : {
		url: 'http://eluniversal.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.eluniversal.com.mx")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843109" : {
		url: 'http://enfemenino.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.enfemenino.com")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"815301" : {
		url: 'http://engadget.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878630" : {
		url: 'http://es.ask.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843126" : {
		url: 'http://es.playstation.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.es.playstation.com")>-1 && hasViewportMeta()}]
	},
	"890858" : {
		url: 'http://es.qdq.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://es.wikia.com/Wikia',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843170" : {
		url: 'http://etsy.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"806171" : {
		url: 'http://everything.me',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"815913" : {
		url: 'http://facebook.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"759599" : {
		url: 'http://firstlineofcode.blogspot.co.nz/2012/05/what-firefox-users-wants.html',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878638" : {
		url: 'http://flickr.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.flickr.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843141" : {
		url: 'http://foodily.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828403" : {
		url: 'http://fotocasa.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.fotocasa.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843142" : {
		url: 'http://foxnewsinsider.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828354" : {
		url: 'http://gazeta.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.gazeta.pl")>-1 && hasViewportMeta()}]
	},
	"855450" : {
		url: 'http://globovision.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"804744" : {
		url: 'http://google.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804723" : {
		url: 'http://google.ro',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827628" : {
		url: 'http://groupon.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.groupon.com.br")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"866577" : {
		url: 'http://h5.qq.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("info.3g.qq.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878264" : {
		url: 'http://haber.ba',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.haber.ba")>-1 && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"827633" : {
		url: 'http://hao123.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.hao123.com")>-1 && hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://harrypotter.wikia.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878640" : {
		url: 'http://hootsuite.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878234" : {
		url: 'http://hvg.hu',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878266" : {
		url: 'http://i-dizajn.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884852" : {
		url: 'http://icanhas.cheezburger.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"786065" : {
		url: 'http://ig.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828392" : {
		url: 'http://infojobs.net',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.infojobs.net")>-1 && hasViewportMeta()}]
	},
	"828371" : {
		url: 'http://ingbank.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("lajt.ingbank.pl")>-1 && hasViewportMeta()}]
	},
	"828401" : {
		url: 'http://ingdirect.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ingdirect.es")>-1 && hasViewportMeta()}]
	},
	"843200" : {
		url: 'http://iphonejuegosgratis.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878236" : {
		url: 'http://jofogas.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.jofogas.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878268" : {
		url: 'http://jutarnji.hr',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"878238" : {
		url: 'http://koponyeg.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.koponyeg.hu")>-1 && hasViewportMeta()}]
	},
	"878271" : {
		url: 'http://kurir-info.rs',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878240" : {
		url: 'http://kuruc.info',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.kuruc.info")>-1}]
	},
	"827576" : {
		url: 'http://lancenet.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.lancenet.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828428" : {
		url: 'http://lapatilla.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828441" : {
		url: 'http://laverdad.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826517" : {
		url: 'http://letras.mus.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.letras.mus.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826348" : {
		url: 'http://linkedin.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("touch.www.linkedin.com")>-1 && hasViewportMeta()}]
	},
	"761177" : {
		url: 'http://live.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"761177" : {
		url: 'http://live.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878273" : {
		url: 'http://livescore.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828416" : {
		url: 'http://loteriasyapuestas.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.loteriasyapuestas.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828416" : {
		url: 'http://loteriasyapuestas.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.loteriasyapuestas.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"816500" : {
		url: 'http://m.assuta.co.il',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"888207" : {
		url: 'http://m.atrapalo.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.atrapalo.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827622" : {
		url: 'http://m.bing.com/maps',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"888209" : {
		url: 'http://m.bumeran.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bumeran.com.co")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888701" : {
		url: 'http://m.cinecolombia.com/movil/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && hasMobileOptimizedMeta() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"784450" : {
		url: 'http://m.cnet.com/news/android-key-lime-pie-most-wanted-features-video/57582545',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cnet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"876870" : {
		url: 'http://m.danner.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"755100" : {
		url: 'http://m.dictionary.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"876423" : {
		url: 'http://m.economist.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884240" : {
		url: 'http://m.europapress.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.europapress.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"886121" : {
		url: 'http://m.fool.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://m.google.com/plus',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"790193" : {
		url: 'http://m.inc.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"884264" : {
		url: 'http://m.nydailynews.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"887739" : {
		url: 'http://m.ofeminin.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ofeminin.pl")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"729556" : {
		url: 'http://m.photobucket.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"888706" : {
		url: 'http://m.plus.pl/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.plus.pl")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"842184" : {
		url: 'http://m.thestar.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827626" : {
		url: 'http://magazineluiza.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.magazineluiza.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://mail.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://mail.google.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"804710" : {
		url: 'http://map.wap.soso.com/x/?icfa=1311045&sid=AeKw29zcAD3dkE1EYFFeUuQ6&g_ut=3&biz=newHome',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://maps.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827678" : {
		url: 'http://marca.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843124" : {
		url: 'http://maruccisports.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827661" : {
		url: 'http://mercadolibre.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878642" : {
		url: 'http://mercadolibre.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828425" : {
		url: 'http://mercadolibre.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826342" : {
		url: 'http://mercadolivre.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884863" : {
		url: 'http://mobile.reuters.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"878275" : {
		url: 'http://mondo.rs',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.mondo.rs")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"828369" : {
		url: 'http://money.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.money.pl")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843112" : {
		url: 'http://movil.bankinter.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"826347" : {
		url: 'http://msn.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("t.no.msn.com")>-1 && hasViewportMeta()}]
	},
	"887684" : {
		url: 'http://muyahorro.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878277" : {
		url: 'http://naslovi.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843154" : {
		url: 'http://nba.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mi.nba.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878242" : {
		url: 'http://nemzetisport.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.nemzetisport.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"766983" : {
		url: 'http://netflix.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("secure.netflix.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887294" : {
		url: 'http://netvibes.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.netvibes.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843134" : {
		url: 'http://news.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"891873" : {
		url: 'http://news.google.es',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"" : {
		url: 'http://nfl.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828364" : {
		url: 'http://nk.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.nk.pl")>-1 && hasViewportMeta()}]
	},
	"878244" : {
		url: 'http://nlcafe.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.nlcafe.hu")>-1 && hasViewportMeta()}]
	},
	"886125" : {
		url: 'http://nme.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826715" : {
		url: 'http://noticias.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828356" : {
		url: 'http://o2.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826720" : {
		url: 'http://olx.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.br")>-1 && hasViewportMeta()}]
	},
	"827672" : {
		url: 'http://olx.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.co")>-1 && hasViewportMeta()}]
	},
	"878645" : {
		url: 'http://olx.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.mx")>-1 && hasViewportMeta()}]
	},
	"828433" : {
		url: 'http://olx.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.ve")>-1 && hasViewportMeta()}]
	},
	"828406" : {
		url: 'http://orange.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.orange.es")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843156" : {
		url: 'http://orbitz.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"828414" : {
		url: 'http://paginasamarillas.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.paginasamarillas.es")>-1 && hasViewportMeta()}]
	},
	"827625" : {
		url: 'http://pagseguro.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.pagseguro.uol.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"729556" : {
		url: 'http://photobucket.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878242" : {
		url: 'http://port.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878249" : {
		url: 'http://portfolio.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.portfolio.hu")>-1 && hasViewportMeta()}]
	},
	"878251" : {
		url: 'http://profession.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828422" : {
		url: 'http://publico.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.publico.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828422" : {
		url: 'http://publico.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.publico.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826510" : {
		url: 'http://r7.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.r7.com")>-1 && hasViewportMeta()}]
	},
	"766976" : {
		url: 'http://reddit.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878653" : {
		url: 'http://redstarbelgrade.info',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878653" : {
		url: 'http://redstarbelgrade.info/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884863" : {
		url: 'http://reuters.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"828435" : {
		url: 'http://rincondelvago.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827668" : {
		url: 'http://scribd.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"890871" : {
		url: 'http://shop.mango.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"884880" : {
		url: 'http://skinnyvscurvy.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843181" : {
		url: 'http://slashgear.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827666" : {
		url: 'http://slideshare.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878284" : {
		url: 'http://softonic.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.softonic.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"804710" : {
		url: 'http://soso.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828360" : {
		url: 'http://sport.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.sport.pl")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828408" : {
		url: 'http://stackoverflow.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"734359" : {
		url: 'http://stumbleupon.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828374" : {
		url: 'http://tablica.pl',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827623" : {
		url: 'http://tam.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884895" : {
		url: 'http://theawesomer.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843183" : {
		url: 'http://thechive.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843174" : {
		url: 'http://thinkgeek.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804726" : {
		url: 'http://tmall.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.tmall.com")>-1 && hasViewportMeta()}]
	},
	"843121" : {
		url: 'http://tor.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828362" : {
		url: 'http://tvn24.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"709241" : {
		url: 'http://twitter.com',
		 ua: "FirefoxAndroid",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843178" : {
		url: 'http://txt2nite.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878649" : {
		url: 'http://univision.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("movil.univision.com")>-1 && hasViewportMeta()}]
	},
	"826715" : {
		url: 'http://uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bol.uol.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843162" : {
		url: 'http://urbanspoon.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827630" : {
		url: 'http://vagalume.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vagalume.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878253" : {
		url: 'http://vatera.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vatera.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878655" : {
		url: 'http://vesti-online.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vesti-online.com")>-1 && hasViewportMeta()}]
	},
	"828394" : {
		url: 'http://vimeo.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"887856" : {
		url: 'http://wap.ratp.fr',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"876311" : {
		url: 'http://weather.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.weather.com")>-1 && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"827573" : {
		url: 'http://webmotors.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://wikia.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"763518" : {
		url: 'http://wikipedia.org',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828351" : {
		url: 'http://wp.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wp.pl")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"766967" : {
		url: 'http://www.bbc.co.uk/iplayer/radio',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"827622" : {
		url: 'http://www.bing.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"899541" : {
		url: 'http://www.blackberry.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828420" : {
		url: 'http://www.booking.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843168" : {
		url: 'http://www.cheaptickets.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"784450" : {
		url: 'http://www.cnet.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cnet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843132" : {
		url: 'http://www.comunio.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.comunio.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"848854" : {
		url: 'http://www.deadline.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"828403" : {
		url: 'http://www.fotocasa.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.fotocasa.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884280" : {
		url: 'http://www.giantbomb.com/videos/quick-look-the-last-of-us/2300-7467/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/ && document.getElementsByTagName('video').length>0}]
	},
	"826335" : {
		url: 'http://www.globo.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://www.google.com/finance?q=NASDAQ:GOOG',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"860668" : {
		url: 'http://www.huffingtonpost.co.uk/mobileweb/slideshow/3053015/291140/?icid=hp_uk-comedy_gallery',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828401" : {
		url: 'http://www.ingdirect.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ingdirect.es")>-1 && hasViewportMeta()}]
	},
	"826348" : {
		url: 'http://www.linkedin.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("touch.www.linkedin.com")>-1 && hasViewportMeta()}]
	},
	"826342" : {
		url: 'http://www.mercadolivre.com.br/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"890864" : {
		url: 'http://www.mibebeyyo.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"888708" : {
		url: 'http://www.msz.gov.pl/en/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"823604" : {
		url: 'http://www.nextbus.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843137" : {
		url: 'http://www.nytimes.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"815823" : {
		url: 'http://www.ocn.ne.jp',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828406" : {
		url: 'http://www.orange.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.orange.es")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"" : {
		url: 'http://www.pinterest.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"" : {
		url: 'http://www.pressly.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"890842" : {
		url: 'http://www.rumbo.es/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878649" : {
		url: 'http://www.univision.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("movil.univision.com")>-1 && hasViewportMeta()}]
	},
	"843162" : {
		url: 'http://www.urbanspoon.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878655" : {
		url: 'http://www.vesti-online.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vesti-online.com")>-1 && hasViewportMeta()}]
	},
	"826338" : {
		url: 'http://www.yahoo.com/?m=sp',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843116" : {
		url: 'http://wwwhatsnew.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828366" : {
		url: 'http://wyborcza.biz',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wyborcza.biz")>-1 && hasViewportMeta()}]
	},
	"828378" : {
		url: 'http://wyborcza.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wyborcza.pl")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826338" : {
		url: 'http://yahoo.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"826338" : {
		url: 'http://yahoo.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878286" : {
		url: 'http://yandex.ru',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"766941" : {
		url: 'http://yelp.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"890873" : {
		url: 'http://yfrog.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827636" : {
		url: 'http://youtube.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843172" : {
		url: 'http://zimbio.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.zimbio.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878640" : {
		url: 'https://hootsuite.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"815913" : {
		url: 'https://m.facebook.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843112" : {
		url: 'https://movil.bankinter.es/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'https://plus.google.com/?hl=es&partnerid=gplp0',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"821021" : {
		url: 'https://www.evernote.com/m/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'https://www.google.com/m?search?ie=UTF-8&oe=utf-8&q=test',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
    "749583" : {
		url: 'http://asana.com/product',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"798780" : {
		url: 'http://m.aukro.cz/',
		 ua: "FirefoxOS",
		steps:[function(){return hasMobileOptimizedMeta() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"755800" : {
		url: 'http://etsy.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"921556" : {
		url: 'http://taobao.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.taobao.com")>-1 && hasViewportMeta()}]
	},
	"804716" : {
		url: 'http://mobile.reuters.com/do/urlRedirect?URL=http%3A%2F%2Fwww.reuters.com/finance/stocks/OPERA.OL/key-developments/article/2388763?',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.reuters.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"743696" : {
		url: 'http://m.comcast.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"753985" : {
		url: 'http://www.gilt.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.gilt.com")>-1 && hasViewportMeta()}]
	},
	"855777" : {
		url: 'http://yfrog.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"733791" : {
		url: 'http://www.ehow.com/slideshow_12290215_smitten-kittens-learn-care-basics.html',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "901569" : {
		url: 'http://ajw.asahi.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"795088" : {
		url: 'http://m.mapy.cz/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"762975" : {
		url: 'http://www.walmart.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.walmart.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"733791" : {
		url: 'http://ehow.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"899748" : {
		url: 'http://www.setbeat.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.setbeat.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"717516" : {
		url: 'http://m.porsche.com/usa/models/cayenne/cayenne-s/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"754404" : {
		url: 'http://www.starbucks.com/store-locator',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"785374" : {
		url: 'http://www.national-lottery.co.uk/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.national-lottery.co.uk")>-1 && hasViewportMeta()}]
	},
	"791520" : {
		url: 'http://www.letschat.pro/mobile/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878132" : {
		url: 'http://www.foursquare.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"867403" : {
		url: 'http://www.yahoo.com/?m=sp',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"804709" : {
		url: 'http://stumbleupon.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804720" : {
		url: 'http://scribd.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "757247" : {
		url: 'http://m.wat.tv',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wat.tv")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"900617" : {
		url: 'http://www.despegar.com.ve/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.despegar.com.ve")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "878232" : {
		url: 'http://hazipatika.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.hazipatika.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878246" : {
		url: 'http://port.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878255" : {
		url: 'http://24sata.hr',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.24sata.hr")>-1 && hasViewportMeta()}]
	},
    "876357" : {
		url: 'http://m.economist.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "804729" : {
		url: 'http://harrypotter.wikia.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "759729" : {
		url: 'http://overstock.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "794622" : {
		url: 'http://www.sport.cz/fotbal/evropske-ligy/clanek/435450-video',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.sport.cz")>-1 && hasViewportMeta()}]
	},
    "935469" : {
		url: 'http://www.veoh.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"935475" : {
		url: 'http://www.metacafe.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"935913" : {
		url: 'http://desktopvideo.about.com/od/watchingonlinevideo/a/watchonline.htm',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888733" : {
		url: 'http://www.crunchyroll.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.crunchyroll.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"936433" : {
		url: 'http://www.readingrockets.org/shows/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.readingrockets.org")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"936467" : {
		url: 'http://www.news10.net/video/liveonline/default.aspx',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"936474" : {
		url: 'http://tv.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "935898" : {
		url: 'http://www.usopen.org/en_US/interactive/video/live.html',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"935899" : {
		url: 'http://www.cwtv.com/cw-video/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cwtv.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	}
}

// merge automated tests into bugdata
for(var bug in automated_tests){
    if(!(bug in bugdata))bugdata[bug] = automated_tests[bug];
}

// populate hosts object
for(var bug in bugdata){
    var match, host;
    if(match = bugdata[bug].url.match(/https?:\/\/([^\/]*)/)){
        host = match[1];
        /* drop certain prefixes */
        if( /^www\./.test(host) )host = host.replace(/^www\./, '');
        if( /^m\./.test(host) )host = host.replace(/^m\./, '');
        if(!hosts[host])hosts[host] = [];
        hosts[host].push(bug);
    }
}

// looks for <meta name="HandheldFriendly" content="true">
function hasHandheldFriendlyMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/HandheldFriendly/i.test(el.getAttribute('name')) && /true/.test(el.getAttribute('content')))return true;
    }
    return false;
}
// looks for <meta name="viewport"
function hasViewportMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/viewport/i.test(el.getAttribute('name')))return true;
    }
    return false;
}
// looks for <meta name="MobileOptimized" content="width">
function hasMobileOptimizedMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/MobileOptimized/i.test(el.getAttribute('name')) && /(width)/.test(el.getAttribute('content')))return true;
    }
    return false;
}
// Check if there is a SCRIPT src or LINK href that contains the word "mobile"
function mobileLinkOrScriptUrl(str){
    str = str || 'mobile';
    for(var i=0,el; el=document.scripts[i];i++){if(el.src&&el.src.indexOf(str)>-1){return true;}}
    for(var i=0,el,elms=document.getElementsByTagName('link'); el=elms[i];i++){if(el.href&&el.href.indexOf(str)>-1){return true;}}
    return false;
}
function hasVideoTags(){
    return !!document.getElementsByTagName('video').length;
}
function noWapContentPlease(response){
    var contentType;
    for(var prop in response.headers){
        if(/content-type/i.test(prop))contentType = response.headers[prop];
    }
    return contentType && ! (/application\/vnd\.wap\.xhtml\+xml/i.test(contentType));
}
// Util method used for -webkit- CSS issues.
// Scenario: in a style sheet, we find .foo{-webkit-bar:xxx} .foo2{-webkit-bar:xxx}
// this method can take arguments ['foo', 'foo2'] and ['-moz-bar', 'bar']
// check if class list matches some element in the page, if yes, check if
// computed style has '-moz-bar' or 'bar' methods defined
// could also loop through CSSOM but we'd run into lots of cross-domain
// protections for CDN-hosted style sheets, so it's better (although slower) to look at elements
// and computed styles
// Passes if *one* of the class names contains *one* of the properties. Use with care :)
function cssCheck(classNameList, propertiesThatMustExist){
    var cssFalseishStuff = {'':1, 'none':1, 'auto': 1}
    for(var cn, i=0; cn=classNameList[i]; i++){
        for(var elms = document.getElementsByClassName(cn), j=0, el; el=elms[j]; j++){
            var style = getComputedStyle(el,null);
            for(var k=0, prop; prop = propertiesThatMustExist[k]; k++){
                if( typeof style[k] === string && ! ( style[k] in cssFalseishStuff) )return true;
            }
        }
    }
    return false;
}
