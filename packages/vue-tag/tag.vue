<script>
export default {
  name: "tag",
  props: {
    text: String,
    type: String,
    closable: Boolean,
    size: String,
    active: Boolean
  },
  created() {
    // console.log(this.active)
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit("close", event);
    },
    handleActive(event) {
      event.stopPropagation();
      //console.log(this.active)
      this.$emit("tagActive", event);
    }
  },
  computed: {
    tagSize() {
      return this.size;
    },
    tagActive() {
      return this.active;
    },
    tagType() {
      let typeobj = {
        high_lv0: "success",
        high_lv1: "warning",
        high_lv2: "danger"
      };
      return typeobj[this.type];
    }
  },
  render() {
    // add --no-verify to bypass
    const classes = [
      "tag",
      this.tagSize ? `tag__${this.tagSize}` : "",
      this.tagType ? `tag__${this.tagType}` : ""
    ];
    const iClass = ["weui-icon-cancel", `tag__${this.tagType}`];
    const tagMic = (
      <span
        class={classes}
        style={{
          background: this.tagActive ? `#b3b3b3` : "",
          backgroundColor:
            this.tagActive && this.tagSize == "small" ? `#09bb07` : "",
          color: this.tagActive && this.tagSize == "small" ? `#fff` : ""
        }}
        on-click={this.handleActive}
      >
        {this.$slots.default}
        {this.closable && <i class={iClass} on-click={this.handleClose} />}
      </span>
    );
    return tagMic;
  }
};
</script>

<style lang="less" scoped>
.tag {
  margin: 5px 5px 0 0;
  background-color: #fff;
  display: inline-block;
  padding: 0 7px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #000;
  box-sizing: border-box;
  border: 1px solid #ccc;
  white-space: nowrap;
  .weui-icon-cancel {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: 0;
    color: #09bb07;
    &::before {
      content: "\EA0D";
    }
  }
}
.tag__success {
  color: #09bb07 !important;
}
.tag__info {
  color: #909399 !important;
}
.tag__warning {
  color: #e6a23c !important;
}
.tag__danger {
  color: #e64340 !important;
}
.tag__spe {
  background-color: #09bb07 !important;
}
.tag__small {
  height: 24px;
  padding: 0 5px;
  line-height: 22px;
}
</style>
