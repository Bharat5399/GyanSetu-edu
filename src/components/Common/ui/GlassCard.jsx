// Shared glass-style card used across the Home, Admin and Instructor sections.
export default function GlassCard({ title, action, className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h3 className="text-base font-semibold text-richblack-5">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}