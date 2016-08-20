function showLastNews()
{
    function createThumbnail(data)
    {
        var numberOfchars=100;
        var title = $(data).filter('title').text();
        var h1 = $(data).find('h1').text();
        var img = $(data).find('img').attr('src');
        img = 'html/'+img;
        var text = $(data).filter('.page-content').text();
        text = text.trim().replace(title,"");
        text = text.trim().replace(h1,"");
        text = text.replace(/\s+/g," ");
        if(typeof title == 'undefined' || title == null || title == "")
            title = h1;
        if (text.length > numberOfchars)
        {
          for(var i = numberOfchars; i < text.length; i++)
          {
            if(/\s/.test(text[i]))
              break;
          }
          if(i < text.length)
          {
              while(text[i] == '.')
              {
                i--;
              }
              text = text.substring(0,i) + "...";
          }
        }
        var thumbnail = template.replace('[title]',$("<div>").text(title).html())
                                .replace('[img]', img)
                                .replace('[text]',$("<div>").text(text).html());
        $('.preview-container').append(thumbnail);
        $('.preview-container').children().last().find('img').css("visibility","hidden");
        $('.preview-container').children().last().find('img').on('load', function() {
           $(this).css("visibility","visible").css("display","hidden").fadeIn("slow");
        });
        $('.preview-container').children().last().attr('href',lastnews[templateIndex])

        .click(function()
        {
          window.location.href = $(this).attr('href');
        });

      templateIndex++;
      if (templateIndex < lastnews.length)
      {
        $.get(lastnews[templateIndex], createThumbnail);
      }
      else {
        function updateHeight()
        {
          var height = 20;
          $('.preview-container').children().each(function(){
            $(this).children().first().height('auto');
          });
          $('.preview-container').children().each(function(){
            var h = $(this).children().first().height();
            if(h > height)
              height = h;
          });
          $('.preview-container').children().each(function(){
            $(this).children().first().height(height);
          });
        }
        updateHeight();
        templateIndex = 0;
        $(window).on('resize', updateHeight);
      }
    }
  var template = $("<div></div>").append($('.preview')).html();
  var templateIndex = 0;
  if (templateIndex < lastnews.length)
  {
    $.get(lastnews[templateIndex], createThumbnail);
  }
}
