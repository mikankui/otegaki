<template>
  <div>
    ログイン機能は作成中
  </div>
</template>

<script>
export default {
  layout ({ store }) {
    return store.state.loggedIn ? 'loggedIn' : 'welcome'
  }
}
</script>