// components/button/button-auth/index.js
const app = getApp()
const api = require('../../../utils/api');

Component({
  properties: {
    ifAuth: {
      type: Boolean,
      default: false
    }
  },

  data: {
    count: 1
  },

  observers: {
    'count': () => {
      console.log('数据监听：count 发生变化');
    }
  },

  ready() {
    setTimeout(() => {
      this.setData({
        count: 2
      })
    }, 1000)
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
              this.triggerEvent('updateAuth', {ifAuth: true})
            }
            catch(res) {
              console.log('error', res)
            }            
          },
          fail(err) {
            console.log('wx.login', err);
          }
        })
      } else if (errMsg === "getUserInfo:fail auth deny") {
        
      }
    }
  }
})
