import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir:'../myNote/note/learningNotes',
  assetsInclude:['*.md'],
  build:{
    rollupOptions:{
      output:{
        inlineDynamicImports:true
      }
    }
  }
})
