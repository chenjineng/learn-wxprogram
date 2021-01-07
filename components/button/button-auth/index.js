// components/button/button-auth/index.js
const app = getApp()
const api = require('../../../utils/api');

Component({
  properties: {
    ifAuth: {
      type: Boolean,
      default: false
    },
    // 是否有回调函数（登录成功之后执行）
    ifCallback: {
      type: Boolean,
      default: false
    },
    // 回调函数的携带的参数
    callbackParams: {
      type: Object,
      default: {}
    }
  },
  
  observers: {
    
  },
  
  ready() {
    
  },
  
  methods: {
    getUserInfo(e) {
      const { errMsg } = e.detail
      
      if (errMsg === "getUserInfo:ok") {
        const { encryptedData, iv, rawData, signature, userInfo } = e.detail
        const params = { encryptedData, iv, rawData, signature }
        wx.setStorageSync('userInfo', JSON.stringify(userInfo))
        wx.login({
          success: async (res) => {
            params['code'] = res.code
            try {
              const data = await api.auth(params)
              wx.setStorageSync('openid', String(data.openid))
              wx.setStorageSync('3rd_session', String(data['3rd_session']))
              app.globalData.ifAuth = true

              // 判断是否有有回调函数
              const { ifCallback } = this.data

              if (ifCallback) {
                const { callbackParams } = this.data
                this.triggerEvent('callbackFunction', callbackParams)
              }
            }
            catch(res) {
              console.log('error', res)
            }            
          },
          fail(error) {
            console.log('wx.login', error);
          }
        })
      } else if (errMsg === "getUserInfo:fail auth deny") {
        
      }
    }
  }
})
