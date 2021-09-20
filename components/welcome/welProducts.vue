<template>
        <v-sheet 
            class="mt-5 mx-auto"
            elevation="8"
            max-width="80%"
        >
            <v-slide-group mobile-breakpoint="1000" show-arrows center-active>

                <v-slide-item v-for="(item, i) in items" :key="i">
                    <v-card width="200" class="ma-4">
                        <v-card-title>
                            <v-img height="400px" contain :src="item.src"></v-img>
                        </v-card-title>
                        <v-card-text class="text-center">
                            <b>{{ item.text }}</b>
                        </v-card-text>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
</template>

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
        ],
    }
  }
}
</script>