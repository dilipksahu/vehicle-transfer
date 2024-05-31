"use client";

import { useEffect, useState } from 'react';
import {getVehicles,addVehicles} from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pucCertificate, setPucCertificate] = useState(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e) => {
    try {
      e.preventDefault();
      if (vehicleNumber === "" || vehicleType === "" || pucCertificate === null || insuranceCertificate === null){
          toast.success('All Fields are required');
          return;
      } 
      const formData = new FormData();
      formData.append('vehicleNumber', vehicleNumber);
      formData.append('vehicleType', vehicleType);
      formData.append('pucCertificate', pucCertificate);
      formData.append('insuranceCertificate', insuranceCertificate);
      const response = await addVehicles(formData);
      if (!response.success){
        toast.error(response.message);
        return;
      }
      setVehicles([...vehicles, response.data]);
      toast.success('Driver added successfully!');
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add driver. Please try again later.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vehicles</h1>
      <ul className="mb-4">
        <li className="flex justify-between border-b py-2 font-bold">
            <span className="w-1/4">Vehicle Type</span>
            <span className="w-1/4">Vehicle Number</span>
            <span className="w-1/4">PUC Certificate</span>
            <span className="w-1/4">Insurance Certificate</span>
        </li>
        {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="flex justify-between border-b py-2">
              <span className="w-1/4">{vehicle.vehicleType}</span>
              <span className="w-1/4">{vehicle.vehicleNumber}</span>
              <span className="w-1/4">
                <img  className="w-1/4 w-12 h-12" src={`http://localhost:3000/uploads/pucCertificates/${vehicle.pucCertificate}`} alt="PUC Certificate" />
              </span>
              <span className="w-1/4 ">
                <img className="w-3/3 w-12 h-12" src={`http://localhost:3000/uploads/insuranceCertificates/${vehicle.insuranceCertificate}`} alt="Insurance Certificate" />
              </span>
            </li>
        ))}
        </ul>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">Add Vehicle</h2>
        <form onSubmit={handleAddVehicle}>
          <input 
            type="text" 
            placeholder="Vehicle Number" 
            value={vehicleNumber} 
            onChange={(e) => setVehicleNumber(e.target.value)} 
            className="border p-2 m-2"
          />
          <input 
            type="text" 
            placeholder="Vehicle Type" 
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)} 
            className="border p-2 m-2"
          />
          <input 
            type="file" 
            onChange={(e) => setPucCertificate(e.target.files[0])} 
            className="border p-2 m-2"
          />
          <input 
            type="file" 
            onChange={(e) => setInsuranceCertificate(e.target.files[0])} 
            className="border p-2 m-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 m-2">Add Vehicle</button>
          </form>
      </div>
    </div>
  );
};

export default VehiclesPage;
