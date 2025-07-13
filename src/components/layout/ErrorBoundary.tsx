import React from 'react';

export type BoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export type BoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
