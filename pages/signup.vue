<template>
  <bef-login-form-card #form-card-content>
    <v-form
      v-model="isValid"
    >
      <user-form-name 
        :name.sync="params.user.name"
      />
      <user-form-email 
        :email.sync="params.user.email"
      />
      <user-form-password 
        :password.sync="params.user.password"
      />

      <v-btn
        :disabled="!isValid"
        block
        color="myblue"
        class="white--text"
      >
        登録する
      </v-btn>

    </v-form>

    <v-card-text>
      {{ params }}
    </v-card-text>
    
  </bef-login-form-card>
</template>

<script>
export default {
  layout: 'beforeLogin',
  components: {
    befLoginFormCard: () => import('~/components/beforeLogin/befLoginFormCard'),
    userFormName: () => import('~/components/user/userFormName'),
    userFormEmail: () => import('~/components/user/userFormEmail'),
    userFormPassword: () => import('~/components/user/userFormPassword'),
  },
    data () {
    return {
      isValid: false,
      params: { user: { name: '', email: '', password: '' } }
    }
  },
}
</script>