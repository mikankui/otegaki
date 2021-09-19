<template>
  <div>
    <v-row>
      <v-col
        v-for="n in 6"
        :key="n"
        class="d-flex child-flex"
        cols="6"
      >
        <v-img
          :src="`sample${n}.jpg`"
          :lazy-src="`sample${n}.jpg`"
          max-height="100"
          max-width="180"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>

    <v-row
      class="blue lighten-4" 
      style="height: 250px;"
      justify="center" 
      align-content="center"
    >

    <v-sheet
      color="white"
      elevation="0"
      height="200px"
      width="450px"
    >
      <v-card-title class="pb-8 text-subtitle-2">
        <div class="text-left">{{appName}}は、スマホで手書きのメッセージが贈れます。</div>
        <div class="text-left">遠く離れたあの人に、手書きだからこそ伝えられるモノを届けられるサービスです。</div>
        <div class="text-left">文字だけでなく、イラストもOKです。</div>
      </v-card-title>
    </v-sheet>
    </v-row>
  </div>

</template>

<script>
export default {
    data ({ $config: { appName } }) {
    return {
      appName,
      items: [
          {
            src: 'sample1.jpg',
          },
          {
            src: 'sample2.jpg',
          },
          {
            src: 'sample3.jpg',
          },
          {
            src: 'sample4.jpg',
          },
          {
            src: 'sample5.jpg',
          },
          {
            src: 'sample6.jpg',
          },
        ],
    }
  }
}
</script>