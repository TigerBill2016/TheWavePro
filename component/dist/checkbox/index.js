(0, require("../common/component").VantComponent)({
    field: !0,
    relation: {
        name: "checkbox-group",
        type: "ancestor"
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: null,
        disabled: Boolean,
        labelDisabled: Boolean,
        labelPosition: String,
        shape: {
            type: String,
            value: "round"
        },
        useIconSlot: Boolean
    },
    computed: {
        iconClass: function() {
            var e = this.data, a = e.disabled, i = e.value, t = e.shape;
            return this.classNames("van-checkbox__icon", "van-checkbox__icon--" + t, {
                "van-checkbox__icon--disabled": a,
                "van-checkbox__icon--checked": i
            });
        }
    },
    methods: {
        emitChange: function(e) {
            var a = this.getRelationNodes("../checkbox-group/index")[0];
            if (a) {
                var i = a.data.value.slice(), t = this.data.name;
                if (e) {
                    if (a.data.max && i.length >= a.data.max) return;
                    -1 === i.indexOf(t) && (i.push(t), a.$emit("input", i), a.$emit("change", i));
                } else {
                    var n = i.indexOf(t);
                    -1 !== n && (i.splice(n, 1), a.$emit("input", i), a.$emit("change", i));
                }
            } else this.$emit("input", e), this.$emit("change", e);
        },
        toggle: function() {
            this.data.disabled || this.emitChange(!this.data.value);
        },
        onClickLabel: function() {
            this.data.disabled || this.data.labelDisabled || this.emitChange(!this.data.value);
        }
    }
});