<template>

    <v-container
      class="grey lighten-5 pt-2"
    >
      <v-row
        no-gutters
      >
        <v-col
            v-for="(category,index) in categories"
            :key="index"
            align="center"
            class="ma-0 pa-0"
        >

                <v-icon
                :color=category.color
                >
                {{category.icon}}
                </v-icon>
                <div class="icon-text">
                    {{category.text}}
                </div>

        </v-col>
      </v-row>
    </v-container>

</template>
<style>
.icon-text{
    font-size: xx-small;
}
</style>
<script>
  export default {
    data: () => ({
      categories: [
        {icon:"mdi-heart",text:"cute",color:"pink lighten-1"},
        {icon:'mdi-pine-tree',text:"nature",color:"teal lighten-1"},
        {icon:'mdi-city',text:"city",color:"blue-grey lighten-1"},
        {icon:'mdi-face-man',text:"people",color:"blue-grey lighten-1"},
      ],
    }),
  }
</script>