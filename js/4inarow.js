var heights=[];
var height;
var width;
var board=[];
var player;
var total;
var disable;
reset();
//reset board
function reset()
{
  height = $(".play-board tr").length - 1;
  width = $(".play-board tr:first-child td").length;
  player = 1;
  total = height * width;
  for(var i=-3; i<width+3; i++)
  {
    heights[i] = height -1;
    board[i]=[];
    for(var j=-3; j<height+3; j++)
    {
      var td = $(".play-board tr").eq(j+1).find("td").eq(i);
      td.removeClass("token-red").removeClass("token-blue").removeClass("token-mark");
      board[i][j]=0;
    }
  }
  disable = false;
}
//move tokes 1 row dow because it is full
function movedown()
{
  total += width;
  for(var i=0; i<width; i++)
  {
    for(var j=height-1; j>=-2 ; j--)
    {
      board[i][j+1] = board[i][j];
      var td = $(".play-board tr").eq(j+1).find("td").eq(i);
      td.removeClass("token-red").removeClass("token-blue");
      td.addClass(
          board[i][j+1] > 0 ? "token-red": "token-blue"
      );
    }
    board[i][0] = 0;
    heights[i]=0;
    var td = $(".play-board tr").eq(0).find("td").eq(i);
    td.removeClass("token-red").removeClass("token-blue");
  }
}
//check if it is 4 in a row
function check(x,y)
{
  checkdir=[0,0,0,0]
  for(var i=0; i<7; i++)
  {
    checkdir[0] = board[x][y-3+i]*checkdir[0] >=0 ? checkdir[0] + board[x][y-3+i] : 0;
    checkdir[1] = board[x-3+i][y]*checkdir[1] >=0 ? checkdir[1] + board[x-3+i][y] : 0;
    checkdir[2] = board[x-3+i][y-3+i]*checkdir[2] >=0 ? checkdir[2] + board[x-3+i][y-3+i] : 0;
    checkdir[3] = board[x-3+i][y+3-i]*checkdir[3] >=0 ? checkdir[3] + board[x-3+i][y+3-i] : 0;
    for(var j=0; j<4; j++)
    {
      if(checkdir[j]*checkdir[j] >= 16)
        return checkdir[j] > 0 ? 1 : -1;
    }
  }
  return 0;
}

//mark 4 in a row
function mark(x,y)
{
  checkdir=[0,0,0,0]
  for(var i=0; i<7; i++)
  {
    checkdir[0] = board[x][y-3+i]*checkdir[0] >=0 ? checkdir[0] + board[x][y-3+i] : 0;
    if(checkdir[0]*checkdir[0] >= 16)
    {
      markinternal(x,y-3+i,0,1);
      break;
    }
    checkdir[1] = board[x-3+i][y]*checkdir[1] >=0 ? checkdir[1] + board[x-3+i][y] : 0;
    if(checkdir[1]*checkdir[1] >= 16)
    {
      markinternal(x-3+i,y,1,0);
      break;
    }
    checkdir[2] = board[x-3+i][y-3+i]*checkdir[2] >=0 ? checkdir[2] + board[x-3+i][y-3+i] : 0;
    if(checkdir[2]*checkdir[2] >= 16)
    {
      markinternal(x-3+i,y-3+i,1,1);
      break;
    }
    checkdir[3] = board[x-3+i][y+3-i]*checkdir[3] >=0 ? checkdir[3] + board[x-3+i][y+3-i] : 0;
    if(checkdir[3]*checkdir[3] >= 16)
    {
      markinternal(x-3+i,y+3-i,1,-1);
      break;
    }
  }
  function markinternal(x1,y1,dx,dy)
  {
    for(var j=0; j<4; j++)
    {
      $(".play-board tr").eq(y1-dy*j).find("td").eq(x1-dx*j).addClass("token-mark");
    }
  }
}


//makemove
function play(x)
{
  var y = heights[x];
  if(y >= 0)
  {
    board[x][y]=player;
    $(".play-board tr").eq(y)
      .find("td").eq(x).addClass(
        player > 0 ? "token-red": "token-blue"
    );
    heights[x]--;
    total--;
    if(check(x,y) != 0)
    {
      mark(x,y);
      setTimeout(reset, 3000);
      disable = true;
      return;
    }
    if (total <= 0)
    {
      setTimeout(movedown, 1000);
    }
    player = -player;
  }
}
function falling(x) {
  setTimeout(falling,10);

}
//click on field
$(document).ready(function() {
  $(".play-board td,.play-board th").click(function(){
    if(disable)
      return;
    play($(this).index());
  });
});
