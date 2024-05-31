"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async () => {
    try {
      const response = await api.post('/vehicles', {
        vehicleNumber,
        vehicleType,
      });
      setVehicles([...vehicles, response.data]);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vehicles</h1>
      <ul className="mb-4">
        {vehicles.map((vehicle) => (
          <li key={vehicle.vehicleNumber}>{vehicle.vehicleType} - {vehicle.vehicleNumber}</li>
        ))}
      </ul>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="mb-2 p-2 border"
        />
        <button
          onClick={handleAddVehicle}
          className="p-2 bg-blue-500 text-white"
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehiclesPage;
