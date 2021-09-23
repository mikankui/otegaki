export const state = () => ({
    selectedCard:null,
  })
  
export const getters = {}

export const mutations = {
  setSelectedCard(state,card){
    state.selectedCard = card;
  }
}

export const actions = {
  setCard ({ commit }, cardId) {
    commit('setLoggedIn', cardId)
  },
}