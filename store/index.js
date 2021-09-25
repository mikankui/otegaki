export const state = () => ({
    loggedIn: false,
    styles: {
      beforeLogin: {
        appBarHeight: 56
      }
    },
    selectedCard:null,
    //cardWidth:null,
    //cardHeight:null,
    cardInfo:null,
  })
  
export const getters = {}

export const mutations = {
  setLoggedIn (state, payload) {
    state.loggedIn = payload
  },
  setSelectedCard(state,card){
    console.log(card)
    state.selectedCard=card
    //state.cardWidth=card.width
    //state.cardHeight=card.height
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
    console.log(card)
    //選択した画像をセット
    let url = require('@/assets/images/W600PX/'+card+'.jpg');
    let blob = await this.$axios.get(url, { responseType: 'blob' })

    //選択したカードデータを取得
    let base64 = await readAsDataURL(blob.data)
    var file = new File([blob], "blob");
    let imgFile =await readAsImage(base64) 
    let width = imgFile.width
    let height = imgFile.height
    //console.log(card + "/" + width + "/" + height)

    let cardInfo={
      'cardId':card,
      'base64':base64,
      'width': width,//imgFile.width,
      'height':height,//imgFile.height,
      'viewBox':"0 0 "+width+" "+height
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
    console.log(file)
    img.src = file;

  })
}
