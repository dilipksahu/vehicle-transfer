"use client";

import { useEffect, useState } from 'react';
import {getDrivers,getVehicles,transferVehicle} from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    const fetchDriversAndVehicles = async () => {
      try {
        const driversResponse = await getDrivers({is_active: true});
        const vehiclesResponse = await getVehicles({is_active: true});
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
      const response = await transferVehicle({
        driverId: selectedDriver,
        vehicleId: selectedVehicle,
      });
      if (!response.success){
        toast.error(response.message);
        return;
    }
      toast.success('Transfer created successfully!');
    } catch (error) {
      console.error('Error transferring vehicle:', error);
      toast.success('Transfer Failed. Please try again later!');
    }
  };
console.log(selectedDriver);
console.log(selectedVehicle);
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
            <option key={vehicle.vehicleNumber} value={vehicle.id}>
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
