import { Component, ReactNode } from "react";
import ErrorIlustration from "./ErrorIlustration";

export default class ErrorBoundary extends Component<{ children: ReactNode }> {
  // Define a state variable to track whether is an error or not
  override state = {
    hasError: false
  };
  
  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: unknown) {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
  }
  
  override render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className="mx-auto pt-145 pb-md-212 pb-100">
          <div className="container-fluid">
            <div className="text-center">
              <ErrorIlustration className="img-fluid" />
            </div>
            <div className="pt-70 pb-30">
              <h1 className="text-4xl fw-bold text-center color-palette-1 mb-10">
                Oops, there is an error!
              </h1>
            </div>
            <div className="button-group d-flex flex-column mx-auto">
              <button
                className="btn btn-try-again w-100 fw-medium text-lg text-white rounded-pill"
                type="button"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again?
              </button>
            </div>
          </div>

          <style jsx>{`
            .btn-try-again {
              display: block;
              padding: 0.75rem;
              background-color: #4d17e2;
            }

            @media (min-width: 768px) {
              .button-group {
                width: 190px;
              }
            }
          `}</style>
        </main>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
