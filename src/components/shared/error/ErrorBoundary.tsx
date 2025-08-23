'use client';

import React from 'react';
import type { BoundaryProps, BoundaryState } from '@/types/types';
import Fallback from './Fallback';

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

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <Fallback onReset={this.resetError}></Fallback>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
