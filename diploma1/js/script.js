/*------------------------- SUBMENU -------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const item   = document.querySelector('.header__item--has-submenu');
  if (!item) return;

  const toggle = item.querySelector('.header__toggle');
  const menu   = item.querySelector('.header__submenu');

  const isPanelMode = () =>
    window.matchMedia('(max-width: 1000px)').matches ||
    document.body.classList.contains('body--opened-menu');

  const openDesktop  = () => { item.classList.add('is-open'); toggle.setAttribute('aria-expanded','true'); };
  const closeDesktop = () => { item.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); };

  const setMax = h => { menu.style.maxHeight = h; };
  const openMobile  = () => { item.classList.add('is-open'); toggle.setAttribute('aria-expanded','true'); setMax(menu.scrollHeight + 'px'); };
  const closeMobile = () => { item.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); setMax('0px'); };

  const open  = () => (isPanelMode() ? openMobile()  : openDesktop());
  const close = () => (isPanelMode() ? closeMobile() : closeDesktop());

  if (isPanelMode()) setMax('0px');

  toggle.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    item.classList.contains('is-open') ? close() : open();
  });

  document.addEventListener('click', e => {
    if (!isPanelMode() && !item.contains(e.target)) closeDesktop();
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  const recompute = () => {
    if (isPanelMode()) {
      setMax(item.classList.contains('is-open') ? menu.scrollHeight + 'px' : '0px');
    } else {
      setMax(''); 
    }
  };
  window.addEventListener('resize', recompute);

  new MutationObserver(recompute).observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

/*------------------------- SEARCH HEADER  -------------------------*/

document.addEventListener('DOMContentLoaded', () => {

  const pill = document.querySelector('.header__search .header__search-pill');
  if (!pill) return;

  const root = pill.closest('.header__search'); 
  const input = root.querySelector('.header__search-input');

  const open = () => {
    root.classList.add('is-open');
    setTimeout(() => input.focus(), 150);
  };
  const close = () => {
    root.classList.remove('is-open');
    input.blur();
  };

  pill.addEventListener('mousedown', e => {
    if (!root.classList.contains('is-open')) {
      e.preventDefault();
      open();
    }
  });

  document.addEventListener('click', e => {
    if (!root.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  pill.addEventListener('submit', e => e.preventDefault());
});

/*------------------------- BURGER -------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger-icon');
  const panel = document.querySelector('.header__nav');
  const backdrop = document.querySelector('.mobile-backdrop');

  if (!burger || !panel || !backdrop) return;

  const open = () => {
    document.body.classList.add('body--opened-menu');
    burger.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
  };
  const close = () => {
    document.body.classList.remove('body--opened-menu');
    burger.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  };

  burger.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.contains('body--opened-menu') ? close() : open();
  });

  backdrop.addEventListener('click', close);
  window.addEventListener('keydown', e => e.key === 'Escape' && close());
});

/*------------------------- SLIDER -------------------------*/

const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.hero__slider-next',
    prevEl: '.hero__slider-prev',
  },
});

/*------------------------- SEARCH BLOG -------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search__input');
  const tags = document.querySelectorAll('.search__tag');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();

      input.value = text;

      input.dispatchEvent(new Event('input', { bubbles: true }));

      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  });
});

/*------------------------- BUTTON -------------------------*/

(function () {
  const body = document.body;
  const burger = document.querySelector('.burger');
  const panel = document.getElementById('mobile-menu');
  const close = document.querySelector('.mobile-menu__close');
  const backdrop = document.querySelector('.mobile-backdrop');

  if (!burger || !panel || !backdrop) return;

  const openMenu = () => {
    body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    const firstFocusable = panel.querySelector('a,button');
    firstFocusable && firstFocusable.focus();
    document.addEventListener('keydown', onKeydown);
  };

  const closeMenu = () => {
    body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      panel.hidden = true;
      panel.setAttribute('aria-hidden', 'true');
      backdrop.hidden = true;
    }, 350);
    document.removeEventListener('keydown', onKeydown);
    burger.focus();
  };

  const onKeydown = e => {
    if (e.key === 'Escape') closeMenu();
  };

  burger.addEventListener('click', () => (body.classList.contains('menu-open') ? closeMenu() : openMenu()));
  close?.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu__acc-btn').forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const panel = document.getElementById(id);
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
    });
  });
})();
