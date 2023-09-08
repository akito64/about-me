const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let balls = [];
const numOfBalls = 50;

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

    // ... [コードは変わっていません]

    update() {
        // 画面サイズが変わると、ボールがキャンバスの外側にいる可能性があるため、
        // ボールがキャンバスの外側にいる場合にキャンバスの内側に戻す
        if (this.x > this.canvas.width) {
            this.x = this.canvas.width - this.radius;
        }
        if (this.y > this.canvas.height) {
            this.y = this.canvas.height - this.radius;
        }
        
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
    balls = []; // 既存のボールをクリアしてから新しいボールを追加
    for (let i = 0; i < numOfBalls; i++) {
        let ball = new Ball(canvas);
        balls.push(ball);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw(ctx);
        balls[i].update();
    }
    requestAnimationFrame(animate);
}

// サイズを設定して、初回のボールを作成
setCanvasSize();
createBalls();
animate();

// ウィンドウサイズが変わるたびにキャンバスのサイズを更新
window.addEventListener('resize', function () {
    setCanvasSize();
    createBalls(); // キャンバスサイズが変わるたびにボールの位置をリセット
});
