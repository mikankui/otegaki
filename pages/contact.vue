<template>
<!-- class, action, methodを変更しないでください -->
<form class="formrun" action="https://form.run/api/v1/r/lwn8sora6aq1mzhiyyb8cred" method="post">
  <!-- ↓自由に要素を追加・編集することができます -->
  <div>
    <label>お名前</label>
    <input name="お名前" type="text">
  </div>

  <div>
    <label>メールアドレス [必須]</label>
    <input name="メールアドレス" type="text" data-formrun-type="email" data-formrun-required>
    <div data-formrun-show-if-error="メールアドレス">メールアドレスを正しく入力してください</div>
  </div>

  <div>
    <label>お問い合わせ [必須]</label>
    <textarea name="お問い合わせ" data-formrun-required></textarea>
    <div data-formrun-show-if-error="お問い合わせ">お問い合わせ入力してください</div>
  </div>

  <div>
    <label>個人情報利用同意 [必須]</label>
    <input type="checkbox" name="個人情報利用同意" data-formrun-required>
    <div data-formrun-show-if-error="個人情報利用同意">同意してください</div>
  </div>

  <!-- ボット投稿をブロックするためのタグ -->
  <div class="_formrun_gotcha">
    <style media="screen">._formrun_gotcha {position:absolute!important;height:1px;width:1px;overflow:hidden;}</style>
    <label for="_formrun_gotcha">If you are a human, ignore this field</label>
    <input type="text" name="_formrun_gotcha" id="_formrun_gotcha" tabindex="-1">
  </div>

  <button type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中...">送信</button>
</form>    
</template>

<script>
export default {
  mounted() {
    if (process.client) {
      this.loadFormrunScript()
    }
  },
  methods: {
    initFormrun() {
      window.Formrun._reset() // (2)の処理
      window.Formrun.init('.formrun') // (3)の処理
    },
    loadFormrunScript() {
      if (window.Formrun) { // 一度アクセスしたら、window.Formrunがあるので、(2),(3)の処理を呼んで終わり
        console.log('repeat init')
        this.initFormrun() 
        return 　// 2回目からはここで終わり
      }
　　　// 初回のみ SDKを ロードする
      new Promise((resolve, reject) => {
        // (1). 該当スクリプトを動的にロード
        const script = document.createElement('script')
        script.addEventListener('load', resolve)
        script.addEventListener('error', reject)
        script.src = 'https://sdk.form.run/js/v2/formrun.js'
        document.head.appendChild(script)
      }).then(() => {
        console.log('init!') 
        this.initFormrun() // (2),(3)の処理を呼ぶ
      })
      .catch(() => {
        console.log('err')
      })
    },
  },
}
</script>