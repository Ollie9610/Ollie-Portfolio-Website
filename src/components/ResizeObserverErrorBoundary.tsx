import React from 'react';

interface Props {
  children: React.ReactNode;
}

class ResizeObserverErrorBoundary extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // Suppress ResizeObserver errors
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
        return;
      }
      originalError.apply(console, args);
    };

    // Suppress window errors
    window.addEventListener('error', (e) => {
      if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        e.preventDefault();
        return false;
      }
    });

    // Suppress unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      if (e.reason && e.reason.message && e.reason.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        e.preventDefault();
        return false;
      }
    });
  }

  render() {
    return this.props.children;
  }
}

export default ResizeObserverErrorBoundary;
