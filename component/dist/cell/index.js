var e = require("../mixins/link");

(0, require("../common/component").VantComponent)({
    classes: [ "title-class", "label-class", "value-class" ],
    mixins: [ e.link ],
    props: {
        title: null,
        value: null,
        icon: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        border: {
            type: Boolean,
            value: !0
        }
    },
    computed: {
        cellClass: function() {
            var e = this.data;
            return this.classNames("custom-class", "van-cell", {
                "van-cell--center": e.center,
                "van-cell--required": e.required,
                "van-cell--borderless": !e.border,
                "van-cell--clickable": e.isLink || e.clickable
            });
        },
        titleStyle: function() {
            var e = this.data.titleWidth;
            return e ? "max-width: " + e + ";min-width: " + e : "";
        }
    },
    methods: {
        onClick: function(e) {
            this.$emit("click", e.detail), this.jumpLink();
        }
    }
});