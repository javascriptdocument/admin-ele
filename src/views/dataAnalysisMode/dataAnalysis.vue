<template>
    <div class='dataAnalysis'>
        <header class='header'>
          <Head :isShow='true'></Head>
        </header>
        <div class="dataMain">
          <span class="help">
             <el-tooltip class="item" effect="dark" content="遇到问题 ？点击查看帮助文档" placement="left">
                   <el-button type='text' @click='file'>帮助文档</el-button>
               </el-tooltip>
          </span>
          <div class="dataHead" >数据分析</div>
          <div class="dataBody">
            <img class="topImg leftImg" src="./images/leftTop.png" alt="">
            <img class="bottomImg leftImg" src="./images/leftBottom.png" alt="">
            <img class="topImg rightImg" src="./images/rightTop.png" alt="">
            <img class="bottomImg rightImg" src="./images/rightBottom.png" alt="">
            <span class="dataTitle">{{currentDate}}</span>
            <el-row class="fourBox" :gutter="10">
              <el-col :span="6"><div class="gridItem "><squareData @select="sqrSelect1" :sqrData='sqr1Data' :sname="s1Name"></squareData></div></el-col>
              <el-col :span="6"><div class="gridItem "><squareData @select="sqrSelect2" :sqrData='sqr2Data' :sname="s2Name"></squareData></div></el-col>
              <el-col :span="6"><div class="gridItem "><squareData @select="sqrSelect3" :sqrData='sqr3Data' :sname="s3Name"></squareData></div></el-col>
              <el-col :span="6"><div class="gridItem "><squareData @select="sqrSelect4" :sqrData='sqr4Data' :sname="s4Name"></squareData></div></el-col>
            </el-row>
            <router-view/>
          </div>
        </div>
      <div style='display: none' ref='laybox' class='doc-laybox'>
        <div v-html='laycontent'></div>
      </div>
    </div>

</template>
<script>
import Head from "@/views/common/header";
import squareData from "./components/squareData.vue";
import {
  getTablePricD,
  cardShareD,
  attentShareD,
  shareD,
  file
} from "@/server/serverData";
export default {
  data() {
    return {
      currentDate:'',
      laycontent:'',
      sqr1Data: { total: 0, detail: { count: 0, percent: 0 } },
      s1Name: {
        title1: "总收入(元)",
        title2: "今日收入(元)",
        title3: "昨日",
        list: [
          { id: 1, name: "今日收入(元)" },
          { id: 2, name: "本周收入(元)" },
          { id: 3, name: "本月收入(元)" }
        ]
      },
      sqr2Data: { total: 0, detail: { count: 0, percent: 0 } },
      s2Name: {
        title1: "关注度",
        title2: "今日关注",
        title3: "昨日",
        list: [
          { id: 1, name: "今日关注" },
          { id: 2, name: "本周关注" },
          { id: 3, name: "本月关注" }
        ]
      },
      sqr3Data: { total: 0, detail: { count: 0, percent: 0 } },
      s3Name: {
        title1: "总购卡数",
        title2: "今日购卡",
        title3: "昨日",
        list: [
          { id: 1, name: "今日购卡" },
          { id: 2, name: "本周购卡" },
          { id: 3, name: "本月购卡" }
        ]
      },
      sqr4Data: { total: 0, detail: { count: 0, percent: 0 } },
      s4Name: {
        title1: "总物料消耗(L)",
        title2: "今日消耗(L)",
        title3: "昨日",
        list: [
          { id: 1, name: "今日消耗(L)" },
          { id: 2, name: "本周消耗(L)" },
          { id: 3, name: "本月消耗(L)" }
        ]
      }
    };
  },
  methods: {
    /** 打开帮助文档 **/
   async file(){
      try {
        let res = await file({
          d_id:209
        })
        if(res.code==1){
          this.laycontent=window.etos(res.data.content);
        }
        layer.open({
          type:1,
          title:'帮助文档',
          content:jQuery('.doc-laybox')
        })
      }catch (err){
        console.log(err)
      }
    },
    // 总收入
    async sqrSelect1(number) {
      let res = await getTablePricD(number);
      if (res.data.code == 1) {
        this.sqr1Data = res.data.data;
        this.currentDate=res.data.data.date
        if (number == 1) {
          this.s1Name.title2 = "今日收入(元)";
          this.s1Name.title3 = "昨日";
        } else if (number == 2) {
          this.s1Name.title2 = "本周收入(元)";
          this.s1Name.title3 = "上周";
        } else if (number == 3) {
          this.s1Name.title2 = "本月收入(元)";
          this.s1Name.title3 = "上月";
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 关注度
    async sqrSelect2(number) {
      let res = await attentShareD(number);
      if (res.data.code == 1) {
        this.sqr2Data = res.data.data;
        if (number == 1) {
          this.s2Name.title2 = "今日关注";
          this.s2Name.title3 = "昨日";
        } else if (number == 2) {
          this.s2Name.title2 = "本周关注";
          this.s2Name.title3 = "上周";
        } else if (number == 3) {
          this.s2Name.title2 = "本月关注";
          this.s2Name.title3 = "上月";
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 总购卡
    async sqrSelect3(number) {
      let res = await cardShareD(number);
      if (res.data.code == 1) {
        this.sqr3Data = res.data.data;
        if (number == 1) {
          this.s3Name.title2 = "今日购卡";
          this.s3Name.title3 = "昨日";
        } else if (number == 2) {
          this.s3Name.title2 = "本周购卡";
          this.s3Name.title3 = "上周";
        } else if (number == 3) {
          this.s3Name.title2 = "本月购卡";
          this.s3Name.title3 = "上月";
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 物料消耗
    async sqrSelect4(number) {
      let res = await shareD(number);
      if (res.data.code == 1) {
        this.sqr4Data = res.data.data;
        if (number == 1) {
          this.s4Name.title2 = "今日消耗(L)";
          this.s4Name.title3 = "昨日";
        } else if (number == 2) {
          this.s4Name.title2 = "本周消耗(L)";
          this.s4Name.title3 = "上周";
        } else if (number == 3) {
          this.s4Name.title2 = "本月消耗(L)";
          this.s4Name.title3 = "上月";
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.sqrSelect1();
    this.sqrSelect2();
    this.sqrSelect3();
    this.sqrSelect4();
  },
  components: {
    Head,
    squareData
  }
};
</script>
<style lang="scss" scoped>
.dataAnalysis {
  .header {
    position: fixed;
    z-index: 999;
  }
  .dataMain {
    box-sizing: border-box;
    padding: 55px 0 0;
    min-height: 100vh;
    width: 100%;
    background-image: url("./images/background.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .help {
      position: absolute;
      top: 60px;
      right: 60px;
      color: #fff;
      opacity: 0.7;
      cursor: pointer;
      font-size: 12px;
      /deep/ .el-button--text{
                color: #fff;
             }
    }
    .dataHead {
      margin-top: 50px;
      height: 44px;
      max-width: 1660px;
      width: 100%;
      text-align: center;
      line-height: 44px;
      font-size: 30px;
      font-weight: 600;
      color: #fff;
      background-image: url("./images/headImg.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1660px 44px;
    }
    .dataBody {
      margin-top: 40px;
      max-width: 100%;
      width: 1500px;
      min-width: 80%;
      min-height: 630px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      padding: 30px;
      img {
        position: absolute;
      }
      .topImg {
        top: 0;
      }
      .bottomImg {
        bottom: 0;
      }
      .leftImg {
        left: 0;
      }
      .rightImg {
        right: 0;
      }
      .dataTitle {
        margin: -35px auto 0;
        font-size: 18px;
        font-weight: 400;
        color: #fff;
      }
      .fourBox {
        min-height: 180px;
        margin-top: 30px;
        width: 100%;
        div {
          height: 180px;
          min-width: 250px;
          .gridItem {
            height: 180px;
            width: 100%;
            background-color: rgba(0, 48, 85, 0.3);
          }
        }
      }
    }
  }
}

</style>
<style scoped>
.el-dropdown-menu{
  background-color: rgba(0, 48, 85, 0.8);
  border: 1px solid rgba(0, 48, 85, 0.8);
}
.el-dropdown-menu__item{
  color: #fff;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(0, 48, 85, 1);
  color: #2b60ff;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgba(0, 48, 85, 0.8);
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(0, 48, 85, 0.8);
}
</style>
<style>
  .layui-layer{
    width: 100% !important;
    height: 100%;

  }
  .layui-layer-content{
    margin-left: 10%;
    text-align: left;
  }
  .layui-layer-title{
    text-align: center;
  }
</style>
