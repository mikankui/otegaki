<template>
  <v-text-field
    v-model="setEmail"
    :rules="rules"
    label="メールアドレスを入力"
    :placeholder="form.placeholder"
    outlined
  />
</template>

<script>
export default {
  data () {
    return {
      rules: [
        v => !!v || '',
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  props: {
    email: {
      type: String,
      default: ''
    },
    noValidation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setEmail: {
      get () { return this.email },
      set (newVal) { return this.$emit('update:email', newVal) },
    },
    form () {
      const placeholder = this.noValidation ? undefined : 'your@email.com'
      return { placeholder }
    }
  }
}
</script>