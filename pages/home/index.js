// pages/home/index.js
const api = require('../../utils/api');
const app = getApp()

Page({
  data: {
    selected: 0,
    ifAuth: false,
    count: 1
  },
  
  onLoad() {
    this.fetchBanner()
  },

  async onShow() {
    await app.updateAuthStatus(this)
  },

  async fetchBanner() {
    let banner = await api.homeBanner({type: 1})
    console.log('请求接口', banner)
  },

  navigate (e) {
    let { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path
    })
  },
  
  /* 
    事件通信：基础库 2.7.3 开始支持
    登录之后需要执行回调 IamCallback
  */
  navigateLogin (e) {
    let { path } = e.currentTarget.dataset
    wx.navigateTo({
      url: path,
      // events 事件由 login 页面 emit 触发
      events: {
        fetchBanner: (data) => {
          this.fetchBanner()
          console.log('从被打开页面传回的 data：', data)
        },
        IamCallback(data) {
          console.log('I am Callback', data)
        }
      },
      // 通知 login 页，登录成功需要执行什么回调
      success: function (res) {
        const data = {
          callbackFunction: 'IamCallback',
          callbackParams: { id: 996 }
        }
        res.eventChannel.emit('passParams', data)
      }
    })
  },
})