"use client";

import { useEffect, useState } from 'react';
import {getDrivers, addDrivers} from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

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

  const handleAddDriver = async (e) => {
    try { 
        e.preventDefault();
        if (name === "" || phoneNumber === "" || profilePhoto === null){
            toast.success('All Fields are required');
            return;
        } 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', phoneNumber);
        formData.append('profilePhoto', profilePhoto);
        const response = await addDrivers(formData);
        if (!response.success){
            toast.error(response.message);
            return;
        }
        setDrivers([...drivers, response.data]);
        toast.success('Driver added successfully!');
    } catch (error) {
        console.error('Error adding driver:', error);
        toast.error('Failed to add driver. Please try again later.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drivers</h1>
      <ul className="mb-4">
        <li className="flex justify-between border-b py-2 font-bold">
            <span className="w-[33.33%]">Name</span>
            <span className="w-[33.33%]">Phone Number</span>
            <span className="w-[33.33%]">Profile Photo</span>
        </li>
        {drivers.map((driver) => (
            <li key={driver.id} className="flex justify-around border-b py-2">
                <span className="w-[33.33%]">{driver.name}</span>
                <span className="w-[33.33%]">{driver.phoneNumber}</span>
                <span  className="w-[33.33%] " >
                    <img  className="w-3/3 w-12 h-12"  src={`http://localhost:3000/uploads/profilePhotos/${driver.profilePhoto}`} alt={driver.name} />
                </span>  
            </li>
        ))}
        </ul>
      <div className="flex flex-col ">
      <h2 className="text-xl font-bold">Add Driver</h2>
      <form onSubmit={handleAddDriver}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2 m-2"
        />
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          className="border p-2 m-2"
        />
        <input 
          type="file" 
          onChange={(e) => setProfilePhoto(e.target.files[0])} 
          className="border p-2 m-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Add Driver</button>
      </form>
      </div>
    </div>
  );
};

export default DriversPage;
