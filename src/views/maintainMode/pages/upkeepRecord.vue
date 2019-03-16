<template>
    <div class="member"> 
        <div class="viewMain"> 
          <div class="secondBody">
            <el-form class="filterCondition demo-form-inline" ref="form" :inline="true" label-width="80px"> 
                <el-input placeholder="车牌号" v-model="keyword" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;" @click="getListData">搜索</el-button>
                </el-input>
                <el-form-item label="订单时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="dataChange" 
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}"> 
              <el-table-column prop="odd_number" label="订单编号" align="center" >
              </el-table-column>
              <el-table-column prop="plate" label="车牌号" align="center"  >
              </el-table-column>
              <el-table-column prop="cate_name" label="车型" align="center" >
              </el-table-column>
              <el-table-column prop="create_time" label="保养时间" align="center" >
              </el-table-column>  
              <el-table-column prop="oil" label="用油名称" align="center">
              </el-table-column>
              <el-table-column prop="the_mileage" label="保养里程(KM)" align="center" >
              </el-table-column>
              <el-table-column prop="litre" label="用油升数" align="center" >
              </el-table-column>
              <el-table-column prop="filter" label="滤芯补贴(元)" align="center" >
              </el-table-column>
              <el-table-column prop="hour_charge" label="工时费(元)" align="center" >
              </el-table-column> 
              <el-table-column prop="total" label="费用合计(元)" align="center"> 
              </el-table-column> 
            </el-table>
            <div class="altogether">
                <span class='col-3498E9'>{{total}}</span>
            </div>
            <el-pagination class="page" background layout="prev, pager, next" 
              @current-change="getListData" :current-page.sync="currentPage" :page-count=totalpage >
            </el-pagination>
          </div>
        </div>  
    </div>
</template>
<script>
import { upkeepRecord } from "@/server/serverData";
export default { 
  data() {
    return {
      // 车牌号关键字
      keyword: "",
      // 当前页
      currentPage:0,
      // 总页数
      totalpage: 1,
      // 表格数据
      tableData: [],
      // 右小角总数
      total: "",
      // 选择完成的时间
      intervalTime: '',
      // intervalTime: [
      //   new Date().getTime() - 3600 * 1000 * 24 * 7,
      //   new Date().getTime()
      // ],
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
  methods: {
    dataChange() {
      this.getListData();
    },
    async getListData() {
      let startTime, endTime;
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }  
      let res = await upkeepRecord(
        this.keyword,
        this.currentPage,
        startTime,
        endTime
      );
      if (res.data.code == 1) {
        console.log(res)
        this.tableData = res.data.data.list;
        this.totalPage = res.data.data.rows;
        this.total = res.data.data.total;
      } else {
        this.tableData = [];
        this.totalPage = 1;
        this.total = res.data.data.total;
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      } 
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>
<style lang="scss" scoped>
  /deep/ .el-input-group__append, .el-input-group__prepend{
    background-color: #3498E9;
    border: none;
    color: white;
  }
.member {
  min-height: calc(100vh - 105px);
  background-color: #ebedf0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 100px;
  overflow: hidden;
  .viewMain {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    .secondBody {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-top: 2px solid #b9c3cd;
      .filterCondition {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
      }
      .altogether {
        margin-top: 30px;
        height: 30px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 50px;
        line-height: 30px;
      }
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
}
.col-FF2828 {
  color: #ff2828;
}
</style>
<style>
.el-breadcrumb__inner {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
}
.el-breadcrumb__inner.is-link {
  color: #3498e9;
}
</style>


