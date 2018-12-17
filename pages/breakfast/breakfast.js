function t(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

var a = t(require("../../component/vant-weapp/dist/dialog/dialog")),
  s = require("../../app.config.js"),
  i = getApp();
import Dialog from '../../component/vant-weapp/dist/dialog/dialog';
import Toast from '../../component/vant-weapp/dist/toast/toast';

Page({
  data: {
    issubscribe: !1,
    url: "../../public/cn-food.jpg",
    food: "chinese",
    preTime: void 0,
    timeData: [],
    show: !1,
    guestid: "",
    price: 300,
    person: 2,
  },
  onShow: function() {
    var t = this;
    wx.request({
      url: s.HOST + "/time",
      success: function(e) {
        if (200 === e.statusCode) {
          var s = new Date(e.data).getHours();
          // if (s >= 19 || s < 9) {
          //     Dialog.alert({
          //         title: '只能下午五点之前预约早餐'
          //     })
          //     return
          // }
          t.fetInitData(), t.fetchSubscribe();
        }
      }
    }), this.setData({
      guestid: wx.getStorageSync("guestid")
    });
  },
  fetInitData: function() {
    Toast.loading({
      mask: true,
    });
    var t = this;
    wx.request({
      url: s.HOST + "/breakfast/data",
      success: function(e) {
        if (200 === e.statusCode) {
          t.setData({
            timeData: e.data
          });
          Toast.clear();
        }
      }
    });
  },
  fetchSubscribe: function() {
    var t = this;
    wx.request({
      url: s.HOST + "/breakfast/issubsribe",
      data: {
        guestid: wx.getStorageSync("guestid")
      },
      success: function(e) {
        200 === e.statusCode && t.setData({
          issubscribe: e.data
        });
      }
    });
  },
  selectTap1: function(t) {
    0 !== Object.keys(t.target.dataset).length && this.setData({
      food: t.target.dataset.value
    });
  },
  selectTap2: function(t) {
    0 !== Object.keys(t.target.dataset).length && (t.target.dataset.disable || this.setData({
      preTime: t.target.dataset.value
    }));
  },
  onSubmit: function(t) {
    var a = this,
      o = i.globalData;
    let {
      preTime,
      price,
      person
    } = this.data
    if (!preTime) {
      Toast("请选择用餐时间");
      return
    }
    if (!person) {
      Toast("请选择用餐人数");
      return
    }
    wx.request({
      method: "POST",
      url: s.HOST + "/breakfast/subscribe",
      data: {
        guestid: wx.getStorageSync("guestid"),
        roomNum: wx.getStorageSync("guestInfo").number,
        timeCode: this.data.preTime,
        food: this.data.food,
        pax: person,
        total: price * person,
      },
      success: function(t) {
        200 === t.statusCode && a.setData({
          show: !0
        });
      },
      fail: function(t) {
        console.log("err", t);
      }
    })
  },
  onModalClose: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  onPersonChange(e) {
    this.setData({
      person: e.detail
    })
  },
  onCancel: function() {
    var t = this;
    wx.request({
      url: s.HOST + "/breakfast/cancel",
      data: {
        guestid: wx.getStorageSync("guestid")
      },
      success: function(e) {
        200 === e.statusCode && (t.fetInitData(), t.fetchSubscribe());
      }
    });
  }
});