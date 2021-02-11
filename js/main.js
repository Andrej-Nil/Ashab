"use strict";
const body = document.querySelector('body');

const mainBg = document.querySelector('.main-bg');
const footer = document.querySelector('.footer');
//обертка для кнопки ввер up-btn
const up = document.querySelector('#up');
//кнопкa ввер up-btn
const upBtn = document.querySelector('#upBtn');

const sensitivity = 20; // кол пикселей для регистрации движения
let touchStart = null; // начало движение по сенсеру
let touchPosition = null; // растояние пройденое по сенсеру

// Добовлям фунцию для смены позиции mainBg
window.addEventListener('scroll', changePosition);
// Добовлям фунцию для отображекния эл.
// с кнопкой upBtn
window.addEventListener('scroll', showUp)

// Добовлям фунцию для прокрутки сраницы вверх
upBtn.addEventListener('click', goUp);
let timeOut;
function goUp() {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -150);
    timeOut = setTimeout('goUp()', 5);
  } else clearTimeout(timeOut);
}

//Карусели
// начало Главная карусель
if (document.querySelector('#mainCarousel')) {
  const mainCarousel = document.querySelector('#mainCarousel');
  const mainCarouselSlidesWrap = mainCarousel.querySelector('#mainCarouselSlidesWrap');
  const mainCarouselSlides = mainCarousel.querySelectorAll('.m-c-slide');
  const totalSlides = mainCarouselSlides.length;
  let MainCarousel = 0;
  const mainCarouselLeft = mainCarousel.querySelector('#mainCarouselLeft');
  const mainCarouselRight = mainCarousel.querySelector('#mainCarouselRight');

  //Добовляем события для управлению главной каруселью
  mainCarouselRight.addEventListener('click', mainCarouselNextSlide);

  mainCarouselLeft.addEventListener('click', mainCarouselPrevSlide);
  // Управление сенсером 
  // Начало движения
  mainCarousel.addEventListener('touchstart', function (e) { startTouchMove(e) });
  // Отслеживает путь и растояние
  mainCarousel.addEventListener('touchmove', function (e) { touchMove(e) });
  // Окончание движение
  mainCarousel.addEventListener('touchend', function () { touchEnd(mainCarouselNextSlide, mainCarouselPrevSlide) });

  //Адаптация карусели при изменении экрана
  window.addEventListener(`resize`, () => {
    const widthMainCarousel = getWidthEl(mainCarousel);
    mainCarouselSlidesWrap.style.left = -widthMainCarousel * MainCarousel + 'px';
  }, false);

  //Управление каручеле стрелками
  function mainCarouselNextSlide() {
    const step = getWidthEl(mainCarousel);
    if (MainCarousel == totalSlides - 1) {
      mainCarouselSlidesWrap.style.left = 0;
      MainCarousel = 0;
      return
    }
    mainCarouselSlidesWrap.style.left = (parseInt(mainCarouselSlidesWrap.style.left, 10) - step) + 'px';
    MainCarousel++;

  }

  function mainCarouselPrevSlide() {
    const step = getWidthEl(mainCarousel);
    if (MainCarousel == 0) {
      mainCarouselSlidesWrap.style.left = - (step * (totalSlides - 1)) + 'px';
      MainCarousel = 2;
      return
    }
    mainCarouselSlidesWrap.style.left = (parseInt(mainCarouselSlidesWrap.style.left, 10)
      + step) + 'px';
    MainCarousel--;
    clearInterval(test);
  }

  //автолистание
  let test = setInterval(mainCarouselNextSlide, 10000)
}
//конец Главная карусель

// Управление каруселью сенсером
// Начало движения
function startTouchMove(e) {
  touchStart = e.changedTouches[0].clientX;
  touchPosition = touchStart;
}

//Отслеживает джижение
function touchMove(e) {
  touchPosition = e.changedTouches[0].clientX;
}

// Конец движения
function touchEnd(next, prev) {
  let distance = touchStart - touchPosition;
  if (distance > 0 && distance >= sensitivity) {
    next();
  }
  if (distance < 0 && distance * -1 >= sensitivity) {
    prev();
  }
}


//Открытие и закрытие модульных окон
const bgModal = document.querySelector('#shading'); // темный фон окон
const faqModal = document.querySelector('#faqModal'); // темный фон faqModalBg
const closeFaqBtns = document.querySelectorAll('.close-faq-btn');
const application = document.querySelector('#application'); // Онлайн заявка(btn)
const applicationModal = document.querySelector('#applicationModal');// онлайн заявка(окно)
const order = document.querySelector('#order') // заказ(окно)
const orderBtns = document.querySelectorAll('.product-card__btn'); // заказ(btn);
const faqFormBtn = document.querySelector('#faqFormBtn'); // faq-form (btn)
const closeBtn = document.querySelectorAll('.close-btn'); // кнопки закрытия модельных окон


//Устанавливает высоту bgModal
setBgModalHeight(bgModal);

window.addEventListener(`resize`, () => {
  setBgModalHeight(bgModal);
  setBgModalHeight(faqModal);
}, false);

// добовляем фунцию отктрытия окна онлайн заявки
application.addEventListener('click', () => {
  showModal(applicationModal)
});

// добовляем фунцию отктрытия окна заказ
Array.from(orderBtns).forEach((el) => {
  el.addEventListener('click', () => { showModal(order) });
});

// Добовляем функцию закрытия для модульных окон
Array.from(closeBtn).forEach((el) => {
  el.addEventListener('click', () => { closeModal(el) });
});


//окно faq
if (faqModal) {
  setBgModalHeight(faqModal);
  window.addEventListener(`resize`, () => {
    setBgModalHeight(faqModal);
  }, false);

  // добовляем фунцию отктрытия окна faq
  faqFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showFaqModal();
  })
}



Array.from(closeFaqBtns).forEach((el) => {
  el.addEventListener('click', () => { closeFaqModal() });
});


// Устанавливает высоту bgModal
function setBgModalHeight(idbgModal) {
  idbgModal.style.height = window.innerHeight + 'px';
}


//Функция открытия модульного faq
function showFaqModal() {
  faqModal.classList.add('modal--is-show')
}
//Функция закрытия модульного faq
function closeFaqModal() {
  faqModal.classList.remove('modal--is-show')
}

//Функция открытия модульного окна
function showModal(idModal) {
  bgModal.classList.add('shading--is-show');
  idModal.classList.add('modal--is-show');
  body.classList.add('is-no-scroll');
}

// Функция закрытия модульных окон
function closeModal(el) {
  const modal = el.closest('.modal');
  modal.classList.remove('modal--is-show');
  bgModal.classList.remove('shading--is-show');
  body.classList.remove('is-no-scroll');
}



document.onclick = function (e) {
  let el = e.target;
  if (el.closest('.press-to-show')) {
    slow(el);
  }
}

function slow(el) {
  let parent = el.closest('.parent-hiddne-el')
  let hiddenEl = parent.querySelector('.hidden');
  let arrow = parent.querySelector('.arrow-show');
  hiddenEl.classList.toggle('is-show');
  arrow.classList.toggle('arrow-up');
}


// яндеск карта

// блок отображающий карту
const yandexmap = document.querySelector('#yandexmap');
if (yandexmap) {
  let map;
  let marker;
  // Координаты
  // Для изменение координат, необходимо 
  // записать новst значенить в атребуте 
  // "data-coord" в блоке id='yandexmap'
  // певое значение ширина, второе долгота
  // через запитею
  const dataCoord = yandexmap.getAttribute('data-coord')
  const coordinates = dataCoord.split(',');

  function initMap() {
    map = new ymaps.Map("yandexmap", {
      center: coordinates,
      zoom: 16
    });
    marker = new ymaps.Placemark(coordinates, {
      hintContent: 'Расположение',
      balloonContent: 'Это наша организация'
    });
    map.geoObjects.add(marker);
  }
  ymaps.ready(initMap);
}



//возвращает ширину елемента
function getWidthEl(el) {
  return el.clientWidth;
}

// функия смены свойство position  mainBg
function changePosition() {
  const mainBgCoord = mainBg.getBoundingClientRect();
  const footerCoord = footer.getBoundingClientRect();
  // Взависимости от условия 
  if (footerCoord.y <= mainBgCoord.height) {
    // позиция absolute для прижития bg  к футеру
    mainBg.classList.add('main-bg--absolute');
  } else {
    // позиция fixed для прижития bg к top экрана
    mainBg.classList.remove('main-bg--absolute');
  }
}

// Показывает скрывает кнопку эл
// Взависимости от прокрутки страницы
function showUp() {
  const coord = body.getBoundingClientRect()
  if (coord.top < -1000) {
    up.classList.add('up--is-show')
  } else {
    up.classList.remove('up--is-show')
  }
}