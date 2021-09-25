export const state = () => ({
    loggedIn: false,
    styles: {
      beforeLogin: {
        appBarHeight: 56
      }
    },
    selectedCard:null,
    cardInfo:null,
  })
  
export const getters = {}

export const mutations = {
  setLoggedIn (state, payload) {
    state.loggedIn = payload
  },
  setSelectedCard(state,card){
    state.selectedCard=card
  },
  setCardInfo(state,cardInfo){
    state.cardInfo=cardInfo
  },
}

export const actions = {
  login ({ commit }) {
    commit('setLoggedIn', true)
  },
  setCard ({ commit }, cardId) {
    commit('setSelectedCard', cardId)
  },
  async setCardInfo ({ commit }) {
    //@TODO check card not null
    let card = this.state.selectedCard;
    //選択した画像をセット
    let url = require('@/assets/images/W600PX/'+card+'.jpg');
    let blob = await this.$axios.get(url, { responseType: 'blob' })

    //選択したカードデータを取得
    let base64 = await readAsDataURL(blob.data)
    var file = new File([blob], "blob");
    let imgFile =await readAsImage(base64) 

    let cardInfo={
      'cardId':card,
      'base64':base64,
      'width': imgFile.width,
      'height':imgFile.height,
      'viewBox':"0 0 "+imgFile.width+" "+imgFile.height
    }

    console.log("asyncData:"+cardInfo)
    commit('setCardInfo', cardInfo)
  },
}

async function readAsDataURL(blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => { resolve(reader.result); };
      reader.onerror = () => { reject(reader.error); };
      reader.readAsDataURL(blob);
    })
  }

async function readAsImage(file) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => { resolve(img); };
    img.onerror = (error) => { reject(error); };

    img.src = file;

  })
}
