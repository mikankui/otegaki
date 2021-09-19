<template>
  <v-app>
    <logged-in-app-bar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    loggedInAppBar: () => import('~/components/loggedIn/header/loggedInAppBar'),
    //befLoginFooter: () => import('~/components/beforeLogin/befLoginFooter'),
  },
}
</script>