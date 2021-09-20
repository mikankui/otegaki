<template>
  <div>
    <v-row
      justify="center" 
      align-content="center"
    >
      <v-sheet
        color="white"
        elevation="0"
        max-width="80%"
      >

        <v-row
          justify="center" 
          align-content="center"
        >
          <v-col cols=3 v-for="(item, i) in items" :key="i">
            <v-card
              class="mx-auto"
            >
              <v-img
                :src="item.src"
                max-height="500px"
              ></v-img>

              <v-card-title>
                {{ item.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ item.text }}
              </v-card-subtitle>

            </v-card>
          </v-col>
        </v-row>


      <v-col cols="3">
        <!--
          1
          -->

      </v-col>
    </v-sheet>
    </v-row>
  </div>

</template>

<script>
export default {
    data ({ $config: { appName } }) {
    return {
      appName,
      items:[
        {
          src:'about1.jpg',
          title:'1. カード選択',
          text:'「ありがとう！」「ごめんね。。。」など、伝えたいメッセージに合わせてカードを選んでください。'
        },
        {
          src:'about2.jpg',
          title:'2. メッセージ作成',
          text:'選んだカードに、あなたの手でメッセージを書いてください。手書きだからイラストも書込めます。'
        },
        {
          src:'about3.jpg',
          title:'3. メッセージ送信',
          text:'完了すると、完成したメッセージカードを取得できます。さっそく、SMS/メールで送信しましょう！'
        }
      ]
    }
  }
}
</script>