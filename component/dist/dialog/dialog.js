function t() {
    return (t = Object.assign || function(t) {
        for (var n = 1; n < arguments.length; n++) {
            var e = arguments[n];
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        }
        return t;
    }).apply(this, arguments);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = [], e = function(e) {
    return new Promise(function(o, r) {
        var s = getCurrentPages(), c = s[s.length - 1].selectComponent(e.selector);
        delete e.selector, c && (c.setData(t({
            onCancel: r,
            onConfirm: o
        }, e)), n.push(c));
    });
};

e.defaultOptions = {
    show: !0,
    title: "",
    message: "",
    zIndex: 100,
    overlay: !0,
    asyncClose: !1,
    selector: "#van-dialog",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, e.alert = function(n) {
    return e(t({}, e.currentOptions, n));
}, e.confirm = function(n) {
    return e(t({}, e.currentOptions, {
        showCancelButton: !0
    }, n));
}, e.close = function() {
    n.forEach(function(t) {
        t.close();
    }), n = [];
}, e.stopLoading = function() {
    n.forEach(function(t) {
        t.stopLoading();
    });
}, e.setDefaultOptions = function(t) {
    Object.assign(e.currentOptions, t);
}, e.resetDefaultOptions = function() {
    e.currentOptions = t({}, e.defaultOptions);
}, e.resetDefaultOptions(), exports.default = e;