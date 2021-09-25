<template>
    <v-container
    >

    <category />
    <search />
    <templateList />
    
    </v-container>
</template>

<script>

export default {
  components: {
    category: () => import('@/components/selectTemplate/category'),
    search: () => import('@/components/selectTemplate/search'),
    templateList: () => import('@/components/selectTemplate/templateList'),
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