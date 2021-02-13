"use strict";
const body = document.querySelector('body');

const mainCarousel = document.querySelector('#mainCarousel');
const mainBg = document.querySelector('.main-bg');
const footer = document.querySelector('.footer');
//обертка для кнопки ввер up-btn
const up = document.querySelector('#up');
//кнопкa ввер up-btn
const upBtn = document.querySelector('#upBtn');
const forms = document.querySelectorAll('.form');

const bgModal = document.querySelector('#shading'); // темный фон окон
const faqModal = document.querySelector('#faqModal'); // темный фон faqModalBg
const closeFaqBtns = document.querySelectorAll('.close-faq-btn');
const application = document.querySelector('#application'); // Онлайн заявка(btn)
const applicationModal = document.querySelector('#applicationModal');// онлайн заявка(окно)
const applicationThanks = document.querySelector('#applicationThanks');// успех(окно)
const order = document.querySelector('#order') // заказ(окно)

const orderForm = order.querySelector('#orderForm');
const orderCountInput = orderForm.querySelector('#orderCount');
const orderBtns = document.querySelectorAll('.product-card__btn'); // заказ(btn);
const faqFormBtn = document.querySelector('#faqFormBtn'); // faq-form (btn)
const closeBtn = document.querySelectorAll('.close-btn'); // кнопки закрытия модельных окон

const callbackForm = document.querySelector('#callbackForm');

const sensitivity = 20; // кол пикселей для регистрации движения
let touchStart = null; // начало движение по сенсеру
let touchPosition = null; // растояние пройденое по сенсеру

const regTel = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/;// проверка телефона
const regMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;// Проверка на емаил

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

// Добовляем функции для проверки form
Array.from(forms).forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formCheck(form);
  });
});

orderForm.addEventListener('submit', (e) => {
  e.preventDefault()
  orderFormCheck()
})

orderCountInput.addEventListener('input', () => {
  setValueCountInput(1)
});



//Карусели
// начало Главная карусель
if (mainCarousel) {

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
  }

  //автолистание
  setInterval(mainCarouselNextSlide, 10000)
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

// добовляем фунцию закрытия окна faq
Array.from(closeFaqBtns).forEach((el) => {
  el.addEventListener('click', () => { closeFaqModal() });
});


// Устанавливает высоту bgModal
function setBgModalHeight(idbgModal) {
  idbgModal.style.height = window.innerHeight + 'px';
}


//Функция открытия модульного faq
function showFaqModal() {
  const questInput = faqForm.querySelector('#questInput');
  const faqFormError = faqForm.querySelector('#faqFormError');
  const value = questInput.value.trim();
  faqFormError.classList.remove('error--is-show');
  if (!value) {
    faqFormError.classList.add('error--is-show');
    questInput.value = '';
    return;
  }
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


//Добовляем функцию открывае/закрывае выподающих эл
document.onclick = function (e) {
  let el = e.target;
  if (el.closest('.press-to-show')) {
    slow(el);
  }
}

// Открываем/закрываем выподоющие эл
function slow(el) {
  let parent = el.closest('.parent-hiddne-el')
  let hiddenEl = parent.querySelector('.hidden');
  let arrow = parent.querySelector('.arrow-show');
  hiddenEl.classList.toggle('is-show');
  arrow.classList.toggle('arrow-up');
}

// Валидация форм
//Устанавливает заданное число при
// условии если введеное число меньше или NaN
function setValueCountInput(value) {
  const inputValue = +orderCountInput.value;
  if (inputValue < 1 || isNaN(inputValue)) {
    orderCountInput.value = value;
  }
}

//Проверка форм
function formCheck(form) {
  // Очещаем ошибки
  hideErrorMessages(form);
  // проверка значение инпутов
  InputsCheck(form);
}

function orderFormCheck() {
  hideErrorMessages(orderForm);
  orderInputsCheck();
}

function orderInputsCheck() {
  const mailOrTel = orderForm.querySelector('#mailOrTel');
  const orderFormInputs = orderForm.querySelectorAll('.input');
  const errorMail = orderForm.querySelector('#errorMail');
  const errorTel = orderForm.querySelector('#errorTel');
  const inputMail = orderForm.querySelector('#inputMail');
  const inputTel = orderForm.querySelector('#inputTel');
  const mailValue = inputMail.value.trim();
  const telValue = inputTel.value.trim();
  const resCheckMail = regexСheck(mailValue, regMail);
  const resCheckTel = regexСheck(telValue, regTel);
  let resCheck = true;
  if (!resCheckMail) {
    if (mailValue) {
      errorMail.classList.add('error--is-show');
      resCheck = false
    }
  }

  if (!resCheckTel) {
    if (telValue) {
      errorTel.classList.add('error--is-show');
      resCheck = false
    }
  }

  if (!(mailValue || telValue)) {
    mailOrTel.classList.add('error--is-show');
    resCheck = false
  }

  if (resCheck) {
    clearInputs(orderFormInputs);
    order.classList.remove('modal--is-show');
    applicationThanks.classList.add('modal--is-show');
  }
}

//Проверка инпутов
function InputsCheck(form) {
  const inputs = form.querySelectorAll('.input');
  console.log(inputs)
  // Если есть пустое поле выдаем ошибку, останавливаем проверку
  if (isEmptyValue(inputs, form)) {
    return;
  }

  const success = isValidValue(inputs, form);
  // Если проверка успешна, то вывести сообщение о успехе и очистить инпуты
  if (success) {
    if (form.id === "callbackForm") {
      const successMessage = form.querySelector('.success');
      successMessage.classList.add('success--is-show');
      clearInputs(inputs);
      return;
    }

    if (form.id === "applicationForm") {
      const applicationThanks = bgModal.querySelector('#applicationThanks');
      applicationThanks.classList.add('modal--is-show');
      applicationModal.classList.remove('modal--is-show')
      console.log(applicationThanks)
      clearInputs(inputs);
      return;
    }

    if (form.id === "faqForm") {
      const faqThanks = bgModal.querySelector('#faqThanks');
      bgModal.classList.add('shading--is-show');
      faqThanks.classList.add('modal--is-show');
      faqModal.classList.remove('modal--is-show')
      console.log(applicationThanks)
      clearInputs(inputs);
      return;
    }

  }
}


// Провекрка на пустое значение инпута
function isEmptyValue(inputs, form) {
  const emptyError = form.querySelector('.empty');
  console.log(emptyError)
  let isEmpty = false;
  Array.from(inputs).forEach((el) => {
    if (!el.value.trim()) {
      emptyError.classList.add('error--is-show');
      isEmpty = true;
    }
  })
  return isEmpty;
}

// Возвращает резулитат проверки
function isValidValue(inputs, form) {

  return valueCheck(inputs, form);
}


// Пролверка на регулярным выражением
function regexСheck(value, reg) {
  return reg.test(value)
}

// Прячем сообщения с ошибками
function hideErrorMessages(form) {
  const successMessage = form.querySelector('.success');
  const errorMessage = form.querySelectorAll('.error');
  if (form.id === 'callbackForm') {
    successMessage.classList.remove('success--is-show');
  }

  Array.from(errorMessage).forEach((el) => {
    el.classList.remove('error--is-show');
  })
}


//Проверка занчение, если все значение прошли проверку
// Возвращает true иначи false
function valueCheck(inputs, form) {
  const phoneEroor = form.querySelector('.phone');
  const mailEroor = form.querySelector('.mail');
  let isSuccess = true;
  Array.from(inputs).forEach((el) => {
    const dataType = el.getAttribute('data-type');
    switch (dataType) {
      case 'tel': {
        const value = el.value;
        isSuccess = isSuccess && regexСheck(value, regTel);
        if (!isSuccess) {
          phoneEroor.classList.add('error--is-show');
        }
        break;
      };
      case 'email': {
        const value = el.value;
        isSuccess = isSuccess && regexСheck(value, regMail);
        if (!isSuccess) {
          mailEroor.classList.add('error--is-show');
        }
        break;
      };
      default: isSuccess = true;
    }
  })

  return isSuccess;
}

//Очищаем инпуты
function clearInputs(inputs) {
  Array.from(inputs).forEach((el) => {
    el.value = '';
  })
}


// яндеск карта
const yandexmap = document.querySelector('#yandexmap'); // блок отображающий карту
if (yandexmap) {
  let map;
  let marker;
  // Координаты
  // Для изменение координат, необходимо 
  // записать новое значенить в атребуте 
  // "data-coord" в блоке id='yandexmap'
  // певое значение ширина, второе долгота
  // через запятую
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