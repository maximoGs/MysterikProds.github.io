import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';

    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
          strict: false
        },
        headers: {
          'Content-Type': 'application/javascript'
        }
      },
      plugins: [
        react({
          jsxRuntime: 'automatic',
          babel: {
            plugins: [
              [
                'babel-plugin-styled-components',
                {
                  displayName: true,
                  pure: true
                }
              ]
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        __DEV__: !isProd
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        target: 'esnext',
        minify: 'terser',
        sourcemap: !isProd,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                if (id.includes('react')) return 'react-vendor';
                if (id.includes('@tanstack')) return 'query-vendor';
                if (id.includes('styled-components')) return 'styled-vendor';
                return 'vendor';
              }
            }
          }
        }
      },
      optimizeDeps: {
        include: [
          'react', 
          'react-dom', 
          '@tanstack/react-query', 
          'zustand', 
          'styled-components'
        ],
        esbuildOptions: {
          target: 'esnext'
        }
      }
    };
});
