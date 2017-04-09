//autoscroll
$(window).mousemove(function (e) {
    if (!$('html, body').is(':animated') && $('.navbar .open').length == 0) {
        var bottom = $(window).height() - 200;
        var topTop = $('nav').height();
        var top = topTop + 50;
        if (e.clientY > bottom) {
            $('html, body').animate({
                scrollTop: ($(window).scrollTop() + $(window).height() < $(document).height() - 100) ? $(window).scrollTop() + 100 : $(document).height()
            }, 600);
        }
        else if (e.clientY < top && e.clientY > topTop) {
            $('html, body').animate({
                scrollTop: $(window).scrollTop() > 0 ? $(window).scrollTop() - 100 : 0
            }, 600);
        } else {
            $('html, body').finish();
        }
    }
});

var base64 =    'ABCDEFGH'+
	        'IJKLMNOP'+
		'QRSTUVWX'+
		'YZabcdef'+
		'ghijklmn'+
		'opqrstuv'+
		'wxyz0123'+
		'456789./';

function base64encode(c)
{
  return base64.charAt(c);
}

function base64decode(c)
{
  for (var i =0; i<base64.length; i++)
  {
    if(base64.charAt(i) == c)
    	return i;
  }
  return null;
}

function objCookieHelper(type, f)
{
	for(var k in cookieContainer)
	{
		if(cookieContainer[k].type == type)
			f(cookieContainer[k],k);
	}
}
//cookie
function readCookie(key)
{
	if(typeof cookieContainer == 'undefined' || cookieContainer == null)
	{
		cookieContainer = {
			cookiesWarningConfirmed: {type:'bool', value: null},
			hideClientOnly: {type: 'bool', value: false},
			tictactoe:{type: 'number', size:3, value: 0},

		};
		//read cookie:
		var cookieString = "";

	    	var ca = document.cookie.split(';');
		for(var i=0;i < ca.length; i++) {
	            var c = ca[i];
		    while (c.charAt(0)==' ')
			c = c.substring(1,c.length);

		    if (c.indexOf("ss=") == 0)
			cookieString = c.substring("ss=".length,c.length);
	    	}
		if(cookieString != "")
		{
			var cookiePosition = 0;
			//read bits
			var keys = [];
			var bits = 0;
			var exponent = 1;
			objCookieHelper("bool",function(val,key) {
				keys.push(key);
			});
			//read number sign
			objCookieHelper("number",function(val,key) {
				keys.push(key);
			});
			for(var i = 0; i < keys.length; i=+6)
			{
				var coef = 32;
				var value = base64decode(cookieString[cookiePosition]);
				cookiePosition++;
				for(j = i; j < keys.length && j < i + 6; j++)
				{
          var key = keys[j];
					var value1 = (coef & value) > 0 ? true : false;
					cookieContainer[key].value = cookieContainer[key].type == 'bool' ?
						value1 : //bool
						(value1 ? 1 : -1); //number
				}
			}

			//read numbers
			objCookieHelper("number",function(val,key) {
				var value = 0;
				var size =  typeof val.size != 'undefined' ? val.size : 1;
				for(var i=0; i<size; i++)
				{
					var v = base64decode(cookieString[cookiePosition]);
					cookiePosition++;
					value = (value << 6) + v;
				}


				cookieContainer[key].value = cookieContainer[key].value * value;

			});
		}

	}
	return (cookieContainer[key] != null && typeof cookieContainer[key] != 'undefined') ? cookieContainer[key].value : false;
}

function writeCookie(key, value)
{
	readCookie(key);
	cookieContainer[key].value = value;
	var cookieString = "";
	if(cookieContainer.cookiesWarningConfirmed.value == null)
	{
		var confirmation = confirm("This site wants to use cookies just to store your decision.\n"+
			"They will not be used to track you.\n"+
			"Cookie will be used only on your client browser.\n"+
			"Cookie data send back to the server will never be analyed.\n"+
			"Do you agree?");
		cookieContainer.cookiesWarningConfirmed.value = confirmation;
		if(!confirmation)
			return;

	}
	//store bits
	var bits = 0;
	var exponent = 32;
	objCookieHelper("bool",function(val) {
		bits = bits | ((val.value ? 1 : 0) * exponent);
		exponent = exponent >> 1;
		if(exponent == 0)
		{
			cookieString+=base64encode(bits);
			exponent = 1;
			bits = 0;
		}
	});
        //store number sign
	objCookieHelper("number",function(val) {
		bits = bits | ((val.value >= 0 ? 1 : 0) * exponent);
		exponent = exponent >> 1;
		if(exponent == 0)
		{
			cookieString+=base64encode(bits);
			exponent = 32;
			bits = 0;
		}
	});
	if(exponent != 32)
		cookieString+=base64encode(bits);

	//store numbers
	objCookieHelper("number",function(val) {
		//absolute value:
		var value = val.value>0 ? val.value : -val.value;
		var size =  typeof val.size != 'undefined' ? val.size : 1;

		for(var i=0; i<size; i++)
		{
			var lowerBits = value & 0x3F;
			cookieString+=base64encode(lowerBits);
			value = value >> 6;
		}

	});
  var d = new Date();
  d.setTime(d.getTime() + (5*365*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "ss="+cookieString+"; "+expires+"; path=/;";
  //document.cookie = "ss="+cookieString+"; path=/;";
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-96992492-1', 'auto');
  ga('set', 'forceSSL', true);
  if(getUserConsentState() === true){
    ga('require', 'displayfeatures');
    ga('set', 'anonymizeIp', undefined);
    ga('set', '&uid', '1234567');
  } else {
    ga('set', 'displayFeaturesTask', null);
    ga('set', 'anonymizeIp', true);
  }
  ga('send', 'pageview');
