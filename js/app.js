class Character {
    constructor(row, col, x, y, sprite) {
        this.row = row;
        this.col = col;
        
        this.x = x;
        this.y = y;

        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor(position) {
        let row = 83;
        let col = 101;
        
        let x = col * -1 * Math.random();
        let y = row * position;

        let sprite = 'images/enemy-bug.png';

        super(row, col, x, y, sprite);

        this.speed = Math.random() * (3 - .5) + .5;
    }

    move(dt) {
        this.x += this.col * this.speed * dt;
        if(this.x > 505) {
            this.x = this.col * -1 * Math.random();
            this.speed = Math.random() * (3 - .5) + .5;
        }
    }

    update(dt) {        
        this.move(dt);
    }
}

class Player extends Character {
    constructor(char) {
        let row = 83;
        let col = 101;

        let x = col * 2;
        let y = row * 5;

        let sprite = `images/char-${char}.png`;

        super(row, col, x, y, sprite);

        this.allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    }

    wonTheGame() {
        this.x = this.col * 2;
        this.y = this.row * 5;
        this.allowedKeys = null;
        setTimeout(() => {
            if(this.y === this.row * 5) {
                alert('Congratulations! YOU WON!');
                location.reload();
            }                
        }, 1000)
    }

    update(won) {
        if(won) {
            this.wonTheGame();
        }
    }

    handleInput(key) {
        switch (key) {
            case 'up':
                this.y === 0 ? this.y : this.y -= this.row;
            break;
        
            case 'down':
                this.y === 415 ? this.y : this.y += this.row;
            break;
            
            case 'left':
                this.x === 0 ? this.x : this.x -= this.col;
            break;
            
            case 'right':
                this.x === 404 ? this.x : this.x += this.col;
            break;
            
        }
    }
}

var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
var player = new Player('boy');

document.addEventListener('keyup', function(e) {
    var allowedKeys = player.allowedKeys;
    if(allowedKeys) player.handleInput(allowedKeys[e.keyCode]);
});