(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "node-class" ],
    props: {
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        size: {
            type: String,
            value: "30px"
        }
    },
    watch: {
        checked: function(e) {
            this.setData({
                value: e
            });
        }
    },
    created: function() {
        this.setData({
            value: this.data.checked
        });
    },
    methods: {
        onClick: function() {
            if (!this.data.disabled && !this.data.loading) {
                var e = !this.data.checked;
                this.$emit("input", e), this.$emit("change", e);
            }
        }
    }
});