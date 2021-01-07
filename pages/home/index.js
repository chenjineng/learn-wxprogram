// pages/home/index.js
const pointList = require('./route'); // 引入路由配置文件
const api = require('../../utils/api');

Page({
  data: {
    selected: 0,
    pointList: pointList
  },
  
  onLoad() {
    this.fetchBanner()
  },

  async fetchBanner() {
    let banner = await api.homeBanner({type: 1})
    console.log(banner)
  },
  
  navigate: function (e) {
    let { path } = e.currentTarget.dataset;
    wx.navigateTo({
      url: path,
      // 基础库 2.7.3 开始支持
      events: {
        acceptDataFromOpenedPage: (data) => {
          this.setData({
            'pointList[0].point_name': data.text 
          })
        },
      },
      // success 回调中也包含一个 EventChannel 对象
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: '数据来源：一级page' })
      }
    })
  }
})