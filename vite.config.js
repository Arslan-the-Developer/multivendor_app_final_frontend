import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from'dotenv';
import tailwindcss from '@tailwindcss/vite'


dotenv.config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: process.env.VITE_BASE_URL || "/multivendor_app_final_frontend",
})


console.log("BASE URL",process.env.VITE_BASE_URL);