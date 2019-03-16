<template lang="html">
  <div class="maintainMode">
			<side></side>
			<div class="main">
			   	<heaDer />
			</div>
      <div class="main">
          <!-- <model-head class="smallHeader"></model-head> -->
          <current-page class='currentPage' :id='this.$route.meta.id' ></current-page>
          <div class="mainBody">
             <router-view />
          </div>
      </div>
  </div>
</template>

<script>
import heaDer from "@/views/common/Small_header";
import currentPage from "@/views/common/currentPage";
import side from "./components/slider";
export default {
	components:{
		heaDer,side,currentPage
	}
}
</script>

<style lang='scss' scoped>
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
