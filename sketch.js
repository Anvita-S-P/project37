//Create variables here


var dog ,happyDog ,database , food,foodStock;
var dogImage,happyDogImage;
var feedPet,addFood,lastFed,feedTime,foodObj;
var gameState=0 ;
var bedroom,garden,washroom,bedRoomImage, gardenImage,washRoomImage;
var readState,changeState;
var sadDog,sadDogImage;






function preload()
{
  //load images here
  
 dogImage = loadImage("images/dogImg.png");
 happyDogImage = loadImage("images/dogImg1.png");
 bedRoomImage=loadImage("virtualpetimages/BedRoom.png");
 gardenImage=loadImage("virtualpetimages/Garden.png");
 washRoomImage=loadImage("virtualpetimages/WashRoom.png");
 sadDogImage.loadImage("virtualpetimages/deadDog.png");





}

function setup() {
  createCanvas(1000,400);
  
   dog=createSprite(700,250,20,20);
   dog.addImage(dogImage);
   dog.scale=0.2;
   database=firebase.database();
   foodStock=database.ref("food");
   foodStock.on("value",readStock);


foodObj=new Food();

feed=createButton("feed the dog");
feed.position(380,60);
feed.mousePressed(feedDog);

add=createButton("add Food")
add.position(800,60);
add.mousePressed(addFood);


feedTime=database.ref("feedTime");
feedTime.on("value",function(data){
  lastFed=data.val();
})

readState=database.ref("gameState");
readState.on("value",function(data){
  gameState=data.val();
})






  
}


function draw() {  

  background(46,139,87);
  //add styles here

  
  drawSprites();
    
   

  
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last fed : " +lastFed%12 + "PM" ,250,30);

  }
  else if(lastFed===0){
    text("last fed : 12AM",250,30);

  }
  else{
    text ("last fed : " + lastFed+"AM",250,30);

  }
 
if(gameState!="hungry"){
     feed.hide();
     dogFood.hide();
     dog.remove();

     
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);

}

currentTime=hour();
if(currentTime===(lastFed+1)){
  update("playing");
  foodObj.garden();
}
else if(currentTime===(lastFed+2)){
  update("sleeping");
  foodObj.bedroom();

}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("bathing");
  foodObj.washroom();
}
else{
  update("hungry");
  foodObj.display();
}


  
}


function readStock(data){
  food=data.val();
  foodObj.foodStock = food;
}


 


function addFood(){
  
    food++
    database.ref('/').update({
        food:food
    })
     
  
}

function feedDog(){
  dog.addImage(dogImage);
  foodObj.foodStock = foodObj.foodStock - 1;
  database.ref('/').update({
    food:foodObj.foodStock,
    feedTime:hour()
  })
}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}













