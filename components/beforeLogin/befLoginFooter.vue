<!-- まるっと書き換え -->
<template>
  <div :style="{ marginTop: `${height}px`}">
    <v-footer
      absolute
      dark
      color="black"
      :height="height"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <privacyPolicyLink />
        <termsLink />
        <contactLink />
        <v-col
          class="text-center white--text"
          cols="12"
        >
              &copy;{{ copyRightYear }}
              <strong>{{ appName }}</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName,
      height: 64
    }
  },
  components: {
    privacyPolicyLink: () => import('~/components/beforeLogin/privacyPolicyLink'),
    termsLink: () => import('~/components/beforeLogin/termsLink'),
    contactLink: () => import('~/components/beforeLogin/contactLink')
  },
  computed: {
    copyRightYear () {
      const beginningYear = 2021
      const thisYear = new Date().getFullYear()
      return (beginningYear < thisYear)
        ? `${beginningYear} - ${thisYear}` : beginningYear
    }
  }
}
</script>