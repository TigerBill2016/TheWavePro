function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../component/vant-weapp/dist/toast/toast")), a = t(require("../../component/vant-weapp/dist/dialog/dialog")), s = require("../../app.config.js"), i = getApp();
import Dialog from '../../component/vant-weapp/dist/dialog/dialog'

Page({
    data: {
        issubscribe: !1,
        url: "../../public/cn-food.jpg",
        food: "中餐",
        preTime: void 0,
        timeData: [],
        show: !1,
        guestid: ""
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
        var t = this;
        wx.request({
            url: s.HOST + "/breakfast/data",
            success: function(e) {
                200 === e.statusCode && t.setData({
                    timeData: e.data
                });
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
        var a = this, o = i.globalData;
        o.userInfo, o.breakfast, o.breakfastData;
        this.data.preTime ? wx.request({
            method: "POST",
            url: s.HOST + "/breakfast/subscribe",
            data: {
                guestid: wx.getStorageSync("guestid"),
                timeCode: this.data.preTime,
                food: this.data.food
            },
            success: function(t) {
                200 === t.statusCode && a.setData({
                    show: !0
                });
            },
            fail: function(t) {
                console.log("err", t);
            }
        }) : (0, e.default)("请选择用餐时间");
    },
    onModalClose: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onCancel: function() {
        var t = this;
        wx.request({
            method: "post",
            url: s.HOST + "/breakfast/cancel",
            data: {
                guestid: this.data.guestid
            },
            success: function(e) {
                200 === e.statusCode && (t.fetInitData(), t.fetchSubscribe());
            }
        });
    }
});