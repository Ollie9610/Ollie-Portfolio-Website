// Completely disable ResizeObserver to prevent loop errors
if (typeof window !== 'undefined') {
  // Store original ResizeObserver
  const OriginalResizeObserver = window.ResizeObserver;
  
  // Replace with a no-op implementation
  window.ResizeObserver = class {
    constructor() {
      // Do nothing - completely disable ResizeObserver
    }
    
    observe() {
      // Do nothing
    }
    
    unobserve() {
      // Do nothing
    }
    
    disconnect() {
      // Do nothing
    }
  } as any;
  
  // Suppress all ResizeObserver related errors
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
      return;
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('ResizeObserver')) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('ResizeObserver')) {
      event.preventDefault();
    }
  });
  
  // Suppress global errors
  window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('ResizeObserver')) {
      event.preventDefault();
      return false;
    }
  });
}

export {};
