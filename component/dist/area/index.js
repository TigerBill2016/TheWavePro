(0, require("../common/component").VantComponent)({
    props: {
        title: String,
        value: String,
        loading: Boolean,
        itemHeight: {
            type: Number,
            value: 44
        },
        visibleItemCount: {
            type: Number,
            value: 5
        },
        columnsNum: {
            type: [ String, Number ],
            value: 3
        },
        areaList: {
            type: Object,
            value: {}
        }
    },
    data: {
        pickerValue: [ 0, 0, 0 ],
        columns: []
    },
    computed: {
        displayColumns: function() {
            var t = this.data, e = t.columns, i = void 0 === e ? [] : e, n = t.columnsNum;
            return i.slice(0, +n);
        }
    },
    watch: {
        value: function(t) {
            this.code = t, this.setValues();
        },
        areaList: "setValues"
    },
    methods: {
        onCancel: function() {
            this.$emit("cancel", {
                values: this.getValues(),
                indexs: this.getIndexs(),
                detail: this.getDetail()
            });
        },
        onConfirm: function() {
            this.$emit("confirm", {
                values: this.getValues(),
                indexs: this.getIndexs(),
                detail: this.getDetail()
            });
        },
        onChange: function(t) {
            var e = t.detail.value, i = this.data, n = i.pickerValue, s = i.displayColumns, a = n.findIndex(function(t, i) {
                return t !== e[i];
            }), c = s[a];
            a < 0 || e[a] < 0 || !c[e[a]] || (this.code = c[e[a]].code, this.setValues(), this.$emit("change", {
                picker: this,
                values: this.getValues(),
                index: a
            }));
        },
        getList: function(t, e) {
            var i = [];
            if ("province" !== t && !e) return i;
            var n = this.data.areaList && this.data.areaList[t + "_list"] || {};
            return i = Object.keys(n).map(function(t) {
                return {
                    code: t,
                    name: n[t]
                };
            }), e && ("9" === e[0] && "city" === t && (e = "9"), i = i.filter(function(t) {
                return 0 === t.code.indexOf(e);
            })), i;
        },
        getIndex: function(t, e) {
            var i = "province" === t ? 2 : "city" === t ? 4 : 6, n = this.getList(t, e.slice(0, i - 2));
            "9" === e[0] && "province" === t && (i = 1), e = e.slice(0, i);
            for (var s = 0; s < n.length; s++) if (n[s].code.slice(0, i) === e) return s;
            return 0;
        },
        setValues: function() {
            var t = this.code || this.data.areaList && Object.keys(this.data.areaList.county_list || {})[0] || "", e = this.getList("province"), i = this.getList("city", t.slice(0, 2));
            this.setData({
                "columns[0]": e,
                "columns[1]": i
            }), i.length && "00" === t.slice(2, 4) && (t = i[0].code), this.setData({
                "columns[2]": this.getList("county", t.slice(0, 4)),
                pickerValue: [ this.getIndex("province", t), this.getIndex("city", t), this.getIndex("county", t) ]
            });
        },
        getValues: function() {
            var t = this.data, e = t.displayColumns, i = void 0 === e ? [] : e, n = t.pickerValue, s = void 0 === n ? [] : n;
            return i.map(function(t, e) {
                return t[s[e]];
            }).filter(function(t) {
                return !!t;
            });
        },
        getIndexs: function() {
            var t = this.data, e = t.pickerValue, i = t.columnsNum;
            return e.slice(0, i);
        },
        getDetail: function() {
            var t = this.getValues(), e = {
                code: "",
                country: "",
                province: "",
                city: "",
                county: ""
            };
            if (!t.length) return e;
            var i = t.map(function(t) {
                return t.name;
            });
            return e.code = t[t.length - 1].code, "9" === e.code[0] ? (e.country = i[1] || "", 
            e.province = i[2] || "") : (e.province = i[0] || "", e.city = i[1] || "", e.county = i[2] || ""), 
            e;
        },
        reset: function() {
            this.code = "", this.setValues();
        }
    }
});