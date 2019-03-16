<template>
  <div class="payment">
    <p class="col-32373C ft-36">{{QR_codeData.title}}</p>
    <div class="QR_code">
      <div class="QR">
        <img :src="QR_codeData.QR">
      </div>
      <div class="col-FF2828 ft-24">{{QR_codeData.money}}</div>
      <div class="ft-14">{{QR_codeData.Tips}}</div>
      <div>
        <el-button @click="getStatus">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GET_QRCode,
  GET_Status,
  createcode,
  getAuthStatus
} from "@/server/serverData";
export default {
  data() {
    return {
      QR_codeData: {},
      shop_type: window.sessionStorage.getItem(
        "shop_type"
      ) /** 获取用户,选择的那个店铺 1-邦保养加盟 2-车管家合作小程序 **/
    };
  },
  methods: {
    async QR_code() {
      //获取二维码
      try {
        /** 二维码的两种状态如果用户选择了邦保养加盟则调用支付系统使用费二维码接口,否则调用小程序二维码接口 **/
        let res =
          this.shop_type == 1
            ? await GET_QRCode(this.$route.query.sid)
            : await createcode({ sid: this.$route.query.sid });
        if (res.code == 1 || res.data.code == 1) {
          console.log(123);
          this.QR_codeData = {
            Tips: res.data.bottom || res.data.data.bottom,
            money: res.data.detail,
            QR: res.data.src || res.data.data.src,
            title: res.data.title || res.data.data.title
          };
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getStatus() {
      //查看用户支付信息,支付完成后 完善信息

      try {
        /** 查看用户支付后的支付状态,shop_type=1是支付系统使用费 shop_type=2 进入小程序激活之后 **/
        let res =
          this.shop_type == 1
            ? await GET_Status(this.$route.query.sid)
            : await getAuthStatus({ sid: this.$route.query.sid });
        if (res.code == 1 || res.data.code == 1) {
          switch (this.shop_type) {
            case "1":
              if (res.data.status == 1) {
                var that = this;
                this.$message({
                  message: res.data.detail,
                  type: "success",
                  onClose() {
                    window.sessionStorage.setItem("token", res.data.token);
                    that.$router.push({ path: "/perfect_information" });
                  }
                });
              } else {
                this.$message.error(res.data.detail);
              }
              break;
            case "2":
              var that = this;
              this.$message({
                message: res.data.msg,
                type: "success",
                onClose() {
                  that.$router.push({ path: "/home" });
                }
              });
              break;
          }
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.QR_code();
  }
};
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.payment {
  text-align: center;

  padding-top: 87px;
  .QR_code {
    width: 62%;
    background-color: white;
    margin: 30px auto 0 auto;
    padding: 87px;
    .QR {
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > div {
      margin-top: 10px;
    }
    & > div:first-child {
      width: 270px;
      height: 270px;
      background-color: #ccc;
      margin: auto;
    }
  }
}
</style>