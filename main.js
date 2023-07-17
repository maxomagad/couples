import { Card } from "./card.js"

let buttonStart = document.getElementById('buttonStart');
let buttonRestart = document.getElementById('buttonRestart');
let timerCount = document.getElementById('timer');

function startGame(container, cardsCount) {
  let cardNumberArray = [];
  let cardArray = [];
  let firstCard = null;
  let secondCard = null;
  //создание массива через цикл
  for (let i = 1; i <= cardsCount / 2; i++) {
    cardNumberArray.push(i)
    cardNumberArray.push(i)
  }
  //перемешивание массива
  cardNumberArray = cardNumberArray.sort(() => Math.random() - 0.5)
  //создание карточек через класс
  for (const cardNumber of cardNumberArray) {
    cardArray.push(new Card(container, cardNumber, flip))
  }
  //условия сравнения карточек
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number == secondCard.number) {
          firstCard.success = true
          secondCard.success = true
          firstCard = null
          secondCard = null
        }
      }
      //условие победы
      if (document.querySelectorAll('.card.success').length == cardNumberArray.length) {
        if (alert('Вы победили!') == true) { } else {
          buttonRestart.removeAttribute("hidden")
        }
        clearInterval(timer)
      }
    }
  }
  //таймер + условие проигрыша
  let seconds = 59;
  timer = setInterval(function () {
    if (seconds < 0) {
      clearInterval(timer);
      if (alert('Время закончилось. \nВы проиграли!') == true) { } else {
        buttonRestart.removeAttribute("hidden")
      }
    } else {
      timerCount.innerHTML = 'Оставшееся время: 0:' + `${seconds}`;
    }
    seconds--;
  }, 1000)
}
//кнопка старта игры
buttonStart.addEventListener('click', function () {
  let cardsCount = document.getElementById('cardsCount').value;
  if (cardsCount <= 1 || cardsCount >= 11) {
    cardsCount = 4
    document.getElementById('cardsCount').value = 4
  }
  buttonStart.setAttribute("disabled", "")
  buttonRestart.setAttribute("hidden", "")
  startGame((document.getElementById('game')), cardsCount)
});
//кнопка рестарта игры
buttonRestart.addEventListener('click', function () {
  buttonStart.removeAttribute("disabled", "")
  buttonRestart.setAttribute("hidden", "")
  //стираение игры
  document.getElementById('game').innerHTML = ""
  let cardNumberArray = [];
  let cardArray = [];
  let firstCard = null;
  let secondCard = null;
  timerCount.innerHTML = 'Оставшееся время: 1:00'
});
//запрет писать что-то кроме цифр в инпуте
document.getElementById('cardsCount').addEventListener("keyup", function(){
  this.value = this.value.replace(/[^\d]/g, "");
});
