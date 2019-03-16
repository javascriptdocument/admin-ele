<template>
  <div class="squareData">  
    <div class="leftData">
        <span class="spanLabel">{{sname.title1}}</span>
        <span class="mainValue">{{sqrData.total}}</span>
        <el-dropdown @command="handleCommand" class="spanLabel">
            <span class="el-dropdown-link">
                {{sname.title2}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='item.id' v-for="item in sname.list">{{item.name}}</el-dropdown-item> 
            </el-dropdown-menu>
        </el-dropdown>
        <span class="selectedValue">{{sqrData.detail.count}}</span>
    </div>
    <div class="rightData">
        <div class="rbBox" v-show="sqrData.detail.percent < 0"><img src="../images/decrease.png" alt=""><span style="color:#fff;">较{{sname.title3}}降低{{percent}}%</span></div>
        <div class="rbBox" v-show="sqrData.detail.percent >= 0"><img src="../images/increase.png" alt=""><span style="color:#00FF38">较{{sname.title3}}增长{{percent}}%</span></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    percent() {
      return Math.abs(this.sqrData.detail.percent);
    }
  },
  props: ["sqrData", "sname"],
  methods: {
    async handleCommand(command) {
      this.$emit("select", command);
    }
  },
  watch: {}
};
</script> 
<style lang="scss" scoped>
.squareData {
  margin: 0 auto;
  height: 250px;
  box-sizing: border-box;
  padding: 15px 5px;
  max-width: 100%;
  width: 300px;
  min-width: 250px;
  display: flex;
  justify-content: space-between;
  .leftData {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .spanLabel {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(82, 178, 255, 1);
      line-height: 20px;
    }
    .mainValue {
      height: 41px;
      font-size: 36px;
      color: rgba(0, 255, 56, 1);
      line-height: 42px;
    }
    .selectedValue {
      height: 28px;
      font-size: 20px;
      font-weight: 400;
      color: #fff;
      line-height: 28px;
    }
  }
  .rightData {
    display: flex;
    flex-flow: row wrap;
    .rbBox {
      height: 25px;
      display: flex;
      align-items: center;
      align-self: flex-end;
      img {
        display: block;
        margin-right: 7px;
      }
      span { 
        height: 17px;
        font-size: 12px; 
        font-weight: 400; 
        line-height: 17px;
      }
    }
  }
}
</style>

