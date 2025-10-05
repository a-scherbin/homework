(function () {
  //-------------------------- BURGER --------------------------//
  document.addEventListener('click', burgerInit);

  function burgerInit(e) {
    const burgerIcon = e.target.closest('.burger-icon');
    const burgerNavLink = e.target.closest('.nav__link');
    if (!burgerIcon && !burgerNavLink) return;
    if (document.documentElement.clientWidth > 900) return;
    document.body.classList.toggle('body--opened-menu');
  }

  //-------------------------- MODAL --------------------------//
  const modal = document.querySelector('.modal');
  const modalButton = document.querySelector('.about__img-button');

  if (modal && modalButton) {
    modalButton.addEventListener('click', openModal);
    modal.addEventListener('click', closeModal);
  }

  function openModal(e) {
    e.preventDefault();
    document.body.classList.toggle('body--opened-modal');
  }

  function closeModal(e) {
    e.preventDefault();
    const target = e.target;
    if (target.closest('.modal__cancel') || target.classList.contains('modal')) {
      document.body.classList.remove('body--opened-modal');
    }
  }

  //-------------------------- TABS --------------------------//
  const tabControls = document.querySelector('.tab-controls');
  if (tabControls) tabControls.addEventListener('click', toggleTab);

  function toggleTab(e) {
    const tabControl = e.target.closest('.tab-controls__link');
    if (!tabControl) return;
    e.preventDefault();
    if (tabControl.classList.contains('tab-controls__link--active')) return;

    const tabContentID = tabControl.getAttribute('href');
    const tabContent = document.querySelector(tabContentID);
    const activeControl = document.querySelector('.tab-controls__link--active');
    const activeContent = document.querySelector('.tab-content--show');

    if (activeControl) activeControl.classList.remove('tab-controls__link--active');
    if (activeContent) activeContent.classList.remove('tab-content--show');

    tabControl.classList.add('tab-controls__link--active');
    if (tabContent) tabContent.classList.add('tab-content--show');
  }

  //-------------------------- ACCORDION --------------------------//
  const accordionLists = document.querySelectorAll('.accordion-list');
  accordionLists.forEach(el => {
    el.addEventListener('click', e => {
      const accordionList = e.currentTarget;
      const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened');
      const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content');

      const accordionControl = e.target.closest('.accordion-list__control');
      if (!accordionControl) return;

      const accordionItem = accordionControl.parentElement;
      const accordionContent = accordionControl.nextElementSibling;

      if (accordionOpenedItem && accordionItem !== accordionOpenedItem) {
        accordionOpenedItem.classList.remove('accordion-list__item--opened');
        if (accordionOpenedContent) accordionOpenedContent.style.maxHeight = null;
      }

      accordionItem.classList.toggle('accordion-list__item--opened');
      if (accordionItem.classList.contains('accordion-list__item--opened')) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
      } else {
        accordionContent.style.maxHeight = null;
      }
    });
  });

  //-------------------------- SLIDER --------------------------//
  const swiper = new Swiper('.gallery__swiper', {
    slidesPerView: 1.5,
    spaceBetween: 15,

    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.gallery__next',
      prevEl: '.gallery__prev',
    },

    breakpoints: {
      601: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      801: {
        spaceBetween: 32,
      },
      1101: {
        slidesPerView: 4,
      },
    },
  });
})();
