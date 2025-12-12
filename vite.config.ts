import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Note: We cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" in some environments.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // We still define process.env.API_KEY as a fallback, but rely on import.meta.env.VITE_API_KEY in the app.
      // This is helpful if you decide to check process.env.API_KEY in some legacy code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || '')
    },
    build: {
      outDir: 'dist',
    }
  };
});