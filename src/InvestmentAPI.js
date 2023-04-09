import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const InvestmentAPI = ({ investments }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'value', headerName: 'Valor', width: 150 },
    { field: 'percentage', headerName: 'Porcentaje', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={investments} columns={columns} pageSize={5} />
    </div>
  );
};

InvestmentAPI.getInvestments = async () => {
  // Simula una llamada a la API para obtener datos de inversiones
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Inversión A', value: 10000, percentage: 0.1 },
        { id: 2, name: 'Inversión B', value: 20000, percentage: 0.2 },
        { id: 3, name: 'Inversión C', value: 30000, percentage: 0.3 },
        // Agrega más datos de inversiones si lo deseas
      ]);
    }, 1000);
  });
};

export default InvestmentAPI;
