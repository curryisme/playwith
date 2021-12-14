import { Message } from 'element-ui'

const user = {
  namespaced: true,
  state: {
    isLogin: false,
    userData: '',
    type: 1,
    balance: 0,
    userInfo: '',
    currentUserProfile: {},
    isSDKReady: false, 
    userID: 0,
    userSig: '',
    sdkAppID: 0,
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  mutations: {
    SET_LOGIN_FLAG(state, bool) {
      state.isLogin = bool
    },
    SET_USER_DATA(state, data) {
      state.userData = data
    },
    SET_TYPE(state, num) {
      state.type = num
      sessionStorage.setItem('type', num);
    },
    SET_BLANCE(state, num) {
      state.balance = num
    },
    SET_USER_INFO(state, info) {
      console.log(info)
      state.userInfo = info
    },
    updateCurrentUserProfile(state, userProfile) {
      state.currentUserProfile = userProfile
    },
    toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
    },
    reset(state) {
      Object.assign(state, {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false 
      })
    },
    GET_USER_INFO(state, payload) {
      state.userID = payload.userID
      state.userSig = payload.userSig
      state.sdkAppID = payload.sdkAppID
    },
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  actions: {
    logout(context) {
      if (context.rootState.conversation.currentConversation.conversationID) {
        tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
      }
      tim.logout().then(() => {
        context.commit('stopComputeCurrent')
        context.commit('reset')
      })
    },


  }
}

export default user
