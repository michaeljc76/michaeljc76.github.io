// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),

        projects: resolve(__dirname, 'projects.html'),
        kiro: resolve(__dirname, 'kiro.html'),

        resume: resolve(__dirname, 'resume.html'),

        //globe: resolve(__dirname, 'models/wireframe_earth2.gltf')
      },
    },
  },
  assetsInclude: ['models/wireframe_earth5.glb', 'models/clouds.glb', 'models/computer.glb']
})