<template>
  <div class="login_information">
    <div class="step">
      <ul>
        <li>1.登录信息</li>
        <li class="col-919" v-if="form.shop_type == 1">2.支付费用</li>
        <li class="col-919" v-if="form.shop_type == 1">3.基本信息</li>
        <li class="col-919" v-if="form.shop_type == 2">2.基本信息</li>
        <li class="col-919" v-if="form.shop_type == 2">3.完成</li>
      </ul>
    </div>
    <div class="form">
      <div>
        <input type="text" placeholder="请输入账号" v-model="form.usname">
      </div>
      <div>
        <input type="password" placeholder="请输入密码" v-model="form.passwd">
      </div>
      <div>
        <input type="password" placeholder="确认密码" v-model="form.spasswd">
      </div>
      <div>
        <input type="tel" placeholder="输入手机号码" v-model="form.phone">
      </div>
      <div>
        <input type="text" placeholder="输入手机验证码" v-model="form.code">
        <el-button class="Verification" :disabled="isdisabled" @click="getCode">{{btnVal}}</el-button>
      </div>
      <div v-if="form.shop_type == 1" style="position: relative;border-bottom: 0;">
        <div class="sixbox">
          <span
            style=" color:#606266;display: block;height:38px;line-height: 38px;z-index: 10;"
          >注册码：</span>
          <input
            class="sixinput"
            type="text"
            disabled
            v-for="(item, index) in Inputlength"
            :key="index"
            :value="share_promo_code[item-1]"
          >
        </div>
        <input
          type="text"
          :maxlength="Inputlength"
          placeholder="请输入"
          v-model="share_promo_code"
          style="position: absolute;width: 100%;top: 0; opacity: 0;"
        >
      </div>
    </div>
    <div class="next-step">
      <div>
        <el-button type="primary" class="next" :disabled="nextVisible" @click="NextStep">下一步</el-button>
        <!--<router-link to="/register/Repair_information" tag='el-button' :class='' type="primary" :disabled='next'>下一步</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
import {
  regOne,
  getVerificationCode,
  deleteInfo,
  shareCode
} from "@/server/serverData";
export default {
  name: "loginInformation",
  data() {
    return {
      Inputlength: 6,
      share_promo_code: "",
      btnVal: "获取验证码",
      time: "60",
      isdisabled: false,
      form: {
        //用户注册信息
        usname: "",
        passwd: "",
        spasswd: "",
        phone: "",
        code: "",
        shop_type: window.sessionStorage.getItem("shop_type")
      }
    };
  },
  computed: {
    nextVisible() {
      let state = true,
        usname = this.form.usname,
        passwd = this.form.passwd,
        spasswd = this.form.spasswd,
        phone = this.form.phone,
        code = this.form.code;
      if (usname && passwd && spasswd && spasswd && phone && code) {
        state = false;
      }
      return state;
    }
  },
  watch: {
    share_promo_code() {
      if (this.share_promo_code.length == 6) {
        this.getcodeinfo();
      }
    }
  },
  methods: {
    /** 清楚无效数据 **/
    //            async clearInfo(){
    //                  try {
    //                      let res = await deleteInfo()
    //                  }catch (err){
    //                      console.log(err)
    //                  }
    //            },
    async getcodeinfo() {
      let res = await shareCode(this.share_promo_code);
      if (res.data.code == 1) {
        this.$confirm(
          res.data.data.type + "--" + res.data.data.name,
          res.data.data.msg,
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //   this.$message({
            //     type: 'success',
            //     message: '删除成功!'
            //   });
          })
          .catch(() => {
            this.share_promo_code = "";
            //   this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            //   });
          });
      } else {
        this.$message.error(res.data.msg);
        // this.share_promo_code = "";
      }
    },
    getCode() {
      if (!this.form.phone) this.$message.error("请输入手机号");
      else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.phone))
        this.$message.error("手机号格式不对");
      else {
        //手机号有并且正确
        var that = this;
        that.isdisabled = true;
        var interval = window.setInterval(function() {
          //按钮的值
          that.btnVal = "(" + that.time + ")秒后";
          --that.time;
          if (that.time < 0) {
            that.btnVal = "重新发送";
            that.isdisabled = false;
            that.time = 60;
            window.clearInterval(interval);
          }
        }, 1000);
        this.VerificationCode();
      }
    },
    async VerificationCode() {
      //获取验证码
      let res = await getVerificationCode(this.form.phone);
      if (res.data.code == 1) {
        this.$message({ message: res.data.msg, type: "success" });
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async NextStep() {
      //注册第一步
      let data = {
        share_promo_code: this.share_promo_code,
        ...this.form
      };
      console.log(data);
      let res = await regOne(data);
      if (res.data.code == 1) {
        var that = this;
        let sid = res.data.data.sid;
        this.$message({
          message: res.data.msg,
          type: "success",
          duration: "1000",
          onClose() {
            if (that.form.shop_type == 1)
              that.$router.push({
                path: "/register/Repair_information",
                query: { sid: sid, shop_type: that.$route.query.shop_type }
              });
            else
              that.$router.push({
                path: "/register/Putforward_information",
                query: { sid: sid, shop_type: that.$route.query.shop_type }
              });
          }
        });
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
  //        activated(){
  //             this.clearInfo()
  //        }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.login_information {
  padding: 40px 46px;
}
.step {
  position: relative;
  width: 100%;
  height: 40px;
  background-image: url("../../public/login/step.png");
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
    }
  }
}
.form {
  .sixbox {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding-bottom: 10px;
    .sixinput {
      margin: 0 6px;
      width: 30px;
      border-radius: 5px;
      text-align: center;
      border: 1px solid #eee;
      height: 38px;
    }
  }
  div {
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 10px;
    input {
      border: none;
      padding: 15px 0;
      outline: none;
    }
    input::-webkit-input-placeholder {
      color: #b9c3cd;
    }
    .Verification {
      float: right;

      width: 120px;
    }
  }
}
.next {
  width: 100%;
  font-size: 18px;
}
.Return {
  text-align: center;
  margin-top: 10px;
  a {
    color: #3498e9;
  }
}
</style>
