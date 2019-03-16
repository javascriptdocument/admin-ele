<template>
  <div class="Submit">
    <div class="details">
      <div class="ft-24 col-32373C">
        <img src="../images/Submit_state.png">
        <p>注册成功</p>
      </div>
      <div class="Well">
        <el-button type="primary" @click="$router.push('/login')">点击登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    };
  }
};
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.Submit {
  text-align: center;
  padding-top: 137px;
  .details {
    width: 62%;
    background-color: white;
    margin: 30px auto 0 auto;
    padding: 81px 0 113px 0;
    .Well {
      margin-top: 47px;
      button {
        width: 30%;
      }
    }
  }
}
</style>