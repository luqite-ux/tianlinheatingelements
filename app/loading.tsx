export default function Loading() {
  return (
    <div role="status" aria-label="Loading page" className="min-h-[45vh] bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="wrap animate-pulse" aria-hidden="true">
        <div className="h-3 w-28 bg-electric/25" />
        <div className="mt-6 h-10 max-w-2xl bg-navy/10" />
        <div className="mt-3 h-10 max-w-xl bg-navy/10" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-44 bg-paper" />
          <div className="h-44 bg-paper" />
          <div className="h-44 bg-paper" />
        </div>
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  )
}
