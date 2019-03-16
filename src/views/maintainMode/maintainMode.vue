<template>
    <div class='maintainMode'>
        <sidebar></sidebar>
        <div class="main">
            <model-head class="smallHeader"></model-head>
            <current-page class='currentPage' :id='this.$route.meta.id' ></current-page>

            <div class="mainBody">
               <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import sidebar from "./components/sidebar";
import currentPage from "@/views/common/currentPage";
import modelHead from "../common/Small_header";
export default {
  name: "maintain",
  components: {
    sidebar,
    currentPage,
    modelHead
  }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
   .currentPage{
      margin: 60px 50px 0 30px !important;
    }
.header {
  width: calc(100% - 160px);
  height: 55px;
  position: fixed ;

}
.maintainMode {
  height: calc(100% - 55px);
  .sidebar {
    width: 160px;
  }
  .main {
    width: calc(100% - 160px);
    height: 100vh;
    position: absolute;
    left: 160px;
    .smallHeader {
      position: fixed;
    }
    .mainBody {
      width: 100%;
      min-height: calc(100vh - 105px);
      position: absolute;
      top: 105px;
      background-color: #fff; 
    }
  }
}
</style>