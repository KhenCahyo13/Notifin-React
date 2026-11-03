import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: ['src/test'],
            insertTypesEntry: true,
        }),
    ],
    test: {
        environment: 'jsdom',
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'notifin',
            formats: ['es', 'cjs'],
            fileName: (format) =>
                format === 'es' ? 'notifin.js' : 'notifin.cjs',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                '@radix-ui/react-alert-dialog',
                '@radix-ui/react-visually-hidden',
                'clsx',
                'tailwind-merge',
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'notifin.css';
                    }

                    return assetInfo.name ?? 'asset-[hash][extname]';
                },
            },
        },
    },
});
