var dog,sadDog,happyDog,bedroom,garden,washroom,livingroom;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState;
var currentTime;
function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bedroom=loadImage("Images/Bed Room.png");
garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/Wash Room.png");
livingroom=loadImage("Images/Living Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  currentTime=hour();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   textSize(25)
   text(gameState,230,190);



 if(currentTime==lastFed)
 {gameState="Happy";  
 foodObj.updategameState(gameState);
 feed.hide();
 addFood.hide();
 foodStock.remove();
 dog.addImage(happyDog);
 dog.scale=0.7;
 dog.x=700;
 }
  else if(currentTime-lastFed===1)
   { feed.hide();
    addFood.hide();
    foodStock.remove();
   gameState="Playing";
   foodObj.updategameState(gameState);
   dog.addImage(garden);
   dog.x=700;
   dog.scale=0.5;
   }
   else if(currentTime-lastFed==2)
   {
   
     feed.hide();
     addFood.hide();
     foodStock.remove();
     gameState="Rest";
     foodObj.updategameState(gameState);
     console.log("Rest"); 
     dog.addImage(livingroom);
     dog.x=700;
     dog.scale=0.7;
   }
   else if(currentTime-lastFed==3)
   {
   
     feed.hide();
     addFood.hide();
     foodStock.remove();
     gameState="Bathing";
     foodObj.updategameState(gameState);
     console.log("Bathing"); 

     dog.addImage(washroom);
     dog.x=700;
     dog.scale=0.7;
   }
   else if(currentTime-lastFed==4)
   {
   
    feed.hide();
    addFood.hide();
    //dog.remove();
    foodStock.remove();
  // foodObj.garden();
   gameState="Happy";
   foodObj.updategameState(gameState);
   //console.log("Playing");
   dog.addImage(happyDog);
   dog.x=700;
   dog.scale=0.6
   }
   else if(currentTime-lastFed==5)
   {
   
     feed.hide();
     addFood.hide();
     foodStock.remove();
     gameState="Sleep";
     foodObj.updategameState(gameState);
     console.log("Sleep"); 

     dog.addImage(bedroom);
     dog.x=700;
     dog.scale=0.7;
   }
   else  if(currentTime-lastFed>5)
   {feed.show();
    addFood.show();
   // dog.show();
    foodObj.display();
    dog.addImage(sadDog);
    dog.x=700;
    dog.scale=0.7;
    gameState="Hungry";
    foodObj.updategameState(gameState);
    console.log("Hungry");
   }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  //dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}