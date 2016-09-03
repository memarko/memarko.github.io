
function getSize(canvas)
{
  var width = canvas.scrollWidth;
  var height = canvas.scrollHeight;
}
function drawBackground(ctx)
{
  $(document).ready(function(){
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(300,150);
    ctx.stroke();
  });
}
var c=document.getElementsByTagName("canvas")[0];
var ctx=c.getContext("2d");
drawBackground(ctx);
