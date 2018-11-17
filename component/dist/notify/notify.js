function e(e) {
    return (0, t.isObj)(e) ? e : {
        text: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    void 0 === t && (t = {});
    var o = getCurrentPages(), s = o[o.length - 1];
    t = Object.assign({}, r, e(t));
    var n = s.selectComponent(t.selector);
    delete t.selector, n && (n.setData(t), n.show());
};

var t = require("../common/utils"), r = {
    selector: "#van-notify",
    duration: 3e3
};