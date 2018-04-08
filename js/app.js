var Enemy = function(position) {
    this.row = 83
    this.col = 101
    
    this.x = this.col * -1 * Math.random()
    this.y = this.row * position

    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * (3 - .5) + .5;
};

Enemy.prototype.update = function(dt) {
    if(player.y !== 0) {
        this.x += this.col * this.speed * dt
        if(this.x > 505) {
            this.x = this.col * -1 * Math.random()
            this.speed = Math.random() * (3 - .5) + .5
        }
    } else {
        this.y += this.row/5
        if(this.y > 1000) {
            player.x = this.col * 2
            player.y = this.row * 5
            player.allowedKeys = null
            setInterval(() => {
                if(player.y === this.row * 5) {
                    alert('Congratulations! YOU WON!')
                    location.reload()
                }                
            }, 1000)
        }
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(char) {
    this.row = 83
    this.col = 101

    this.x = this.col * 2
    this.y = this.row * 5

    this.sprite = `images/char-${char}.png`
    this.allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
}

Player.prototype.update = function() {
    for(enemy of allEnemies) {
        if((enemy.x +50 > this.x && enemy.x < this.x +50) && (enemy.y +50 > this.y && enemy.y < this.y +50)) {
            alert('Try Again')
            location.reload()
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y === 0 ? this.y : this.y -= this.row
        break;
    
        case 'down':
            this.y === 415 ? this.y : this.y += this.row
        break;
        
        case 'left':
            this.x === 0 ? this.x : this.x -= this.col
        break;
        
        case 'right':
            this.x === 404 ? this.x : this.x += this.col
        break;
        
    }
}

var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)]
var player = new Player('boy')

document.addEventListener('keyup', function(e) {
    var allowedKeys = player.allowedKeys
    if(allowedKeys) player.handleInput(allowedKeys[e.keyCode]);
});
