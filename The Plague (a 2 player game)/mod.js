






/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

               sketch.js

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
                                 Cute little game by Matías Herrneder :)
                                                                                                               */
/*var xplayer1W = 293, yplayer1W = 225, xplayer2W = 509, yplayer2W = 225
var movxplayer1W = 0, movyplayer1W = 0, movxplayer2W = 0, movyplayer2W = 0
const playerSpeed = 2
var player1Elementals = [], player2Elementals = [], ghosts = []
var score = 0, whoLost = 'both'
var newWEposx,newWEposy,newFEposx,newFEposy
var itsOver = false, initialize = true, pause = false
var controls, canvas1  //  (pic)
const ColorsP = [
   [20,20,200],
   [200,20,20],
   [20,200,20],
   [250,255,0],
]
const ColorsE = [
   [70,70,200],
   [200,70,70],
   [70,200,70],
   [255,255,50],
]

var colorP1 = [ColorsP[0]], colorP1e = [ColorsE[0]], colorP2 = [ColorsP[1]], colorP2e = [ColorsE[1]], colorE = [ColorsE[2]]

function preLoad(){
   frameRate(60)
}

function setup() {
   canvas1 = createCanvas(800,450)
   canvas1 = document.getElementById("defaultCanvas0")
   // document.getElementById("menu").appendChild(canvas1)
   createWE()
   createFE()
   controls = loadImage('https://images.squarespace-cdn.com/content/v1/589376a08419c2eaad94f804/1518089749760-K6F5JEQ023JKP9EHPVO6/ke17ZwdGBToddI8pDm48kFzVpFyn1_mjLss8Ivjg-PtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzf-JQrFS3jy504ZOdPVDA6-Jh-2ILvKKrvX2kYXjziMm1AGh9ngs0kVOCKWSStsRk/wasd2.png?format=750w')
}

function draw() {
   const body = document.body.style
   const menu = document.getElementById("menu")
   const menuDiv = document.getElementById("menuDiv")

   if(initialize){
      fill(0)
      noStroke()
      textAlign(CENTER)
      textSize(30)
      text('.:Press any key to begin:.',width/2,100)
      textSize(20)
      fill(colorP1[0],colorP1[1],colorP1[2])
      text('Player 1',width * 0.33 + 29,180)
      fill(colorP2[0],colorP2[1],colorP2[2])
      text('Player 2',width * 0.66 - 19,180)
      imageMode(CENTER)
      image(controls,width/2 + 11,320)
      Playerplayer1()
      Playerplayer2()
      if(keyIsPressed){
         initialize = false
      }
   }
   else if(pause){
      fill(255)
      noStroke()
      textSize(30)
      text('Game in pause',width/2,250)
   }
   else{
      if(!itsOver){
         body.backgroundColor = '#000'
         menu.style.color = "#eee"
         menu.style.borderColor = "#333"
         menuDiv.style.color = "#eee"
         game()
      }
      else{
         clear()
         body.backgroundColor = '#fff';
         menu.style.color = "#333"
         menu.style.borderColor = "#eee"
         menuDiv.style.color = "#333"

         line(0,0,800,0)
         line(800,0,800,450)
         line(800,450,0,450)
         line(0,450,0,0)
         for (let i=0; i<player1Elementals.length; i++) {
            player1Elementals[i].show()
         }
         for(let i=0; i<player2Elementals.length;i++){
            player2Elementals[i].show()
         }
         for(let i=0; i<ghosts.length;i++){
            ghosts[i].show()
         }
         fill(colorP1[0],colorP1[1],colorP1[2])
         // strokeWeight(2)
         // stroke(10,10,200)
         ellipse(xplayer1W,yplayer1W,30,30)

         fill(colorP2[0],colorP2[1],colorP2[2])
         // strokeWeight(2)
         // stroke(200,0,0)
         ellipse(xplayer2W,yplayer2W,30,30)

         textSize(100)
         fill(0)
         noStroke()
         text('Score: '+score,width/2,200)
         textSize(30)
         if(whoLost == 'player1'){
            text('Player 1 was killed',width/2,250)
         }
         else if(whoLost == 'player2'){
            text('Player 2 was killed',width/2,250)
         }
         else{
            text('Players touched',width/2,250)
         }
         textSize(11)
         text('Press R to start again',width/2,300)
         if(keyIsDown(82)){
            itsOver = false
            xplayer1W = 200, yplayer1W = 225, xplayer2W = 600, yplayer2W = 225
            player1Elementals.length = 0
            player2Elementals.length = 0
            ghosts.length = 0
            createWE()
            createFE()
            score = 0
            whoLost = 'both'
         }
      }
   }
}

function game(){
      background(0)

      drawBorders()
      player1Enemies()
      player2Enemies()
      ghostEnemies()

      moves()
      Playerplayer1()
      Playerplayer2()
      borders()
      if(PlayersColissionGameOver()){
        itsOver = true
      }
}

function player1Enemies(){
   for (let i=0; i<player1Elementals.length; i++) {
      player1Elementals[i].update()
      player1Elementals[i].show()
      /////////////////////        MOD       //////////////////////
      let coincide = player1Elementals[i].biggerenemiesMOD(i)
      if(coincide != false){
         //aca borraria el otro, con splice, esta abajo
         player1Elementals[i].bigger(player1Elementals[coincide].size)
         player1Elementals.splice(coincide,1)
      }

      // le tendria que agregar una especie de caracteristica para cuando lo printee, pero tambien tengo que borrar el otro
      ///////////////////////////////////////////////////////////// si le devuelvo solo el que consigue lo puedo hacer igual, pero tengo el mismo problema de que no se donde se guarda el valor que devuelve la funcion
      if(player1Elementals[i].touchplayer2()){
         whoLost = 'player2'
         itsOver = true

      }
      if(player1Elementals[i].touchplayer1()) {
         for(let j=0; j < player1Elementals[i].size; j ++){
            score++
            createWE()
            createG()
         }
         player1Elementals.splice(i,1)
         i--
      }
   }
}

function player2Enemies(){
   for(let i=0; i<player2Elementals.length;i++){
      player2Elementals[i].update()
      player2Elementals[i].show()
      if(player2Elementals[i].touchplayer1()){
         whoLost = 'player1'
         itsOver = true
      }
      if(player2Elementals[i].touchplayer2()){
         player2Elementals.splice(i,1)
         i--
         score++
         createFE()
         createG()
      }
   }
}

function ghostEnemies(){
   for(let i=0; i<ghosts.length;i++){
      ghosts[i].update()
      ghosts[i].show()
      ghosts[i].bounce()
      if(ghosts[i].touch()!=0){
         if(ghosts[i].touch() == 1){
            whoLost = 'player1'
         }
         else if(ghosts[i].touch() == 2){
            whoLost = 'player2'
         }
         itsOver = true
      }
   }
}

function drawBorders(){
   let lineColor,xRightLine,yDownLine,xLeftLine,yUpLine,xtotalpos,ytotalpos

   xtotalpos = (xplayer1W + xplayer2W)/2
   ytotalpos = (yplayer1W + yplayer2W)/2
   xRightLine = map(xtotalpos, 0,800 , 10,60)
   yDownLine = map(ytotalpos, 0,450 , 10,60)
   xLeftLine = 70 - xRightLine
   yUpLine = 70 - yDownLine

   stroke(yUpLine)
   line(0,0,800,0) //arriba
   stroke(xRightLine)
   line(800,0,800,450)	//derecha
   stroke(yDownLine)
   line(800,450,0,450)	//abajo
   stroke(xLeftLine)
   line(0,450,0,0)	//izquierda
}

function showMenu(){
   const menu = document.getElementById("menuDiv")

   if(menu.style.visibility == "hidden"){
      menu.style.visibility = "visible"
   }
   else {
      menu.style.visibility = "hidden"
   }
}

function buttonL1(_n){
   n = _n
   document.getElementById("l1c" + 1).style.paddingBottom = ""
   document.getElementById("l1c" + 2).style.paddingBottom = ""
   document.getElementById("l1c" + 3).style.paddingBottom = ""
   document.getElementById("l1c" + 4).style.paddingBottom = ""
   document.getElementById("l1c" + n).style.paddingBottom = "3px";

   colorP1 = ColorsP[n-1]
   colorP1e = ColorsE[n-1]
}

function buttonL2(_n){
   n = _n
   document.getElementById("l2c" + 1).style.paddingBottom = ""
   document.getElementById("l2c" + 2).style.paddingBottom = ""
   document.getElementById("l2c" + 3).style.paddingBottom = ""
   document.getElementById("l2c" + 4).style.paddingBottom = ""
   document.getElementById("l2c" + n).style.paddingBottom = "3px";

   colorP2 = ColorsP[n-1]
   colorP2e = ColorsE[n-1]
}

function buttonL3(_n){
   n = _n
   document.getElementById("l3c" + 1).style.paddingBottom = ""
   document.getElementById("l3c" + 2).style.paddingBottom = ""
   document.getElementById("l3c" + 3).style.paddingBottom = ""
   document.getElementById("l3c" + 4).style.paddingBottom = ""
   document.getElementById("l3c" + n).style.paddingBottom = "3px";

   colorE = ColorsE[n-1]
}

function keyTyped(){
   if(key === 'p' || key === 'P'){
      pause = !pause
   }
}

/*calculando el angulo:

function angulo(_thisx, _thisy){

   let distx, disty, angulo, thisx, thisy//, aGrados= 180.0 / PI

   thisx = _thisx
   thisy = _thisy

   distx = xplayer2W - thisx
   disty = yplayer2W - thisy

   if(distx === 0){
      if(disty > 0){
         angulo = 270
      }
      else{
         angulo = 90
      }
      return angulo
   }

   let aux = disty / distx
   angulo = Math.atan(aux)   //      <---- en realidad esto hace todo solo xd

   angulo *= 180.0 / PI //aGrados
   return angulo
}*/




/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

               elementals.js

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



class Player1Elemental{
   constructor(_x,_y){
      this.x = _x
      this.y = _y
      /////////////////////        MOD       //////////////////////
      this.size = 1
      /////////////////////////////////////////////////////////////
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
      ellipse(this.x,this.y,15*this.size,15*this.size)
   }
   touchplayer2(){
      let distplayer1Elemental
      distplayer1Elemental = dist(xplayer2W,yplayer2W,this.x,this.y);

      //if(distplayer1Elemental < 22.5){ //22.5 = r1+r2 MODDDD
      if(distplayer1Elemental < 7.5*this.size+15){
         return true
      }
      return false
   }
   touchplayer1(){
      let distplayer1Player
      distplayer1Player = dist(xplayer1W,yplayer1W,this.x,this.y);

      //if(distplayer1Player < 22.5){ //22.5 = r1+r2   MODDDD
      if(distplayer1Player < 7.5*this.size+15){
         return true
      }
      return false
   }
   /////////////////////        MOD       //////////////////////
   biggerenemiesMOD(_k){
      let k = _k
      for (let i = 0;i < player1Elementals.length; i++) {

         if(i != k){
            let distance = dist(this.x,this.y,player1Elementals[i].x,player1Elementals[i].y)

            if(distance < 7.5*(this.size+player1Elementals[k].size)){
               return i
            }
         }
      }
      return false
   }

   bigger(_plus){
      let plus = _plus
      this.size += plus
   }
   /////////////////////////////////////////////////////////////
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
*/
