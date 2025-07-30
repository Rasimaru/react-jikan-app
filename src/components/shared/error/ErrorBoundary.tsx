import React from 'react';
import Layout from '@/components/layout/Layout';
import type { BoundaryProps, BoundaryState } from '@/types/types';

class ErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): BoundaryState {
    void error;
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Layout>{this.props.fallback}</Layout>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
