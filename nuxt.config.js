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
  ** add PWA
  */
  buildModules: [
    '@nuxtjs/pwa',
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
  }
  
}

