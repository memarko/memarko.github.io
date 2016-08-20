(function () {
    var js=['js/jquery.js', 'js/bootstrap.js','js/site.js','js/template.js'];
    
    var root="index.html";
    

    var url = location.pathname+"";
    if(typeof pathPrefix === 'undefined')
	pathPrefix = "../";
    for(var i=0; i < js.length; i++)
    {
	document.write("<script type='text/javascript' src='"+pathPrefix+js[i]+"' ></script>");
    }
})();
