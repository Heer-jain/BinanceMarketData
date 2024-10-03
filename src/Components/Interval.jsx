import React from 'react';

const Interval = ({ selectedInterval, onIntervalChange, intervals }) => {
  return (
    <div>
      <label>Choose Interval:</label>
      <select value={selectedInterval} onChange={onIntervalChange}>
        {intervals.map((interval) => (
          <option key={interval} value={interval}>{interval}</option>
        ))}
      </select>
    </div>
  );
};

export default Interval;
