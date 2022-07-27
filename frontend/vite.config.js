import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command !== 'dev') {
        return {
            plugins: [vue()],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url)),
                },
            },
            root: './',
            build: {
                outDir: '../dist',
            },
        };
    } else {
        return {
            plugins: [vue()],
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('./src', import.meta.url)),
                },
            },
            root: './',
            build: {
                outDir: '../dev-dist',
            },
        };
    }
});
