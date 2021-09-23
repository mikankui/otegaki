<template>
 <!-- 検索窓　親app.vue-->
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch',$event)"

    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-1 mb-0"
    :class="{ 'closed' : searchClosed && !$store.state.search}"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    filled
    dense
    clearable
  ></v-text-field>
</template>