import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box } from '@mui/material';

const InvestmentChart = ({ investments }) => {
  const chartData = investments.map((investment, index) => {
    const total = investments.slice(0, index + 1).reduce((sum, inv) => sum + inv.amount, 0);
    return {
      name: investment.symbol,
      amount: investment.amount,
      total,
    };
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="total" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
};

export default InvestmentChart;
