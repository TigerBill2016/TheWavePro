function e(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var t = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t];
    for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
  }
  return e;
},
  a = function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }(require("../../component/vant-weapp/dist/toast/toast")),
  s = require("../../app.config.js"),
  n = getApp();

let app = getApp()
import Toast from '../../component/vant-weapp/dist/toast/toast'
import {
  HOST
} from '../../app.config.js'

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    guestInfo: {},
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    show: !0
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function () {
    var e = this;
    n.globalData.userInfo ? this.setData({
      userInfo: n.globalData.userInfo,
      hasUserInfo: !0
    }) : this.data.canIUse ? n.userInfoReadyCallback = function (t) {
      n.globalData.userInfo = t.userInfo, n.globalData.iv = t.iv, n.globalData.encryptedData = t.encryptedData,
        e.setData({
          userInfo: t.userInfo,
          hasUserInfo: !0
        });
    } : wx.getUserInfo({
      success: function (t) {
        n.globalData.userInfo = t.userInfo, e.setData({
          userInfo: t.userInfo,
          hasUserInfo: !0
        });
      }
    }), wx.getStorageSync("guestInfo") ? this.setData({
      show: !1
    }) : this.setData({
      show: !0
    });
  },
  getUserInfo: function (e) {
    console.log("222", e), n.globalData.userInfo = e.detail.userInfo, n.globalData.iv = e.detail.iv,
      n.globalData.encryptedData = e.detail.encryptedData, this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: !0
      });
  },
  getGuestField: function (a) {
    this.setData({
      guestInfo: t({}, this.data.guestInfo, e({}, a.target.dataset.name, a.detail))
    });
  },
  getGuestInfo: function () {
    // var e = this.data.guestInfo,
    //   s = n.globalData,
    //   o = s.session_key,
    //   r = s.iv,
    //   u = s.encryptedData;
    let {
      username,
      number,
      person
    } = this.data.guestInfo
    let { session_key, iv, encryptedData } = app.globalData

    if (session_key && iv && encryptedData) {
      if (username && number && person) {
        this.submitUserInfo({
          session_key,
          iv,
          encryptedData,
          ...guestInfo,
        })
        wx.setStorage({
          key: 'guestInfo',
          data: this.data.guestInfo,
        })
      } else {
        Toast('为了旅途的方便，请完善个人信息')
      }
    } else {
      Toast('请再试一次')
    }

    // e.username && e.number && e.person ? o && r && u ? (this.submitUserInfo(t({
    //   session_key: o,
    //   iv: r,
    //   encryptedData: u
    // }, e)), this.setData({
    //   show: !1
    // }), wx.setStorage({
    //   key: "guestInfo",
    //   data: e
    // })) : (0, a.default)("") : (0, a.default)("为了旅途的方便，请完善个人信息");
  },
  submitUserInfo: function (e) {
    wx.request({
      method: "POST",
      url: s.HOST + "/login/user",
      data: e,
      success: function (e) {
        if (200 === e.statusCode) {
          var t = e.data.guestid;
          wx.setStorage({
            key: "guestid",
            data: t
          });
        }
      }
    });
  }
});