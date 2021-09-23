export const state = () => ({
    loggedIn: false,
    styles: {
      beforeLogin: {
        appBarHeight: 56
      }
    },
    selectedCard:null,
  })
  
export const getters = {}

export const mutations = {
  setLoggedIn (state, payload) {
    state.loggedIn = payload
  },
  setSelectedCard(state,card){
    state.selectedCard = card;
  }
}

export const actions = {
  login ({ commit }) {
    commit('setLoggedIn', true)
  },
  setCard ({ commit }, cardId) {
    commit('setLoggedIn', cardId)
  },
}