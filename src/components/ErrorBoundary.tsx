import React, { Component } from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Optional: send error details to monitoring service like Sentry
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, else show a default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: "1rem", color: "red" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
