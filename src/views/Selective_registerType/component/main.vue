<template>
  <div class="main">
    <div class="content">
      <h2>请选择</h2>
      <div class="from">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 不要列表形式 -->
          <!-- <el-form-item>
            <el-radio label="1" v-model="form.shop_type">注册《邦保养》加盟店</el-radio>
          </el-form-item>
          <el-form-item>
            <el-radio label="2" v-model="form.shop_type">注册《UBI车管家》服务店</el-radio>
          </el-form-item>-->
          <!-- 要模块形式 -->
          <div class="select">
             
            <div :class="form.shop_type == 2 ? 'selected' : ''" @click="form.shop_type = 2;">
              <img src="../public/login/ubiopt.png" alt>
              <span>注册《UBI》服务店</span>
            </div>
            <div :class="form.shop_type == 1 ? 'selected' : ''" @click="form.shop_type = 1;">
              <img src="../public/login/bbyopt.png" alt>
              <span>注册《邦保养》合作店</span>
            </div>
          </div>
          <el-form-item class="clear_border">
            <el-button type="primary" :disabled="!form.shop_type" @click="next" class="next">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "registerAccount",
  data() {
    return {
      form: {
        shop_type: ""
      }
    };
  },
  methods: {
    /** 点击下一步将选择的店铺类型存到缓存 **/
    next() {
      window.sessionStorage.setItem("shop_type", this.form.shop_type);
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.main {
  height: 100%;
  position: relative;
  .content {
    width: 490px;
    margin: 0 auto;
    padding-top: 154px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -245px;
    margin-top: -440px;
    z-index: 2;
    h2 {
      margin-bottom: 20px;
      text-align: center;
      color: white;
    }
    .from {
      height: 530px;
      background-color: white;
      box-shadow: 0px 0px 8px 0px rgba(100, 145, 190, 0.6);
      border-radius: 5px;
      .clear_border {
        border: none !important;
      }
      .select {
        display: flex;
        justify-content: space-around;
        & > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          padding-top: 20px;
          border-radius: 10px;
          cursor: pointer;
          height: 160px;
          width: 200px;
          border: 1px solid #ccc;
        }
        span {
          line-height: 40px;
          font-size: 14px;
        }
        img {
          height: 100px;
          width: 100px;
        }
        .selected {
          background: #ccc;
        }
      }
      /deep/ .el-form {
        padding-top: 50px;
        .el-form-item {
          margin: 0 61px 10px 59px;
          //   border-bottom: 1px solid #e5e5e5;
          //   display: flex;
          .el-form-item__content {
            margin-left: 0 !important;
          }
          .next {
            width: 100%;
            margin-top: 200px;
          }
          .return_login {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
