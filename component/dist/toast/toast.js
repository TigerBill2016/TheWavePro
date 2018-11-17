function e() {
    return (e = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
    }).apply(this, arguments);
}

function t(e) {
    return (0, n.isObj)(e) ? e : {
        message: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("../common/utils"), r = {
    type: "text",
    mask: !1,
    message: "",
    show: !0,
    zIndex: 1e3,
    duration: 3e3,
    position: "middle",
    forbidClick: !1,
    loadingType: "circular",
    selector: "#van-toast"
}, o = [], i = e({}, r), u = function(n) {
    void 0 === n && (n = {}), n = e({}, i, t(n));
    var r = getCurrentPages(), u = r[r.length - 1].selectComponent(n.selector);
    return delete n.selector, o.push(u), u.setData(n), clearTimeout(u.timer), n.duration > 0 && (u.timer = setTimeout(function() {
        u.clear(), o = o.filter(function(e) {
            return e !== u;
        });
    }, n.duration)), u;
}, s = function(n) {
    return function(r) {
        return u(e({
            type: n
        }, t(r)));
    };
};

[ "loading", "success", "fail" ].forEach(function(e) {
    u[e] = s(e);
}), u.clear = function() {
    o.forEach(function(e) {
        e.clear();
    }), o = [];
}, u.setDefaultOptions = function(e) {
    Object.assign(i, e);
}, u.resetDefaultOptions = function() {
    i = e({}, r);
}, exports.default = u;