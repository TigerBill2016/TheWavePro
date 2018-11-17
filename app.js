var e = require("./app.config.js");

App({
    onLaunch: function () {
        var a = this, o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o);
        var s = this;
        wx.login({
            success: function (a) {
                console.log('login success', a)
                wx.request({
                    url: e.HOST + "/login",
                    data: {
                        code: a.code
                    },
                    success: function (e) {
                        var a = e.data;
                        console.log("session_key", a.session_key)
                        wx.setStorageSync('session_key', a.session_key)
                    }
                })
            },
            fail: function (err) {
                console.error('login fail', err)
            }
        }), wx.getSetting({
            success: function (e) {
                console.log('authSetting', e)
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function (e) {
                        console.log("res", e)
                        a.globalData.userInfo = e.userInfo
                        wx.setStorageSync('iv', e.iv)
                        wx.setStorageSync('encryptedData', e.encryptedData)
                        a.userInfoReadyCallback && a.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    }
});