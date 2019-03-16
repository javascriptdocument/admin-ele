<template>
  <div class="login">
    <div class="main">
      <div class="title">仲达集团-WDA维修厂管理系统</div>
      <div class="center">
        <div class="left">
          <div class="bgUrl"></div>
        </div>
        <form ref="form">
          <div class="right">
            <p class="tetx">登录</p>
            <div class="form">
              <div>
                <input type="text" name="form.usname" placeholder="输入用户名" v-model="form.usname">
              </div>
              <div>
                <input type="password" name="form.passwd" placeholder="输入密码" v-model="form.passwd">
              </div>
              <div class="Code">
                <input type="text" placeholder="输入验证码" v-model="form.code" name="form.code">
                <component is="Verification_Code"></component>
              </div>
              <div class="border_clear">
                <el-button type="primary" :disabled="nextVisible" @click="login">登录</el-button>
              </div>
              <div class="border_clear jump">
                <a href="javascript:;" @click="register">注册</a>
                <router-link to="/Reset_Password">忘记密码</router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="remind">
        推荐使用最新版谷歌浏览器，点击
        <a href="javascript:;" @click="download">下载</a>
      </div>
    </div>
    <Agreement></Agreement>
  </div>
</template>
<script>
import Verification_Code from "./components/Verification_Code";
import Agreement from "./components/Agreement";
import { mapState } from "vuex";
import { login, protocol } from "@/server/serverData";
export default {
  name: "login",
  data() {
    return {
      form: {
        usname: "",
        passwd: "",
        code: ""
      },
      Agreement_State: false,
      Agreement: ""
    };
  },
  computed: {
    /** 如果账户密码和验证码没有输入则不能登录**/
    nextVisible() {
      let state = true,
        usname = this.form.usname,
        passwd = this.form.passwd,
        code = this.form.code;
      if (usname && passwd && code) {
        state = false;
      }
      /** 如果账号密码和验证码不为空,绑定键盘回车事件 **/
      if (!state) {
        console.log(123);
        this.$refs.form.onkeydown = e => {
          var key = e.keyCode;
          if (key == 13) {
            this.login();
          }
        };
      }
      return state;
    },
    /** 获取State中当前验证码,在登录时进行匹配**/
    ...mapState(["verify"])
  },
  components: {
    Agreement: () => import("./components/Agreement"),
    Verification_Code
  },
  methods: {
    /** 生成随机数 **/
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    async register() {
      //注册
      // this.$store.commit('OPEN_AGREEMENT',true)
      this.$router.push("/Selective_registerType");
    },
    /** 登录 **/
    async login() {
      let verify = `${this.randomNum(1, 10)}${this.randomNum(
        1,
        10
      )}${this.randomNum(1, 10)}${this.randomNum(1, 10)}`;
      console.log(this.form.code, this.verify);
      if (this.form.code != this.verify) {
        this.$message.error("验证码错误");
        /** 每次点击登录,如果匹配错误,改变state中的verify，刷新验证码 **/
        this.$store.commit("VERIFICATION_CODE", verify);
        return;
      } else {
        let res = await login(this.form);
        let that = this;
        this.$store.commit("shop_status", res.data.code);
        console.log("zhuangati",this.$store.state.shop_status)
        switch (res.data.code) {
          /** 0 表示当前用户尚未支付，请求支付系统使用费接口，切换页面展示二维码进行支付 **/
          case 0:
            this.$confirm(`${res.data.msg}<br/>是否前往支付页面?`, "提示", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                console.log(that.sid);
                that.$router.push({
                  path: "/Unpaid",
                  query: { sid: res.data.data.sid }
                });
              })
              .catch(() => {});
            break;
          /** 1-未完善信息，跳转到完善信息页面，让用户完善信息 **/
          case 1:
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem("username", res.data.data.shop_name);
            window.sessionStorage.setItem("shop_type", res.data.data.shop_type);
            this.$confirm(`${res.data.msg}是否前往完善信息页?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                that.$router.push({
                  path: "/perfect_information",
                  query: { sid: res.data.data.sid }
                });
              })
              .catch(() => {});
            break;
          /** 2-正常登录，跳转到首页 **/
          case 2:
            if (res.data.data.days.length !== 0) {
              window.sessionStorage.setItem("days", res.data.data.days);
            }
            // 如果是 邦保养维修厂 是需要运营商审核的，如果是待审核状态的话，惠有popup字段，里面是它的运营商的信息
            let popup = res.data.data.popup;
            if (popup.name) {
              const h = this.$createElement;
              this.$msgbox({
                center: true,
                title: popup.title,
                showClose: false,
                message: h("p", null, [
                  h("p", null, popup.name),
                  h("p", null, popup.quyu),
                  h("p", null, popup.phone)
                ]),
                showCancelButton: false,
                confirmButtonText: "确定",
                beforeClose: (act, instance, done) => {
                  let action = JSON.stringify(res.data.data.action.msg);
                  console.log(action);
                  window.sessionStorage.setItem("action", action);
                  window.sessionStorage.setItem("token", res.data.data.token);
                  window.sessionStorage.setItem(
                    "username",
                    res.data.data.shop_name
                  );
                  window.sessionStorage.setItem(
                    "shop_type",
                    res.data.data.shop_type
                  );
                  that.$router.push("/home");
                  that.form = {
                    usname: "",
                    passwd: "",
                    code: ""
                  };
                  done();
                }
              });
              return false;
            }
            // 这里是UBI店面 或者 通过审核的邦保养店面
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1000,
              onClose() {
                let action = JSON.stringify(res.data.data.action.msg);
                console.log(action);
                window.sessionStorage.setItem("action", action);
                window.sessionStorage.setItem("token", res.data.data.token);
                window.sessionStorage.setItem(
                  "username",
                  res.data.data.shop_name
                );
                window.sessionStorage.setItem(
                  "shop_type",
                  res.data.data.shop_type
                );

                that.$router.push({
                  name: "home",
                  params: { shop_type: res.data.data.shop_type }
                });
                that.form = {
                  usname: "",
                  passwd: "",
                  code: ""
                };
              }
            });
            break;
          /** 3-已取消合作且做完了剩余的邦保养服务，跳转到提现页面 **/
          case 3:
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem("username", res.data.data.shop_name);
            that.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1000,
              onClose: () => {
                that.$router.push("/capital");
              }
            });
            break;
          /** 4-因为三次未完成任务，店铺关停，请联系运营商（此状态弹窗提示） **/
          case 4:
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1000
            });
            break;
          /** 5-提交的表单内容有错误或者账号密码错误，直接弹出弹窗提示 **/
          case 5:
            this.$message({
              message: res.data.msg,
              type: "error",
              duration: 1000
            });
            break;
          /** 7.为车管家合作店铺，弹窗提示信息后，跳转到二维码页面 **/

          case 7:
            window.sessionStorage.setItem("shop_type", 2);
            this.$confirm(`${res.data.msg}<br/>是否前往支付页面?`, "提示", {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                console.log(that.sid);
                that.$router.push({
                  path: "/Unpaid",
                  query: { sid: res.data.data.sid }
                });
              })
              .catch(() => {});
            break;
          /** 8.为车管家合作店铺，弹窗提示信息后，跳转到完善信息页面 */

          case 8:
            window.sessionStorage.setItem("shop_type", 2);
            window.sessionStorage.setItem("token", res.data.data.token);
            window.sessionStorage.setItem("username", res.data.data.shop_name);
            this.$confirm(`${res.data.msg}，是否前往完善信息页?`, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                that.$router.push({
                  path: "/perfect_information",
                  query: { sid: res.data.data.sid }
                });
              })
              .catch(() => {});
            break;
        }
      }
    },
    /** 跳转下载最新版本谷歌 **/
    download() {
      console.log(123);
      window.open("http://baoku.360.cn/soft/search?kw=%E8%B0%B7%E6%AD%8C");
    }
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.login {
  width: 100%;
  height: 100%;
}

.main {
  width: 980px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -440px;
  margin-top: -440px;
  padding-top: 154px;
  z-index: 1;
  overflow: hidden;
  .title {
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    padding-bottom: 36px;
  }
  .center:after {
    display: block;
    content: "";
    clear: both;
  }
  .center {
    border-radius: 5px;
    background: white;
    height: 440px;
    .left {
      width: 50%;
      float: left;
      box-shadow: 1px 0px 0px 0px rgba(215, 225, 230, 1);
      height: 100%;
      position: relative;
      .bgUrl {
        width: 400px;
        height: 400px;
        position: absolute;
        background-image: url("../../public/login/Repai.png");
        background-size: 100% 100%;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -200px;
      }
    }
    .right {
      width: 50%;
      float: left;
      .tetx {
        text-align: center;
        margin: 30px 0;
        color: #32373c;
        font-size: 20px;
      }
      .form {
        margin: 0 59px;
        .Code {
          position: relative;
          .Verification_Code {
            position: absolute;
            right: 0;
            top: -10px;
          }
        }
      }
      .form > div {
        border-bottom: 1px solid #d7e1e6;
        margin-bottom: 20px;
      }
      .form input {
        border: none;
        outline: none;
        padding: 10px 0;
        width: 100%;
      }
      input::-webkit-input-placeholder {
        color: #b9c3cd;
      }
      .form button {
        width: 100%;
        font-size: 18px;
        height: 50px;
      }
      .jump:after {
        content: "";
        clear: both;
        display: block;
      }
      .jump > a {
        float: left;
      }
      .jump > a:last-child {
        float: right;
      }
    }
  }
  .remind {
    text-align: center;
    color: white;
    margin-top: 20px;
    font-size: 14px;
    a {
      color: white;
      text-decoration: underline;
    }
  }
}
.download {
  text-align: center;
  button {
    width: 100px;
    line-height: 28px;
    height: 28px;
    background-color: #b9c3cd;
    border: none;
    color: #32373c;
  }
}

.Agreement_content > p {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(50, 55, 60, 1);
  line-height: 24px;
}
.radio {
  text-align: center;
}
.Sure {
  width: 370px;
}
</style>