/* DetailFlow: dependency-free interactions for a frontend-only prototype.
   No requests, storage, cookies, tracking, integrations, or booking calls. */

(() => {
  'use strict';

  const menuButton = document.querySelector('#menuToggle');
  const mobileNav = document.querySelector('#mobileNavigation');

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
      mobileNav.hidden = !willOpen;
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
        closeMenu();
        if (wasOpen) menuButton.focus();
      }
    });

    const desktopMedia = window.matchMedia('(min-width: 901px)');
    desktopMedia.addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  // Filters change visibility of static fictional sample rows only.
  const filters = [...document.querySelectorAll('.filter-chip')];
  const rows = [...document.querySelectorAll('#crmTableBody tr[data-stage]')];
  const count = document.querySelector('#crmCount');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filters.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle('is-selected', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      rows.forEach(row => {
        const matches = selected === 'all' || row.dataset.stage === selected;
        row.hidden = !matches;
        if (matches) visible++;
      });
      if (count) count.textContent = `${visible} sample ${visible === 1 ? 'inquiry' : 'inquiries'}`;
    });
  });

  // Button is type="button" to prevent accidental real form submission.
  // This handler only checks input and displays a local status message.
  const form = document.querySelector('#demoForm');
  const previewButton = document.querySelector('#previewRequest');
  const message = document.querySelector('#formMessage');

  function showMessage(text, isSuccess) {
    if (!message) return;
    message.textContent = text;
    message.hidden = false;
    message.classList.toggle('is-success', isSuccess);
    message.classList.toggle('is-error', !isSuccess);
    message.focus();
  }

  if (form && previewButton) {
    // Also block Enter-triggered submit attempts; no backend is configured.
    form.addEventListener('submit', (event) => event.preventDefault());

    previewButton.addEventListener('click', () => {
      if (!form.checkValidity()) {
        const invalidField = form.querySelector(':invalid');
        showMessage('Please complete the required fields and enter a valid email. Nothing has been sent.', false);
        if (invalidField) {
          invalidField.focus();
          invalidField.reportValidity();
        }
        return;
      }
      showMessage('Prototype validation complete. Your request looks ready, but nothing was sent or saved. Connect a backend before accepting real demo requests.', true);
    });

    form.addEventListener('reset', () => {
      if (message) {
        message.hidden = true;
        message.textContent = '';
        message.classList.remove('is-success', 'is-error');
      }
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
