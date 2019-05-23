function Playerplayer1(){

   if(movxplayer1W!=0 && movyplayer1W!=0){    //True value for division is 1.41
      xplayer1W += (movxplayer1W / 1.25)
      yplayer1W += (movyplayer1W / 1.25)
   }
   else{
      xplayer1W += movxplayer1W
      yplayer1W += movyplayer1W
   }
   fill(colorP1[0],colorP1[1],colorP1[2])
   strokeWeight(2)
   stroke(10,10,200,0.5)
   ellipse(xplayer1W,yplayer1W,30,30)
}

function Playerplayer2(){

   if(movxplayer2W!=0 && movyplayer2W!=0){
      xplayer2W += (movxplayer2W / 1.25)
      yplayer2W += (movyplayer2W / 1.25)
   }
   else{
      xplayer2W += movxplayer2W
      yplayer2W += movyplayer2W
   }
   fill(colorP2[0],colorP2[1],colorP2[2])
   strokeWeight(2)
   stroke(200,0,0,0.5)
   ellipse(xplayer2W,yplayer2W,30,30)
}
