(0, require("../common/component").VantComponent)({
    relation: {
        name: "badge",
        type: "descendant",
        linked: function(t) {
            this.badges.push(t), this.setActive();
        },
        unlinked: function(t) {
            this.badges = this.badges.filter(function(e) {
                return e !== t;
            }), this.setActive();
        }
    },
    props: {
        active: {
            type: Number,
            value: 0
        }
    },
    watch: {
        active: "setActive"
    },
    beforeCreate: function() {
        this.badges = [], this.currentActive = -1;
    },
    methods: {
        setActive: function(t) {
            var e = this.data.active, i = this.badges;
            t && (e = i.indexOf(t)), e !== this.currentActive && (-1 !== this.currentActive && i[this.currentActive] && (this.$emit("change", e), 
            i[this.currentActive].setActive(!1)), i[e] && (i[e].setActive(!0), this.currentActive = e));
        }
    }
});