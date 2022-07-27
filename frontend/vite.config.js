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
                    '@@': fileURLToPath(new URL('./src', import.meta.url)),
                },
            },
            root: './',
            base: '/frontend/',
            build: {
                outDir: '../dist',
                rollupOptions: {
                    external: [
                        '/node_modules/@fortawesome/fontawesome-svg-core',
                    ],
                },
            },
        };
    } else {
        return {
            plugins: [vue()],
            resolve: {
                alias: {
                    '@@': fileURLToPath(new URL('./src', import.meta.url)),
                },
            },
            root: './',
            build: {
                outDir: '../dev-dist',
            },
        };
    }
});
