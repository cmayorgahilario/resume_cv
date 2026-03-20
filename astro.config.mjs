// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Workaround for Astro 6.0.7 + Vite 7 bug: the SSR module runner requests
// "astro:server-app.js" (with .js) but the Astro resolveId filter only matches
// "astro:server-app" (without .js). This plugin redirects the .js variant.
// Track: https://github.com/withastro/astro — remove when fixed upstream.
function astroServerAppFix() {
  return {
    name: 'astro-server-app-fix',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'astro:server-app.js') {
        return this.resolve('astro:server-app');
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss(), astroServerAppFix()],
  },
});
