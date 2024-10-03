import React from 'react';
import { Chart } from 'react-chartjs-2';

const CandlestickChart = ({ candlestickData, selectedSymbol }) => {
  const chartData = {
    labels: candlestickData.map((data) => data.time),
    datasets: [
      {
        label: `${selectedSymbol} Candlestick Data`,
        data: candlestickData.map((data) => ({
          x: data.time,
          o: data.open,
          h: data.high,
          l: data.low,
          c: data.close
        })),
        borderColor: '#3e95cd',
        backgroundColor: 'rgba(62, 149, 205, 0.4)',
        borderWidth: 1,
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: false,
          tooltipFormat: 'll HH:mm',
        },
        ticks: {
          source: 'data',
          autoSkip: true, 
          maxTicksLimit: 10, 
        }
      },
      y: {
        beginAtZero: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false
      }
    }
  };

  return (
    <div className='chart' style={{ height: '400px' }}>
      <Chart type="candlestick" data={chartData} options={chartOptions} />
    </div>
  );
};

export default CandlestickChart;
