<template>
  <div class="Putforward_information">
    <div class="step">
      <ul>
        <li>
          <a href="javascript:;">1.登录信息</a>
        </li>
        <li>
          <a href="javascript:;">2.支付费用</a>
        </li>
        <li>3.完成</li>
      </ul>
    </div>
    <div class="form">
      <div>注册完成，请补充店铺信息！</div>
    </div>
    <div class="next-step">
      <div>
        <el-button type="primary" class="next" @click="register">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "complate",
  data() {
    return {
      sid: this.$route.query.sid,
    };
  }, 
  methods: {
    /** 注册**/
    async register() {
      let that = this;
      that.$router.push({
        path: "/perfect_information",
        query: { sid: that.sid }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.Putforward_information {
  padding: 40px 46px;
}

.step {
  position: relative;
  width: 100%;
  height: 40px;
  background-image: url("../../public/login/step3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  line-height: 40px;
  margin-bottom: 40px;
  ul:after {
    display: block;
    content: "";
    clear: both;
  }
  ul {
    .col-919 {
      color: #91969b;
    }
    li {
      width: calc(100% / 3);
      float: left;
      list-style: none;
      text-align: center;
      color: white;
      font-size: 12px;
      a {
        color: white;
      }
    }
  }
}
.ubistep {
  background-image: url("../../public/login/step2.png");
}
.form {
  margin-bottom: 69px;
  height: 250px;
  & > div {
    margin-bottom: 10px;
    /deep/ div {
      width: 100%;
    }
    /deep/ input {
      color: #555;
      border: none;
      padding: 15px 0;
      outline: none;
      font-size: 16px;
      width: 100%;
    }
    /deep/ input::-webkit-input-placeholder {
      color: #b9c3cd;
      font-size: 16px;
    }
    /deep/ .el-select {
      margin-bottom: 5px;
    }
    /deep/ .el-input__inner {
      border: none;
      padding-left: 0;
    }
    .Verification {
      background: none;
      float: right;
      border: 1px solid #e5e5e5;
      height: 36px;
      line-height: 36px;
      border-radius: 5px;
      width: 120px;
      text-align: center;
    }
  }
}
.next {
  width: 100%;
}
.Return {
  text-align: center;
  margin-top: 10px;
  a {
    color: #3498e9;
  }
}
</style>