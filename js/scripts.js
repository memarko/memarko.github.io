(function () {
    var js=['js/jquery.js', 'js/bootstrap.js','js/site.js','js/layout.js'];

    var root="index.html";


    var url = location.pathname+"";
    if(typeof pathPrefix === 'undefined')
	     pathPrefix = "../";
    var suffix = "?t=" + new Date().getTime();
    for(var i=0; i < js.length; i++)
    {
	    document.write("<script type='text/javascript' src='"+pathPrefix+js[i]+suffix+"' ></script>");
    }
})();
