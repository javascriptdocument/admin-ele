<template>
  <div class="obd-chance">
    <currentPage :id='216'/>
    <div class="select">
      <div v-bind:class="gaibian =='lb1'?'fc':'fc2'" @click="tabChange('lb1')">预约列表</div>
      <div v-bind:class="gaibian =='lb2'?'fc':'fc2'" @click="tabChange('lb2')">预约超时列表</div>
      <div v-bind:class="gaibian =='lb3'?'fc':'fc2'" @click="tabChange('lb3')" style='border-right: 1px solid RGBA(151, 151, 151, 1)'>完成列表</div>
    </div>
    <div class="obd-head">
      <div class="searcharea">
        <input type="text" v-model="input" placeholder="输入车牌号/车主姓名">
        <div @click="searchgo">搜索</div>
      </div>
      <div class="date-select">
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
    </div>
    <el-table
      v-if="gaibian=='lb1'"
      key="0"
      :data="tableData1"
      :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="plate" label="车牌号"></el-table-column>
      <el-table-column align="center" label="车型">
        <template slot-scope="scope">
          <p>{{scope.row.carclass}}-{{scope.row.cartype}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
      <el-table-column align="center" prop="wname" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="standard" label="产品规格"></el-table-column>
      <el-table-column align="center" prop="y_time" label="预约时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="accomplish(scope.row.aid)" size="small">完成</el-button>
          <el-button type="danger" @click="overtime(scope.row.aid)" size="small">超时</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="gaibian=='lb2'"
      :data="tableData2"
      key="1"
      :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="plate" label="车牌号"></el-table-column>
      <el-table-column align="center" label="车型">
        <template slot-scope="scope">
          <p>{{scope.row.carclass}}-{{scope.row.cartype}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
      <el-table-column align="center" prop="wname" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="standard" label="产品规格"></el-table-column>
      <el-table-column align="center" prop="y_time" label="预约时间"></el-table-column>
      <el-table-column align="center" prop="handing_time" label="操作时间"></el-table-column>
    </el-table>
    <el-table
      v-if="gaibian=='lb3'"
      :data="tableData3"
      key="2"
      :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="plate" label="车牌号"></el-table-column>
      <el-table-column align="center" label="车型">
        <template slot-scope="scope">
          <p>{{scope.row.carclass}}-{{scope.row.cartype}}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
      <el-table-column align="center" prop="wname" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="standard" label="产品规格"></el-table-column>
      <el-table-column align="center" prop="y_time" label="预约时间"></el-table-column>
    </el-table>
    <paging :pageCount="pageCount1" v-if="gaibian=='lb1'" :currentChange="pageChange1"></paging>
    <paging :pageCount="pageCount2" v-if="gaibian=='lb2'" :currentChange="pageChange2"></paging>
    <paging :pageCount="pageCount3" v-if="gaibian=='lb3'" :currentChange="pageChange3"></paging>
  </div>
</template>
<script type="text/javascript">
  import currentPage from "@/views/common/currentPage";
import { post } from "../../config/axios";
import paging from "@/views/common/paging";
export default {
  data() {
    return {
      select: "select",
      gaibian: "lb1",
      date: "",
      input: "",
      loading: true,
      tableData1: [],
      pageCount1: 1,
      currentPage1: 1,
      tableData2: [],
      pageCount2: 1,
      currentPage2: 1,
      tableData3: [],
      pageCount3: 1,
      currentPage3: 1,
      ifsigning: 1
    };
  },
  components: {
    currentPage,
    paging
  },
  mounted() {
    this.searchgo();
  },
  watch: {
    //监听日期变化----------------------------------------
    date() {
      this.searchgo();
    }, 
  },
  methods: {
    //封装接口---------------------------------------------
    interface() {

      if (this.gaibian == "lb1") {
        post("Order/underway", { ifsigning: 1, page: this.currentPage1 }).then(
          res => {
            if (res.data.code == 1) {
              this.tableData1 = res.data.data.list;
              this.pageCount1 = res.data.data.rows;
            }
          }
        );
      } else if (this.gaibian == "lb2") {
        post("Order/timeoutList", {
          ifsigning: 1,
          page: this.currentPage2
        }).then(res => {
          if (res.data.code == 1) {
            this.tableData2 = res.data.data.list;
            this.pageCount2 = res.data.data.rows;
          }
        });
      } else if (this.gaibian == "lb3") {
        post("Order/finishList", {
          ifsigning: 1,
          page: this.currentPage3
        }).then(res => {
          this.tableData3 = res.data.data.list;
          this.pageCount3 = res.data.data.rows;
        });
      }
    },
    /** 预约列表分页,获取当前页数 **/
    pageChange1(e) {
      this.currentPage1 = e;
      this.interface();
    },
    /** 预约超时列表分页,获取当前页数 **/
    pageChange2(e) {
      this.currentPage2 = e;
      this.interface();
    },
    /** 完成列表分页,获取当前页数 **/
    pageChange3(e) {
      this.currentPage3 = e;
      this.interface();
    },

    //完成操作--------------------------------------------------------------------
    accomplish(aid) {
      post("Order/finish", { id: aid })
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
          this.searchgo();
        })
        .catch(err => {
          alert(err);
        });
    },
    //超时操作----------------------------------------------------------------
    overtime(aid) {
      post("Order/timeout", { id: aid })
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
          this.searchgo();
        })
        .catch(err => {
          alert(err);
        });
    },
    //改变--------------------------------
    tabChange(e) {
      this.pageCount1=1
      this.pageCount2=1
      this.pageCount3=1
      //页签切换方法
      this.gaibian = e;
      this.searchgo();
    },
    //搜索--------------------------------
    searchgo() {
      if (this.gaibian == "lb1") {
        post("Order/underway", {
          ifsigning: 1,
          value: this.input,
          starttime: this.date[0],
          endtime: this.date[1]
        }).then(res => {
          if (res.data.code == 1) {
            this.tableData1 = res.data.data.list;
            this.pageCount1 = res.data.data.rows;
          } else {
            this.tableData1 = [];
            this.pageCount1 = 1;
          }
        });
      } else if (this.gaibian == "lb2") {
        post("Order/timeoutList", {
          ifsigning: 1,
          value: this.input,
          starttime: this.date[0],
          endtime: this.date[1]
        }).then(res => {
          if (res.data.code == 1) {
            this.tableData2 = res.data.data.list;
            this.pageCount2 = res.data.data.rows;
          } else {
            this.tableData2 = [];
            this.pageCount2 = 1;
          }
          this.loading = false;
        });
      } else if (this.gaibian == "lb3") {
        post("Order/finishList", {
          ifsigning: 1,
          value: this.input,
          starttime: this.date[0],
          endtime: this.date[1]
        }).then(res => {
          if (res.data.code == 1) {
            this.tableData3 = res.data.data.list;
            this.pageCount3 = res.data.data.rows;
          } else {
            this.tableData3 = [];
            this.pageCount3 = 1;
          }
          this.loading = false;
        });
      }
    }
  }
};
</script>
<style type="text/css" lang="scss" el='stylesheet/scss' >
.paging {
  margin-top: 30px;
}
.obd-head {
  height: 70px;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.searcharea {
  display: flex;
  margin-left: 40px;
  margin-right: 30px;
}

.searcharea > input,
.searcharea > div {
  height: 40px;
  box-sizing: border-box;
  font-size: 16px;
}

.searcharea > input {
  border: 1px solid #e6e6eb;
  background: #f5f5fa;
  line-height: 38px;
  color: #1e2328;
  width: 432px;
  padding: 0 24px;
}

.searcharea > div {
  background: #1ea0ff;
  line-height: 40px;
  width: 120px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.widlimit {
  width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flexrow {
  display: flex;
  align-items: center;
}

.color-blue {
  cursor: pointer;
  color: #1ea0ff;
  text-decoration: underline;
}

.color-red {
  color: #fa644b;
}

.color-gray {
  color: #969ba5;
}

.color-green {
  cursor: pointer;
  color: #0acd00;
  text-decoration: underline;
}
.select {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid RGBA(151, 151, 151, 1);
}
.select div {
  width: 200px;
  height: 40px;
  line-height: 40px;
  float: left;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  border-top: 1px solid RGBA(151, 151, 151, 1);
  border-left: 1px solid RGBA(151, 151, 151, 1);
}
.fc {
  background: RGBA(0, 153, 255, 1);
  color: white;
}
.fc2 {
  background: transparent;
}

/deep/ .currentPage .current {
  margin: 20px;
} 
</style>