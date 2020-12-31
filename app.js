//app.js
App({
  globalData: {
    userInfo: null
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res);

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },













  // 自定义顶部导航属性计算
  calcMenu() {
    let { width, height, top, right } = wx.getMenuButtonBoundingClientRect();
    let bar = {}
    try {
      const { statusBarHeight, screenWidth } = wx.getSystemInfoSync();
      const boxHeight = statusBarHeight + height + (top - statusBarHeight) * 2 + 'px';
      bar.top = top + 'px'
      bar.height = height + 'px'
      bar.lineHeight = height * .6 + 'px'   // 分割线高度
      bar.left = screenWidth - right + 'px' // 自定义按钮与左边界的边距
      bar.widthS = screenWidth - width - 3 * (screenWidth - right) + 'px' // 搜索框 width
      bar.widthB = width + 'px' // 按钮组 width
      
      return {
        boxHeight,
        bar
      }
    } catch (e) {
    }
    
  },


})