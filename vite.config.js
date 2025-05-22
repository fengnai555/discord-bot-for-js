import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig({  
    resolve: {
        alias: {
            '@':path.resolve(__dirname, './src'),
            '@core':path.resolve(__dirname, './src/core'),
            '@store':path.resolve(__dirname, './src/store'),
            '@commands':path.resolve(__dirname, './src/commands'),

        },
    },
})