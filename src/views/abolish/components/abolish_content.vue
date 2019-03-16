<template>
  <div class="abolish_content">
    <p class="col-32373C ft-36 title">取消合作</p>
    <div class="input_content">
      <div>
        <p>
          <span>取消理由</span>
        </p>
        <p>
          <el-input
            type="textarea"
            class="textarea"
            :autosize="{ minRows: 5, maxRows: 5}"
            v-model="reason"
            placeholder="请输入取消合作理由"
          ></el-input>
        </p>
        <p class="col-FF2828">注意：请慎重考虑</p>
        <p>
          <el-button type="primary" @click="submit">取消合作</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { abolish } from "@/server/serverData";
export default {
  data() {
    return {
      reason: ""
    };
  },
  methods: {
    /** 提交反馈 **/
    async submit() {
      let res = await abolish(this.reason);
      console.log(res);
      if (res.data.code == 1) {
        let that = this;
        this.$message({
          message: res.data.msg,
          type: "success",
          duration: 1500,
          onClose: () => {
            that.reason = "";
          }
        });
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
};
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.abolish_content {
  text-align: center;
  .title {
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
  .input_content {
    width: 62%;
    background-color: white;
    margin: 30px auto 0 auto;
    padding-top: 54px;
    & > div {
      width: 70%;
      margin: 0 auto;
      & > p:first-child {
        margin-bottom: 20px;
      }
      & > p {
        margin-bottom: 10px;
        button {
          margin-top: 30px;
          width: 40%;
          margin-bottom: 66px;
        }
      }
    }
  }
}
</style>