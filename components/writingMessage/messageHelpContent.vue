<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        STEP1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        STEP2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 3"
        step="3"
      >
        STEP3
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">
        STEP4
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
        >
            <!-- ****************************** -->
            <v-img src="Message_Help_01.png"></v-img>
            <v-card-title>画像上に文字を書き込む</v-card-title>
            <v-card-text>
                マウスやタッチペン、または手を使って文字やイラストを書くことが出来ます。
            </v-card-text>
            <!-- ****************************** -->
        </v-card>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          次へ
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
        >
            <!-- ****************************** -->
            <v-img src="Message_Help_02.png"></v-img>
            <v-card-title>やり直し（１つ前に戻る）</v-card-title>
            <v-card-text>
                １度書いた文字も、「戻る」アイコンを押すことでやり直すことができます。
            </v-card-text>
            <!-- ****************************** -->
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          次へ
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
        >
            <!-- ****************************** -->
            <v-img src="Message_Help_03.png"></v-img>
            <v-card-title>全てやり直し（全消去）</v-card-title>
            <v-card-text>
                全てやり直したくなったら、全消去アイコンを押してください。最初の状態に戻ることが出来ます。
            </v-card-text>
            <!-- ****************************** -->
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          次へ
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-12"
        >
            <!-- ****************************** -->
            <v-img src="Message_Help_04.png"></v-img>
            <v-card-title>完成したら画像でダウンロード</v-card-title>
            <v-card-text>
                完成したら画像をダウンロードして、LINEやTwitterなどのSNSで共有できます！
            </v-card-text>
            <!-- ****************************** -->
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          戻る
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>