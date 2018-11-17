(0, require("../common/component").VantComponent)({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: "horizontal"
        },
        activeColor: {
            type: String,
            value: "#06bf04"
        }
    },
    watch: {
        steps: "formatSteps",
        active: "formatSteps"
    },
    created: function() {
        this.formatSteps();
    },
    methods: {
        formatSteps: function() {
            var t = this, e = this.data.steps;
            e.forEach(function(e, s) {
                e.status = t.getStatus(s);
            }), this.setData({
                steps: e
            });
        },
        getStatus: function(t) {
            var e = this.data.active;
            return t < e ? "finish" : t === e ? "process" : "";
        }
    }
});