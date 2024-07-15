import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: add a service to caught this errors
    console.error('ErrorBoundary caught an error : ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="w-screen h-screen m-auto bg-violet text-white middle-center text-heading">
          <h3>Something went wrong...</h3>
          <button
            className="bg-white rounded-lg p-2 text-base text-black font-medium mt-4"
            onClick={() => this.setState({ hasError: false })}
          >
            Retry
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
