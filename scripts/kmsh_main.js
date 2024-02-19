;(function() {

  const mOpen = document.querySelectorAll('[data-modal]');
  if (mOpen.length == 0) return;


  const overlay = document.querySelector('.overlay'),
  modals = document.querySelectorAll('.dlg-modal'),

  mClose = document.querySelectorAll('[data-close]');
  let mStatus = false;

  for (let el of mOpen) {
    el.addEventListener('click', function(e) {
      // используюя атрибут [data-modal], определяем ID всплывающего окна,
      // которое требуется открыть
      // по значению ID получаем ссылку на элемент с таким идентификатором
      let modalId = el.dataset.modal,
        modal = document.getElementById(modalId);
      // вызываем функцию открытия всплывающего окна, аргументом
      // является объект всплывающего окна
      modalShow(modal);
    });
  }

  // регистрируются обработчики событий на элементах, закрывающих
  // всплывающие окна
  for (let el of mClose) {
    el.addEventListener('click', modalClose);
  }

  // регистрируются обработчик события нажатия на клавишу
  document.addEventListener('keydown', modalClose);

  function modalShow(modal) {
    // показываем подложку всплывающего окна
    overlay.classList.remove('fadeOut');
    overlay.classList.add('fadeIn');

    // определяем тип анимации появления всплывающего окна
    // убираем и добавляем классы, соответствующие типу анимации
          modal.classList.remove('fadeOut');
      modal.classList.add('fadeIn');

    // выставляем флаг, обозначающий, что всплывающее окно открыто
    mStatus = true;
  }

  function modalClose(event) {
    if (mStatus && ( event.type != 'keydown' || event.keyCode === 27 ) ) {
      // обходим по очереди каждый элемент коллекции modals (каждое всплывающее окно)
      // и в зависимости от типа анимации, используемой на данной странице,
      // удаляем класс анимации открытия окна и добавляем класс анимации закрытия
      for (let modal of modals) {

          modal.classList.remove('fadeIn');
          modal.classList.add('fadeOut');
        
      }

      // закрываем overlay
      overlay.classList.remove('fadeIn');
      overlay.classList.add('fadeOut');
      // сбрасываем флаг, устанавливая его значение в 'false'
      // это значение указывает нам, что на странице нет открытых
      // всплывающих окон
      mStatus = false;
    }
  }
})();





// Animations Intersection Observer API

let options = {
  root: null,
  rootMargin: '5px',
  threshold: 0.5
}

// Функция обратного вызова
let callback = function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('find', entry);
      entry.target.classList.add('active');
      //отписываемся от наблюдателя
      observer.unobserve(entry.target);
    }
  });
}

let observer = new IntersectionObserver(callback, options);

//определяем элементы, за которыми наблюдаем
let targets = document.querySelectorAll('.anim')
targets.forEach(target => {
  observer.observe(target);
});