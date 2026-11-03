import { Chart, registerables } from "chart.js"
import { Bar, Doughnut, Line } from "react-chartjs-2"

Chart.register(...registerables)

// Palette matches tailwind.config.js (teal + amber)
export const CHART_COLORS = [
  "#F4A340", // amber
  "#2DD4BF", // teal
  "#47A5C5", // blue
  "#EF476F", // pink
  "#FDCE79", // light amber
  "#06D6A0", // green
]

const axisStyle = {
  ticks: { color: "#A2D5CC" },
  grid: { color: "rgba(255,255,255,0.06)" },
}

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: axisStyle, y: { ...axisStyle, beginAtZero: true } },
}

// labels: ["Jan", "Feb", ...]  values: [3, 5, ...]
export function LineTrend({ labels, values, label = "Value", height = 240 }) {
  return (
    <div style={{ height }}>
      <Line
        options={baseOptions}
        data={{
          labels,
          datasets: [
            {
              label,
              data: values,
              borderColor: "#F4A340",
              backgroundColor: "rgba(244,163,64,0.15)",
              pointBackgroundColor: "#F4A340",
              tension: 0.35,
              fill: true,
            },
          ],
        }}
      />
    </div>
  )
}

export function BarTrend({ labels, values, label = "Value", height = 240 }) {
  return (
    <div style={{ height }}>
      <Bar
        options={baseOptions}
        data={{
          labels,
          datasets: [
            {
              label,
              data: values,
              backgroundColor: "#2DD4BF",
              borderRadius: 6,
            },
          ],
        }}
      />
    </div>
  )
}

export function DonutChart({ labels, values, height = 240 }) {
  return (
    <div style={{ height }}>
      <Doughnut
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: { position: "bottom", labels: { color: "#A2D5CC" } },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: CHART_COLORS,
              borderWidth: 0,
            },
          ],
        }}
      />
    </div>
  )
}