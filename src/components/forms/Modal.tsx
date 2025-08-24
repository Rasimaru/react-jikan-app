import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!modalRoot) return;
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-neutral-900/70 z-50 overflow-auto flex items-start justify-center p-4 w-full"
      onClick={onClose}
    >
      <div
        className="sm:w-1/2 w-full relative rounded-2xl bg-amber-50"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-2 right-2 inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    modalRoot
  );
}
