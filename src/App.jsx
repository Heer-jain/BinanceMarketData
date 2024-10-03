import { useState, useEffect, useRef } from 'react';
import Symbol from './Components/Symbol';
import Interval from './Components/Interval';
import CandlestickChart from './Components/CandlestickChart';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-moment';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, TimeScale, CandlestickController, CandlestickElement);

const symbols = {
  'ETH/USDT': 'ethusdt',
  'BNB/USDT': 'bnbusdt',
  'DOT/USDT': 'dotusdt'
};

const intervals = ['1m', '3m', '5m'];

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('ETH/USDT');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [candlestickData, setCandlestickData] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`${selectedSymbol}_${selectedInterval}`);
    if (storedData) {
      setCandlestickData(JSON.parse(storedData));
    }

    const symbol = symbols[selectedSymbol];
    const url = `wss://stream.binance.com:9443/ws/${symbol}@kline_${selectedInterval}`;

    socketRef.current = new WebSocket(url);

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { k: { t, o, h, l, c } } = message;
      const newCandlestick = {
        time: new Date(t),
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c)
      };

      setCandlestickData((prevData) => {
        const updatedData = [...prevData, newCandlestick];
        localStorage.setItem(`${selectedSymbol}_${selectedInterval}`, JSON.stringify(updatedData));
        return updatedData;
      });
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedSymbol, selectedInterval]);

  return (
    <div className="App">
      <h1>Binance Candlestick Chart</h1>
      <div className="container">
        <Symbol 
          selectedSymbol={selectedSymbol} 
          onSymbolChange={(e) => setSelectedSymbol(e.target.value)} 
          symbols={symbols} 
        />
        <Interval 
          selectedInterval={selectedInterval} 
          onIntervalChange={(e) => setSelectedInterval(e.target.value)} 
          intervals={intervals} 
        />
      </div>
      <CandlestickChart 
        candlestickData={candlestickData} 
        selectedSymbol={selectedSymbol} 
      />
    </div>
  );
}

export default App;
