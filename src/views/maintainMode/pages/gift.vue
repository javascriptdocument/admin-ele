<template>
  <div class="gift">
    <div class="viewMain"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ""
      },
      carInfo: {},
      dialogVisible: true
    };
  },
  computed: {},
  methods: {
    open7() {
      let that = this;
      this.$confirm("敬请期待！", "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "warning",
        showClose: false,
        closeOnClickModal: true,
        closeOnPressEscape: true,
        center: true,
        callback: action => {
          that.$router.back(-1);
        }
      }) 
    }
  },
  created() {
    this.open7();
  }
};
</script>
<style lang="scss" scoped>
.gift {
  min-height: calc(100vh - 55px);
  background-color: #ebedf0;
  width: 100%;
  position: absolute;
  top: 55px;
  overflow: hidden;
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
}
</style>
<style>
.el-breadcrumb__inner {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
}
.el-breadcrumb__inner.is-link {
  color: #3498e9;
}
</style>


