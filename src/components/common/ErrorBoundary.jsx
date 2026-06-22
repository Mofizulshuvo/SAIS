import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 text-gray-900 dark:bg-gray-950 dark:text-white">
          <div className="max-w-xl rounded-2xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Runtime Error</p>
            <h1 className="mt-3 text-2xl font-bold">SAIS could not render this screen</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {this.state.error.message}
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
