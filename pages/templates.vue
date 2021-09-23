<template>
    <v-container
      class="ma-0 pa-0"
    >

    <category />
    <search />
    
    </v-container>
</template>

<script>

export default {
  components: {
    category: () => import('@/components/selectTemplate/category'),
    search: () => import('@/components/selectTemplate/search'),
  },
  layout ({ store }) {
    return store.state.loggedIn ? 'loggedIn' : 'beforeLogin'
  },
  // data () 追加
  data () {
    return {
    }
  },
  computed: {

  }
}
</script>

<!-- css 追加 -->
<style>

</style>