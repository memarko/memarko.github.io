(function () {
    var css=['css/bootstrap.css','css/bootstrap-theme.css', 'css/site.css'];

    var root="index.html";


    if(typeof pathPrefix === 'undefined')
	     pathPrefix = "../";
    var suffix = "?t=" + new Date().getTime();
    document.write('<meta charset="UTF-8">');
    for(var i=0; i < css.length; i++)
    {
	     document.write("<link rel='stylesheet' type='text/css' href='"+pathPrefix+css[i]+suffix+"' />");
    }
})();
