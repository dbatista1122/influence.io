import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ accessToken, metric, startDate, endDate }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: metric,
        data: [],
        borderColor: 'rgb(255, 57, 75)',
        backgroundColor: 'rgb(255, 57, 75)',
      },
    ],
  });
  const [loadingDone, setLoadingDone] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `YouTube Channel ${metric.charAt(0).toUpperCase() + metric.slice(1)}`,
      },
      maintainAspectRatio: false,
      responsive: true,
      animation: false,
    },
    scales: {
      x: {
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getChannelMetrics(accessToken, metric, startDate, endDate);
        parseData(fetchedData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      } finally {
        setLoadingDone(true);
      }
    };

    fetchData();
  }, [accessToken, metric, startDate, endDate]);

  async function getChannelMetrics(accessToken, metric, startDate, endDate) {
    try {
      const res = await fetch('/api/youtube/getChannelMetrics', {
        method: 'POST',
        body: JSON.stringify({
          startDate,
          endDate,
          metrics: metric,
          dimensions: 'day',
          bearerToken: accessToken,
        }),
      });

      const fetchedData = await res.json();
      return fetchedData.data.rows;
    } catch (error) {
      console.error('Error fetching channel metrics:', error);
      throw error;
    }
  }

  function parseData(dataRows) {
    try {
      const labels = [];
      const data = [];

      dataRows.forEach((element) => {
        labels.push(element[0]);
        data.push(element[1]);
      });

      setChartData({
        labels,
        datasets: [
          {
            label: metric,
            data,
            borderColor: 'rgb(255, 57, 75)',
            backgroundColor: 'rgb(255, 57, 75)',
          },
        ],
      });
    } catch (error) {
      console.error('Error parsing data:', error);
      throw error;
    }
  }

  return (
    <div className="w-full pt-15 border rounded-lg bg-white shadow-md">
      {loadingDone ? (
        <Line className="w-full max-h-lg p-5" options={options} data={chartData} />
      ) : (
        <div className="w-full flex items-center justify-center font-semibold">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default LineChart;
