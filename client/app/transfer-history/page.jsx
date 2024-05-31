"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';

const TransferHistoryPage = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await api.get('/transfers');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transfer History</h1>
      <ul>
        {transfers.map((transfer) => (
          <li key={transfer.id}>
            {transfer.vehicle.vehicleType} - {transfer.vehicle.vehicleNumber} transferred to {transfer.driver.name} on {new Date(transfer.transferDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferHistoryPage;
