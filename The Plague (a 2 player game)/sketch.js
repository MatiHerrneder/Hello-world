/*
                                 Cute little game by Matías Herrneder :)
                                                                                                               */
var xplayer1W = 293, yplayer1W = 225, xplayer2W = 509, yplayer2W = 225
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
   createCanvas(800,450)
   // canvas1 = document.getElementById("defaultCanvas0")
   // document.getElementById("menu").appendChild(canvas1)
   createWE()
   createFE()
   controls = loadImage('controls.png')
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
      return
   }
   else{
      if(!itsOver){
         body.backgroundColor = '#000';
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
      if(player1Elementals[i].touchplayer2()){
         whoLost = 'player2'
         itsOver = true

      }
      if(player1Elementals[i].touchplayer1()) {
         player1Elementals.splice(i,1)
         i--
         score++
         createWE()
         createG()
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
   document.getElementById("l1c" + n).style.paddingBottom = "4px";

   colorP1 = ColorsP[n-1]
   colorP1e = ColorsE[n-1]
}

function buttonL2(_n){
   n = _n
   document.getElementById("l2c" + 1).style.paddingBottom = ""
   document.getElementById("l2c" + 2).style.paddingBottom = ""
   document.getElementById("l2c" + 3).style.paddingBottom = ""
   document.getElementById("l2c" + 4).style.paddingBottom = ""
   document.getElementById("l2c" + n).style.paddingBottom = "4px";

   colorP2 = ColorsP[n-1]
   colorP2e = ColorsE[n-1]
}

function buttonL3(_n){
   n = _n
   document.getElementById("l3c" + 1).style.paddingBottom = ""
   document.getElementById("l3c" + 2).style.paddingBottom = ""
   document.getElementById("l3c" + 3).style.paddingBottom = ""
   document.getElementById("l3c" + 4).style.paddingBottom = ""
   document.getElementById("l3c" + n).style.paddingBottom = "4px";

   colorE = ColorsE[n-1]
}

function keyTyped(){
   if(key === 'p' || key === 'P'){
      pause = !pause
   }
}
