// pages/home/index.js
const wxapi = require('../../utils/wx-api');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    point_list: [
      {
        point_name: '组件通信',
        path: '../communication/index'
      },
      {
        point_name: '自定义组件',
        path: '../menuBar/index'
      },
      {
        point_name: '双向绑定',
        path: '../binding/index'
      }
    ]
  },

  navTo: function (e) {
    let { path } = wxapi.dataset(e);
    wx.navigateTo({
      url: path,
      events: {
        acceptDataFromOpenedPage: (data) => {
          this.setData({
            'point_list[0].point_name': data.text 
          })
        },
      },
      // success 回调中也包含一个 EventChannel 对象
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'on 监听事件，emit 派发事件' })
      }
    })
  },

})