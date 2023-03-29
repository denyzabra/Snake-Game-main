/**const canvas = document.getElementById('game');
const ctx  = canvas.getContext('2d');

let speed =  7;
let tileCount =  20;
let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;

//game loop  
function drawGame(){
    clearScreen();
    changeSnakePosition();
    checkAppleCollision();
    drawApple();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width,canvas.height);
}
function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = math.floor(math.random() * tileCount);
        appleY = math.floor(math.random() * tileCount);
    }
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount,appleY * tileCount,tileSize,tileSize)
}
function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize)
}
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 40){
        if(xVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }

}
drawGame();*/
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale;
    this.ySpeed = 0;
    this.tail = [];
    this.total = 0;
  }

  draw() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = { x: this.x, y: this.y };
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) this.x = 0;
    if (this.y > canvas.height) this.y = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y < 0) this.y = canvas.height;
  }

  changeDirection(direction) {
    switch (direction) {
      case 'Up':
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case 'Down':
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      case 'Left':
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case 'Right':
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
    }
  }

  eat(food) {
    if (this.x === food.x && this.y === food.y) {
      this.total++;
      return true;
    }
    return false;
  }
}

class Food {
  constructor() {
    this.x = (Math.floor(Math.random() * columns)) * scale;
    this.y = (Math.floor(Math.random() * rows)) * scale;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}

const snake = new Snake();
const food = new Food();

window.setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  food.draw();
  snake.update();
  snake.draw();

  if (snake.eat(food)) {
    food.x = (Math.floor(Math.random() * columns)) * scale;
    food.y = (Math.floor(Math.random() * rows)) * scale;
  }
}, 250);

window.addEventListener('keydown', (event) => {
  const direction = event.key.replace('Arrow', '');
  snake.changeDirection(direction);
});
