Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

exports.isObj = function(t) {
    var e = void 0 === t ? "undefined" : o(t);
    return null !== t && ("object" === e || "function" === e);
}, exports.isDef = function(o) {
    return void 0 !== o && null !== o;
};