// components/top-nav-bar/search-bar/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotList: Array, // 关键词数组（已将数组第一个元素拷贝并加入数组末尾）
  },

  /**
   * 组件的初始数据
   */
  data: {
    boxHeight: '',
    bar: {
      top: '',
      left: '',
      height: '',
      lineHeight: ''
    },
    rollY: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    home() {
      wx.switchTab({
        url: '../../pages/home/index',
      })
    },
    back() {
      wx.navigateBack({
        delta: -1,
      })
    },
    // 计算顶部导航的属性
    renderMenu() {
      let { boxHeight, bar } = app.calcMenu();
      
      this.setData({
        boxHeight,
        bar
      })
    },
    // 关键词滚动效果
    rollUp() {
      const { hotList } = this.data
      const { height } = this.data.bar
      const stopY = -(hotList.length - 1) * parseInt(height) // 最后一个元素的 Y 坐标
      let flag = null

      let timer = setInterval(() => {
        let { rollY } = this.data
        rollY--
        flag = rollY % parseInt(height) === 0 // 元素运动结束
        
        if (rollY === stopY) // 最后一个元素展示完成，拉回第一个
          rollY = 0

        this.setData({ rollY })

        if (flag) { // 元素运动结束，暂停 1.5s
          clearInterval(timer)
          setTimeout(() => {
            this.rollUp()
          }, 1500)
        }
      }, 30)
    },
  },
  
  ready() {
    this.renderMenu()

    // 延时 1.5s 执行（防止卡顿）
    let timer = setTimeout(() => {
      this.rollUp()
      clearTimeout(timer)
    }, 1500)
  },
})
