import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    //defining environment varaibles
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY) 
  }
})

// {import.meta.env.VITE_API_KEY}
