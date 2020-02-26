const wordEl = document.getElementById('word');
const wrongContainer = document.getElementById('wrong-letter-container');
const message = document.getElementById('message');
const showMessage = document.getElementById('show-message');
const figureParts = document.querySelectorAll('.figure-part');
const popupContainer = document.getElementById('popup-container');
const popupMsg = document.querySelector('.popup h2');
const playagain = document.getElementById('playagain');

let words = ['application', 'programming', 'mathematics', 'interface'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = []
let wrongLetters = []

function displayWord() {
  wordEl.innerHTML = '';
  wordEl.innerHTML = selectedWord.split('').map(letter => {
    return `<h3 class="letter">${correctLetters.includes(letter) ? letter : ''}</h3>`
  }).join('');

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (selectedWord === innerWord) {
    //show popup for you won
    popupMsg.innerText = " You won ";
    popupContainer.style.display = 'flex';
  }

}

function showNotification(msg) {
  message.innerText = msg;
  showMessage.classList.add('show');
  setTimeout(() => {
    showMessage.classList.remove('show')
  }, 2000);
}

function showWrongLetter() {
  wrongContainer.innerHTML = `<p> Wrong Letters </p><span>${wrongLetters}</span>`;

  figureParts[wrongLetters.length - 1].style.display = 'block';

  if (figureParts.length - 1 === wrongLetters.length - 1) {
    //show game lost pop up
    popupMsg.innerText = " You Lost ";
    popupContainer.style.display = 'flex';

  }
}

function onKeyPressHandler(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(e.key)) {
      if (correctLetters.includes(e.key)) {
        showNotification(`you have already entered ${e.key}`);
      }
      else {
        correctLetters.push(e.key);
        displayWord();
      }
    } else {
      wrongLetters.push(e.key);
      showWrongLetter();
    }
  }
}

window.addEventListener('keydown', onKeyPressHandler);
playagain.addEventListener('click', () => {
  location.reload();
})

displayWord();