const words = [
  'plataforma5', 'black', 'summer', 'flea', 'aeroplane','peppers', 'unlimited', 'arcadium', 'love', 'getaway', 'stadium', 'quarter', 'snow', 'dylan', 'zephyr', 'funky', 'chili'
];

// Referencias del DOM
const wordEl = document.getElementById('randomWord');
const inputEl = document.getElementById('text');
const timeSpan = document.getElementById('timeSpan');
const scoreEl = document.getElementById('score');
const endGameContainer = document.getElementById('end-game-container');
const mainContainer = document.querySelector('.main');

// Variables de estado
let palabraAleatoria;
let score = 0;
let time = 10;

// Función para obtener palabra aleatoria
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Función para agregar palabra al DOM
function addToDOM() {
  palabraAleatoria = getRandomWord();
  wordEl.textContent = palabraAleatoria;
}
addToDOM();

// input
inputEl.addEventListener('input', function (e) {
  const palabraIngresada = e.target.value.trim();
  if (palabraIngresada === palabraAleatoria) {
    addToDOM();
    updateScore();
    e.target.value = '';
    if (time < 20) {
    time = Math.min(time + 3, 20);}
  }
});

// Temporizador
function actualizarTiempo() {
  time--;
  timeSpan.textContent = `${time}s`;

  if (time === 0) {
    clearInterval(intervaloTiempo);
    gameOver();
  }
}

const intervaloTiempo = setInterval(actualizarTiempo, 1000);

// Actualizar Score
function updateScore() {
  score++;
  scoreEl.textContent = score;
    if (score >= 100) {
    clearInterval(intervaloTiempo);
    gameOver();
    }
}

function getMemeByScore()
{
  if(score <= 10){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnRWqbN7StDtWb5d-8FVYGfL5d3MjDyyI5w&s";
  }
  else if(score <= 30){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Rn3kMvHuDSUR6zXXUr2deIPmuVJfNz0loI1b7CPvm4Iiawfmg8ilXTQCnapaZ137Elk&usqp=CAU";
  }
  else if (score <= 50){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstLEdGkVQQ4IrZ-uU-eYhsTYoiLIl3RGGlA&s";
  }
  else if (score <= 70){
    return "https://r1.community.samsung.com/t5/image/serverpage/image-id/4836490i4DE1C2392C63064A/image-size/large?v=v2&px=999";
  }
  else if (score <= 90){
    return "https://estudiafeliz.com/wp-content/uploads/2015/03/tan_cerca.jpg?w=640";
  }
  else{
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6WZyd0qFwckPIEI1Bdy1J0y5C7eA-HQqFQ&s";
  }
}

// Game Over
function gameOver() {
  const memeUrl = getMemeByScore(score)
  mainContainer.remove();
  endGameContainer.innerHTML = `
    <h1>¡Se terminó el tiempo!</h1>
    <p>Tu puntuación final fue: ${score}</p>
    <img src="${memeUrl}" alt="Meme final" style="max-width:100%; height:auto; border-radius:10px; margin-top: 1rem;"/>
    <br><br>
    <button onclick="location.reload()">Reiniciar</button>`;
}