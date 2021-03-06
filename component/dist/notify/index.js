(0, require("../common/component").VantComponent)({
    props: {
        text: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: "#e64340"
        },
        duration: {
            type: Number,
            value: 3e3
        }
    },
    methods: {
        show: function() {
            var t = this, e = this.data.duration;
            clearTimeout(this.timer), this.setData({
                show: !0
            }), e > 0 && e !== 1 / 0 && (this.timer = setTimeout(function() {
                t.hide();
            }, e));
        },
        hide: function() {
            clearTimeout(this.timer), this.setData({
                show: !1
            });
        }
    }
});