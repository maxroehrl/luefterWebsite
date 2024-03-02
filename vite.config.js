import {defineConfig} from 'vite';
import {ViteFaviconsPlugin} from 'vite-plugin-favicon2';
import inject from '@rollup/plugin-inject';
import legacy from '@vitejs/plugin-legacy';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inject({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ViteFaviconsPlugin({
      logo: './src/static/logo.svg',
      inject: true,
      favicons: {
        appName: 'K&R Spot Repair',
        appDescription: 'K&R Spot Repair',
        developerName: 'K&R Spot Repair',
        lang: "de-DE",
        start_url: "/",
        developerURL: null,
        background: '#ffffff',
        theme_color: '#202820',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  root: './src',
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'vario-vent': resolve(__dirname, 'src/vario-vent/index.html'),
      }
    }
  },
});
