import axios from 'axios'

export const apiAxios = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// TO DO: Add token
// apiAxios.interceptors.request.use(function (config){
//     config.header.

// });
