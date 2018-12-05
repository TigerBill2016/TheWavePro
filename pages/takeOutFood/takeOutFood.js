Page({
  data: {},
  onLoad: function (n) { },
  onReady: function () { },
  onShow: function () {

  },
  copyUrl(e) {
    let { url } = e.target.dataset;
    wx.setClipboardData({
      data: url
    })
  },
});