import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
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
