import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { PreRenderedAsset } from 'rollup';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development',
      ),
      // Shim for process.env to prevent "process is not defined" errors in browser
      // if code or dependencies try to access other process.env properties.
      'process.env': '{}',
    },
    build: {
      // Output directory for the built widget files
      outDir: 'dist', // You can choose any folder name
      lib: {
        // Entry point for your widget loader
        entry: path.resolve(__dirname, 'src/widget-loader.tsx'),
        // The global variable name your widget will be exposed under
        name: 'ChatbotWidget',
        // Filename for the generated JS bundle (can also be a function)
        fileName: (format) => `chatbot-widget.${format}.js`,
        // Formats to build (UMD is good for broad compatibility, ES for modern browsers)
        formats: ['umd', 'es'],
      },
      rollupOptions: {
        // **Crucial:** Externalize React and ReactDOM
        // This tells Vite not to bundle React into your widget.
        // The website using your widget should already have React.
        external: ['react', 'react-dom'],
        output: {
          // Global variable names for externalized dependencies (for UMD format)
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          // Customize the name of the output CSS file
          assetFileNames: (assetInfo: PreRenderedAsset): string => {
            if (assetInfo.name === 'style.css') {
              // Default name Vite uses for CSS from entry
              return 'chatbot-widget.css';
            }
            // For any other assets, use their name.
            // Provide a fallback if assetInfo.name is undefined to ensure a string is always returned.
            return assetInfo.name ?? 'default-asset';
          },
        },
      },
      // Optional: Generate a source map for easier debugging of the bundled code
      sourcemap: true,
    },
  };
});
