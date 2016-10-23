(function () {

	function fixNavigation()
	{
	    if(typeof pathPrefix === 'undefined')
					pathPrefix = "../";

	    $(".navbar").find("a").each(function() {
	       $(this).attr('href', fixUrl($(this).attr("href")));

	    });

	    $(".navbar").find("img").each(function() {
	       $(this).attr('src', fixUrl($(this).attr("src")));
	    });

			$(".navbar").find("form").each(function() {
	       $(this).attr('action', fixUrl($(this).attr("action")));
	    });
	}
	function fixUrl(url)
	{
		if(url !== undefined && url !== null && url != "")
		{
			 //ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
			 //protocol not given, path not given,hash not given:
			 if(! /^[a-zA-Z][a-zA-Z0-9\+\-\.]*\:/.test(url) && url.indexOf('/') != 0 &&
			 			url.indexOf('#') != 0)
			 {
				  return	pathPrefix + url;
			 }
		}
		return url;
	}
	function selectCurrentPageNavigation()
	{
		var url=document.location.href + "";
		var pos = url.indexOf("#");
		if(pos >= 0)
				url = url.substring(0,pos);
		var pos = url.indexOf("?");
		if(pos >= 0)
				url = url.substring(0,pos);
		$('nav').find('a').each(function(){
			var curl = $(this).attr('href');
			if(typeof curl == 'undefined' || curl == null)
				return;
			var pos = curl.indexOf("#");
			if(pos >= 0)
					curl = curl.substring(0,pos);
			var pos = curl.indexOf("?");
			if(pos >= 0)
					curl = curl.substring(0,pos);
			curl = curl.trim();
			if (curl.length == 0)
				return;
			if(url.lastIndexOf(curl) == (url.length - curl.length))
			{
				for(var n = $(this); typeof n.get(0) != 'undefined' && n.get(0) != document.body && n.get(0) != null ; n = n.parent())
				{
					if(n.get(0).nodeName == "LI")
						n.addClass("selected");
				}
			}
		});
	}
	if(typeof pathPrefix === 'undefined')
		pathPrefix = "../";

	var html=$('.page-content').html();
	var title = document.title;

	$('body').load(pathPrefix + 'layout/layout.html', function(data) {
		if(typeof title != 'undefined' && title != null && title != "")
			document.title = $(data).filter("title").text() + " - " + title;

		selectCurrentPageNavigation();
		fixNavigation();
		$('.page-content').append(html);


	  if(readCookie("hideClientOnly") == true)
	  {
	    $("#page-message-warning").parent().hide();
	  }

	  if(readCookie("hideClientOnly") == true)
	  {
	    $("#page-message-warning").parent().hide();
	  }

	  $("#page-message-warning").click(function()
	  {
	    writeCookie("hideClientOnly", true);
	    $("#page-message-warning").parent().hide();
	  });
	});

})();
