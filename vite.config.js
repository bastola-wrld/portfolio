import { resolve } from 'path'

export default {
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                education: resolve(__dirname, 'education.html'),
                experience: resolve(__dirname, 'experience.html'),
                projects: resolve(__dirname, 'projects.html'),
                media: resolve(__dirname, 'media.html'),
                skills: resolve(__dirname, 'skills.html'),
                contact: resolve(__dirname, 'contact.html'),
                success: resolve(__dirname, 'success.html'),
            },
        },
    },
    server: {
        port: 5173,
        open: true
    }
}
