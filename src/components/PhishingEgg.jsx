import { useRef } from 'react';

// A deliberately suspicious button. Opens a small modal dialog: focus is
// trapped inside, Escape closes it, and focus returns to the button.
export default function PhishingEgg() {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Native <dialog> already handles Escape; this keeps Tab cycling inside it.
  const onKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    const focusable = dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <button type="button" className="phish-bait" ref={triggerRef} onClick={open}>
        You've won a free iPhone <span aria-hidden="true">🎁</span> Claim now
      </button>

      <dialog
        ref={dialogRef}
        className="phish-dialog"
        aria-labelledby="phish-title"
        aria-describedby="phish-text"
        onKeyDown={onKeyDown}
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="phish-dialog-inner">
          <p className="phish-dialog-tag" aria-hidden="true">Security notice</p>
          <p id="phish-title" className="phish-dialog-title">...and you clicked it.</p>
          <p id="phish-text" className="phish-dialog-text">
            Phishing 101: if it's free, urgent, and too good to be true, it's a trap. (Don't worry,
            this one was me.)
          </p>
          <button type="button" className="button button-primary phish-dialog-close" onClick={close} autoFocus>
            Got it
          </button>
        </div>
      </dialog>
    </>
  );
}
