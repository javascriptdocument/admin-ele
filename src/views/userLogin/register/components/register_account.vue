<template>
  <div class="register_account">
    <div class="main">
      <h2>注册账号</h2>
      <div class="from">
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "registerAccount",
  computed: {
    ...mapState(["login_title"])
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.register_account {
  height: 100%;
  position: relative;
  .main {
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
      // height: 530px;
      background-color: white;
      box-shadow: 0px 0px 8px 0px rgba(100, 145, 190, 0.6);
      border-radius: 5px;
    }
  }
}
</style>