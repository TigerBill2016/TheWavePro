var i = require("../mixins/link");

(0, require("../common/component").VantComponent)({
    mixins: [ i.link ],
    props: {
        text: String,
        info: String,
        icon: String
    },
    methods: {
        onClick: function(i) {
            this.$emit("click", i.detail), this.jumpLink();
        }
    }
});