<template>
    <div class='maintain'>
        <sidebar></sidebar>
        <div class="main">
            <model-head></model-head>
            <div>
               <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import sidebar from "./components/sidebar";
import modelHead from "../common/header";
export default {
  name: "memberMode",
  components: {
    sidebar,
    modelHead
  }
}
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.maintain {
  height: 100%;
  .sidebar {
    width: 160px;
    float: left;
  }
  .main {
    width: calc(100% - 160px);
    height: 100vh;
    float: left;
  }
}
</style>