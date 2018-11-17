(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "cancel-class" ],
    props: {
        focus: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            value: "#f2f2f2"
        },
        maxlength: {
            type: Number,
            value: -1
        }
    },
    methods: {
        onChange: function(e) {
            this.setData({
                value: e.detail
            }), this.$emit("change", e.detail);
        },
        onCancel: function() {
            this.setData({
                value: ""
            }), this.$emit("cancel"), this.$emit("change", "");
        },
        onSearch: function() {
            this.$emit("search", this.data.value);
        },
        onFocus: function() {
            this.$emit("focus");
        },
        onBlur: function() {
            this.$emit("blur");
        }
    }
});