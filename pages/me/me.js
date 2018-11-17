var a = require("../../app.config.js"), t = getApp();

Page({
    data: {
        userInfo: {},
        data: []
    },
    onShow: function(e) {
        var s = this, u = t.globalData.userInfo;
        this.setData({
            userInfo: u
        }), wx.request({
            url: a.HOST + "/me/data",
            data: {
                guestid: wx.getStorageSync("guestid")
            },
            success: function(a) {
                200 === a.statusCode && s.setData({
                    data: a.data
                });
            }
        });
    }
});