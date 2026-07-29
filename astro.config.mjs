import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://daarongonzalez.com',
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [
    react(),
    sanity({
      projectId: 'ylsopuoz',
      dataset: 'production',
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
