import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    process.env = {...process.env, ...env };

    return defineConfig({
        server: {
            host: `app.${process.env.APP_SERVICE}`,
            port: 5173,
            https: {
                key: fs.readFileSync(`./certs/${process.env.APP_SERVICE}.key`),
                cert: fs.readFileSync(`./certs/${process.env.APP_SERVICE}.cert`),
            },
            cors: true,
        },
        plugins: [
            laravel({
                input: 'resources/js/app.js',
                refresh: true,
            }),
            tailwindcss(),
        ],
    });
};
