var hosts = {};
/*
,
    '' : {
        url:'',
        ua:'',
        steps:[function(){return }]
    },


*/
var bugdata = {
    "957517": {
        "url": "http://smart.mail.163.com", 
        "steps": [function(){}, /*js redirect on first page, wait for next load*/
            function(){return hasViewportMeta() && location.hostname === "smart.mail.163.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "smart.mail.163.com - some odd rendering on login page"
    }, 
    "878224" : {
        url: 'http://badoo.com',
         ua: "FirefoxOS",
         /* "not desktop" -test*/
        steps:[function(){return document.getElementById('footwrap')==null}]
    },
    "887224" : {
        url: 'http://elmundo.es/movil2',
         ua: "FirefoxOS",
        steps:[function(){return (mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/) || document.getElementById('popup-cambio-version') != null }]
    },
    "933439": {
        "url": "http://grooveshark.com/", 
        "steps": [
            function(){return location.hostname.indexOf('mobile')>-1 || location.hostname.indexOf('html5')>-1;}
        ], 
        "ua": "FirefoxOS", 
        "title": "grooveshark.com doesn't recognize B2G as mobile"
    }, 
    "755800" : {
        url: 'http://etsy.com',
         ua: "FirefoxOS",
        steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
    },
    "933642": {
        "url": "http://www.mysmartprice.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl() && location.pathname.indexOf('m/')>-1;}
        ], 
        "ua": "FirefoxOS", 
        "title": "mysmartprice.com isn't redirecting to mobile site on Firefox OS"
    },
    "933652": {
        "url": "http://gaana.com/", 
        "steps": [
            function(){return location.hostname === 'touch.gaana.com';}
        ], 
        "ua": "FirefoxOS", 
        "title": "gaana.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "935895": {
        "url": "http://uk.eonline.com", 
        "steps": [
            function(){return location.hostname === "eprotoeu.mtiny.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "uk.eonline.com sends desktop content"
    },
    "794100": { /* TODO: why does this give a false pass? */
        "url": "http://support.brightcove.com/en/docs/video-test-html-5", 
        "steps": [
            function(){for (var i = 0; i < document.links.length; i++) {
                if(document.links[i].href.indexOf('adobe.com/go/getflash')>-1)return false;
            }; return true;}
        ], 
        "ua": "FirefoxOS", 
        "title": "h264 video player (Brightcove) is busted on non-flash enabled FF Android or FF OS"
    },
    "935657": {
        "url": "http://wfp.to/vKc", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "wfp is blocking Gecko/25 (bad behavior framework)"
    }, 

    "732355": {
        "url": "http://m.flickr.com/photos/gen/2592947296/lightbox", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){try{return document.querySelector('div.img').style.backgroundImage != '';}catch(e){return 'delay-and-retry';};}
        ], 
        "title": "Photos are not displayed in photo slideshows at flickr.com"
    }, 
    "957846": {
        "url": "http://wap.2kk.mobi", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementsByClassName('header').length>0;}
        ], 
        "title": "wap.2kk.mobi sends desktop site to Firefox OS"
    }, 
    "957596": {
        "url": "http://m.xiangha.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return getComputedStyle(document.querySelector('nav ul'),'').display === 'flex';}
        ], 
        "title": "m.xiangha.com - broken rendering of navigation menu"
    }, 
    "960429": {
        "url": "http://seesaa.net", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.pathname.indexOf('s/')>-1 || hasViewportMeta()}
        ], 
        "title": "seesaa.net / blog.seesaa.jp sends desktop site to Firefox OS"
    }, 
    "933645": {
        "url": "http://timesofindia.com/", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.hostname == 'm.timesofindia.com'}
        ], 
        "title": "timesofindia.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "960451": {
        "url": "http://okwave.jp", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementsByClassName('spn_induce_new').length > 0}
        ], 
        "title": "okwave.jp shows a banner for switching to mobile site to other mobile browsers, not to Firefox OS"
    }, 
    "775919": {
        "url": "http://www.bbc.co.uk/iplayer/radio", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return !/Not Supported/i.test(document.title)}
        ], 
        "title": "BBC iPlayer does not detect the Firefox UA"
    }, 
    "959468": {
        "url": "http://m.self.com.cn", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){if(document.querySelector('.nav-panel section p'))return getComputedStyle(document.querySelector('.nav-panel section p'),'').display === 'flex'; }
        ], 
        "title": "m.self.com.cn has layout issues in Firefox OS"
    }, 
    "931822": {
        "url": "http://www.skai.gr", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.pathname.indexOf('mobile')>-1}
        ], 
        "title": "skai.gr doesn't redirect to mobile site on Firefox OS"
    },
    "957590": {
        "url": "http://weather1.sina.cn", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.search.indexOf('vt=1')==-1;}
        ], 
        "title": "weather1.sina.cn sends simplified mobile page to Firefox OS"
    }, 
    "957827": {
        "url": "http://wap.elong.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){}, /*give the JS time to run and possibly redirect*/
            function(){return location.hostname=='m.elong.com';}
        ], 
        "title": "wap.elong.com does not automatically redirect to m.elong.com"
    }, 
    "942305": {
        "url": "http://www.redbus.in/", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.pathname.indexOf('mob')>-1}
        ], 
        "title": "redbus.in isn't redirecting to mobile site on Firefox OS"
    }, 
    "937477": {
        "url": "http://www.dafiti.com.br", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.hostname == 'm.dafiti.com.br'}
        ], 
        "title": "dafiti.com.br doesn't recognize B2G UA as mobile"
    },
    "957956": {
        "url": "http://book.easou.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.scripts.length>1}
        ], 
        "title": "book.easou.com sends simplified mobile page to Firefox OS and Firefox on Android"
    }, 
    "960026": {
        "url": "http://tripadvisor.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementById('carouselWrapper')!=null}
        ], 
        "title": "tripadvisor.com sends simplified mobile site to Firefox OS"
    },
    "960022": {
        "url": "http://fin24.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementsByClassName('relative').length>3}
        ], 
        "title": "fin24.com sends simplified site to Firefox OS"
    }, 
    "960019": {
        "url": "http://supersport.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.hostname.indexOf('mobi.supersport')>-1 }
        ], 
        "title": "supersport.com sends desktop site to Firefox OS"
    }, 
    "959498": {
        "url": "http://m.caixin.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.body.getElementsByTagName('*').length>0 }
        ], 
        "title": "m.caixin.com javascript sniffer shows blank page in Firefox OS"
    }, 
    "754750": {
        "url": "http://www.google.com/m/finance", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementById('markets-summary')!=null}
        ], 
        "title": "Google Finance - Suboptimal site, not optimized site renders on Fennec Native Due to UA sniffing"
    }, 
    "679025": {
        "url": "http://www.google.com/finance?q=NASDAQ:GOOG", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementById('markets-summary')!=null}
        ], 
        "title": "finance.google.com presents null error on initial load"
    },
    "959137": {
        "url": "http://bendi.m.taobao.com/coupon/q/index.htm", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return document.getElementsByClassName('shop-item').length > 0}
        ], 
        "title": "bendi.m.taobao.com coupon site never finishes loading, assumes global event variable in event handler"
    }, 
    "948926": {
        "url": "https://touch.groupon.com/login", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return /gradient/.test(getComputedStyle(document.getElementsByTagName('header')[0],'').background)}
        ], 
        "title": "Groupon login page is white washed"
    }, 
    "890871": {
        "url": "http://shop.mango.com/", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.pathname.indexOf('mobile')>-1}
        ], 
        "title": "shop.mango.com doesn't display mobile site in Gaia browser"
    }, 
    "959146": {
        "url": "http://zuoche.com/m/", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.pathname.indexOf('touch')>-1}
        ], 
        "title": "zuoche.com/m/ sends simplified site to Firefox OS"
    }, 
    "887788": {
        "url": "http://starmedia.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.hostname=='m.starmedia.com'}
        ], 
        "title": "m.starmedia.com doesn't display correctly in Gaia browser"
    }, 
    "945958": {
        "url": "http://music.baidu.com/", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "title": "music.baidu.com serves desktop content to Firefox OS"
    }, 
    "957527": {
        "url": "http://m.qzone.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){}, /* first page redirects elsewhere.. */
            function(){return getComputedStyle(document.querySelector('.dl-guide header'), '').backgroundSize != 'auto auto'}
        ], 
        "title": "m.qzone.com login page - background to large, makes header messy"
    },
    "956915": { // TODO: for some reason the failure doesn't occur with SlimerJS..
        "url": "http://thedailybanter.com", 
        "ua": "FirefoxAndroid", 
        "steps": [
            function (argument) {
                /* delay until after doc.write..? */
            },
            function(){return document.body.firstChild.textContent.indexOf('load:function')==-1}
        ], 
        "title": "thedailybanter.com does not work in Firefox for Android"
    }, 
    "793216": {
        "url": "http://images.google.com/", 
        "ua": "FirefoxAndroidTablet", 
        "steps": [
            function(){
                if(window._moz_793216_clicked){
                    return window._moz_transform_was_set;
                }
                window._moz_transform_was_set=false; 
                CSS2Properties.prototype.__defineSetter__('-moz-transform', function(str){window._moz_transform_was_set=true;});
                for(var i=0;i<document.links.length;i++)if(document.links[i].href.indexOf('imgrefurl')>-1){document.links[i].click();break;}
                window._moz_793216_clicked = true;
                return 'delay-and-retry';
            }
        ], 
        "title": "images.google.com image single view carrousel is stacked on tablet"
    }, 
    "958930": {
        "url": "http://u.web2go.com/upsell/getpasses.do?pcat=ILT&rorigin=100INTLPassr", 
        "ua": "FirefoxAndroid", 
        "steps": [
            function(){return document.title.indexOf('Error 400')==-1}
        ], 
        "title": "T-Mobile international data-upgrade site serves 400 to any UA with \"Firefox\" token"
    },
    "940313": {
        "url": "http://m.mtv.com/videos/video.rbml?id=mgid:uma:video:mtv.com:968635&source=musicvideos", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){if(!document.getElementById('video-player'))return 'delay-and-retry'},
            function(){return document.getElementById('video-player').getElementsByTagName('iframe').length>0;}
        ], 
        "title": "mtv.com: No video in Firefox OS or Firefox on Android"
    }, 
    "961964": {
        "url": "http://usatoday.com", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() }
        ], 
        "title": "usatoday.com serves desktop version to Firefox OS"
    },
    "931849": {
        "url": "http://www.real.gr", 
        "ua": "FirefoxOS", 
        /* Note: Client-side sniffing involved, this script risks running too early.. */
        "steps": [function(){ /*ignore first page load, wait for navigation..*/ },function(){return location.hostname.indexOf('realmobile.gr')>-1}]
    }, 
    "935946": {
        "url": "http://webtv.un.org", 
        "ua": "FirefoxOS", 
        "steps": [function(){if(document.getElementsByClassName('BrightcoveExperience')[0])return 'delay-and-retry';},
         function () { for (var i = document.links.length - 1; i >= 0; i--) {
            if(document.links[i].href.indexOf('adobe.com/go/getflash/')>-1)return false;
        }; return true;}]
    },

    "958510": {
        "url": "https://www.tripcase.com", 
        "ua": "FirefoxOS", 
        "steps": [function(){return hasViewportMeta() && location.hostname === "www.tripcase.com" && mobileLinkOrScriptUrl();}]
    }, 
    "931989": {
        "url": "http://www.weather.gr", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return mobileLinkOrScriptUrl() /*regression test*/}
        ], 
        "title": "weather.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "931914": {
        "url": "http://www.ricardo.gr", 
        "ua": "FirefoxOS", 
        "steps": [
            function(){return location.hostname.indexOf('m.ricardo')>-1 /*regression test*/}
        ], 
        "title": "ricardo.gr doesn't redirect to mobile site on Firefox OS"
    },
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
            if(!elm)return 'delay-and-retry';
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
		url: 'http://www.bravestman.com',
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
        steps:[function(){ return document.scripts.length > 5; }]
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
        steps:[function(){ try{unsafeWindow.$(".zse-photo-thumbs a").photoSwipe();return document.getElementsByClassName('ui-icon-loading').length===0;}catch(e){if(e.message == "e.navigator.userAgent.match(...) is null")return false;} return 'indeterminate'; }]
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
		steps:[function(){return location.hostname.indexOf('mobile.nytimes')>-1 || document.getElementById('mobileBanner')!=null;}]
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
		steps:[function(){return document.getElementsByTagName('video').length>0 && document.getElementsByTagName('video')[0].currentSrc != '' ; }]
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
		steps:[function(){ var token = decodeURIComponent(document.body.textContent.match(/TOKEN=([^&]*)/)[1]); alert(location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout-mobile&token="+token); }, function(){ if(location.hostname.indexOf('www.sandbox')==-1)return 'delay-and-retry'; return location.href.indexOf('cmd=_express-checkout-mobile')>-1 }]
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
        /* this test is no longer directly testing the issue, because the page is redesigned.. */
        steps: [function(){ return document.body.id === 'mobilehomepage';}]
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
		 ua: "FirefoxOS1.1",
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
/*	"878640" : {
		url: 'http://hootsuite.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},*/
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
		 ua: "FirefoxAndroid",
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
		steps:[function(){return hasViewportMeta()}]
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
	"968422" : {
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
		steps:[function(){return hasViewportMeta()}]
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
		 ua: "FirefoxAndroid",
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
	"799881" : {
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
		steps:[function(){return hasViewportMeta()}]
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
	"799884" : {
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
    "966184" : {
        url: 'http://www.national-lottery.co.uk/',
         ua: "FirefoxOS",
        steps:[function(){return location.hostname.indexOf("m.national-lottery.co.uk")>-1 && hasViewportMeta()}]
    },
	"785374" : {
		url: 'http://www.national-lottery.co.uk/',
		 ua: "FirefoxAndroid",
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
    "968073" : {
        url: 'http://overstock.com',
         ua: "FirefoxOS",
        steps:[function(){return hasViewportMeta()}]
    },
    "759729" : {
		url: 'http://overstock.com',
		 ua: "FirefoxAndroid",
		steps:[function(){return hasViewportMeta()}]
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
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && hasViewportMeta()}]
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
	},
    "931919": {
        "url": "http://redplanet.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.redplanet.gr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "redplanet.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "931929": {
        "url": "http://aegeanair.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.aegeanair.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "aegeanair.com doesn't redirect to mobile site on Firefox OS"
    }, 
    "957457": {
        "url": "http://mp3.3g.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "mp3.3g.cn sends WAP page"
    }, 
    "784478": {
        "url": "http://m.taobao.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "taobao.com serves basic mobile site to Firefox for Android"
    }, 
    "932007": {
        "url": "http://www.techgear.gr", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "techgear.gr doesn't show mobile design on Firefox OS"
    },
    "931901": {
        "url": "http://www.pathfinder.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "i.pathfinder.gr";}
        ], 
        "ua": "FirefoxOS"
    }, 
    "957440": {
        "url": "http://sina.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr"
    }, 
    "958495": {
        "url": "https://www.tripit.com", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS"
    },
    "934120": {
        "url": "http://www.mediamarkt.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mediamarkt.gr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "mediamarkt.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "944466": {
        "url": "http://www.tokyoartbeat.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "tokyoartbeat.com sends desktop content to Firefox OS"
    }, 
    "960825": {
        "url": "http://weblio.jp", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "weblio.jp sends desktop site to Firefox OS"
    }, 
    "940341": {
        "url": "http://www.mylifetime.com/video", 
        "steps": [
            function(){return hasVideoTags();}
        ], 
        "ua": "FirefoxOS", 
        "title": "mylifetime.com doesn't create video player on Firefox OS"
    }, 
    "932012": {
        "url": "http://www.airtickets.gr", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "airtickets.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "958708": {
        "url": "http://wapc.mlb.com/play?c_id=mlb", 
        "steps": [
            function(){return hasVideoTags();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.mlb.com - issues with video playback in Fennec and B2G"
    }, 
    "940325": {
        "url": "http://www.hulu.com", 
        /* Note: locales matter for this site.. Doesn't serve videos anywhere.. */
        "steps": [
            function(){return hasVideoTags() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "hulu.com: Firefox OS gets desktop version"
    }, 
    "957476": {
        "url": "http://wap.3ggpw.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wap.3ggpw.cn sends WAP page"
    }, 
    "960826": {
        "url": "http://gnavi.co.jp", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.gnavi.co.jp";}
        ], 
        "ua": "FirefoxOS", 
        "title": "gnavi.co.jp sends desktop site to Firefox OS"
    }, 
    "946380": {
        "url": "http://www.orange.fr/", 
        "steps": [
            function(){return location.hostname.indexOf('mobile')>-1;}
        ], 
        "ua": "FirefoxOS", 
        "title": "orange.fr serves desktop content to Firefox for Android and Firefox OS"
    },
    "944782": {
        "url": "http://www.weather.com/", 
        "steps": [
            function(){return location.hostname === "mw.weather.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "weather.com sends desktop content to Firefox OS"
    }, 
    "946737": {
        "url": "https://medium.com/cool-code-pal/cf72b588b1b", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Medium.com doesn't display comment callouts in Fennec"
    }, 
    "957043": {
        "url": "http://mixi.jp/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "mixi.jp sends the desktop version for Firefox on Mobile"
    }, 
    "944741": {
        "url": "http://tiff.net/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "tiff.net delivers desktop content to firefox OS"
    }, 
    "899541": {
        "url": "http://www.blackberry.com/", 
        "steps": [
            function(){return location.hostname === "m.blackberry.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "blackberry.com main site does not recognize Firefox OS"
    }, 
    "944767": {
        "url": "http://www.instructables.com/", 
        "steps": [
            function(){return location.hostname === "m.instructables.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Instructables interstitial \"get the app\" page has unclickable link"
    }, 
    "942739": {
        "url": "http://labanquepostale.mobi", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "labanquepostale.mobi sends invalid mobile content to FirefoxOS"
    }, 
    "784463": {
        "url": "https://www.bankofamerica.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Clicking Mobile Banking Sign In on BOA site redirects to non mobile site"
    }, 
    "959106": {
        "url": "http://hexin.cn", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "hexin.cn";}
        ], 
        "ua": "FirefoxOS", 
        "title": "hexin.cn sends Firefox OS simplified page"
    }, 
    "959117": {
        "url": "http://m.sogou.com", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.sogou.com sends simplified site to Firefox OS"
    }, 
    "959125": {
        "url": "http://m.hao123.com", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.hao123.com sends simplified site to Firefox OS"
    }, 
    "958924": {
        "url": "http://my.yahoo.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "my.yahoo doesn't serve tier1 on Firefox OS and Firefox Android"
    },
    "760559": {
        "url": "http://www.google.com/flights", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Google Flight Search: Offered Desktop over Mobile content"
    }, 
    "959141": {
        "url": "http://www.lvmama.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.lvmama.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.lvmama.com sends desktop site to Firefox OS"
    }, 
    "959133": {
        "url": "http://wap.soso.com", 
        "steps": [
            function(){return hasMobileOptimizedMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "wap.soso.com sends simplified mobile site"
    }, 
    "934857": {
        "url": "http://www.txu.com/", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "TXU Energy website sends Firefox for Android a file with a WAP mime type"
    }, 
    "926475": {
        "url": "http://www.peruenvideos.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "peruenvideos.com doesn't display correctly in Gaia browser"
    }, 
    "945963": {
        "url": "http://tieba.baidu.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "tieba.baidu.com serves simplified mobile content to Firefox Android"
    }, 
    "920342": {
        "url": "http://newyork.schmap.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxAndroid", 
        "title": "Schmap blocks Firefox for Android users from using site"
    }, 
    "959475": {
        "url": "http://yicha.cn", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "page.yicha.cn";}
        ], 
        "ua": "FirefoxOS", 
        "title": "yicha.cn sends desktop site to Firefox OS"
    }, 
    "805664": {
        "url": "http://www.santander.com.br/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.santander.com.br";}
        ], 
        "ua": "FirefoxOS", 
        "title": "Redirect loop prevents access to Santander Brasil (Brazilian bank)"
    }, 
    "945954": {
        "url": "http://map.baidu.com/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "map.baidu.com serves a broken mobile site to Firefox Android"
    }, 
    "733920": {
        "url": "https://launchpad.37signals.com/basecamp/signin", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Basecamp renders a desktop site for fennec, where as in stock browser, a mobile-optimized app is rendered"
    }, 
    "942989": {
        "url": "http://www.lectio.dk/lectio/531/SkemaNy.aspx?type=elev&elevid=4541970184", 
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Lectio website does not work in Firefox for Android phone"
    }, 
    "959472": {
        "url": "http://m.joy.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "m.joy.cn / 3g.joy.cn sends WAP site to Firefox OS"
    }, 
    "944808": {
        "url": "http://www.bhphotovideo.com/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "bhphotovideo.com serves lo-fi mobile site to Firefox for Android and desktop site to Firefox OS"
    }, 
    "828380": {
        "url": "http://deser.pl/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.deser.pl";}
        ], 
        "ua": "FirefoxOS", 
        "title": "deser.pl doesn't recognize B2G UA as mobile"
    }, 
    "920466": {
        "url": "http://news.google.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Google news top menu hidden, due to display:-webkit-box style"
    }, 
    "942247": {
        "url": "http://kennedyandoswald.com", 
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags();}
        ], 
        "ua": "FirefoxOS", 
        "title": "NatGeo Kennedy promo site blocks Firefox for Android for not having Flash"
    }, 
    "932846": {
        "url": "http://rediff.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rediff.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "rediff.com isn't redirecting to mobile site on Firefox OS"
    },
    "957505": {
        "url": "http://vip.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.vip.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "vip.com sends Firefox OS to Desktop site"
    }, 
    "957500": {
        "url": "http://www.livedoor.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "livedoor.com / blog.livedoor.com delivers desktop content to Firefox OS"
    }, 
    "932892": {
        "url": "http://www.bhaskar.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bhaskar.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "bhaskar.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "957484": {
        "url": "http://wenwen.wap.soso.com/index.jsp", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wenwen.wap.soso.com sends WAP page"
    }, 
    "949284": {
        "url": "https://m.midflorida.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.midflorida.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "(Midflorida.com) - Sign-in input not visible in Gecko due to WebKit CSS styling"
    }, 
    "957482": {
        "url": "http://wap.ifeng.com/news/newsi?mid=25JIIr", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wap.ifeng.com sends WAP page"
    }, 
    "960018": {
        "url": "http://takealot.com", 
        "steps": [
            function(){return location.hostname === "m.takealot.com" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "takealot.com sends desktop site to Firefox OS"
    }, 
    "932876": {
        "url": "http://www.oneindia.in/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.oneindia.in";}
        ], 
        "ua": "FirefoxOS", 
        "title": "oneindia.in  isn't redirecting to mobile site"
    }, 
    "957453": {
        "url": "http://wap.lexun.com", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wap.lexun.com sends WAP page"
    }, 
    "957478": {
        "url": "http://3g.163.com/news/special/136/junshiindex.html", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "3g.163.com sends WAP page"
    }, 
    "957454": {
        "url": "http://tx.com.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "tx.com.cn sends WAP page"
    }, 
    "957474": {
        "url": "http://lady.3g.net.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "lady.3g.net.cn sends WAP page"
    }, 
    "957459": {
        "url": "http://novel.iask.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "novel.iask.cn sends WAP page"
    }, 
    "939035": {
        "url": "http://www.beyond.com", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "beyond.com sends desktop content to FirefoxOS"
    }, 
    "957472": {
        "url": "http://3g.pp.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "3g.pp.cn sends WAP page"
    }, 
    "957496": {
        "url": "http://wap.ireader.com/", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wap.ireader.com sends WAP page"
    }, 
    "754752": {
        "url": "http://books.google.com", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "Google Books - Desktop site renders on fennec native, not mobile site"
    }, 
    "932921": {
        "url": "http://www.airtel.in/forme/home", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.airtel.in";}
        ], 
        "ua": "FirefoxOS", 
        "title": "airtel.in isn't redirecting to mobile site on Firefox OS"
    }, 
    "959478": {
        "url": "http://wap.yuanlai.com/index.do;s=mpc8pilwzfnzhz1wocjj?uid=null&channelid=144&subchannelid=", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "wap.yuanlai.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "wap.yuanlai.com sends desktop site to Firefox OS"
    }, 
    "932901": {
        "url": "http://m.homeshop18.com/splash.html#/home.html", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.homeshop18.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.homeshop18.com redirects to Desktop site on Firefox OS"
    }, 
    "932907": {
        "url": "http://www.makemytrip.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.makemytrip.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "makemytrip.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "959489": {
        "url": "http://zhtao.cn", 
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "zhtao.cn sends simplified site to Firefox OS"
    }, 
    "957444": {
        "url": "http://news.3g.cn", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "news.3g.cn sends WAP page"
    }, 
    "959483": {
        "url": "http://m.ireader.com", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "m.ireader.com has navigation menu laid out vertically instead of horizontally"
    }, 
    "957462": {
        "url": "http://kong.net", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "kong.net sends WAP page"
    }, 
    "959481": {
        "url": "http://m.tieyou.com", 
        "steps": [
            function(){},/* js sniffing needs some time to run - a dummy function for the first load */
            function(){return hasViewportMeta() && location.hostname === "m.tieyou.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.tieyou.com sends desktop site to Firefox OS"
    }, 
    "957465": {
        "url": "http://wap.51.com", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "wap.51.com sends WAP page"
    }, 
    "957464": {
        "url": "http://www.youyuan.com/", 
        "steps": [
            noWapContentPlease
        ], 
        "ua": "FirefoxOS", 
        "testType": "xhr", 
        "title": "youyuan.com sends WAP page"
    },
    "959486": {
        "url": "http://voice.meiriyiwen.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "meiriyiwen.com sends desktop site to Firefox OS"
    },
    "960032": {
        "url": "http://wikihow.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.wikihow.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "wikihow.com sends desktop site to Firefox OS"
    }, 
    "960033": {
        "url": "http://webmail.co.za", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.webmail.co.za" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "webmail.co.za sends desktop site to Firefox OS"
    }, 
    "960031": {
        "url": "http://pnet.co.za", 
        "steps": [
            function(){return location.hostname === "m.pnet.co.za";}
        ], 
        "ua": "FirefoxOS", 
        "title": "pnet.co.za does not offer mobile site to Firefox OS"
    }, 
    "934124": {
        "url": "http://wap.abril.com.br", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "wap.abril.com.br HTML elements not rendered properly"
    }, 
    "960034": {
        "url": "http://safarinow.com", 
        "steps": [
            function(){return hasViewportMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "safarinow.com sends desktop site to Firefox OS"
    }, 
    "934126": {
        "url": "http://itau.com.br", 
        "steps": [
            function(){return location.hostname === "ww70.itau.com.br";}
        ], 
        "ua": "FirefoxOS", 
        "title": "itau.com.br tells me to download their app, if I touch this button I got redirected to their mobile page"
    }, 
    "934128": {
        "url": "http://www.americanas.com.br", 
        "steps": [
            function(){return location.hostname === "m.americanas.com.br" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.americanas.com.br doesn't open the mobile site on FirefoxOS"
    }, 
    "934105": {
        "url": "http://www.macuser.gr", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "macuser.gr doesn't show mobile design on Firefox OS"
    }, 
    "957970": {
        "url": "http://mt.hupu.com/nba", 
        "steps": [
            function(){return location.hostname === "mt.hupu.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "mt.hupu.com/nba redirects to simplified mobile site"
    }, 
    "900619": {
        "url": "http://lapatilla.com", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "lapatilla.com doesn't recognize B2G UA as mobile"
    }, 
    "957819": {
        "url": "http://m.qunar.com", 
        "steps": [
            function(){return location.hostname === "touch.qunar.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.qunar.com does not automatically redirect to touch.qunar.com"
    }, 
    "957602": {
        "url": "http://m.guahao.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.guahao.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.guahao.com sends Firefox OS to desktop site"
    }, 
    "960410": {
        "url": "http://dmm.co.jp", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "dmm.co.jp sends desktop site to Firefox OS"
    }, 
    "822793": {
        "url": "http://www.nzherald.co.nz/", 
        "steps": [
            function(){return location.hostname === "m.nzherald.co.nz" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "nzherald.co.nz should show the mobile version of the web page for b2g/gaia"
    }, 
    "933112": {
        "url": "http://www.yebhi.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.yebhi.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "yebhi.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "960035": {
        "url": "http://alibaba.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.alibaba.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "alibaba.com sends desktop site to Firefox OS"
    }, 
    "937472": {
        "url": "http://www.bomnegocio.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bomnegocio.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "bomnegocio.com doesn't recognize B2G UA as mobile"
    }, 
    "945430": {
        "url": "http://ups.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ups.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "http://ups.com gives the desktop site to B2G"
    }, 
    "937478": {
        "url": "http://www.band.uol.com.br/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "band.uol.com.br recognizes B2G UA as an iPhone"
    }, 
    "960001": {
        "url": "http://kalahari.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.kalahari.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "kalahari.com sends desktop site to Firefox OS"
    }, 
    "960021": {
        "url": "http://vodacom.co.za", 
        "steps": [
            function(){return location.hostname === "www.vodacom.mobi" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "vodacom.co.za sends desktop site to Firefox OS"
    }, 
    "960020": {
        "url": "http://indeed.co.za", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "indeed.co.za sends desktop site to Firefox OS"
    }, 
    "960023": {
        "url": "http://timeslive.co.za", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.timeslive.co.za";}
        ], 
        "ua": "FirefoxOS", 
        "title": "timeslive.co.za sends desktop site to Firefox OS"
    }, 
    "960003": {
        "url": "http://property24.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.property24.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "property24.com sends desktop site to Firefox OS"
    }, 
    "843126": {
        "url": "http://es.playstation.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.es.playstation.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "es.playstation.com doesn't recognize B2G or Fennec UAs as mobile"
    }, 
    "959970": {
        "url": "http://fnb.mobi", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "fnb.mobi sends simplified site to Firefox OS"
    }, 
    "959976": {
        "url": "http://junkmail.co.za", 
        "steps": [
            function(){return location.hostname === "m.junkmail.co.za" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "junkmail.co.za sends desktop site to Firefox OS"
    }, 
    "959974": {
        "url": "http://olx.co.za", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.olx.co.za" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "olx.co.za sends desktop site to Firefox OS"
    }, 
    "957843": {
        "url": "http://m.lashou.com", 
        "steps": [
            function(){return document.scripts.length>2;}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.lashou.com sends simplified site to Firefox OS"
    }, 
    "959488": {
        "url": "http://m.m18.com", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.m18.com sends desktop site to Firefox OS"
    }, 
    "937441": {
        "url": "http://www.submarino.com.br", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.submarino.com.br" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "submarino.com.br has UA sniffer that doesn't detect Firefox OS"
    },
    "933621": {
        "url": "http://www.cardekho.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.cardekho.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "cardekho.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "933629": {
        "url": "http://www.carwale.com/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "carwale.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "888726": {
        "url": "http://m.blinkx.com", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.blinkx.com can\u2019t play a video"
    }, 
    "945943": {
        "url": "http://www.groupon.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.groupon.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "groupon.com serves desktop sites to Firefox OS"
    }, 
    "933601": {
        "url": "http://www.axisbank.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.axisbank.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "axisbank.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "933600": {
        "url": "http://in.bookmyshow.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "in.bookmyshow.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "915339": {
        "url": "http://abcnews.go.com/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "ABCnews.go.com doesn't send the mobile version to Firefox on Mobile"
    }, 
    "960437": {
        "url": "http://excite.co.jp", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "a.excite.co.jp" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "excite.co.jp sends desktop site to Firefox OS"
    }, 
    "960434": {
        "url": "http://exblog.jp", 
        "steps": [
            function(){return location.hostname === "sp.exblog.jp";}
        ], 
        "ua": "FirefoxOS", 
        "title": "exblog.jp sends desktop site to Firefox OS"
    }, 
    "960432": {
        "url": "http://nifty.com", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "nifty.com / cocolog-nifty.com sends desktop site to Firefox OS and Firefox on Android"
    }, 
    "958194": {
        "url": "http://m.taobao.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "m.taobao.com sends a different site for Firefox OS/Firefox Android than on Android stock browser."
    }, 
    "958415": {
        "url": "http://www.ameba.jp/", 
        "steps": [
            function(){return location.hostname === "s.amebame.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "ameba.jp shows blank page when browsing Firefox Android"
    }, 
    "960431": {
        "url": "http://tabelog.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.tabelog.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "tabelog.com sends desktop site to Firefox OS"
    }, 
    "931816": {
        "url": "http://www.contra.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.contra.gr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "contra.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "945960": {
        "url": "http://tieba.baidu.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "tieba.baidu.com serves desktop content to Firefox OS"
    }, 
    "931833": {
        "url": "http://www.capital.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.capital.gr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "capital.gr doesn't redirect to mobile site on Firefox OS and Firefox for Android"
    }, 
    "960443": {
        "url": "http://www.ocn.ne.jp", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.ocn.ne.jp sends desktop site to Firefox OS"
    }, 
    "957853": {
        "url": "http://www.hotmail.com", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "hotmail.com / mail.live.com sends desktop content to Firefox OS"
    }, 
    "935908": {
        "url": "http://www.cbs.com/", 
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "cbs.com sends desktop content to FirefoxOS"
    }, 
    "958474": {
        "url": "http://www.abudhabiairport.ae", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.abudhabiairport.ae" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "abudhabiairport.ae doesn't redirect to mobile site on Firefox OS"
    }, 
    "931785": {
        "url": "http://www.sport24.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sport24.gr" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "sport24.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "935905": {
        "url": "http://video.adultswim.com", 
        "steps": [
            function(){return location.hostname === "m.adultswim.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "video.adultswim.com sends desktop content to FirefoxOS"
    }, 
    "804727": {
        "url": "http://harrypotter.wikia.com/", 
        "steps": [
            function(){return hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "wikia.com serves desktop content to FirefoxOS because of UA sniffing"
    }, 
    "960446": {
        "url": "http://lenovo.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.lenovo.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "lenovo.com sends desktop site to Firefox OS"
    }, 
    "933628": {
        "url": "http://www.fashionandyou.com/", 
        "steps": [
            function(){return location.hostname === "m.fashionandyou.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "fashionandyou.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "933632": {
        "url": "http://www.cleartrip.com/", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "cleartrip.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "958411": {
        "url": "http://www.rakuten.co.jp/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "broken rendering on rakuten mobile top page"
    }, 
    "960427": {
        "url": "http://pixiv.net", 
        "steps": [
            function(){return location.hostname === "touch.pixiv.net" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "pixiv.net sends desktop site to Firefox OS"
    }, 
    "933656": {
        "url": "http://www.raaga.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.raaga.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "raaga.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "933657": {
        "url": "http://www.olx.in/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.olx.in" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "olx.in isn't redirecting to mobile site on Firefox OS"
    }, 
    "931825": {
        "url": "http://www.athensvoice.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.athensvoice.gr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "athensvoice.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "960440": {
        "url": "http://cookpad.com", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "cookpad.com sends desktop site to Firefox OS"
    }, 
    "933653": {
        "url": "http://www.jagran.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.jagran.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "jagran.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "933650": {
        "url": "http://www.indianexpress.com/", 
        "steps": [
            function(){return location.hostname === "m.indianexpress.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "indianexpress.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "945953": {
        "url": "http://map.baidu.com/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "map.baidu.com serves desktop content to Firefox OS"
    }, 
    "960433": {
        "url": "http://biglobe.ne.jp", 
        "steps": [
            function(){return location.hostname === "biglobe.ne.jp";}
        ], 
        "ua": "FirefoxOS", 
        "title": "biglobe.ne.jp sends desktop site to Firefox OS"
    }, 
    "933670": {
        "url": "http://icicibank.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.icicibank.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "icicibank.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "804642": {
        "url": "http://www.baidu.com/", 
        "steps": [
            function(){return hasViewportMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "baidu.com UA sniffing serves non optimized content"
    }, 
    "935486": {
        "url": "http://www.biography.com/videos", 
        "steps": [
            function(){return hasVideoTags();}
        ], 
        "ua": "FirefoxOS", 
        "title": "biography.com fails to play video on FirefoxOS, shows \"requires Flash\" error"
    }, 
    "958400": {
        "url": "http://www.goo.ne.jp/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "goo.ne.jp sends desktop content to Firefox OS"
    }, 
    "931808": {
        "url": "http://news247.gr", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.news247.gr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "news247.gr doesn't redirect to mobile site on Firefox OS"
    }, 
    "960423": {
        "url": "http://kakaku.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.kakaku.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "kakaku.com sends desktop site to Firefox OS"
    }, 
    "960405": {
        "url": "http://nicovideo.jp", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "sp.nicovideo.jp";}
        ], 
        "ua": "FirefoxOS", 
        "title": "nicovideo.jp sends desktop site to Firefox OS"
    }, 
    "870209": {
        "url": "http://polygamia.pl/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.polygamia.pl";}
        ], 
        "ua": "FirefoxOS", 
        "title": "polygamia.pl doesn't send mobile content to Firefox OS"
    }, 
    "933675": {
        "url": "http://www.indeed.co.in/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "indeed.co.in isn't redirecting to mobile site on Firefox OS"
    },
    "960030": {
        "url": "http://us.jobrapido.com", 
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "jobrapido.com sends desktop site to Firefox OS"
    },

    "964532": {
        "url": "http://www.voyages-sncf.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "voyages-sncf.mobi";}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.voyages-sncf.com sends desktop site to Firefox OS"
    }, 
    "964160": {
        "url": "http://commentcamarche.net/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.commentcamarche.net" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "commentcamarche.net is sending desktop content to Firefox OS"
    }, 
    "964162": {
        "url": "http://www.sfr.fr/", 
        "steps": [
            function(){return location.hostname === "m.sfr.fr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "sfr.fr is sending desktop content to Firefox OS"
    }, 
    "964163": {
        "url": "http://pagesjaunes.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.pagesjaunes.fr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "pagesjaunes.fr is sending desktop content to Firefox OS"
    }, 
    "964577": {
        "url": "http://www.eurosport.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.eurosport.fr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.eurosport.fr sends desktop site to Firefox OS"
    }, 
    "933603": {
        "url": "http://www.asklaila.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.asklaila.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "asklaila.com isn't redirecting to mobile site on Firefox OS"
    }, 
    "964575": {
        "url": "http://www.credit-agricole.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "ca-mobile.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.credit-agricole.fr sends desktop site to Firefox OS"
    }, 
    "966504": {
        "url": "http://www.ztedevices.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ztedevice.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "Ztedevices.com sends FFOS to desktop site instead of mobile"
    }, 
    "964600": {
        "url": "http://www.egaliteetreconciliation.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.egaliteetreconciliation.fr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.egaliteetreconciliation.fr sends desktop site to Firefox OS"
    }, 
    "966464": {
        "url": "http://www.pcgamer.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.pcgamer.com" && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "PC gamer sends desktop site to FxOS"
    }, 
    "964080": {
        "url": "http://www.lynda.com/", 
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags() && location.hostname === "m.lynda.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "Lynda.com isn't redirecting to Mobile site"
    },
    "964603": {
        "url": "http://www.indeed.fr/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.indeed.fr sends desktop site to Firefox OS"
    }, 
    "964602": {
        "url": "http://www.zalando.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.zalando.fr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.zalando.fr sends desktop site to Firefox OS"
    }, 
    "964607": {
        "url": "http://portail.free.fr/", 
        "steps": [
            function(){return hasViewportMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "portail.free.fr sends desktop site to Firefox OS"
    }, 
    "964521": {
        "url": "http://tf1.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.tf1.fr";}
        ], 
        "ua": "FirefoxOS", 
        "title": "tf1.fr sends desktop site to Firefox OS"
    }, 
    "964596": {
        "url": "http://www.rfi.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rfi.fr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.rfi.fr sends desktop site to Firefox OS"
    }, 
    "964547": {
        "url": "http://www.vente-privee.com/", 
        "steps": [
            function(){return hasVideoTags() && location.hostname === "m.vente-privee.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.vente-privee.com sends desktop site to Firefox OS"
    }, 
    "964567": {
        "url": "http://www.20minutes.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.20minutes.fr" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.20minutes.fr sends desktop site to Firefox OS"
    }, 
    "966470": {
        "url": "http://www.ign.com", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ign.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "ign.com serves FxOS desktop site"
    }, 
    "965753": {
        "url": "http://www.koreaherald.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.koreaherald.com" && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.koreaherald.com sends desktop site to Firefox OS"
    }, 
    "965694": {
        "url": "http://afii.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.invest-in-france.org";}
        ], 
        "ua": "FirefoxOS", 
        "title": "afii.fr sends desktop site to Firefox OS"
    }, 
    "963954": {
        "url": "http://el-carabobeno.com/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.el-carabobeno.com";}
        ], 
        "ua": "FirefoxOS", 
        "title": "el-carabobeno.com doesn't recognize B2G UA as mobile"
    }, 
    "963955": {
        "url": "http://www.bod.com.ve/", 
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ], 
        "ua": "FirefoxOS", 
        "title": "bod.com.ve doesn't recognize B2G UA as mobile"
    }, 
    "964591": {
        "url": "http://www.meetic.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.uk.match.com" && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.meetic.fr sends simplified site to Firefox OS"
    }, 
    "966082": {
        "url": "http://www.nasdaq.com/", 
        "steps": [
            function(){return location.hostname === "m.nasdaq.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.nasdaq.com sends desktop site to Firefox OS"
    }, 
    "964565": {
        "url": "http://www.leparisien.fr/", 
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.leparisien.fr" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ], 
        "ua": "FirefoxOS", 
        "title": "www.leparisien.fr sends desktop site to Firefox OS"
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
        if(/HandheldFriendly/i.test(el.getAttribute('name')) && /true/i.test(el.getAttribute('content')))return true;
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
        if(/MobileOptimized/i.test(el.getAttribute('name')) && /(width|\d+)/i.test(el.getAttribute('content')))return true;
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
