// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "@/assets/css/normalize.css",
    "element-plus/theme-chalk/dark/css-vars.css",
    "@/assets/css/reset.css",
  ],
  // ssr: false,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ['@use "@/assets/scss/base" as *;'].join("\n"),
        },
      },
    },
  },

  modules: [
    "@element-plus/nuxt",
    "@nuxtjs/algolia",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
  ],

  algolia: {
    apiKey: process.env.ALGOLIA_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    docSearch: {
      indexName: "ecommerce",
      // lang: "zh-CN",
    },
  },

  colorMode: {
    classSuffix: "",
  },
});
