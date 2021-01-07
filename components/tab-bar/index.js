// 基础库 2.5.0 开始支持

Component({
  properties: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "../../pages/home/index",
      iconPath: "../../images/tab-bar/icon_home.png",
      selectedIconPath: "../../images/tab-bar/icon_home_HL.png",
      text: "首页"
    }, {
      pagePath: "../../pages/logs/index",
      iconPath: "../../images/tab-bar/icon_API.png",
      selectedIconPath: "../../images/tab-bar/icon_API_HL.png",
      text: "logs"
    }]
  },
  methods: {
    switchTab(e) {
      const { url, index } = e.currentTarget.dataset;
      wx.switchTab({url});
    }
  }
})