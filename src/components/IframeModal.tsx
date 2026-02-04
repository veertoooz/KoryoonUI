import { useEffect } from 'react';

interface IframeModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const IframeModal = ({ url, isOpen, onClose, title }: IframeModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '95vw',
          height: '95vh',
          background: '#1a1a1a',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: '#262626',
            borderBottom: '1px solid #404040',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#fff' }}>
            {title || 'Content'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#fff',
              borderRadius: '50%',
            }}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div style={{ width: '100%', height: 'calc(95vh - 4rem)' }}>
          <iframe
            src={url}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen"
            allowFullScreen
            title={title || 'Content'}
          />
        </div>
      </div>
    </div>
  );
};
