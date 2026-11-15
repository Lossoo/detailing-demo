/**
 * DetailFlow prototype interactions.
 * Intentionally NO fetch(), network requests, web storage, or CRM integration.
 */
(() => {
  'use strict';

  // --- Responsive navigation ---
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('#menuToggle');
  const mobileNav = document.querySelector('#mobileNavigation');

  const setMenuOpen = (open, returnFocus = false) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
    if (!open && returnFocus) menuButton.focus();
  };

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false, true);
      }
    });

    document.addEventListener('pointerdown', event => {
      if (menuButton.getAttribute('aria-expanded') === 'true' && header && !header.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('focusin', event => {
      if (menuButton.getAttribute('aria-expanded') === 'true' && header && !header.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    const desktopMedia = window.matchMedia('(min-width: 901px)');
    if (typeof desktopMedia.addEventListener === 'function') {
      desktopMedia.addEventListener('change', event => {
        if (event.matches) setMenuOpen(false);
      });
    } else if (typeof desktopMedia.addListener === 'function') {
      // Compatibility for older Safari releases.
      desktopMedia.addListener(event => {
        if (event.matches) setMenuOpen(false);
      });
    }
  }

  // --- Fictional CRM: filter in-page sample rows only ---
  const filters = [...document.querySelectorAll('.filter-chip[data-filter]')];
  const sampleRows = [...document.querySelectorAll('#crmTableBody tr[data-stage]')];
  const crmCount = document.querySelector('#crmCount');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;

      filters.forEach(filter => {
        const isActive = filter === button;
        filter.classList.toggle('is-selected', isActive);
        filter.setAttribute('aria-pressed', String(isActive));
      });

      let visibleCount = 0;
      sampleRows.forEach(row => {
        const isVisible = selected === 'all' || row.dataset.stage === selected;
        row.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (crmCount) {
        crmCount.textContent = `${visibleCount} sample ${visibleCount === 1 ? 'inquiry' : 'inquiries'}`;
      }
    });
  });

  // --- Prototype-only form validation ---
  // The submit button starts disabled in HTML. It is enabled only once this
  // interception handler is installed; the form has no action/API endpoint.
  const form = document.querySelector('#demoForm');
  const submitButton = document.querySelector('#previewRequest');
  const message = document.querySelector('#formMessage');

  if (form && submitButton && message) {
    const requiredFields = [...form.querySelectorAll('[required]')];

    function getFieldError(field) {
      if (!field.value.trim()) {
        if (field.id === 'workflowInterest') return 'Please choose an area of interest.';
        if (field.id === 'email') return 'Enter your work email.';
        if (field.id === 'businessName') return 'Enter your business name.';
        return 'Enter your name.';
      }
      if (field.validity.typeMismatch && field.type === 'email') {
        return 'Enter a valid email address, such as name@business.com.';
      }
      if (!field.checkValidity()) return 'Please check this field.';
      return '';
    }

    function setFieldError(field, errorText) {
      const errorNode = document.getElementById(`${field.id}Error`);
      const hasError = Boolean(errorText);
      field.closest('.field')?.classList.toggle('has-error', hasError);
      if (hasError) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
      if (errorNode) {
        errorNode.textContent = errorText;
        errorNode.hidden = !hasError;
      }
    }

    function clearStatus() {
      message.hidden = true;
      message.textContent = '';
      message.classList.remove('is-success', 'is-error');
    }

    function setStatus(text, success) {
      message.textContent = text;
      message.classList.toggle('is-success', success);
      message.classList.toggle('is-error', !success);
      message.hidden = false;
    }

    form.addEventListener('submit', event => {
      event.preventDefault(); // No network submission in this prototype.
      let firstInvalid = null;
      let invalidCount = 0;

      requiredFields.forEach(field => {
        const error = getFieldError(field);
        setFieldError(field, error);
        if (error) {
          invalidCount += 1;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (firstInvalid) {
        setStatus(`Please correct ${invalidCount} highlighted ${invalidCount === 1 ? 'field' : 'fields'}. Nothing was sent or saved by DetailFlow.`, false);
        firstInvalid.focus();
        return;
      }

      setStatus('Demo validation passed. This is a visual prototype: no request was sent, saved, or booked. A secure backend is required for real submissions.', true);
      message.focus();
    });

    // Clear stale success/error summaries on changes. Refresh inline errors only
    // for a field already marked invalid, so untouched fields stay uncluttered.
    const onEdit = event => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
      if (!message.hidden) clearStatus();
      if (field.getAttribute('aria-invalid') === 'true') {
        setFieldError(field, getFieldError(field));
      }
    };
    form.addEventListener('input', onEdit);
    form.addEventListener('change', onEdit);

    form.addEventListener('reset', () => {
      requiredFields.forEach(field => setFieldError(field, ''));
      clearStatus();
    });

    submitButton.disabled = false;
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
