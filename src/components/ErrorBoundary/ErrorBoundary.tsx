import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <>
          <h1>Oops, there's an error:</h1>
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
