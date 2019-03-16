<template>
  <div class="QR_code animated bounceInDown">
    <div :class="[isshow ? 'animated zoomIn' : 'animated zoomOut','code']">
      <p>
        <img src="@/assets/images/QR_code.jpg">
      </p>
      <!-- <p>店长版专用</p> -->
      <p>扫码二维码</p>
      <p>进入手机端WDA管理系统</p>
    </div>

    <div :class="[isshow1 ? 'animated zoomIn' : 'animated zoomOut','code1']">
        <span class="code_tips">您的推广码</span>
        <span class="y_code">{{code}}</span>
    </div>
    <!-- <div class="">

    </div> -->

    <div class="right top" @mouseenter="enter()" @mouseleave="leave()">
      <img v-show="!isshow" src="@/assets/images/tel1.png">
      <img v-show="isshow" src="@/assets/images/tel.png">
      <div class="sharecode">移动端</div>
    </div>
    <div class="right bottom" @mouseenter="enter1()" @mouseleave="leave1()"  v-if="code&&status == 2">
      <img v-show="!isshow1" src="@/assets/images/t-code1.png">
      <img v-show="isshow1" src="@/assets/images/t-code.png">
      <div class="sharecode">推广码</div>
    </div>
  </div>
</template>
<script>
import { getCode } from "@/server/serverData";
export default {
  name: "QR_CODE",
  data() {
    return {
      isshow: false,
      isshow1: false,
      code: ""
    };
  },
  computed: {
    shop_type() {
      return window.sessionStorage.getItem("shop_type");
    },
    status() {
      return this.$store.state.shop_status;
    }
  },
  methods: {
    enter() {
      this.isshow = true;
    },
    leave() {
      this.isshow = false;
    },
    enter1() {
      this.isshow1 = true;
    },
    leave1() {
      this.isshow1 = false;
    },
    async getCode() {
      let res = await getCode();
      if (res.status == 200) {
        this.code = res.data;
      } else {
        // this.$message.error("接口访问出错");
      }
    }
  },
  mounted() {
    if (this.shop_type == 1) this.getCode();
  }
};
</script>
<style lang="scss" scoped>
.show-enter-active,
.show-leave-active {
  transition: all 1s;
}
.show-enter,
.show-leave-to {
  width: 0;
  height: 0;
}
.show-enter-to,
.show-leave {
  width: 200px;
  height: 200px;
}
.QR_code {
  width: 60px;
  height: 140px;
  position: fixed;
  right: 10px;
  bottom: 100px;
  display: flex;
  cursor: pointer;
  .right {
    position: absolute;
    right: 0;
    width: 60px;
    height: 70px;
    background: #fff;//#3498e9;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #1E2328;
    align-items: center;
    border:1px solid #D7E1E6;
    border-radius: 4px 4px 0 0;
    .sharecode {
      font-size: 14px;
      // line-height: 20px;
      height: 20px;
    }
  }
  .top {
    top: 0px;
  }
  .top:hover{
    color: #fff;
    background: #3498e9;
  }
  .bottom {
    width: 60px;
    height: 70px;
    top: 70px;
    border-radius:0 0 4px 4px;
  }
  .bottom:hover{
    color: #fff;
    background: #3498e9;
  }
  .code {
    position: fixed;
    right: 60px;
    bottom: 50px;
    min-height: 200px;
    overflow: hidden;
    font-weight: 600;
    background: white;
    box-shadow: -10px 0px 30px 5px #ccc;
    padding: 10px 20px;
    font-size: 14px;
    p {
      line-height: 25px;
      white-space: nowrap;
      img {
        width: 160px;
        height: 160px;
        margin: 10px 0 0 0;
      }
    }
  }
  .code1 {
    position: fixed;
    line-height: 20px;
    right: 60px;
    bottom: 0px;
    height: 100px;
    width: 180px;
    overflow: hidden;
    font-weight: 600;
    background: white;
    box-shadow: -10px 0px 30px 5px #ccc;
    padding: 10px 20px;
    font-size: 14px;
    .code_tips{
      display: block;
      font-size: 14px;
      margin-top: 18px;
    }
    .y_code{
      letter-spacing: 4px;
      font-size: 30px;
      color: #3498E9;
      margin-top: 10px;
      display: block;
    }
  }
}
</style>
