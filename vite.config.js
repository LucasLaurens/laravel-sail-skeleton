import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    process.env = {...process.env, ...env };

    return defineConfig({
        server: {
            host: '0.0.0.0',
            port: 5173,
            https: {
                key: fs.readFileSync(`./certs/${process.env.APP_SERVICE}.key`),
                cert: fs.readFileSync(`./certs/${process.env.APP_SERVICE}.cert`),
            },
            hmr: {
                host: `app.${process.env.APP_SERVICE}`,
                protocol: 'wss',
                port: 443
            },
            cors: true,
            strictPort: true,
        },
        plugins: [
            basicSsl(),
            laravel({
                input: ['resources/js/app.js', 'resources/css/app.css'],
                refresh: true,
            }),
            tailwindcss(),
        ],
    });
};
