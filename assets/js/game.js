const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score');
const attemptsDisplay = document.querySelector('.attempts');
const pairsDisplay = document.querySelector('.pairs');

const characters = [
  'dio',
  'iggy',
  'jotaro',
  'macaco',
  'MorteTreze',
  'polnareff',
  'joseph',
  'senhora',
  'veio',
  'holHorse',
];

const POINTS_PER_PAIR = 100;
const PENALTY_WRONG = 10;
const TOTAL_PAIRS = characters.length;

let score = 0;
let attempts = 0;
let pairsFound = 0;
let secondsElapsed = 0;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const updateScoreDisplay = () => {
  if (scoreDisplay) scoreDisplay.innerHTML = score;
  if (attemptsDisplay) attemptsDisplay.innerHTML = attempts;
  if (pairsDisplay) pairsDisplay.innerHTML = `${pairsFound}/${TOTAL_PAIRS}`;
}

const showScoreAnimation = (points, isPositive) => {
  const popup = document.createElement('div');
  popup.className = `score-popup ${isPositive ? 'score-popup--positive' : 'score-popup--negative'}`;
  popup.textContent = isPositive ? `+${points}` : `-${points}`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

const calculateBonus = (seconds) => {
  if (seconds <= 30) return 500;
  if (seconds <= 60) return 300;
  if (seconds <= 90) return 150;
  if (seconds <= 120) return 50;
  return 0;
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === TOTAL_PAIRS * 2) {
    clearInterval(this.loop);

    const bonus = calculateBonus(secondsElapsed);
    score += bonus;
    updateScoreDisplay();

    const finalTime = timer.innerHTML;

    setTimeout(() => {
      showEndGameModal(finalTime, bonus);
    }, 500);
  }
}

const showEndGameModal = (finalTime, bonus) => {
  const modal = document.createElement('div');
  modal.className = 'end-modal';
  modal.innerHTML = `
    <div class="end-modal__content">
      <h2 class="end-modal__title">🎉 Parabéns!</h2>
      <p class="end-modal__player">${spanPlayer.innerHTML}</p>
      <div class="end-modal__stats">
        <div class="end-modal__stat">
          <span class="end-modal__stat-label">⏱ Tempo</span>
          <span class="end-modal__stat-value">${finalTime}s</span>
        </div>
        <div class="end-modal__stat">
          <span class="end-modal__stat-label">🎯 Tentativas</span>
          <span class="end-modal__stat-value">${attempts}</span>
        </div>
        <div class="end-modal__stat">
          <span class="end-modal__stat-label">⚡ Bônus velocidade</span>
          <span class="end-modal__stat-value end-modal__stat-value--bonus">+${bonus}</span>
        </div>
        <div class="end-modal__stat end-modal__stat--total">
          <span class="end-modal__stat-label">🏆 Pontuação Final</span>
          <span class="end-modal__stat-value end-modal__stat-value--score">${score}</span>
        </div>
      </div>
      <button class="end-modal__btn" onclick="location.reload()">Jogar Novamente</button>
    </div>
  `;
  document.body.appendChild(modal);
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');
  attempts++;

  if (firstCharacter === secondCharacter) {
    score += POINTS_PER_PAIR;
    pairsFound++;
    showScoreAnimation(POINTS_PER_PAIR, true);

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    updateScoreDisplay();
    checkEndGame();

  } else {
    score = Math.max(0, score - PENALTY_WRONG);
    showScoreAnimation(PENALTY_WRONG, false);

    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);

    updateScoreDisplay();
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    secondsElapsed++;
    timer.innerHTML = secondsElapsed;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  updateScoreDisplay();
  startTimer();
  loadGame();
}
