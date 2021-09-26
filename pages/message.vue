<template>
<v-row>
  <v-col>
    <messageFreehand
      v-bind:title="drawProps.title"
      v-bind:colors="drawProps.colors"
      v-bind:bgColors="drawProps.bgColors"
      v-bind:lineColor = "drawProps.lineColor"
      v-bind:bgColor = "drawProps.bgColor"
      v-on:changeLineColor = "changeLineColor"
      v-on:changeBgColor = "changeBgColor"
      v-on:drawSubmit="saveDrawing"
      >
    </messageFreehand>
  </v-col>
</v-row>
</template>

<script>

export default {
  data() {
    return {
      drawProps: 
        {
          title: "メッセージを書き込めます",
          colors: ['#EAEAEA','#292929', '#00A0FF', '#FF29AA', '#FFE500', '#FF3030', '#12EB0A'],
          bgColors: ['#EAEAEA','#292929', '#00A0FF', '#FF29AA', '#FFE500', '#FF3030', '#12EB0A'],
          lineColor: "#292929",
          bgColor: "#FFFFFF",
        },      
    }
  },
  components: {
    messageFreehand: () => import('@/components/writingMessage/messageFreehand'),
  },
  layout ({ store }) {
    return store.state.loggedIn ? 'loggedIn' : 'beforeLoginMessage'
  },
  methods: {
    changeLineColor: function(color){
      this.drawProps.lineColor = color;
    },
    changeBgColor: function(color){
      this.drawProps.bgColor = color;
    },
    saveDrawing: function(drawSvg){
      console.log (drawSvg)      
    },
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