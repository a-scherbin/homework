const btn = document.querySelector('.btn-open');

const modal = document.querySelector('.modal');

btn.addEventListener('click', () => {
  modal.classList.add('modal__active');
});

const closeBtn = document.querySelector('.modal__close-btn');

closeBtn.addEventListener('click', () => {
  modal.classList.remove('modal__active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('modal__active');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('modal__active');
  }
});
