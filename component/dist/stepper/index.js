(0, require("../common/component").VantComponent)({
    field: !0,
    classes: [ "input-class", "plus-class", "minus-class" ],
    props: {
        integer: Boolean,
        disabled: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: 2147483647
        },
        step: {
            type: null,
            value: 1
        }
    },
    computed: {
        minusDisabled: function() {
            return this.data.disabled || this.data.value <= this.data.min;
        },
        plusDisabled: function() {
            return this.data.disabled || this.data.value >= this.data.max;
        }
    },
    created: function() {
        this.setData({
            value: this.range(this.data.value)
        });
    },
    methods: {
        range: function(t) {
            return Math.max(Math.min(this.data.max, t), this.data.min);
        },
        onInput: function(t) {
            var a = (t.detail || {}).value, i = void 0 === a ? "" : a;
            this.triggerInput(i);
        },
        onChange: function(t) {
            if (this.data[t + "Disabled"]) this.$emit("overlimit", t); else {
                var a = "minus" === t ? -this.data.step : +this.data.step, i = Math.round(100 * (this.data.value + a)) / 100;
                this.triggerInput(this.range(i)), this.$emit(t);
            }
        },
        onBlur: function(t) {
            var a = this.range(this.data.value);
            this.triggerInput(a), this.$emit("blur", t);
        },
        onMinus: function() {
            this.onChange("minus");
        },
        onPlus: function() {
            this.onChange("plus");
        },
        triggerInput: function(t) {
            this.setData({
                value: t
            }), this.$emit("change", t);
        }
    }
});