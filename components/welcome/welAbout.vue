<template>
  <v-container>
    <v-row
      justify="center" 
      align-content="center"
    >
          <v-col xs="12" sm="4" v-for="(item, i) in items" :key="i">
            <v-card
              class="mx-auto"
            >
              <v-img
                :src="item.src"
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
  </v-container>
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
          text:'「ありがとう！」「ごめんね。」など、伝えたいメッセージに合わせてカードを選びます。'
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