# Binance Market Data

This project implements a real-time candlestick chart for selected cryptocurrency pairs using Binance WebSocket API. The user can toggle between different cryptocurrencies and time intervals, and the chart updates accordingly. The data is also stored in `localStorage` for persistence.

## Features

- Real-time candlestick chart for ETH/USDT, BNB/USDT, and DOT/USDT.
- Intervals of 1 minute, 3 minutes, and 5 minutes available for selection.
- Data persistence using `localStorage`.
- Fully responsive chart using `Chart.js` and `chartjs-chart-financial`.

## Technologies Used

- **React**: Frontend library for building the UI.
- **Chart.js**: Used for rendering the candlestick chart.
- **Binance WebSocket API**: Used to fetch live candlestick data for the selected cryptocurrency pair.
- **Local Storage**: Persists candlestick data locally for each selected symbol and interval.
- **Tailwind CSS**: Used for styling the UI.


