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
}, e = t(require("../../component/vant-weapp/dist/dialog/dialog")), i = t(require("../../component/vant-weapp/dist/toast/toast")), n = require("../../app.config.js"), s = getApp();

Page({
    data: {
        destination: "villas",
        time: "",
        flightNum: "",
        remark: ""
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
    getRemark: function(t) {
        var a = t.detail;
        this.setData({
            remark: a
        });
    },
    selectTap: function(t) {
        this.setData({
            destination: t.target.dataset.value
        });
    },
    onSubmit: function() {
        this.data.time ? this.data.flightNum ? wx.request({
            method: "POST",
            url: n.HOST + "/transfer/subscribe",
            data: a({}, this.data, {
                openid: s.globalData.openid
            }),
            success: function(t) {
                200 === t.statusCode && e.default.alert({
                    message: "预约成功"
                }).then(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                });
            }
        }) : (0, i.default)("请填写航班信息") : (0, i.default)("请填写接送机时间");
    }
});