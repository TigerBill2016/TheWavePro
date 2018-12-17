function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
      var e = arguments[a];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  },
  e = t(require("../../component/vant-weapp/dist/dialog/dialog")),
  i = t(require("../../component/vant-weapp/dist/toast/toast")),
  n = require("../../app.config.js"),
  s = getApp();

Page({
  data: {
    issubscribe: false,
    destination: "villas",
    time: "",
    flightNum: "",
    person: '',
    remark: ""
  },
  onShow() {
    wx.request({
      url: n.HOST + "/transfer/isSubscribe",
      data: {
        guestid: wx.getStorageSync("guestid")
      },
      success: (response) => {
        if (response.statusCode === 200) {
          this.setData({
            issubscribe: response.data
          })
        }
      }
    })
  },
  onModalClose: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  onCancel: function() {
    var t = this;
    wx.request({
      url: n.HOST + "/transfer/cancel",
      data: {
        guestid: wx.getStorageSync("guestid"),
      },
      success: (response) => {
        if (response.statusCode === 200) {
          this.setData({
            issubscribe: false
          })
        }
      }
    });
  },
  getTime: function(t) {
    var a = t.detail;
    this.setData({
      time: a
    });
  },
  getFlightNum: function(t) {
    var a = t.detail;
    this.setData({
      flightNum: a
    });
  },
  getPerson: function(t) {
    var a = t.detail;
    this.setData({
      person: a
    });
  },
  getRemark: function(t) {
    var a = t.detail;
    this.setData({
      remark: a
    });
  },
  selectTap: function(t) {
    this.setData({
      destination: t.target.dataset.value,
      person: ''
    });
  },
  onSubmit: function() {
    this.data.time ? this.data.flightNum ? wx.request({
      method: "POST",
      url: n.HOST + "/transfer/subscribe",
      data: a({}, this.data, {
        guestid: wx.getStorageSync("guestid"),
        roomNum: wx.getStorageSync("guestInfo").number,
        pax: wx.getStorageSync("guestInfo").person,
      }),
      success: function(t) {
        200 === t.statusCode && e.default.alert({
          message: "预约成功,可以【我的】中查看"
        }).then(function() {
          wx.navigateBack({
            delta: 2
          });
        });
      }
    }) : (0, i.default)("请填写航班信息") : (0, i.default)("请填写接送机时间");
  }
});