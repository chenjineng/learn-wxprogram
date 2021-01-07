const { GET, POST } = require('./http');

const homeBanner = (data) => POST('Home/AdsList', data)
const auth = (data) => POST('v2.WxSmall/signIn', data)

module.exports = {
  homeBanner,
  auth
}