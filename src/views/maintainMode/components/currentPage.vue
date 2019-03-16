<template>
  <div  class='currentPage'>
    <div class='current'>
      <div class="currentPath">
        <router-link tag='span' :to='item.path' v-for='item of this.$route.meta.current' >{{item.name}}</router-link> 
      </div>
      <p class=' col-64696E'>帮助文档</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.currentPage {
  position: absolute;
  top: 55px;
  width: 100%;
  height: 50px;
  background-color: #ebedf0;
  .current {
    height: 100%;
    box-sizing: border-box;
    padding: 0 50px 0 30px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .currentPath {
      font-size: 12px;
      font-weight: 400;
      color: rgba(52, 152, 233, 1);
      line-height: 17px;
      span{
        cursor: pointer;
      }
    }
    .currentPath>span:last-child {
      color: #64696e;
    }
  }
}
</style>