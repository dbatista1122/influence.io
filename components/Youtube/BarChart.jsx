import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Subscribers vs. Views",
    },
    maintainAspectRation: false,
    responsive: true,
    animation: false,
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Subscribers",
      data: [4582, 5486, 6977, 7651, 8918, 8651, 7862, 9632, 9462, 10351, 15205, 25000],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235, 0.4)",
    },
  ],
};

const BarChart = () => {
  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
