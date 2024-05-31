"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';
import { getTransfers, statusInActive } from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Prompt } from 'next/font/google';

const TransferHistoryPage = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await getTransfers();
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };

    fetchTransfers();
  }, []);

  const handleDeactivateTransfer = async (transfer) => {
    if (transfer.is_active === false) {
      toast.error('Inactive transfer could not be deactive');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to deactivate this transfer?');
    if (confirmed) {
      try {
        const response = await this.statusInActive(id);
        if (response.success) {
          toast.success('Transfer deactivated successfully');
          setTransfers(response.data);
        }
      } catch (error) {
        toast.error('Error deactivating transfer');
      }
    }
   
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transfer History</h1>
       <ul className="mb-4">
        <li className="flex justify-between border-b py-2 font-bold">
            <span className="w-[14.28%]">Driver Name</span>
            <span className="w-[14.28%]">Phone No.</span>
            <span className="w-[14.28%]">vehicle Type</span>
            <span className="w-[14.28%]">vehicle No.</span>
            <span className="w-[14.28%]">Tranfer Date</span>
            <span className="w-[14.28%]">Status</span>
            <span className="w-[14.28%]">Action</span>
        </li>
        {transfers.map((transfer) => (
            <li key={transfer.id} className="flex justify-between border-b py-2">
                <span className="w-[14.28%]">{transfer.driver.name}</span>
                <span className="w-[14.28%]">{transfer.driver.phoneNumber}</span>
                <span className="w-[14.28%]">{transfer.vehicle.vehicleType}</span>
                <span className="w-[14.28%]">{transfer.vehicle.vehicleNumber}</span>
                <span className="w-[14.28%]">{transfer.transferDate}</span>
                <span className="w-[14.28%]">{transfer.is_active ? "Active" : "Inactive"}</span>
                <button className="w-[14.28%] h-10 border-2 border-indigo-600 p-2 m-auto pointer " onClick={() => handleDeactivateTransfer(transfer)}>In-active</button>
            </li>
        ))}
        </ul>
    </div>
  );
};

export default TransferHistoryPage;
