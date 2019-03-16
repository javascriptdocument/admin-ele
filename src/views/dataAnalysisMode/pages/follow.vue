<template>
  <div class="bottomBox">
    <div class="leftChart">
      <div class="chartTitle">
        <selectLink></selectLink>
        <el-dropdown @command="selectInterval">
          <span class="el-dropdown-link">
            {{selectName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='{"value":"1","name":"日"}'>日</el-dropdown-item>
            <el-dropdown-item command='{"value":"2","name":"月"}'>月</el-dropdown-item>
            <el-dropdown-item command='{"value":"3","name":"近三天"}'>近三天</el-dropdown-item> 
            <el-dropdown-item command='{"value":"4","name":"近七天"}'>近七天</el-dropdown-item> 
            <el-dropdown-item command='{"value":"6","name":"自定义"}'>自定义</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker v-show="custom" v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期" @change="reloadData" 
          :picker-options="pickerFastOptions" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <lineChart :lineData='technicianOpt'></lineChart>
    </div>
    <div class="rightChart">
      <div class="chartTitle"> 
      </div>
      <el-table :data="tableData">
        <el-table-column prop="head_pic" label="" width="60">
          <template slot-scope="scope">
            <img class="headImg" :src="scope.row.head_pic" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="110">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="110">
        </el-table-column>
        <el-table-column prop="type" label="车型" width="">
        </el-table-column>
        <el-table-column prop="plate" label="车牌号" width="90">
        </el-table-column>
        <el-table-column prop="sale_time" label="时间">
        </el-table-column>
      </el-table>  
      <el-pagination layout="pager"  class="pagenation" @current-change="userList" v-show='totalPage>1' :current-page.sync="currentPage" :page-count=totalPage>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import selectLink from "../components/selectLink.vue";
import lineChart from "../components/lineChart.vue";
import { attentLineD, userListD } from "@/server/serverData";
export default {
  data() {
    return {
      lineData: "",
      tableData: [], 
      totalPage: 1,
      currentPage:'',

      selectName: "日",
      selectValue: "1",
      custom: false,

      intervalTime: "",
      pickerFastOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    technicianOpt() {
      var that = this;
      let option = {
        textStyle:{
          color:'#fff'
        },
        legend:{
          show: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "0",
          right: "5%",
          bottom: "5%",
          top: "20%",
          // show: true,
          containLabel: true
        },
        xAxis: { 
          axisLabel:{
            show: true, 
            interval: 0,
            rotate:45,
          },
          axisTick: {
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'#014D8B'
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
              color:'#014D8B'
            }
          },
          color: '#FFF',
          type: "category",
          data: that.lineData.day
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine:{
            lineStyle:{
              color:'#014D8B'
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
              color:'#014D8B'
            }
          },
          type: "value"
        },
        series: [
          {
            color: "#00FF38",
            name: "关注度",
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#00ff38",
                  width: 4
                }
              }
            },
            lineStyle: {
              color: "#00ff38",
              width: 4
            },
            areaStyle: {
              normal: {
                opacity: 0.0
              }
            },
            data: that.lineData.data
          }
        ]
      };
      return option;
    }
  },
  components: {
    lineChart,
    selectLink
  },
  methods: {
    selectInterval(command) {
      command = JSON.parse(command);
      this.selectName = command.name;
      this.selectValue = command.value;
      if (command.value != 6) {
        this.intervalTime = "";
        this.custom = false;
        this.attentLine();
      } else {
        this.custom = true;
      }
    },
    reloadData() {
      this.attentLine();
    },
    async attentLine() {
      let startTime, endTime;
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }
      let res = await attentLineD(this.selectValue, startTime, endTime);
      if (res.data.code == 1) {
        this.lineData = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async userList() {
      let res = await userListD(this.currentPage);
      if (res.data.code == 1) {
        this.tableData = res.data.data.list;
        this.totalPage = res.data.data.rows;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.attentLine();
    this.userList();
  }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.bottomBox {
  min-height: 340px;
  margin-top: 20px;
  width: calc(100% - 10px);
  background-color: rgba(0, 48, 85, 0.3);
  padding: 20px 30px;
  box-sizing: border-box;
}
.bottomBox > div {
  float: left;
  height: 340px;
  width: 50%;
  min-width: 465px;
}
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
.pagenation {
  display: flex;
  justify-content: center;
}
.rightChart {
  /deep/ .el-table,
  .el-table__expanded-cell {
    color: #52b2ff;
    background: transparent;
    width: 95%;
    margin-left: 3%;
    font-size: 12px;
    * {
      background: transparent;
      border-color: #014d8b;
    }
  }
  /deep/ .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #014d8b;
  }
  /deep/ .el-table thead {
    color: #fff;
  }
  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: transparent;
  }
  /deep/ .el-table td, .el-table th{
    padding: 8px 0;
  }
  /deep/ .el-pagination {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    .el-pager {
      z-index: 100;
      li {
        background: transparent;
      }
    }
  }
  .headImg {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.el-input__inner {
  background: transparent;
  height: 25px;
  /deep/ .el-input__icon,
  /deep/ .el-range-separator {
    color: #fff;
    height: auto;
  }
  /deep/ input {
    background-color: transparent;
    color: #fff;
  }
}
</style>