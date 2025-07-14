import React from 'react';
import Header from './Header';
import Footer from './Footer';

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
      return (
        <div className="px-5 flex flex-col items-center justify-start text-center mx-auto bg-gray-200 dark:bg-neutral-900 text-black dark:text-white min-h-full w-full">
          <Header />
          {this.props.fallback}
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
