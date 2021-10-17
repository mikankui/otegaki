<template>
<v-row>
  <v-col>
    <messageToolBar />
    <messagePaper/>
    <messageEditorBar />
  </v-col>
</v-row>
</template>

<script>

export default {
  data() {
    return {    
    }
  },
  components: {
    messagePaper: () => import('@/components/writingMessage/messagePaper'),
    messageToolBar: () => import('@/components/writingMessage/messageToolBar'),
    messageEditorBar: () => import('@/components/writingMessage/messageEditorBar'),
  },
  layout ({ store }) {
    return store.state.loggedIn ? 'loggedIn' : 'beforeLoginMessage'
  },
  methods: {
  },
  mounted: function() {
  },
  async fetch({ store }){
    await store.dispatch('setCardInfo')
  }
}
</script>

<style>

</style>