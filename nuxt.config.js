module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'otegaki',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Nuxt.js modules
  */
	modules: 
	[
      "@nuxtjs/axios",
      [
        'nuxt-i18n',
        {
          // 使用する言語の設定
          locales: [
            { code: 'ja', name: 'Japanese', iso: 'ja_JP', file: 'ja.json' },
          ],
          defaultLocale: 'ja', // デフォルトの言語
          langDir: 'locales/', // 翻訳ファイルのディレクトリパス
          strategy: 'prefix_and_default', // URLに言語のプレフィックスを追加するかの指定
          vueI18n: {
            // 翻訳ファイルが見つからなかった場合の言語を指定
            fallbackLocale: 'ja'
          },
          vueI18nLoader: true,
          lazy: true // 遅延読み込みの有効化
        }
      ]
	],
  /*
  ** add PWA
  */
  buildModules: [
    '@nuxt/image',
    '@nuxtjs/pwa',
    // Simple usage
    '@nuxtjs/vuetify',
  ],
  pwa: {
    icon: false, // disables the icon module
    manifest: {
      name: 'Otegaki',
      lang: 'ja',
      short_name: 'Otegaki',
      title: 'Otegaki',
      'og:title': 'Otegaki',
      description: '手書きのメッセージを届けます',
      'og:description': '手書きのメッセージを届けます',
      theme_color: '#212121',
      background_color: '#212121'
    }
  },
  image: {
    domains: [
      'images.unsplash.com'
    ],
    alias: {
      unsplash: 'https://images.unsplash.com'
    },
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
  },
  publicRuntimeConfig: {
    appName: process.env.APP_NAME // 環境選定
  },
  vuetify: {
    // 開発環境でcustomVariablesを有効にするフラグ
    // Doc: https://vuetifyjs.com/ja/customization/a-la-carte/
    treeShake: true,
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '4080BE',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          background: 'f6f6f4',
          myblue: '1867C0'
        }
      }
    }
  },
  i18n: {
    // 追加
    strategy: 'no_prefix',
  },
}

