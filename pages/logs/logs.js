//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow: function() {
    console.log('wx', wx.getLaunchOptionsSync())

    const pages = getCurrentPages().length
    // console.log(app)
  },
  onHide: function() {

  },
  onTabItemTap(item) {
    // 底部 tab 点击时执行
    // console.log(item.index, item.pagePath, item.text)
  },
  onPageScroll(e) {
    console.log(e);
  }
})
