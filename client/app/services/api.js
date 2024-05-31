import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

const header = {
    'Content-Type': 'multipart/form-data',
  }

export const getDrivers = async (query=null) => {
  const response = await api.get('/drivers'+`${query && query.is_active ? "?is_active=true" : ""}`);
  return response.data;
};

export const addDrivers = async (payload) => {
    const response = await api.post('/drivers', payload, header);
    return response.data;
};

export const getVehicles = async (query=null) => {
  const response = await api.get('/vehicles'+`${query && query.is_active ? "?is_active=true" : ""}`);
  return response.data;
};

export const addVehicles = async (payload) => {
    const response = await api.post('/vehicles',payload, header);
    return response.data;
  };

export const getTransfers = async () => {
    const response = await api.get('/transfers');
    return response.data;
};

export const transferVehicle = async (payload) => {
  const response = await api.post('/transfers', payload);
  return response.data;
};

export const statusInActive = async (payload) => {
    const response = await api.post('/transfers/'+payload.id, );
    return response.data;
  };


