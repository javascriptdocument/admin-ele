<template>
  <div class="pieChart">  
    <div class="pie-chart" id="pie-chart">
    </div>
    <div class="pie-chart" id="pie-chart2" v-if="pieData2">
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      myChart: {},
      myChart1: {}
    };
  },
  props: ["pieData", "pieData2"],
  methods: {
    setFundEchart() {
      this.myChart = echarts.init(document.getElementById("pie-chart"));
      this.myChart.setOption(this.pieData, true);
      this.myChart.resize();
      this.myChart.on("click", this.chartEvent); 
      if (this.pieData2 != "") {
        this.myChart1 = echarts.init(document.getElementById("pie-chart2"));
        this.myChart1.setOption(this.pieData2, true);
        this.myChart1.resize(); 
      }
    },
    chartEvent(param) {
      this.$emit("clickChart", param);
    }
  },
  mounted: function() {
    var that = this;
    that.setFundEchart();
    window.onresize = function() {
      that.setFundEchart();
    };
  },
  watch: {
    pieData: function() {
      this.setFundEchart();
    },
    pieData2: function() {
      this.setFundEchart();
    }
  }
};
</script> 
<style lang="scss" scoped>
.pieChart {
  float: left;
  height: 320px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .pie-chart {
    height: 320px;
    width: 100%;
  }
}
.pie {
  width: 100%;
  height: 100%;
}
</style>

