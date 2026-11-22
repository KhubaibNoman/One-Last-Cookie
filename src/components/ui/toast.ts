'use client';

let toastContainer: HTMLDivElement | null = null;

function getContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      display: flex; flex-direction: column; gap: 8px;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function toast(message: string, type: 'success' | 'error' = 'success') {
  if (typeof window === 'undefined') return;
  const container = getContainer();

  const el = document.createElement('div');
  el.style.cssText = `
    background: ${type === 'success' ? '#1C1008' : '#dc2626'};
    color: #F9F5EE;
    padding: 12px 20px;
    font-size: 13px;
    letter-spacing: 0.05em;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    border-left: 2px solid ${type === 'success' ? '#C9A96E' : '#ef4444'};
    max-width: 300px;
    font-family: var(--font-inter, sans-serif);
  `;
  el.textContent = message;
  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}
