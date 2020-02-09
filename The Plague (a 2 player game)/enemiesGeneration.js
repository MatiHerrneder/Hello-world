function createWE(){
   let amountWE

   amountWE = random(0.5,1.5)
   for(let i=0; i<amountWE; i++){
      do{
         newWEposx = random(0+8, 800-8)    // - or + 8 because its half (a bit more) of the enemy's body, this way we avoid enemies generating in the borders
         newWEposy = random(0+8, 450-8)
      }while(newWEposx > xplayer2W-100 && newWEposx < xplayer2W+100 && newWEposy > yplayer2W-100 && newWEposy < yplayer2W+100) //range where it cannot spawn, too close to player
      var player1Elemental = new Player1Elemental(newWEposx,newWEposy)
      player1Elementals.push(player1Elemental)
   }
}

function createFE(){
   let amountWF

   amountWF = random(0.5,1.5)
   for(let i=0; i<amountWF; i++){
      do{
         newFEposx = random(0+8, 800-8)    // - or + 8 because its half (a bit more) of the enemy's body, this way we avoid enemies generating in the borders
         newFEposy = random(0+8, 450-8)
      }while(newFEposx > xplayer1W-100 && newFEposx < xplayer1W+100 && newFEposy > yplayer1W-100 && newFEposy < yplayer1W+100)
      var player2Elemental = new Player2Elemental(newFEposx,newFEposy)
      player2Elementals.push(player2Elemental)
   }
}

function createG(){
   let amountG

   amountG = random(-0.5,1.5)
   if(amountG > 1){
      do{
         newGposx = random(0+8, 800-8)    // - or + 8 because its half (a bit more) of the enemy's body, this way we avoid enemies generating right in the borders and straying there
         newGposy = random(0+8, 450-8)
      }while(newGposx > xplayer2W-100 && newGposx < xplayer2W+100 && newGposy > yplayer2W-100 && newGposy < yplayer2W+100 || newGposx > xplayer1W-100 && newGposx < xplayer1W+100 && newGposy > yplayer1W-100 && newGposy < yplayer1W+100)
      var ghost = new Ghost(newGposx,newGposy)
      ghosts.push(ghost)
   }
}
