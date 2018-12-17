var t = function(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(require("../../component/vant-weapp/dist/dialog/dialog")),
  e = require("../../app.config.js"),
  a = getApp();

import Dialog from '../../component/vant-weapp/dist/dialog/dialog'
import Toast from '../../component/vant-weapp/dist/toast/toast';

Page({
  data: {
    issubscribe: false,
    runsData: [],
    destination: "market",
    time: "",
    member: wx.getStorageSync("guestInfo").person,
    price: 50
  },
  onShow() {
    wx.request({
      url: e.HOST + "/busrun/isSubscribe",
      data: {
        guestid: wx.getStorageSync('guestid')
      },
      success: (response) => {
        if (response.statusCode === 200) {
          this.setData({
            issubscribe: response.data
          })
        }
      }
    });
    this.fetInitData()
  },
  fetInitData() {
    Toast.loading({
      mask: true,
    });
    wx.request({
      url: e.HOST + "/busrun/data",
      success: (response) => {
        if (response.statusCode === 200) {
          this.setData({
            runsData: response.data
          })
          Toast.clear();
        }
      }
    });
  },
  selectTap1: function(t) {
    let {
      value
    } = t.target.dataset
    if (!value) return;
    this.setData({
      destination: value,
    });
  },
  selectTap2: function(t) {
    let {
      value,
      disable
    } = t.target.dataset
    if (!value) return;
    console.log(disable)
    if (disable) return;
    this.setData({
      time: value
    });
  },
  onChange: function(t) {
    var e = Number(t.detail);
    this.setData({
      member: e,
      price: 50 * e
    })
  },
  onCancel: function() {
    wx.request({
      url: e.HOST + "/busrun/cancel",
      data: {
        guestid: wx.getStorageSync("guestid")
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
  onModalClose: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  onSubmit: function() {
    var i = this.data,
      n = i.destination,
      s = i.time,
      r = i.member,
      u = i.price;
    if (s === '') {
      Toast('请选择时间')
      return
    }
    wx.request({
      method: "POST",
      url: e.HOST + "/busrun/subscribe",
      data: {
        destination: n,
        pax: r,
        time: s,
        price: u,
        guestid: wx.getStorageSync("guestid"),
        roomNum: wx.getStorageSync("guestInfo").number,
      },
      success: function(response) {
        if (response.statusCode === 200) {
          if (response.data.code === 1) {
            Toast(response.data.msg);
          }
          if (response.data.code === 0) {
            Dialog.alert({
              message: "预约成功,可以【我的】中查看"
            }).then(function() {
              wx.navigateBack({
                delta: 1
              });
            });
          }
        }
      }
    });
  }
});