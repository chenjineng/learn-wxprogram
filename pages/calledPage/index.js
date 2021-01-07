// pages/communication/index.js
Page({
  data: {
  },
  
  onLoad: function (options) {
    // 获得一个 EventChannel 对象
    const eventChannel = this.getOpenerEventChannel()
    
    eventChannel.emit('acceptDataFromOpenedPage', { text: '完成通信...' });
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
    /* 
      const pages = getCurrentPages().length
    */
  },
})