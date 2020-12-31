// pages/communication/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得一个 EventChannel 对象
    const eventChannel = this.getOpenerEventChannel()
    
    eventChannel.emit('acceptDataFromOpenedPage', { text: '完成通信...' });
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
  },
})