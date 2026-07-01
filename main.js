/* ============================================================
   Adaptation Lab — JS-логика
   - Мобильное меню
   - Аккордеон FAQ
   - Плавная прокрутка по якорям
   - Валидация и фейковая отправка контактной формы
   - Активный пункт меню по странице
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Мобильное меню ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Закрываем меню при клике на ссылку
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Активный пункт меню ---------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-page]').forEach(function (link) {
    if (link.dataset.page === currentPath) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Аккордеон FAQ ---------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    const btn = item.querySelector('.faq__q');
    const ans = item.querySelector('.faq__a');
    if (!btn || !ans) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        ans.style.maxHeight = ans.scrollHeight + 'px';
      } else {
        ans.style.maxHeight = '0';
      }
    });
  });

  /* ---------- Плавный скролл к якорям с учётом sticky-шапки ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    link.addEventListener('click', function (e) {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Контактная форма ---------- */
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Простая валидация
      const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;
      fields.forEach(function (f) {
        if (!f.value.trim()) {
          f.style.borderColor = '#B23A48';
          isValid = false;
        } else {
          f.style.borderColor = '';
        }
      });

      const email = form.querySelector('input[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#B23A48';
        isValid = false;
      }

      if (!isValid) return;

      // Имитируем отправку
      const success = form.querySelector('.form__success');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Отправляем...';
      }

      setTimeout(function () {
        if (success) {
          success.classList.add('is-visible');
        }
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = 'Отправить заявку <span class="arrow">→</span>';
        }
        // Прячем сообщение через 6 сек
        setTimeout(function () {
          if (success) success.classList.remove('is-visible');
        }, 6000);
      }, 800);
    });
  }

  /* ---------- Год в футере ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
