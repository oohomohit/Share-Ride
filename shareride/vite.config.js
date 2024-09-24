// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import eslint from 'vite-plugin-eslint'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), eslint()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // '/api': 'https://duke-game-backend.vercel.app',
      '/user': 'http://localhost:3000',
      '/journey': 'http://localhost:3000',
        
    },
  },
  plugins: [react()],
})