<template>
    <v-row
        class="my-5"
        justify="center"
    >
        <v-col
        cols="12"
        sm="10"
        md="8"
        >

            <!-- class, action, methodを変更しないでください -->
            <v-form ref="contact" v-model="isValid" class="formrun" action="https://form.run/api/v1/r/lwn8sora6aq1mzhiyyb8cred" method="post">
            <!-- ↓自由に要素を追加・編集することができます -->
                <v-container>
                    <v-row>
                        <h2>{{ $t(`pages.contact`) }}</h2>
                    </v-row>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        >

                        <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            :disabled="sentIt"
                            label="お名前[必須]"
                            name="_field_2"
                            placeholder="手書 太郎"
                            outlined
                        />

                        </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        >
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            :disabled="sentIt"
                            label="メールアドレス [必須]"
                            name="_field_1"
                            placeholder="tegakitaou.email@gmail.com"
                            outlined
                            validate-on-blur
                        />
                        </v-col>
                    </v-row>

                    <v-textarea
                        v-model="contents"
                        :rules="contentRules"
                        :disabled="sentIt"
                        rows="5"
                        outlined
                        auto-grow
                        label="お問い合わせ [必須]"
                        name="_field_5"
                        placeholder="お問い合わせ入力してください"
                    />

                    <!-- ボット投稿をブロックするためのタグ -->
                    <!--
                    <div class="_formrun_gotcha">
                        <style media="screen">._formrun_gotcha {position:absolute!important;height:1px;width:1px;overflow:hidden;}</style>
                        <label for="_formrun_gotcha">If you are a human, ignore this field</label>
                        <input type="text" name="_formrun_gotcha" id="_formrun_gotcha" tabindex="-1">
                    </div>
                    -->
                    <!--
                        <button type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中...">送信</button>
                    -->
                    <v-btn
                        :disabled="!isValid || loading || sentIt"
                        :loading="loading"
                        color="primary"
                        class="mr-2"
                        @click="onSend"
                    >
                        送信する
                    </v-btn>

                    <v-btn
                        text
                        @click="formReset"
                    >
                        キャンセル
                    </v-btn>
                </v-container>
            </v-form>   
        </v-col>

        <v-snackbar
            v-model="sentIt"
            timeout="-1"
            color="primary"
            >
            お問合せ内容が送信されました。メールアドレスへ担当者よりご連絡いたします。
            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="formReset"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>

<script>
export default {
    layout: 'beforeLogin',
    head: {
        script: [
        {
            src: 'https://sdk.form.run/js/v2/formrun.js'
        }
        ],
    },
  data () {
    return {
      isValid: false,
      name: '',
      nameRules: [
        v => !!v || '名前を入力してください'
      ],
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスが正しくありません'
      ],
      contents: '',
      contentRules: [
        v => !!v || 'お問合せ内容を入力してください'
      ],
      loading: false,
      sentIt: false
    }
  },
  methods: {
    onSend () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.sentIt = true
      }, 1500)
    },
    formReset () {
      this.sentIt = false
      this.$refs.contact.reset()
    }
  }
}
</script>