import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            // Ensure proper handling of optional dependencies
            external: [],
        },
        // Optimize for deployment environments
        target: 'esnext',
        minify: 'esbuild',
    },
    // Improve compatibility with deployment platforms
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
});
