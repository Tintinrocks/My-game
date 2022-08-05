
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var points=0;
var batterImg;
var batterImg2;
var batterUp;
var hurt = false;

function preload(){
  batterImg = loadImage('Batter1-removebg-preview.png');
  batterAni = loadAnimation("Batter1-removebg-preview.png","Batter2-removebg-preview.png","Batter3-removebg-preview.png","Batter4-removebg-preview.png","Batter5-removebg-preview.png","Batter6-removebg-preview.png","Batter7-removebg-preview.png");
  batterImg2 = loadImage('Hurt_baseball_player-removebg-preview.png');
  
  batterAni.playing = true;
  batterAni.looping = true;
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine=Engine.create();
  world = engine.world;
  var batter_options ={
    isStatic:true
  }
  var ball_options ={
    isStatic:false,
    restitution:1.3,
  }
  batter = Bodies.rectangle(400,400,200,200,batter_options);
  ball = Bodies.circle(1000,400,50,ball_options);
  World.add(world,ball);
  World.add(world,batter);
 
}


function draw() {
  background(51);
  textSize(20);
  text("Points: " + points, 100,100)
  Engine.update(engine); 
  ellipse(ball.position.x,ball.position.y,50);
  if(keyDown("SPACE") && hurt == false){
    animation(batterAni, batter.position.x,batter.position.y,200,200);
    batterUp=true;
  } else{
    image(batterImg, batter.position.x-50,batter.position.y-100,200,200);
    batterUp=false
  }
  if(Matter.SAT.collides(batter, ball).collided && batterUp == true && hurt == false){
    points = points + 1;
  } else{
    if(hurt == true){
    image(batterImg2, batter.position.x-50,batter.position.y-100,200,200)
    }
  }
  if(batterUp == false&&Matter.SAT.collides(batter, ball).collided){
    hurt=true;
  }
  if(keyDown("UP_ARROW")){
    Matter.Body.applyForce(ball, {x:0,y:0}, {x:-0.05,y:-0.05});
  }
  if(ball.position.x < 0||ball.position.x > 1261||ball.position.y > 969|| ball.position.y < 0){
    ball.position.x = 1000;
    ball.position.y = 400;
  }
}

