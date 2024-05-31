"use client";

import { useEffect, useState } from 'react';
import {getDrivers, addDrivers} from '../services/api';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = async () => {
    try {
      const response = await addDrivers({
        name,
        phoneNumber,
      });
      setDrivers([...drivers, response.data]);
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drivers</h1>
      <ul className="mb-4">
        {drivers.map((driver) => (
          <li key={driver.id}>{driver.name} - {driver.phoneNumber}</li>
        ))}
      </ul>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-2 p-2 border"
        />
        <button
          onClick={handleAddDriver}
          className="p-2 bg-blue-500 text-white"
        >
          Add Driver
        </button>
      </div>
    </div>
  );
};

export default DriversPage;
