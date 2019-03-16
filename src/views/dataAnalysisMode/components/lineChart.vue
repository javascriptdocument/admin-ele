<template>
  <div style="width: 100%;">
    <div class="line-chart" id="line-chart">
    </div> 
  </div>
</template> 
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  props: ["lineData"], 
  methods: {
    setLineChart() { 
      this.myChart = echarts.init(document.getElementById("line-chart"));
      this.myChart.setOption(this.lineData, true);
      this.myChart.resize();
    }
  },
  watch: {
    lineData: function() {
      this.setLineChart();
    }
  },
  mounted: function() {
    var that = this;
    that.setLineChart();
    window.onresize = function() {
      that.setLineChart();
    };
  }
};
</script> 
<style scoped>
.line-chart {
  height: 320px;
}
</style>

