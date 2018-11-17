(0, require("../common/component").VantComponent)({
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.data.tabs.push({
                instance: t,
                data: t.data
            }), this.updateTabs();
        },
        unlinked: function(t) {
            var a = this.data.tabs.filter(function(a) {
                return a.instance !== t;
            });
            this.setData({
                tabs: a,
                scrollable: a.length > this.data.swipeThreshold
            }), this.setActiveTab();
        }
    },
    props: {
        color: String,
        lineWidth: Number,
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .2
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1
    },
    watch: {
        swipeThreshold: function() {
            this.setData({
                scrollable: this.data.tabs.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        active: "setActiveTab"
    },
    mounted: function() {
        this.setLine(), this.scrollIntoView();
    },
    methods: {
        updateTabs: function() {
            var t = this.data.tabs;
            this.setData({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, a) {
            this.$emit(t, {
                index: a,
                title: this.data.tabs[a].data.title
            });
        },
        onTap: function(t) {
            var a = t.currentTarget.dataset.index;
            this.data.tabs[a].data.disabled ? this.trigger("disabled", a) : (this.trigger("click", a), 
            this.setActive(a));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.setData({
                active: t
            }), this.setActiveTab());
        },
        setLine: function() {
            var t = this;
            "line" === this.data.type && this.getRect(".van-tab", !0).then(function(a) {
                var e = a[t.data.active], i = t.data.lineWidth || e.width / 2, n = a.slice(0, t.data.active).reduce(function(t, a) {
                    return t + a.width;
                }, 0);
                n += (e.width - i) / 2, t.setData({
                    lineStyle: "\n            width: " + i + "px;\n            background-color: " + t.data.color + ";\n            transform: translateX(" + n + "px);\n            transition-duration: " + t.data.duration + "s;\n          "
                });
            });
        },
        setActiveTab: function() {
            var t = this;
            this.data.tabs.forEach(function(a, e) {
                var i = {
                    active: e === t.data.active
                };
                i.active && (i.inited = !0), i.active !== a.instance.data.active && a.instance.setData(i);
            }), this.setLine(), this.scrollIntoView();
        },
        scrollIntoView: function() {
            var t = this;
            this.data.scrollable && this.getRect(".van-tab", !0).then(function(a) {
                var e = a[t.data.active], i = a.slice(0, t.data.active).reduce(function(t, a) {
                    return t + a.width;
                }, 0), n = e.width;
                t.getRect(".van-tabs__nav").then(function(a) {
                    var e = a.width;
                    t.setData({
                        scrollLeft: i - (e - n) / 2
                    });
                });
            });
        }
    }
});