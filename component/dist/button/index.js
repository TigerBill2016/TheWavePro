var n = require("../common/component"), a = require("../mixins/button"), o = require("../mixins/open-type");

(0, n.VantComponent)({
    classes: [ "loading-class" ],
    mixins: [ a.button, o.openType ],
    props: {
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        }
    },
    computed: {
        classes: function() {
            var n = this.data, a = n.type, o = n.size, t = n.block, e = n.plain, i = n.round, l = n.square, s = n.loading, u = n.disabled;
            return this.classNames("van-button--" + a, "van-button--" + o, {
                "van-button--block": t,
                "van-button--round": i,
                "van-button--plain": e,
                "van-button--square": l,
                "van-button--loading": s,
                "van-button--disabled": u,
                "van-button--unclickable": u || s
            });
        }
    },
    methods: {
        onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click");
        }
    }
});