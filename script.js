let score = document.querySelector('.score');
let gameScreen = document.querySelector('.gameScreen');
let startScreen = document.querySelector('.startScreen');


startScreen.addEventListener('click', startGame);

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);


let controls = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5, // 5px per sec
    score: 0,
    start: false
}
function moveLines(){
    let lines=document.querySelectorAll(".line")
    lines.forEach(function(item){
console.log(item.y);
if(item.y>750){
    item.y -=750;
}
item.y+=player.speed;
item.style.top = item.y+"px"
    });
}
function moveEnemy(){
    let enemies=document.querySelectorAll("enemy")
    enemies.forEach(function(item){
console.log(item.y);
if(item.y>750){
    item.y -=750;
}
item.y+=player.speed;
item.style.top = item.y+"px"
    });
}
function start() {
    let car = document.querySelector('.car');
    let road = gameScreen.getBoundingClientRect();
    console.log(road);

   moveLines();
   moveEnemy();
    let carRect = car.getBoundingClientRect();
    console.log(carRect)
    // move the car
    console.log(player.x, player.y, player.speed)

    if (controls.ArrowUp && player.y > road.top) {
        player.y = player.y - player.speed;
    }

    if (controls.ArrowDown && player.y < road.bottom-(carRect.height + carRect.height/2)) {
        player.y = player.y + player.speed;
    } 

    if (controls.ArrowLeft && player.x > 0) {
        player.x = player.x - player.speed;
    }

    if (controls.ArrowRight && player.x < road.right-(carRect.width)*10) {
        player.x = player.x + player.speed;
    }



    if (player.start) {
        car.style.top = player.y + "px";

        car.style.left = player.x + "px";

        requestAnimationFrame(start);
    }
}

function keyPressed(e) {
    console.log("Pressed", e.key);
    //console.log(e.key, controls.e.key)
    if (controls[e.key] == false) {
        controls[e.key] = true;
        //   console.log(controls);
    }
}

function keyReleased(e) {
    console.log("Released", e.key);
    if (controls[e.key] == true) {
        controls[e.key] = false;
        // console.log(controls);
    }
}

// startScreen.classList.add('hide');
function startGame() {

player.start = true

    // add or remove a class from certain element
    // console.log(startScreen.classList)
    
    startScreen.classList.add('hide');
    gameScreen.classList.remove('hide');

    // create a car
   for(let x=0;x<5;x++){
    let div=document.createElement("div")
    div.classList.add("line")
    div.y=x*150;
    div.style.top = (x*150)+"px";
    gameScreen.appendChild(div);
   }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "Car";
    // car.style.left = "10px";
    // car.style.top = "10px";

    // car.style.backgroundColor = "red";
    gameScreen.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    requestAnimationFrame(start)
    for(let x=0;x<5;x++){
        let enemy=document.createElement("div")
        enemy.classList.add("enemy")
        enemy.y=((x+1)*750)*-1;
        enemy.style.left= Math.floor(Math.random()*150)+"px";
        enemy.style.backgroundColor="red";
        gameScreen.appendChild(enemy);
       }

}
