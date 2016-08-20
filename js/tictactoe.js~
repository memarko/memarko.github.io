var playerMove = 0;
var moves = [[0,0,0],[0,0,0],[0,0,0]];
var disabled = false;
function fieldClick(l,c)
{
  if (!disabled && moves[l][c] == 0)
  {
	$(".l-"+l+".c-"+c).text(playerMove % 2 == 1 ? 'O' : 'X');
	moves[l][c] = playerMove % 2 == 1 ? 1 : -1;
	playerMove++;
	if(checkMove(l,c))
	{
		disabled = true;
		setTimeout(function(){window.location.href = window.location},2000);
	}
  }
}
function checkMove(l,c)
{
	if(Math.abs(moves[l][0]+moves[l][1]+moves[l][2]) == 3)
	{
		markFields(l,0);
		markFields(l,1);
		markFields(l,2);
		return true;	
	}
	if(Math.abs(moves[0][c]+moves[1][c]+moves[2][c]) == 3)
	{
		markFields(0,c);
		markFields(1,c);
		markFields(2,c);
		return true;	
	}
	
	if(Math.abs(moves[0][0]+moves[1][1]+moves[2][2]) == 3)
	{
		markFields(0,0);
		markFields(1,1);
		markFields(2,2);
		return true;	
	}	

	if(Math.abs(moves[0][2]+moves[1][1]+moves[2][0]) == 3)
	{
		markFields(0,2);
		markFields(1,1);
		markFields(2,0);
		return true;	
	}
	if(playerMove == 9)
		return true;
	return false;
}
function markFields(l,c)
{
   $(".l-"+l+".c-"+c).removeClass('btn-default');
   $(".l-"+l+".c-"+c).addClass('btn-danger');
   
}

