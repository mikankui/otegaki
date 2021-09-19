<template>
  <v-app>
    <bef-login-app-bar />
    <v-main>
      <nuxt />
    </v-main>
    <bef-login-footer />
  </v-app>
</template>

<script>
export default {
  components: {
    befLoginAppBar: () => import('~/components/beforeLogin/befLoginAppBar'),
    befLoginFooter: () => import('~/components/beforeLogin/befLoginFooter'),
  },
}
</script>