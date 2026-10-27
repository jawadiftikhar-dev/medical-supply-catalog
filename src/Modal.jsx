import { useEffect, useRef } from 'react';

function Modal({ product, onClose, isWishlisted, onToggleWishlist }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        ref={modalRef}
      >
        <button
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <img src={product.imageUrl} alt={product.name} className="modal-image" />

        <div className="modal-body">
          <h2 id="modal-title">{product.name}</h2>
          <p className="modal-category">{product.category}</p>
          <p id="modal-desc" className="modal-desc">{product.description}</p>
          <p className="modal-price">${product.price.toFixed(2)}</p>
          <button
            className={`wishlist-btn${isWishlisted ? ' wishlist-btn--active' : ''}`}
            onClick={() => onToggleWishlist(product.name)}
            aria-pressed={isWishlisted}
          >
            {isWishlisted ? '♥ Remove from wishlist' : '♡ Add to wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;