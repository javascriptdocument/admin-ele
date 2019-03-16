<template>
  <el-dropdown @command="linkToRoute">
    <span class="el-dropdown-link" >
      {{this.$route.meta.name}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command='{"url":"fund","name":"资金"}'>资金</el-dropdown-item>
      <el-dropdown-item command='{"url":"follow","name":"关注度"}'>关注度</el-dropdown-item>
      <el-dropdown-item command='{"url":"purchases","name":"车主"}'>车主</el-dropdown-item>
      <el-dropdown-item command='{"url":"materielReduce","name":"物料消耗"}'>物料消耗</el-dropdown-item>
      <el-dropdown-item command='{"url":"materielAdd","name":"物料补充"}'>物料补充</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> 
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {  
    ...mapState(['selectLink'])
  },
  methods: {
    linkToRoute(command) {
      command = JSON.parse(command);
      this.$router.push({ path: command.url });
    }
  },
  mounted() {  
  }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.chartTitle {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  span {
    color: #fff;
    margin-right: 50px;
  }
}
span {
    color: #fff;
    margin-right: 50px;
  }
</style>

