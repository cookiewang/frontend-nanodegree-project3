//Define 3 Y axis for Enemy instances. increase 83 axis for each
var yPath = [65, 148, 231];
//Define random number for x axis speed
var randomNumber = 0;
var score = 0;
var ctx = null;
// Enemies our player must avoid
var Enemy = function (y) {
    this.sprite = 'images/enemy-bug.png';
    //Init x value for moving in from left
    this.x = -100;
    //Random select Y axis from one of 3 choices
    this.y = yPath[y];
    //Get a random number and a random speed value.
    randomNumber = (Math.random() * 100);
    this.speed = Math.floor(randomNumber + 150);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function () {
    this.x = 200;
    this.y = 400;
    this.ctlKey = null;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function () {
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x !== 400) {
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up') {
        if (this.y > 83) {
            this.y = this.y - 83;
        } else {
            this.reset(1);
        }
    } else if (this.ctlKey === 'down' && this.y !== 400) {
        this.y = this.y + 83;
    }
    this.ctlKey = null;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
    this.ctlKey = key;
};
Player.prototype.reset = function (inputScore) {
    this.x = 200;
    this.y = 400;
    score += inputScore;
    if (score < 0) {
        score = 0;
    }
    document.getElementById('score').innerHTML = score;
};

// Place the player object in a variable called player
var player = new Player();
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = -100;
        randomNumber = (Math.random() * 100);
        this.speed = Math.floor(randomNumber + 150);
    }
    if (player.y >= this.y - 38 && player.y <= this.y + 38) {
        if (player.x >= this.x - 50 && player.x <= this.x + 50) {
            player.reset(-1);
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
