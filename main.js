const dialog = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');

let lastActive = null;

if (openBtn && dialog) {
  openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dialog.showModal();
    dialog.querySelector('input, select, textarea, button')?.focus();
  });
}

if (closeBtn && dialog) {
  closeBtn.addEventListener('click', () => dialog.close('cancel'));
}

if (dialog) {
  dialog.addEventListener('close', () => {
    lastActive?.focus();
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    [...form.elements].forEach(el => {
      if (el.setCustomValidity) el.setCustomValidity('');
    });

    if (!form.checkValidity()) {
      e.preventDefault();

      const email = form.elements.email;
      if (email?.validity.typeMismatch) {
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
      }

      form.reportValidity();

      [...form.elements].forEach(el => {
        if (el.willValidate) {
          el.toggleAttribute('aria-invalid', !el.checkValidity());
        }
      });
      return;
    }

    e.preventDefault();
    form.reset();
    dialog?.close('success');
  });
}