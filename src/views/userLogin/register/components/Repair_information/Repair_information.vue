<template>
  <div class="Repair_information">
    <div class="step">
      <ul>
        <li>
          <a href="javascript:;">1.登录信息</a>
        </li>
        <li>2.支付费用</li>
        <li class="col-919">3.基本信息</li>
      </ul>
    </div>
    <div class="form">
      <el-form class="inform" v-if="shop_type == 1">
        <p>{{coded.Tips}}</p>
        <table
          style="height: 150px;width: 150px;"
          v-loading="loading"
          element-loading-text="二维码加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :hidden="!loading"
        ></table>
        <img id="codeimg" style="height: 150px;width: 150px;" :src="coded.QR" alt :hidden="loading">
        <p>{{coded.money}}</p>
        <p>{{coded.msg}}</p>
      </el-form>
      <el-form class="inform" v-if="shop_type == 2">
        <p>{{coded.Tips}}</p>
      </el-form>
    </div>
    <div class="next-step">
      <div>
        <!--<router-link to="/register/Putforward_information" tag='button' class='next'>下一步</router-link>-->
        <el-button type="primary" class="next" :disabled="nextVisible" @click="NextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  regTwo,
  deleteInfo,
  GET_QRCode,
  GET_Status
} from "@/server/serverData";
export default {
  name: "RepairInformation",
  data() {
    return {
      sid: this.$route.query.sid,
      coded: {
        Tips: "",
        money: "",
        count: "",
        QR: "",
        title: ""
      },
      loading: true
    };
  },
  computed: {
    nextVisible() {
      let state = false;
      return state;
    },
    shop_type() {
      return window.sessionStorage.getItem("shop_type");
    }
  },
  methods: {
    /** 清楚无效数据 **/
    //            async clearInfo(){
    //                 try {
    //                     let res = await deleteInfo()
    //                 }catch (err){
    //                     console.log(err)
    //                 }
    //             },
    /** 下一步操作 **/

    async NextStep() {
      // 判断有没有支付完成
      if (this.shop_type == 2) {
        this.$router.push({
          path: "/register/Putforward_information",
          query: {
            sid: this.sid,
            shop_type: this.shop_type
          }
        });
        return;
      }
      let res = await GET_Status(this.$route.query.sid);
      console.log(res);
      if (res.code == 1) {
        if (res.data.status == 1) {
          var that = this;
          this.$message({
            message: res.data.detail,
            type: "success",
            onClose() {
              that.$router.push({
                path: "/register/Putforward_information",
                query: {
                  sid: that.sid,
                  shop_type: that.shop_type
                }
              });
            }
          });
        } else {
          this.$message.error(res.data.detail);
        }
      }
      //   let res = await regTwo(this.form);
      //   if (res.data.code == 1) {
      //     var that = this;
      //     console.log(res.data.data);
      //     this.$message({
      //       message: res.data.msg,
      //       type: "success",
      //       duration: "1000",
      //       onClose() {
      //         that.$router.push({
      //           path: "/register/Putforward_information",
      //           query: {
      //             sid: that.form.sid,
      //             shop_type: that.$route.query.shop_type
      //           }
      //         });
      //       }
      //     });
      //   } else {
      //     this.$message.error(res.data.msg);
      //   }
    },
    async QR_code() {
      //获取支付二维码
      let res = await GET_QRCode(this.$route.query.sid, this.shop_type);
      console.log(res);
      if (this.shop_type == 1) {
        if (res.code == 1) {
          this.coded = {
            Tips: res.data.bottom,
            count: res.data.count,
            money: res.data.detail,
            QR: res.data.src,
            msg: res.data.msg,
            title: res.data.title
          };
          document.getElementById("codeimg").onload = () => {
            this.loading = false;
          };
        }
      } else if (this.shop_type == 2) {
        if (res.code == 1) {
          this.coded = {
            Tips: res.data
          };
        }
      }
    }
  },
  mounted() {
    this.QR_code();
  }
  //    activated(){
  //        this.clearInfo()
  //    }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.Repair_information {
  padding: 40px 46px;
}
.step {
  position: relative;
  width: 100%;
  height: 40px;
  background-image: url("../../public/login/step2.png");
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
.form {
  .inform {
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    & > img {
      margin-bottom: 10px;
    }
    & > p {
      margin-bottom: 10px;
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