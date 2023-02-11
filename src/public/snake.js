const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

var state = {
    cols: 40,
    rows: 30,
    score: 0,
    tail: [],
    size: 20,
    gameOver: false,
    snake: {
        x: 0,
        y: 0
    },
    apple: {
        x: null,
        y: null
    },
    vel: {
        x: 0,
        y: 0
    }
}

canvas.width = state.cols * state.size;
canvas.height = state.rows * state.size;

class Square {
    constructor (x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

class Text {
    constructor (text, x, y, textAlign, fontSize) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.textAlign = textAlign;
        this.fontSize = fontSize;
    };

    draw() {
        ctx.fillStyle = "red";
        ctx.font = `${this.fontSize}px Montserrat`;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
    }
};

addEventListener("keydown", async({key}) => {
    switch (key) {
        case "w":
            state.vel.x = 0;
            state.vel.y = -1;
            break;
        case "s":
            state.vel.x = 0;
            state.vel.y = 1;
            break;
        case "a":
            state.vel.x = -1;
            state.vel.y = 0;
            break;
        case "d":
            state.vel.x = 1;
            state.vel.y = 0;
            break;
        case "ArrowUp":
            state.vel.x = 0;
            state.vel.y = -1;
            break;
        case "ArrowDown":
            state.vel.x = 0;
            state.vel.y = 1;
            break;
        case "ArrowLeft":
            state.vel.x = -1;
            state.vel.y = 0;
            break;
        case "ArrowRight":
            state.vel.x = 1;
            state.vel.y = 0;
            break;
        case "Enter":
            state.gameOver = false;
            state.size = 20;
            break;
        default:
            break;
    }
});

addEventListener("click", () => {
    state.gameOver = false;
    state.size = 20;
});

function generateApple() {
    state.apple.x = Math.floor(Math.random() * state.cols) * state.size;
    state.apple.y = Math.floor(Math.random() * state.rows) * state.size;
};

function gameOver() {
    state.score = 0;
    state.tail = [];
    state.size = 0;
    state.snake.x = 0;
    state.snake.y = 0;
    state.vel.x = 0;
    state.vel.y = 0;
    state.gameOver = true;
};

generateApple();

function loop() {
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        new Square(0, 0, canvas.width, canvas.height, "black").draw();
        new Square(state.snake.x, state.snake.y, state.size, state.size, "green").draw();
        new Square(state.apple.x, state.apple.y, state.size, state.size, "red").draw();

        state.snake.x += state.vel.x * state.size;
        state.snake.y += state.vel.y * state.size;

        if (state.snake.x == state.apple.x && state.snake.y == state.apple.y) {
            state.tail.push([ state.apple.x, state.apple.y ]);
            state.score++;
            generateApple();
        };

        for (var i=state.tail.length-1;i>=1;i--) {
            state.tail[i] = state.tail[i - 1];
        };

        if (state.tail.length) {
            state.tail[0] = [state.snake.x, state.snake.y];
        };

        for (var i=0;i<state.tail.length;i++) {
            new Square(state.tail[i][0], state.tail[i][1], state.size, state.size, "green").draw();
        };

        if (state.snake.x < 0 || state.snake.x > state.cols * state.size || state.snake.y < 0 || state.snake.y > state.rows * state.size) {
            gameOver();
        };

        if (state.gameOver) {
            new Text("Game Over!", canvas.width / 2, canvas.height / 2 - 20, "center", 50).draw();
            new Text("Click to restart Game", canvas.width / 2, canvas.height / 2 + 20, "center", 40).draw();
        };
    }, 100);
};

loop();