// 初始化AV
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init('3cb91e0f0c23bad6f3a2')
    wx.BaaS.auth.loginWithWechat() // 静默登录
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  share: function () {
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length - 1] //获取当前页面的对象
    let url = currentPage.route //当前页面url
    let options = currentPage.options //如果要获取url中所带的参数可以查看options
    if (Object.keys(options).length > 0) {
      url += '?'
      url += Object.keys(options).map(key => {
        return `${key}=${options[key]}`
      }).join('&')
    }
    // console.log(url)
    return url
  }
})