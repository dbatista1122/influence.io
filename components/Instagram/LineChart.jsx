import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ title, arrayData, startDate, endDate }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
      maintainAspectRation: false,
      responsive: true,
      animation: false,
    },
  };

  const labels = generateMonthLabels(startDate, endDate);

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: arrayData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  }

  return (
    <div className="md:col-span-6 relative m-auto p-4 border rounded-lg bg-white shadow-md">
      <Line options={options} data={data} />
    </div>
  );
};

function generateMonthLabels(startDate, endDate) {
  const labels = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    labels.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return labels;
};

export default LineChart;
