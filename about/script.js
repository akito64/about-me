const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
const numOfBalls = 50;  // number of balls

class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;  // random velocity
        this.vy = (Math.random() - 0.5) * 2;  // random velocity
        this.radius = Math.random() * 20 + 5;  // smaller random radius
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'lightblue';  // lighter blue color
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }
        if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
}

function createBalls() {
    for(let i = 0; i < numOfBalls; i++) {
        let ball = new Ball(canvas);
        balls.push(ball);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < balls.length; i++) {
        balls[i].draw(ctx);
        balls[i].update();
    }
    requestAnimationFrame(animate);
}

createBalls();
animate();
