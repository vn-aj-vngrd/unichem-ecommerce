import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, chartOptions }) {
  return <Line data={chartData} options={chartOptions} height={500} />;
}

export default LineChart;
