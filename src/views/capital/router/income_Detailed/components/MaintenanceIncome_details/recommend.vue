<template>
  <div class="recommend">
    <div class="form">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="时间">
          <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="search()"
            style="width: 100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.date"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
        <el-table-column prop="type_b" label="推荐类型" align="center"></el-table-column>
        <el-table-column prop="money" label="奖励金额" align="center"></el-table-column>
        <el-table-column prop="finish" label="是否完成" align="center"></el-table-column>
        <el-table-column prop="count,company,type,differ" align="center" label="进度">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">
                  <p v-for="item in scope.row.company[0]">{{item}} <br></p>
              </div>
              <span>{{scope.row.count}}<span v-if="scope.row.type == 1 && scope.row.differ == 1">/3</span></span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="total">
      <span class="right col-3498E9">{{total}}</span>
    </div>
    <component is="paging" :pageCount="pageCount" :currentChange="currentChange"></component>
  </div>
</template>
<script>
import { getRecommendList } from "@/server/serverData";
import paging from "@/views/common/paging";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageCount: 1, //总页数
      form: {
        date: ""
      },
      total: "", //合计
      tableData: [],
      screenHeight: window.innerHeight - 430
    };
  },
  components: {
    paging
  },
  computed: {
    ApplyTime() {
      /** 申请时间,如果有数据,返回此数据,如果没有返回空 **/
      return this.form.date instanceof Array
        ? {
            startTime: this.form.date[0],
            endTime: this.form.date[1]
          }
        : {
            startTime: "",
            endTime: ""
          };
    }
  },
  methods: {
    /** 获取滤芯补贴数据 **/
    async recommendList() {
      let res = await getRecommendList({
        search: this.form.search,
        start_time: this.ApplyTime.startTime,
        end_time: this.ApplyTime.endTime,
        page: this.currentPage
      });
      if (res.data.code == 1) {
        this.tableData = res.data.data.list;
        this.pageCount = res.data.data.rows;
        this.total = res.data.data.total;
      } else {
        this.tableData = [];
        this.pageCount = 1;
        this.total = res.data.data.total;
      }
    },
    /** 搜索 **/
    search() {
      /** 搜索之前先把当前也和总页数设置为1,防止搜索的时候当前页和总页数不变 **/
      this.currentPage = 1;
      this.pageCount = 1;
      this.recommendList();
    },
    /** 获取当前页 **/
    currentChange(e) {
      console.log(e);
      this.currentPage = e;
      this.recommendList();
    }
  },
  mounted() {
    this.recommendList();
    var that = this;
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight - 430;
      })();
    };
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.form {
  /deep/ .el-form-item__content {
    .el-input-group__append,
    .el-input-group__prepend {
      border: none;
      background-color: #3498e9;
      color: white;
      padding: 0 30px;
    }
  }
  .search {
    margin-right: 40px;
  }
}
.table {
  /deep/ .el-table th,
  .el-table tr {
    background-color: #d7e1e6;
  }
  /deep/ .cell {
    font-size: 12px;
  }
  /deep/ .el-table__row {
    td {
      .cell {
        font-size: 12px;
      }
    }
  }
}
.total {
  padding: 30px 80px;
}
.paging {
  text-align: center;
  margin-top: 30px;
}
</style>