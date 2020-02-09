class Player1Elemental{
   constructor(_x,_y){
      this.x = _x
      this.y = _y
   }

   update(){
      let xmov, ymov, angle

      angleMode(DEGREES)
      //translate(this.x,this.y)
      angle = atan2(yplayer2W-this.y, xplayer2W-this.x)
      //translate(-this.x,-this.y)

      if(angle >= 0 && angle <= 90){
         ymov = map(angle,0,90,0,1)
         xmov = 1 - ymov
         this.x += xmov
         this.y += ymov
      }
      else if(angle > 90){
         xmov = map(angle,90,180,0,1)
         ymov = 1 - xmov
         this.x += -xmov
         this.y += ymov
      }
      else if(angle <= 0 && angle >= -90){
         xmov = map(angle,-90,0,0,1)
         ymov = 1 - xmov
         this.x += xmov
         this.y += -ymov
      }
      else if(angle < -90){
         ymov = map(angle,-180,-90,0,1)
         xmov = 1 - ymov
         this.x += -xmov
         this.y += -ymov
      }
      // if(xplayer2W > this.x){          old movement
      //    this.x += 0.5
      // }
      // else{
      //    this.x += -0.5
      // }
      // if(yplayer2W < this.y){
      //    this.y += -0.5
      // }
      // else{
      //    this.y += 0.5
      // }
   }
   show(){
      fill(colorP1e[0],colorP1e[1],colorP1e[2])
      noStroke()
      ellipse(this.x,this.y,15,15)
   }
   touchplayer2(){
      let distplayer1Elemental
      distplayer1Elemental = dist(xplayer2W,yplayer2W,this.x,this.y);

      if(distplayer1Elemental < 22.5){ //22.5 = r1+r2
         return true
      }
      return false
   }
   touchplayer1(){
      let distplayer1Player
      distplayer1Player = dist(xplayer1W,yplayer1W,this.x,this.y);

      if(distplayer1Player < 22.5){ //22.5 = r1+r2
         return true
      }
      return false
   }
}

class Player2Elemental{
   constructor(_x,_y){
      this.x = _x
      this.y = _y
   }

   update(){
      let xmov, ymov, angle

      angleMode(DEGREES)
      // translate(this.x,this.y)
      angle = atan2(yplayer1W-this.y, xplayer1W-this.x)
      // translate(-this.x,-this.y)

      if(angle > 0 && angle <= 90){
         ymov = map(angle,0,90,0,1)
         xmov = 1 - ymov
         this.x += xmov
         this.y += ymov
      }
      else if(angle > 90){
         xmov = map(angle,90,180,0,1)
         ymov = 1 - xmov
         this.x += -xmov
         this.y += ymov
      }
      else if(angle <= 0 && angle > -90){
         xmov = map(angle,-90,0,0,1)
         ymov = 1 - xmov
         this.x += xmov
         this.y += -ymov
      }
      else if(angle <= -90){
         ymov = map(angle,-180,-90,0,1)
         xmov = 1 - ymov
         this.x += -xmov
         this.y += -ymov
      }
      // if(xplayer1W > this.x){          old movement
      //    this.x += 0.5
      // }
      // else{
      //    this.x += -0.5
      // }
      // if(yplayer1W < this.y){
      //    this.y += -0.5
      // }
      // else{
      //    this.y += 0.5
      // }
   }
   show(){
      fill(colorP2e[0],colorP2e[1],colorP2e[2])
      noStroke()
      ellipse(this.x,this.y,15,15)
   }
   touchplayer1(){
      let distplayer2Elemental
      distplayer2Elemental = dist(xplayer1W,yplayer1W,this.x,this.y);

      if(distplayer2Elemental < 22.5){ //22.5 = r1+r2
         return true
      }
      return false
   }
   touchplayer2(){
      let distplayer2Player
      distplayer2Player = dist(xplayer2W,yplayer2W,this.x,this.y);

      if(distplayer2Player < 22.5){ //22.5 = r1+r2
         return true
      }
      return false
   }
}

class Ghost{
   constructor(_x,_y){
      this.x = _x
      this.y = _y
      this.ghostMovx = random(-2,2)
      this.ghostMovy = random(-2,2)
   }

   update(){
      this.x += this.ghostMovx
      this.y += this.ghostMovy
   }
   show(){
      noStroke()
      fill(colorE[0],colorE[1],colorE[2])
      ellipse(this.x,this.y,15,15)
   }
   touch(){
      let distGhostW
      let distGhostF
      distGhostW = dist(xplayer1W,yplayer1W,this.x,this.y);
      distGhostF = dist(xplayer2W,yplayer2W,this.x,this.y);

      if(distGhostW < 22.5){ //22.5 = r1+r2
         return 1
      }
      else if(distGhostF < 22.5){
         return 2
      }
      return 0
   }
   bounce(){
      if(this.x > width-7.5 || this.x < 7.5){
         this.ghostMovx *= -1
      }
      else if(this.y < 7.5 || this.y > height-7.5){
         this.ghostMovy *= -1
      }
   }
}
