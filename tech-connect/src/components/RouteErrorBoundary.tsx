import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface State {
  failed: boolean
}

/** Catches failed lazy route imports (offline / stale deploy) and offers a retry instead of a blank screen. */
export default class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route failed to load', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main role="alert" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center font-poppins">
        <h1 className="text-[22px] font-bold text-[#0f0f12]">This page could not be loaded</h1>
        <p className="max-w-[420px] text-[14px] text-[#5e6166]">Check your connection and try again.</p>
        <button type="button" onClick={() => window.location.reload()} className="h-[44px] rounded-[7px] bg-[red] px-6 text-[13px] font-semibold text-white transition hover:brightness-110">
          Reload page
        </button>
      </main>
    )
  }
}
