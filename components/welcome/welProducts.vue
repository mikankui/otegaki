<template>



  <v-sheet
    class="mx-auto"
    elevation="1"
    max-width="100%"
  >
    <v-slide-group
      class="pa-1"
      show-arrows
    >
      <v-slide-item
         v-for="(item, i) in items"
        :key="i"
      >
        <v-card
          class="ma-1"
          height="400"
          width="200"
        >
          <v-img 
            :src="item.src"
            max-height="500px"
            widht="100%"
          />
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>

      <!--
          <v-slide-group center-active>
   
    <v-slide-item show-arrows v-for="(item, i) in items" :key="i">
      <v-container>
            <v-row>
              <v-col xs="12" sm="4" >
                <v-card>
                <v-card-title>
                    <v-img 
                      :src="item.src"
                      max-height="500px"
                      widht="100%"
                    />
                </v-card-title>
                <v-card-text class="text-center">
                    {{ item.text }}
                </v-card-text>
                </v-card>
              </v-col>
            </v-row>
        </v-container>
            </v-slide-item>
  </v-slide-group>
        -->


</template>
<style>
.v-slide-group__next, .v-slide-group__prev {
    /*align-items: center;
    display: flex;
    flex: 0 1 52px;
    justify-content: center;
    */
    min-width: 20px;
}
</style>
<script>
export default {
  data(){
    return{
        selectItem:null,
        items: [
          {
            src: 'sample1.jpg',
            text: '誕生日のお祝いに',
          },
          {
            src: 'sample2.jpg',
            text: '日頃の感謝を込めて',
          },
          {
            src: 'sample3.jpg',
            text:'旅先からの近況報告',
          },
          {
            src: 'sample4.jpg',
            text:'新天地での活躍を祈って'
          },
          {
            src: 'sample5.jpg',
            text:'友人の結婚を祝福'
          },
          {
            src: 'sample6.jpg',
            text:'子供の誕生に'
          },
          {
            src: 'sample7.jpg',
            text:'何でもない日に'
          },
          {
            src: 'sample8.jpg',
            text:'成人になったお祝いに'
          },
        ],
    }
  }
}
</script>