// components/top-nav-bar/frame/index.js
const utils = require('../../../utils/util');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    color: {
      type: String,
      defalut: '#fff'
    }
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
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 计算顶部导航的属性
    renderMenu() {
      let { boxHeight, bar } = utils.calcMenu();
      
      this.setData({
        boxHeight,
        bar
      })
    },
  },
  
  ready() {
    this.renderMenu()
  }
})

