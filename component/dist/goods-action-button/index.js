var i = require("../mixins/link");

(0, require("../common/component").VantComponent)({
    mixins: [ i.link ],
    props: {
        text: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: "danger"
        }
    },
    methods: {
        onClick: function(i) {
            this.$emit("click", i.detail), this.jumpLink();
        }
    }
});