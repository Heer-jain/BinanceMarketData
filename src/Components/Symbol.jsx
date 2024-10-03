import React from 'react';

const Symbol = ({ selectedSymbol, onSymbolChange, symbols }) => {
  return (
    <div>
      <label>Choose Cryptocurrency:</label>
      <select value={selectedSymbol} onChange={onSymbolChange}>
        {Object.keys(symbols).map((symbol) => (
          <option key={symbol} value={symbol}>{symbol}</option>
        ))}
      </select>
    </div>
  );
};

export default Symbol;
