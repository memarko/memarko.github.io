
var cancelSearch = false;
$(document).ready(function() {
  var found = false;
  var urls = [];
  var query = window.location.href.split('?');
  var searchStringSplited = null;
  if(query.length>1)
  {
    query = query[1].split('&');
    for (var i = 0; i<query.length; i++)
    {
      var keyValue = query[i].split('=');
      if(keyValue.length == 2 && keyValue[0] =='query')
      {
        searchStringSplited = decodeURIComponent(keyValue[1]).split(' ');
      }
    }
  }
  if(searchStringSplited == null)
    return;
  var searchKeys = [];
  for (var i = 0; i<searchStringSplited.length; i++)
  {
    if (searchStringSplited[i].length > 0)
    {
      var subSearchStringSplited = searchStringSplited[i].split('+');
      for (var j = 0; j<subSearchStringSplited.length; j++)
      {
        if (subSearchStringSplited[j].length > 0)
          searchKeys.push(subSearchStringSplited[j].toLowerCase());
      }
    }
  }
  if(searchKeys.length == 0)
    return;
  $('.navbar').find('a').each(function() {
    var url = $(this).attr('href');
    if(url != null && url.indexOf('#') == -1)
    {
      urls.push(url);
    }
  });
  $('#searchQuery').val(searchKeys.join(' '));
  var i = -1;
  var len = urls.length;
  $('#numberOfTotal').text(len);
  $('#search-progress').modal('show');
  var template = $("<div></div>").append($('.search-result')).html();
  fetchNext();

  function doResult(data)
  {
    //check words
    var title = $(data).filter('title').text();
    var h1 = $(data).find('h1').text();
    var text = $(data).find('.page-content').text();
    text = text.trim().replace(title,"");
    text = text.trim().replace(h1,"");
    text = text.replace(/\s+/g," ");
    if(typeof title == 'undefined' || title == null || title == "")
        title = h1;
    var search = (title+" "+text).toLowerCase();
    var isHit = true;
    for(var j=0; j<searchKeys.length; j++)
    {
      if (search.indexOf(searchKeys[j]) == -1)
      {
        isHit = false;
        break;
      }
    }
    //append hit
    if (isHit)
    {
      found = true;
      //trim text

      //get actual position:
      var positions = [];
      var maxDistance = 20;
      for(var j=0; j<searchKeys.length; j++)
      {
        var start = text.toLowerCase().indexOf(searchKeys[j].toLowerCase());
        if(start == -1)
          continue;
        var end = start + searchKeys[j].length;
        var textStart = start - maxDistance;
        textStart = textStart > 0 ? textStart : 0;
        //go to whole word:
        for(textStart=textStart; textStart >= 0; textStart--)
        {
          if(textStart > 0 && /\s/.test(text[textStart-1]))
            break;
        }

        var textEnd = end + maxDistance;
        textEnd = textEnd < text.length ? textEnd : text.length -1;
        //go to whole word:
        for(textEnd=textEnd; textEnd<text.length; textEnd++)
        {
          if(/\s/.test(text[textEnd]))
            break;
        }
        positions.push(
          {
            start: start,
            end: end,
            textStart: textStart,
            textEnd: textEnd
          }
        );
      }
      //sort positions:
      for(var j=0; j<positions.length; j++)
      {
        var minIndex = j;
        var minObj = positions[j];
        for(var k=j+1; k<positions.length; k++)
        {
          if(minObj.start > positions[k].start)
          {
            minIndex = k;
            minObj = positions[k];
          }
        }
        positions[minIndex] = positions[j];
        positions[j] = minObj;
      }
      //trim to new text
      var newText = "";
      prevEnd = 0;
      for(var j=0; j<positions.length; j++)
      {
        var start = Math.max(positions[j].textStart, prevEnd);
        if (positions[j].textStart > prevEnd)
          newText += "...";
        prevEnd = positions[j].textEnd;
        newText += text.substring(start,prevEnd);

      }
      if (prevEnd < text.length - 1)
      {
        newText += "...";
      }
      //highlight text and escape it to html
      title = highlight(title,searchKeys);
      text = highlight(newText,searchKeys);

      var thumbnail = template.replace('[title]',title)
                              .replace('[text]',text);
      $('.search-results').append(thumbnail);
      $('.search-results').children().last().attr('href',urls[i])
      .click(function()
      {
        window.location.href = $(this).attr('href');
      });
    }
  }
  function highlight(str,keys)
  {
    var highlights = [];
    //get positions to add html
    for(var j=0; j<keys.length; j++)
    {
      var start = str.toLowerCase().indexOf(keys[j].toLowerCase());
      if(start == -1)
        continue;
      highlights.push({
        pos: start,
        html: "<span class='highlight'>"
      });
      highlights.push({
        pos: start+keys[j].length,
        html: "</span>"
      });
    }
    //sort positions
    for(var j=0; j<highlights.length; j++)
    {
      var minIndex = j;
      var minObj = highlights[j];
      for(var k=j+1; k<highlights.length; k++)
      {
        if(minObj.pos > highlights[k].pos)
        {
          minIndex = k;
          minObj = highlights[k];
        }
      }
      highlights[minIndex] = highlights[j];
      highlights[j] = minObj;
    }
    //get text:
    var ret = "";
    var lastPos=0;
    for(var j=0; j<highlights.length; j++)
    {
      ret += $("<div>").text(str.substring(lastPos,highlights[j].pos)).html();
      lastPos = highlights[j].pos;
      ret += highlights[j].html;
    }
    ret += $("<div>").text(str.substring(lastPos,str.length)).html();
    return ret;
  }
  function fetchNext()
  {
    i++;
    //update loader
    $('#numberOfDone').text(i);
    $('#progressBar').css('width',Math.round(100*i/len)+'%');

    if(i<len&&!cancelSearch)
    {
    $.get(urls[i])
        .done(doResult)
        .always(fetchNext);
    }
    else
    {
      //hide loader
      $('#cancelSearch').click();
      //show no results
      if(!found)
      {
        $('#no-results').css('display','block');
      }
    }
  }
});
