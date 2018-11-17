function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "input-class" ],
    props: {
        icon: String,
        label: String,
        error: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customClass: String,
        confirmType: String,
        errorMessage: String,
        placeholder: String,
        customStyle: String,
        useIconSlot: Boolean,
        useButtonSlot: Boolean,
        placeholderStyle: String,
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: "text"
        },
        border: {
            type: Boolean,
            value: !0
        },
        titleWidth: {
            type: String,
            value: "90px"
        }
    },
    data: {
        showClear: !1
    },
    computed: {
        inputClass: function() {
            var t = this.data;
            return this.classNames("input-class", "van-field__input", e({
                "van-field--error": t.error,
                "van-field__textarea": "textarea" === t.type,
                "van-field__input--disabled": t.disabled
            }, "van-field__input--" + t.inputAlign, t.inputAlign));
        }
    },
    beforeCreate: function() {
        this.focused = !1;
    },
    methods: {
        onInput: function(e) {
            var t = (e.detail || {}).value, i = void 0 === t ? "" : t;
            this.$emit("input", i), this.$emit("change", i), this.setData({
                value: i,
                showClear: this.getShowClear(i)
            });
        },
        onFocus: function() {
            this.$emit("focus"), this.focused = !0, this.setData({
                showClear: this.getShowClear()
            });
        },
        onBlur: function() {
            this.focused = !1, this.$emit("blur"), this.setData({
                showClear: this.getShowClear()
            });
        },
        onClickIcon: function() {
            this.$emit("click-icon");
        },
        getShowClear: function(e) {
            return e = void 0 === e ? this.data.value : e, this.data.clearable && this.focused && e && !this.data.readonly;
        },
        onClear: function() {
            this.setData({
                value: "",
                showClear: this.getShowClear("")
            }), this.$emit("input", ""), this.$emit("change", "");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.value);
        }
    }
});