<template>
  <div class="abolish">
    <Head :isShow="true" class="header"></Head>
    <currentPage class="currentPage" :id="140"></currentPage>
    <abolishContent></abolishContent>
  </div>
</template>
<script>
import Head from "@/views/common/header";
import currentPage from "@/views/common/currentPage";
import abolishContent from './components/abolish_content'
export default {
  name: "abolish",
  components: {
    Head,
    currentPage,
    abolishContent
  }
};
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.abolish {
  height: 100%;
  overflow: auto;
  background-color: #ebedf0;
  position: relative;
  .header {
    position: fixed;
    top: 0;
  }
  .currentPage {
    padding: 73px 60px 0 60px;
  }
}
</style>