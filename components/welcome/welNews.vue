<template>
    <v-sheet 
        class="my-5 mx-auto"
        max-width="80%"
    >
        <v-data-table
            dense
            :headers="headers"
            :items="desserts"
            item-key="date"
            hide-default-footer
            class="elevation-1"
        ></v-data-table>
    </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      desserts: [
          {
              date:'2021-09-21',
              type:'テンプレート追加',
              text:'友達との仲直り用のテンプレートを追加',
              link:''
          },
          {
              date:'2021-09-20',
              type:'新機能',
              text:'ランディングページにサンプル画像を表示',
              link:''
          },
          {
              date:'2021-09-14',
              type:'テンプレート追加',
              text:'新しく結婚のお祝い用のテンプレートを追加',
              link:''
          },
          {
              date:'2021-09-12',
              type:'テンプレート追加',
              text:'新しく誕生日お祝い用のテンプレートを追加',
              link:''
          },
          {
              date:'2021-09-10',
              type:'新機能',
              text:'サービスを紹介するランディングページを公開',
              link:''
          },
      ],
      headers: [
        {
          text: "日付" ,
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: "区分", value: 'type' },
        { text: "お知らせ" , value: 'text' },
        { text: "リンク" , value: 'link' },
      ],
    }),
  }
</script>