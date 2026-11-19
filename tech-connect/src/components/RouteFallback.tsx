/** Lightweight Suspense fallback: a slim progress bar only (no full-screen spinner flash). */
export default function RouteFallback() {
  return (
    <div role="status" aria-label="Loading page" className="fixed inset-x-0 top-0 z-[200] h-[3px] overflow-hidden bg-transparent">
      <div className="h-full w-1/3 animate-[route-load_1s_ease-in-out_infinite] bg-[red]" />
    </div>
  )
}
