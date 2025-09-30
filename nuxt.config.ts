// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    [
      '@vite-pwa/nuxt',
      {
        registerType: 'autoUpdate',
        manifest: {
          name: 'Lorcana Lore Tracker',
          short_name: 'Lore Tracker',
          description: 'Track Lore for Lorcana games offline!',
          theme_color: '#18181b',
          background_color: '#18181b',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: './favicon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'external-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 7 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /^\/(.*)/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'local-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 7 * 24 * 60 * 60,
                },
              },
            },
          ],
        },
      },
    ],
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
      ],
      title: 'Lorcana Lore Tracker',
      link: [
        { rel: 'icon', type: 'image/png', href: './favicon.png' },
        { rel: 'apple-touch-icon', href: './favicon.png' },
      ],
    },
  },
});
