<template>
  <div class="Putforward_information">
    <div v-bind:class=" [shop_type == 2? 'ubistep step':'step']">
      <ul>
        <li>
          <a href="javascript:;">1.登录信息</a>
        </li>
        <li v-if="shop_type == 1">
          <a href="javascript:;">2.支付费用</a>
        </li>
        <li v-if="shop_type == 2">2.基本信息</li>

        <li v-if="shop_type == 1">3.基本信息</li>
        <li v-if="shop_type == 2">3.完成</li>
      </ul>
    </div>
    <div class="form">
      <div>
        <input type="text" v-model="form.company" placeholder="请输入公司名称">
      </div>
      <div>
        <input type="text" v-model="form.short_name" placeholder="请输入公司简称">
      </div>
      <div>
        <input type="text" v-model="form.leader" placeholder="负责人">
      </div>

      <!-- <div v-if="shop_type == 1">
        <input type="text" v-model="form.account" placeholder="输入提现卡号">
      </div>
      <div v-if="shop_type == 1">
        <input type="text" v-model="form.account_name" placeholder="输入开户名">
      </div>
      <div class="selectBox" v-if="shop_type == 1">
        <el-select v-model="form.bank" placeholder="请选择开户行">
          <el-option v-for="item of BankList" :key="item.id" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </div>
      <div v-if="shop_type == 1">
        <input type="text" v-model="form.branch" placeholder="输入所属分行（例：石家庄支行）">
      </div> -->
    </div>
    <div class="next-step">
      <div>
        <el-button type="primary" class="next" :disabled="nextVisible" @click="register">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  regThird,
  getBankCode,
  deleteInfo,
  createToken
} from "@/server/serverData";
export default {
  name: "PutforwardInformation",
  data() {
    return {
      BankList: [], //银行列表
      form: {
        company: "",
        short_name: "",
        leader: "",
        account_name: "",
        account: "",
        bank: "",
        branch: "",
        sid: this.$route.query.sid
      }
    };
  },
  computed: {
    nextVisible() {
      let state = true,
        f = this.form,
        st = this.shop_type,
        gs = f.company && f.short_name && f.leader,
        yh = f.account_name && f.account && f.bank && f.branch;
      if (st == 1 && gs ) {
        state = false;
      } else if (st == 2 && gs) {
        state = false;
      }
      return state;
    },
    shop_type() {
      return window.sessionStorage.getItem("shop_type");
    }
  },
  methods: {
    /** 返回并清楚原来注册填写的信息 **/
    async clear() {
      try {
        let res = await deleteInfo();
        this.$router.push({
          path: "Repair_information",
          query: { sid: this.$route.query.sid }
        });
      } catch (err) {
        console.log(err);
      }
    },
    /** 获取银行列表 **/
    async getBank() {
      let res = await getBankCode();
      this.BankList = res;
    },
    /** 注册**/
    async register() {
      /** 拿去缓存中的数据,进行判断选择了那个店铺 1-邦保养加盟pc注册 2-车管家合作小程序注册**/
      let res = await regThird({ ...this.form, shop_type: this.shop_type });
      if (res.data.code == 1) {
        var that = this;
        let getToken = await createToken({ sid: this.$route.query.sid });
        if (getToken.code == 1) {
          window.sessionStorage.setItem("token", getToken.data);
        }
        this.$message({
          message: res.data.msg,
          type: "success",
          duration: "1000",
          onClose() {
            that.$store.commit("CHANGE_SID", that.form.sid);
            switch (that.shop_type) {
              /** 1是邦保养加盟,跳转支付系统使用费**/
              case "1":
                // that.$router.push({
                //   path: "/Unpaid",
                //   query: { sid: that.form.sid }
                // });
                that.$router.push({
                  path: "/perfect_information",
                  query: { sid: that.form.sid }
                });
                break;
              /** 2. 车管家合作小程序注册首先去完善信息**/

              case "2":
                that.$router.push({
                  path: "/register/complate",
                  query: { sid: that.form.sid }
                });
                break;
            }
          }
        });
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  mounted() {
    this.getBank();
  }
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
  & > div {
    border-bottom: 1px solid #e5e5e5;
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