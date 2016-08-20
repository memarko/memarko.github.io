cancelLoad = false;
$(document).ready(function()
{
  var srcs = {};
  var position = -1;
  addSources($('.navbar'),srcs,'a','href');
  var links = [];
  for(var l in srcs)
  {
    links.push(l);
  }
  parseSources($(document),srcs);
  var len = links.length;
  $('#numberOfTotal').text(len);
  $('#load-progress').modal('show');
  fetchNext();

  function doResult(data)
  {
    parseSources($(data),srcs);
  }
  function reorder()
  {
      for(var l in srcs)
      {
        var el = $('<li/>');
        el.text(l);
        $('#files>ul').append(el);
      }
  }
  function fetchNext()
  {

    position++;

    //update loader
    $('#numberOfDone').text(position);
    $('#progressBar').css('width',Math.round(100*position/len)+'%');

    if(position<len&&!cancelLoad)
    {
      $.get(links[position])
          .done(doResult)
          .always(fetchNext);
    }
    else
    {
      //hide loader
      $('#cancelLoad').click();
      reorder();
    }
  }

  function parseSources(data,srcs)
  {
    addSources(data,srcs,'script','src');
    addSources(data,srcs,'link','href');
    addSources(data,srcs,'a','href');
    addSources(data,srcs,'img','src');

  }
  function addSources(data,srcs,nodeName,attribute)
  {
    data.find(nodeName).each(function() {
      var val = $(this).attr(attribute);
      if(val != null && val != '' && val.indexOf('#') == -1)
      {
        if(/^(http(s?)\:\/\/|tel\:|\[.+\]$)/.test(val))
          return;
        if (position != -1)
        {
           var link = links[position];
           if(val.indexOf('/')!=0)
           {
             var match = link.match(/^(\.\.\/)+/);
             if(link.indexOf('/')==0)
              val = '/' + val;
            else if (match != null && match.length > 0)
              val = match[0] + val;
           }
        }
        srcs[val] = true;
      }
    });
  }
});
