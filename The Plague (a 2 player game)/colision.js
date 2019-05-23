function PlayersColissionGameOver(){
   let distPlayers = dist(xplayer1W,yplayer1W,xplayer2W,yplayer2W)

   if(distPlayers < 30){ //30 = r1+r2
      return true
   }
   else{
      return false
   }
}

function borders(){
   if(xplayer1W > width-15){
      xplayer1W = width-15
   }
   else if(xplayer1W < 15){
      xplayer1W = 15
   }
   if(yplayer1W < 15){
      yplayer1W = 15
   }
   else if(yplayer1W > height-15){
      yplayer1W = height-15
   }
   if(xplayer2W > width-15){
      xplayer2W = width-15
   }
   else if(xplayer2W < 15){
      xplayer2W = 15
   }
   if(yplayer2W < 15){
      yplayer2W = 15
   }
   else if(yplayer2W > height-15){
      yplayer2W = height-15
   }
}
