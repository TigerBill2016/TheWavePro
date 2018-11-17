var e = require("./app.config.js");

App({
    onLaunch: function() {
        var a = this, o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o);
        var s = this;
        wx.login({
            success: function(a) {
                wx.request({
                    url: e.HOST + "/login",
                    data: {
                        code: a.code
                    },
                    success: function(e) {
                        var a = e.data;
                        console.log("111", a.openid), s.globalData.openid = a.openid, s.globalData.session_key = a.session_key;
                    }
                });
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        console.log("res", e), a.globalData.userInfo = e.userInfo, a.globalData.iv = e.iv, 
                        a.globalData.encryptedData = e.encryptedData, a.userInfoReadyCallback && a.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    }
});