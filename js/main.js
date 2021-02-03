"use strict";
const body = document.querySelector('body');
// Открытие и закрытие модульных окон
const bgModal = document.querySelector('#shading'); // темный фон окон
const application = document.querySelector('#application'); // Онлайн заявка(btn)
const applicationModal = document.querySelector('#applicationModal');

const closeBtn = document.querySelectorAll('.close-btn');

console.log(applicationModal)
//applicationModal.classList.remove('modal--is-show');

// Устанавливает высоту bgModal
let bgModalHeight = setBgModalHeight();
application.addEventListener('click', slowModalApplication);

Array.from(closeBtn).forEach((el) => {
  el.addEventListener('click', function () { closeModal(el) })
});

function closeModal(el) {
  let modal = el.closest('.modal');
  modal.classList.remove('modal--is-show');
  bgModal.classList.remove('shading--is-show');
  console.log(modal)
}

// Открывает окна онлайн заявка
function slowModalApplication() {
  bgModal.classList.add('shading--is-show');
  applicationModal.classList.add('modal--is-show');
}





// Устанавливает высоту bgModal
function setBgModalHeight() {
  bgModal.style.height = window.innerHeight + 'px';
  console.log(window.innerHeight);
}



document.onclick = function (e) {
  let el = e.target;
  if (el.closest('.press-to-show')) {
    slow(el);
  }
}

function slow(el) {
  let patent = el.closest('.parent-hiddne-el')
  let hiddenEl = patent.querySelector('.hidden');
  let arrow = patent.querySelector('.arrow-show');
  hiddenEl.classList.toggle('is-show');
  arrow.classList.toggle('arrow-up');
}



