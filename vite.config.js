import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from'dotenv';

dotenv.config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/fasdf",
})


console.log("BASE URL",process.env.VITE_BASE_URL);