<template>
  <v-app-bar
    app
    :height="appBarHeight"
    color="white"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <signup-link />
    <login-link />
  </v-app-bar>
</template>

<script>
export default {
  components: {
    loginLink: () => import('~/components/beforeLogin/loginLink'),
    signupLink: () => import('~/components/beforeLogin/signupLink'),
    appLogo: () => import('~/components/ui/appLogo'),
    appTitle: () => import('~/components/ui/appTitle'),
  },
  data ({ $store }) {
    return {
      appBarHeight: $store.state.styles.beforeLogin.appBarHeight
    }
  }
}
</script>