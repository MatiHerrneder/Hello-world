function moves(){ //Ethan, great moves, keep it up, proud of you.

   if(keyIsDown(87)){
      movyplayer1W = -playerSpeed
   }
   if(keyIsDown(83)){
      movyplayer1W = playerSpeed
   }
   if(keyIsDown(65)){
      movxplayer1W = -playerSpeed
   }
   if(keyIsDown(68)){
      movxplayer1W = playerSpeed
   }
   if(keyIsDown(UP_ARROW)){
      movyplayer2W = -playerSpeed
   }
   if(keyIsDown(DOWN_ARROW)){
      movyplayer2W = playerSpeed
   }
   if(keyIsDown(LEFT_ARROW)){
      movxplayer2W = -playerSpeed
   }
   if(keyIsDown(RIGHT_ARROW)){
      movxplayer2W = playerSpeed
   }
}

function keyReleased(){    //refreshes movement when a key is released
   movxplayer1W = 0
   movyplayer1W = 0
   movxplayer2W = 0
   movyplayer2W = 0
}
