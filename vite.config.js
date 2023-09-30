const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        contact: './contact.html',
        projects: './projects.html',
        resume: './resume.html',
        // ...
        // List all files you want in your build
      }
    }
  }
})