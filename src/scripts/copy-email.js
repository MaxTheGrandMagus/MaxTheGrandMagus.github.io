// @ts-check

/**
 * "Copy email" button: copies data-copy-email to the clipboard, shows "Email copied" for 2 seconds and announces it
 * through the [data-copy-status] live region next to the button. Stays hidden without the clipboard API.
 * @param {HTMLButtonElement} button
 */
export function initCopyEmail(button) {
  if (!navigator.clipboard?.writeText) return;
  const status = button.parentElement?.querySelector('[data-copy-status]');
  let timer = 0;

  const announce = (/** @type {string} */ text) => {
    if (!status) return;
    status.textContent = '';
    window.setTimeout(() => (status.textContent = text), 50);
  };

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail ?? '');
      button.dataset.done = '';
      announce('Email copied to clipboard');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        delete button.dataset.done;
        if (status) status.textContent = '';
      }, 2000);
    } catch {
      announce('Could not copy the email');
    }
  });

  button.hidden = false;
}
