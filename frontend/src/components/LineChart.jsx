import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const optionsData = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };
  return <Line data={chartData} options={optionsData} height={500} />;
}

export default LineChart;
