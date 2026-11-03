import GlassCard from "./GlassCard"

// tone: "up" (green), "down" (red) or "neutral"
const TONES = {
  up: "text-caribbeangreen-100",
  down: "text-pink-200",
  neutral: "text-richblack-200",
}

export default function StatCard({ title, value, sub, tone = "neutral", icon }) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-richblack-200">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-richblack-5">
            {value}
          </p>
          {sub && <p className={`mt-1 text-xs ${TONES[tone]}`}>{sub}</p>}
        </div>
        {icon && (
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-xl text-yellow-100">
            {icon}
          </div>
        )}
      </div>
    </GlassCard>
  )
}