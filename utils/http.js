const prod_api = '';
const dev_api = '';
const ERR_OK = 1

const header = {
  lang: 'zh-Hans'
}

const request = (url, data, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      timeout: 10000,
      success: (result) => {
        if (result.statusCode === 200) {
          const { code, data } = result.data
          if (code === ERR_OK) {
            resolve(data.data)
          }
          else {
            reject(result.data)
          }
        }
      },
      fail: (res) => {
      },
      complete: (res) => {
      },
    })
  })
}

const GET = (url, data) => {
  return request(prod_api + url, data, 'GET')
}

const POST = (url, data) => {
  return request(prod_api + url, data, 'POST')
}

module.exports = {
  GET,
  POST
}