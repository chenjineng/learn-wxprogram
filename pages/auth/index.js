// pages/auth/index.js
const app = getApp()

Page({
  data: {
    ifAuth: false
  },
  async onShow() {
    await app.updateAuthStatus(this)
    console.log('3.', this.data.ifAuth)
  },
  
  // button 获取用户信息，拒绝了还是会弹窗
  getUserInfo(e) {
    const { errMsg, encryptedData, iv, rawData, signature, userInfo } = e.detail
    if(errMsg === "getUserInfo:ok") { // 同意授权
    } else if (errMsg === "getUserInfo:fail auth deny") { // 拒绝授权
    }
  },

  // 打开授权设置页
  openSetting() {
    wx.openSetting({
      withSubscriptions: true,
    })
  },

  // 请求接口换取手机号码  
  getPhoneNumber (e) {
    let { iv, encryptedData, errMsg } = e.detail;
  },

  // 订阅消息
  subscribeMessage() {
    wx.requestSubscribeMessage({
      tmplIds: ['cwsHpc3rqF2P34fbDjncyXODu2zLr6a52ZR41M90-y0'],
      success (res) {
        console.log(res)
      }
    })
  },

  // 客服消息回调，用户点击了服务端发的小程序，可以获得 path, query
  handleContact(e) {
    let { path, query } = e.detail
  },

  // 提供给 button-auth 组件调用，修改 ifAuth 状态
  updateAuth(e) {
    this.setData({
      ifAuth: e.detail.ifAuth
    })
  }
})