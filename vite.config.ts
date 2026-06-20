import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const googleSiteVerification = env.VITE_GOOGLE_SITE_VERIFICATION || 'vKJnekj9NI1OX40vKYcNXFT6S8lSfqrYhDMiHDc-P3w';

  return {
    plugins: [
      react(),
      {
        name: 'inject-google-site-verification',
        transformIndexHtml(html) {
          return html.replace('__GOOGLE_SITE_VERIFICATION__', googleSiteVerification);
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@vis.gl/react-google-maps')) {
                return 'google-maps';
              }

              if (id.includes('react-leaflet') || id.includes('leaflet')) {
                return 'leaflet';
              }

              if (id.includes('react-router-dom')) {
                return 'router';
              }
            }

            if (id.includes('/src/data/spots.ts')) {
              return 'spots';
            }

            if (id.includes('/src/data/editorialPages.ts')) {
              return 'editorial-pages';
            }

            return undefined;
          },
        },
      },
    },
  };
});
