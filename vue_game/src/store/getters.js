import { titleNotify } from '../utils'

const getters = {
    userData: state => {
        return state.user.userData
    },
    gametype: state => {
        return state.user.type
    },
    balance: state => {
        return state.user.balance
    },
    userInfo: state => {
        return state.user.userInfo
    },
    isLogin: state => {
        return state.imInfo.isLogin
    },
    imUserInfo: state => {
        return state.imInfo.userInfo
    },
    hidden: (state) => {
        // eslint-disable-next-line no-unused-vars
        const temp = state.imInfo.current
        if (typeof document.hasFocus !== 'function') {
            return document.hidden
        }
        return !document.hasFocus()
    },
    currentUserProfile: state => {
        return state.imInfo.currentUserProfile
    },
    isSDKReady: state => {
        return state.imInfo.isSDKReady
    },

    currentConversation: state => {
        return state.conversation.currentConversation
    },

    isBusy: state => {
        return state.imInfo.isBusy
    },
    userID: state => {
        return state.imInfo.userID
    },
    toAccount: state => {
        if (!state.conversation.currentConversation || !state.conversation.currentConversation.conversationID) {
            return ''
        }
        switch (state.conversation.currentConversation.type) {
            case 'C2C':
                return state.conversation.currentConversation.conversationID.replace('C2C', '')
            case 'GROUP':
                return state.conversation.currentConversation.conversationID.replace('GROUP', '')
            default:
                return state.conversation.currentConversation.conversationID
        }
    },
    currentConversationType: state => {
        if (!state.conversation.currentConversation || !state.conversation.currentConversation.type) {
            return ''
        }
        return state.conversation.currentConversation.type
    },
    totalUnreadCount: state => {
        const result = state.conversation.conversationList.reduce((count, conversation) => {
            // 当前会话不计算总未读
            if (!store.getters.hidden && state.conversation.currentConversation.conversationID === conversation.conversationID) {
                return count
            }
            return count + conversation.unreadCount
        }, 0)
        titleNotify(result)
        return result
    },
    // 用于当前会话的图片预览
    imgUrlList: state => {
        return state.conversation.currentMessageList
            .filter(message => message.type === TIM.TYPES.MSG_IMAGE && !message.isRevoked) // 筛选出没有撤回并且类型是图片类型的消息
            .map(message => message.payload.imageInfoArray[0].url)
    },
    hasGroupList: state => state.group.groupList.length > 0,
    memberList: state => state.group.currentMemberList,
}
export default getters

