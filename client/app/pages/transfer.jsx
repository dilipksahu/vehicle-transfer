"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';

const TransferPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    const fetchDriversAndVehicles = async () => {
      try {
        const driversResponse = await api.get('/drivers');
        const vehiclesResponse = await api.get('/vehicles');
        setDrivers(driversResponse.data);
        setVehicles(vehiclesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDriversAndVehicles();
  }, []);

  const handleTransfer = async () => {
    try {
      await api.post('/transfers', {
        driverId: selectedDriver,
        vehicleId: selectedVehicle,
      });
      alert('Transfer successful');
    } catch (error) {
      console.error('Error transferring vehicle:', error);
      alert('Transfer failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transfer Vehicle</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="driver">Select Driver:</label>
        <select
          id="driver"
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="mb-2 p-2 border"
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <label htmlFor="vehicle">Select Vehicle:</label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className="mb-2 p-2 border"
        >
          <option value="">Select a vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.vehicleNumber} value={vehicle.vehicleNumber}>
              {vehicle.vehicleType} - {vehicle.vehicleNumber}
            </option>
          ))}
        </select>
        <button
          onClick={handleTransfer}
          className="p-2 bg-blue-500 text-white"
        >
          Transfer Vehicle
        </button>
      </div>
    </div>
  );
};

export default TransferPage;
