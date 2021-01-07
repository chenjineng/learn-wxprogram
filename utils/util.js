// 格式化时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 自定义顶部导航属性计算
const calcMenu = () => {
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
  } catch (e) {}
}

// 获取 storage 中的用户信息 
const getUserInfoFromStorage = () => {
  const openid = wx.getStorageSync('openid')
  let userInfo = wx.getStorageSync('userInfo')
  
  if (openid && userInfo) {
    return {
      openid,
      userInfo: JSON.parse(userInfo)
    }
  }
  else {
    return {
      openid,
      userInfo
    }
  }
}

// 获取用户权限
const getUserAuth = (item) => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        resolve(res.authSetting['scope.' + item])
      }
    })
  })
}

module.exports = {
  formatTime,
  calcMenu,
  getUserInfoFromStorage,
  getUserAuth
}
