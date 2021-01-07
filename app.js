//app.js
const utils = require('./utils/util');

App({
  globalData: {
    userInfo: null,
    ifAuth: false
  },
  
  onLaunch: async function () {
    await this.setAuthStatus()
  },

  // [用户授权]状态是否开启 & 本地是否有存储 openid
  async setAuthStatus() {
    const flag = await utils.getUserAuth('userInfo')
    const { openid, userInfo } = utils.getUserInfoFromStorage()
    
    if (flag && openid) {
      this.globalData.ifAuth = true
      this.globalData.openid = openid
      this.globalData.userInfo = userInfo
    } else {
      this.globalData.ifAuth = false
    }
    console.log('1.globalData.ifAuth', this.globalData.ifAuth)
  },

  // 执行顺序，setAuthStatus 没有被先执行！
  async updateAuthStatus(that) {
    await this.setAuthStatus()
    console.log('2.')
    that.setData({
      ifAuth: this.globalData.ifAuth
    })
  },
})