const ball = document.getElementById("ball");
const startBtn = document.getElementById("startBtn");

let posX = 0;
let posY = 0;
let velX = 1.2; // velocidad horizontal
let velY = 0.9; // velocidad vertical
let bouncing = false;

// 🎨 Función para color aleatorio
function randomColor() {
  const colors = ["#ff7675", "#74b9ff", "#55efc4", "#fdcb6e", "#a29bfe", "#fab1a0"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ✨ Animación de rebote (escala + color)
function bounceEffect() {
  Velocity(ball, { 
    scale: 1.3, 
    backgroundColor: randomColor() 
  }, { 
    duration: 200, 
    easing: "easeOutQuad", 
    loop: 1 
  });
}

function loop() {
  if (!bouncing) return;

  const gameArea = document.getElementById("gameArea");
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;
  const ballSize = ball.offsetWidth;

  posX += velX;
  posY += velY;

  // Rebote horizontal
  if (posX <= 0) {
    posX = 0;
    velX *= -1;
    bounceEffect();
  } else if (posX + ballSize >= areaWidth) {
    posX = areaWidth - ballSize;
    velX *= -1;
    bounceEffect();
  }

  // Rebote vertical
  if (posY <= 0) {
    posY = 0;
    velY *= -1;
    bounceEffect();
  } else if (posY + ballSize >= areaHeight) {
    posY = areaHeight - ballSize;
    velY *= -1;
    bounceEffect();
  }

  // Movimiento fluido
  ball.style.left = posX + "px";
  ball.style.top = posY + "px";

  requestAnimationFrame(loop);
}

startBtn.addEventListener("click", () => {
  if (!bouncing) {
    const gameArea = document.getElementById("gameArea");
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const ballSize = ball.offsetWidth;

    // Centrar pelota si es la primera vez
    if (posX === 0 && posY === 0) {
      posX = areaWidth / 2 - ballSize / 2;
      posY = areaHeight / 2 - ballSize / 2;
    }

    ball.style.transform = "none";
    ball.style.backgroundColor = randomColor(); // color inicial
    bouncing = true;
    startBtn.innerText = "⏹️ Detener";
    loop();
  } else {
    bouncing = false;
    startBtn.innerText = "▶️ Reanudar";
  }
});