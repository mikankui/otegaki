<template>
  <div class="overflow-hidden buttons">
    <!--
    <div class="text-center mb-8">
      <v-btn
        color="deep-purple"
        outlined
        @click="active = !active"
      >
        Toggle Navigation
      </v-btn>
    </div>
    -->

    <v-bottom-navigation
      v-model="value"
      :input-value="active"
      color="indigo"
      fixed
    >
      <v-btn class="btn">
        <span>ペン</span>

        <v-icon>mdi-lead-pencil</v-icon>
      </v-btn>

      <v-btn class="btn">
        <span>文字</span>

        <v-icon>mdi-format-text</v-icon>
      </v-btn>

      <v-btn class="btn">
        <span>削除</span>

        <v-icon>mdi-eraser</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: 1,
        active: true,
      }
    },
  }
</script>

<style>
/** -------------------------------*/
/* toolbar */
/** -------------------------------*/
.buttons{
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  opacity: 1;
}

.btn{
  color: #fff;
  background: none;
  position: relative;
  border: none;
  margin-left: 0;
  font-size: 16px;
  width:32px;
  margin-bottom: 12px;
  cursor: pointer;
  margin-right: 8px;
}

.btn:hover{
  opacity: 1; 
}

.btn:focus{
  border: none;
  outline: none;
}

.undoBtn{
  justify-self: flex-end;
  margin-left: auto;
}
</style>