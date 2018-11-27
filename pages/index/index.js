function e(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
  },
  a = function(e) {
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
    show: true,
    dateField: '',
    startDate: '',
    endDate: '',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    dateShow: false,
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    var e = this;
    n.globalData.userInfo ? this.setData({
      userInfo: n.globalData.userInfo,
      hasUserInfo: !0
    }) : this.data.canIUse ? n.userInfoReadyCallback = function(t) {
      console.log('userInfoReadyCallback', t)
      n.globalData.userInfo = t.userInfo
      wx.setStorageSync('iv', t.iv)
      wx.setStorageSync('encryptedData', t.encryptedData)
      e.setData({
        userInfo: t.userInfo,
        hasUserInfo: !0
      });
    } : wx.getUserInfo({
      success: function(t) {
        console.log('---------', t)
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
  onShow() {
    let _date = this.formatDate(new Date());
    this.setData({
      startDate: _date,
      endDate: _date
    })
  },
  showDatePicker(event) {
    let {
      name
    } = event.target.dataset
    this.setData({
      dateShow: true,
      dateField: name
    })
  },
  formatDate(date) {
    let _date = new Date(date);
    return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
  },
  onDateChange(event) {
    let value = event.detail
    let {
      dateField
    } = this.data
    if (dateField === 'start') {
      this.setData({
        startDate: this.formatDate(value),
      });
    }
    if (dateField === 'end') {
      this.setData({
        endDate: this.formatDate(value),
      });
    }
    this.setData({
      dateShow: false
    })
  },
  onDateCancel() {
    this.setData({
      dateShow: false
    })
  },
  onDateClose() {
    this.setData({
      dateShow: false
    });
  },
  getUserInfo: function(e) {
    console.log("222", e)
    let {
      errMsg
    } = e.detail
    if (errMsg.indexOf('fail') >= 0) {
      Toast('请允许获取头像昵称')
      return
    }
    wx.setStorageSync('iv', e.detail.iv)
    wx.setStorageSync('encryptedData', e.detail.encryptedData)
    n.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: !0
    });
  },
  getGuestField: function(a) {
    this.setData({
      guestInfo: t({}, this.data.guestInfo, e({}, a.target.dataset.name, a.detail))
    });
  },
  getGuestInfo: function() {
    let {
      username,
      number,
      person
    } = this.data.guestInfo
    let session_key = wx.getStorageSync('session_key')
    let iv = wx.getStorageSync('iv')
    let encryptedData = wx.getStorageSync('encryptedData')
    if (session_key && iv && encryptedData) {
      if (username && number && person) {
        this.submitUserInfo({
          session_key,
          iv,
          encryptedData,
          ...this.data.guestInfo,
        })
        wx.setStorage({
          key: 'guestInfo',
          data: this.data.guestInfo,
        })
        this.setData({
          show: false
        })
      } else {
        Toast('为了旅途的方便，请完善个人信息')
      }
    } else {
      Toast('请允许获取头像昵称')
    }
  },
  submitUserInfo: function(e) {
    wx.request({
      method: "POST",
      url: s.HOST + "/login/user",
      data: e,
      success: function(e) {
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