<template>
  <div class="bottomBox">
    <div class="leftChart">
      <div class="chartTitle">
        <selectLink></selectLink>
      </div>
      <pieChart :pieData="fundOpt"></pieChart>
    </div>
    <div class="rightChart">
      <div class="chartTitle">
        <span>物料消耗</span>
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
  </div>
</template>
<script>
import selectLink from "../components/selectLink.vue";
import lineChart from "../components/lineChart.vue";
import pieChart from "../components/pieChart.vue";
import { materialD, materialLineD } from "@/server/serverData";
export default {
  data() {
    return {
      selectName: "日",
      selectValue: "1",
      custom: false,
      lineData: "",
      pieData: {
        detail: [{ name: "", value: "" }],
        total: [{ name: "", value: "" }]
      },
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
    fundOpt() {
      let that = this;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}"
        },
        calculable: false, //拖拽
        series: [
          {
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c}"
            },
            type: "pie",
            hoverAnimation: false, //鼠标滑过动画
            selectedOffset: 0,
            legendHoverLink: false,
            selectedMode: "single",
            radius: [0, "30%"], // 图形的大小
            color: ["#00FF38"], // 图形的颜色
            label: {
              position: "center",
              formatter: "{b}\n{c}",
              color: "#004F11",
              fontSize: 12,
              lineHeight: 18,
              rich: {}
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: that.pieData.total
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            color: ["#801FDE", "#FF6E6E", "#2B60FF", "#FF3CCD"],
            label: {
              normal: {
                position: "inside",
                formatter: "{d}%",
                borderWidth: 1,
                rich: {
                  a: {
                    color: "#333",
                    lineHeight: 22,
                    align: "center"
                  },
                  abg: {
                    backgroundColor: "#333",
                    width: "100%",
                    align: "right",
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                  },
                  hr: {
                    borderColor: "#333",
                    width: "100%",
                    borderWidth: 0.3,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#333",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: that.pieData.detail
          }
        ]
      };
      return option;
    },
    technicianOpt() {
      var that = this;
      let option = {
        textStyle: {
          color: "#fff"
        },
        legend: {
          show: false
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
          color: "#FFF",
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
            name: "物料消耗",
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
    pieChart,
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
        this.materialLine();
      } else {
        this.custom = true;
      }
    },
    reloadData() {
      this.materialLine();
    },
    async material() {
      let res = await materialD();
      if (res.data.code == 1) {
        this.pieData = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async materialLine() {
      let startTime, endTime;
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }
      let res = await materialLineD(this.selectValue, startTime, endTime);
      if (res.data.code == 1) {
        this.lineData = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.material();
    this.materialLine();
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