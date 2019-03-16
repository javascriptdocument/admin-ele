<template>
    <div class="member">
        <div class="viewMain">
          <div class="secondBody">
            <el-form class="filterCondition demo-form-inline" ref="form" :inline="true" label-width="80px">
                <el-input placeholder="车主姓名" v-model="keyword" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;" @click="getMemberList">搜索</el-button>
                </el-input>
                <el-form-item label="购卡时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="getMemberList"
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="状态" style="margin-bottom: 0;">
                  <el-select v-model="status" @change="getMemberList" placeholder="请选择活动区域" style="width: 100px;">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="会员" value="1"></el-option>
                    <el-option label="非会员" value="2"></el-option>
                  </el-select>
                </el-form-item>  -->
                <el-form-item label="购卡类型" style="margin-bottom: 0;">
                  <el-select v-model="cardType" @change="getMemberList" placeholder="请选择活动区域" style="width: 100px;">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="单次" value="1"></el-option>
                    <el-option label="套餐" value="4"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
              <el-table-column prop="car_pic" label="车辆照片" align="center" >
                <template slot-scope="scope">
                  <img class="tableImg" :src="scope.row.car_pic" alt="">
                </template>
              </el-table-column>
              <el-table-column prop="plate" label="车牌号" align="center"  >
              </el-table-column>
              <el-table-column prop="car_type" label="车型" align="center" >
              </el-table-column>
              <el-table-column prop="car_emissions" label="排量" align="center" >
              </el-table-column>
              <el-table-column prop="name" label="车主姓名" align="center">
              </el-table-column>
              <el-table-column prop="phone" label="联系方式" align="center" >
              </el-table-column>
              <el-table-column prop="sale_time" label="购卡时间" align="center" >
              </el-table-column>
              <el-table-column prop="card_type" label="购卡类型" align="center" >
              </el-table-column>
              <el-table-column prop="remain_times" label="剩余次数" align="center" >
              </el-table-column>
              <!-- <el-table-column prop="remain_times" label="状态" align="center">
                <template slot-scope="scope">

                </template>
              </el-table-column> -->
            </el-table>

            <div class="">
              <el-pagination
              class="page"
              name="1"
              layout="prev, pager, next"
              @current-change="getMemberList"
              :current-page.sync="currentPage"
              :page-count="totalPage">
              </el-pagination>
            </div>

          </div>
        </div>
    </div>
</template>

<script>
import { getFilterMember } from "@/server/serverData";
export default {
  data() {
    return {

      currentPage: 1,
      totalPage: 1,
      tableData: [],
      keyword: "",
      cardType: "",
      status: "",
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
  computed: {},
  methods: {
    async getMemberList() {
      let startTime, endTime;
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }
      let res = await getFilterMember(
        this.currentPage,
        this.keyword,
        this.cardType,
        startTime,
        endTime,
        this.status
      );
      if (res.data.code == 1) {
        this.tableData = res.data.data.list;
        this.totalPage = res.data.data.rows;
      } else {
        this.tableData = [];
        this.totalPage = 0;
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.getMemberList();
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
  background-color: #ebedf0;
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
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.secondBody .tableImg {
  height: 50px;
  width: 50px;
  overflow: hidden;
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
