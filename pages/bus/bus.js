var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../component/vant-weapp/dist/dialog/dialog")), e = require("../../app.config.js"), a = getApp();

Page({
    data: {
        runsData: [],
        destination: "market",
        time: "10:00",
        member: 1,
        price: 50
    },
    onShow: function() {
        var t = this;
        wx.request({
            url: e.HOST + "/busrun/data",
            success: function(e) {
                200 === e.statusCode && t.setData({
                    runsData: e.data.sort(function(t, e) {
                        return t.time <= e.time ? -1 : 1;
                    })
                });
            }
        });
    },
    selectTap1: function(t) {
        var e = t.target.dataset.value;
        this.setData({
            destination: e,
            time: "airport" === e ? "10:00" : "10:20"
        });
    },
    selectTap2: function(t) {
        this.setData({
            time: t.target.dataset.value
        });
    },
    onChange: function(t) {
        var e = Number(t.detail);
        return e > 10 && (e = 10), console.log(e, "value"), this.setData({
            member: e,
            price: 50 * e
        }), e;
    },
    onSubmit: function() {
        var i = this.data, n = i.destination, s = i.time, r = i.member, u = i.price;
        wx.request({
            method: "POST",
            url: e.HOST + "/busrun/subscribe",
            data: {
                destination: n,
                member: r,
                time: s,
                price: u,
                openid: a.globalData.openid
            },
            success: function(e) {
                200 === e.statusCode && t.default.alert({
                    message: "预约成功,可以个人中心查看"
                }).then(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                });
            }
        });
    }
});