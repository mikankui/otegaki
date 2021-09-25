<template>
  <v-app>
    <bef-login-app-bar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    befLoginAppBar: () => import('~/components/beforeLogin/befLoginAppBar'),
  },
}
</script>