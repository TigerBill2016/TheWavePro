var a = require("../../app.config.js"),
  t = getApp();
import Toast from '../../component/vant-weapp/dist/toast/toast';

Page({
  data: {
    userInfo: {},
    data: []
  },
  onShow: function(e) {
    Toast.loading({
      mask: true,
    });
    var s = this,
      u = t.globalData.userInfo;
    this.setData({
      userInfo: u
    }), wx.request({
      url: a.HOST + "/me/data",
      data: {
        guestid: wx.getStorageSync("guestid")
      },
      success: function(a) {
        if (200 === a.statusCode) {
          Toast.clear();
          s.setData({
            data: a.data
          });
        }
      }
    });
  }
});