var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var food_stock_val;
//crea aquí las variables feed y lastFed 
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
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

  //crea aquí el boton Alimentar al perro
  alimentarPerro=createButton("alimentar al perro");
  alimentarPerro.position(950,95);
  alimentarPerro.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime = database.ref ('FeedTime');
  fedTime.on ("value",function(data){
    lastFed = data.val() 
  });
  

  if (lastFed >= 12){
text ("ultima hora que se alimento:" + lastFed % 12 + "PM", 350, 30)
  }
 else if (lastFed== 0){
   fill ("red");
  text ("Ultima hora que se alimento: 12 PM", 350, 30);

 }
 else {
  fill ("red");

  text ("Ultima hora que se alimento:" + lastFed + "AM", 350, 30);

 }

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  // food_stock_val = fooObj.getFoodStock();
  if (foodObj.getFoodStock () <= 0){
    foodObj.updateFoodStock (foodObj.getFoodStock() *0);
  }
  else {
    foodObj.updateFoodStock (foodObj.getFoodStock() -1); 
  }
   //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
database.ref ('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour ()


})
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
