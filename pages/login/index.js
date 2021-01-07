// pages/communication/index.js
const app = getApp()

Page({
  data: {
    callbackData: {
      callbackFunction: '', // 回调函数名
      callbackParams: {}    // 回调函数名所需参数
    }
  },
  
  onLoad: function () {
    this.eventHandler()
  },
  
  eventHandler() {
    // 获得一个 EventChannel 对象
    const eventChannel = this.getOpenerEventChannel()

    // 如果 eventChannel 不为空对象，则说明有回调事件
    if (eventChannel.on) {
      const { callbackData } = this.data
      eventChannel.on('passParams', (params) => {
        callbackData.callbackFunction = params.callbackFunction
        callbackData.callbackParams = params.callbackParams
        
        this.setData({
          callbackData
        })
      })
    }
  },

  // button-auth组件 登录成功后回调
  callbackAfterLoginSuccess() {
    const eventChannel = this.getOpenerEventChannel()

    if (eventChannel.on) {
      const { callbackData } = this.data
      // 触发上一个页面要求执行的函数，并传入参数
      eventChannel.emit(callbackData.callbackFunction, callbackData.callbackParams)
    }

    wx.navigateBack({
      delta: 1,
    })
  }
})