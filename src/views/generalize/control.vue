<template>
  <div class="control">
    <currentPage :id='201'/>
    <div class="obd-head">
      <div class="searcharea">
        <input v-model="input" type="text" placeholder="产品名称/产品编号">
        <div @click="searchgo">搜索</div>
      </div>状态：
      <el-select v-model="status" placeholder="请选择">
        <el-option label="全部" value></el-option>
        <el-option label="审核中" value="0"></el-option>
        <el-option label="已通过" value="1"></el-option>
        <el-option label="已驳回" value="2"></el-option>
      </el-select>&nbsp&nbsp&nbsp
      产品种类：
      <el-select v-model="mold" placeholder="请选择">
        <el-option label="全部" value></el-option>
        <el-option label="实物类" value="0"></el-option>
        <el-option label="服务项" value="1"></el-option>
      </el-select>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{'background':'RGBA(215, 225, 230, 1)','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="pnum" label="产品编号"></el-table-column>
      <el-table-column align="center" prop="mold" label="产品种类">
        <template slot-scope="scope">
          <p v-if="scope.row.mold == 1">服务项</p>
          <p v-else>实物产品</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="产品名称"></el-table-column>
      <el-table-column align="center" prop="virtualnum" label="已售数量"></el-table-column>
      <el-table-column align="center" prop="stocknum" label="库存数量"></el-table-column>
      <el-table-column align="center" prop="s_state" label="状态">
        <template slot-scope="scope">
          <p style="color:RGBA(0, 209, 94, 1);" v-if="scope.row.s_state==1&&scope.row.status==1">上架</p>
          <p style="color:RGBA(255, 40, 40, 1);" v-if="scope.row.s_state==0&&scope.row.status==1">下架</p>
          <p style="color:RGBA(255, 40, 40, 1);" v-if="scope.row.status==2">被驳回</p>
          <!-- <p style="color:RGBA(255, 40, 40, 1)；" v-if="scope.row.status==1">通过</p> -->
          <p style="color:RGBA(50, 55, 60, 1);" v-if="scope.row.status==0">审核中</p>
        </template>
      </el-table-column>
      <el-table-column prop="id" width="400" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :class="scope.row.status==0 || scope.row.s_state==1||scope.row.s_state==2||scope.row.s_state==3?'btnColor':''"
            :disabled="scope.row.status==0 || scope.row.s_state==1||scope.row.s_state==2||scope.row.s_state==3"
            type="success"
            size="small"
            @click="putaway(scope.row.id)"
          >上架</el-button>
          <el-button
            :class="scope.row.status==0 || scope.row.s_state==0||scope.row.s_state==2||scope.row.s_state==3?'btnColor':''"
            :disabled="scope.row.status==0 || scope.row.s_state==0||scope.row.s_state==2||scope.row.s_state==3"
            type="danger"
            size="small"
            @click="soldOut(scope.row.id)"
          >下架</el-button>
          <el-button type="primary" size="small" @click="updataPro(scope.row.id)">编辑</el-button>
          <el-button type="info" @click="Delete(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      layout="prev, pager, next"
      :page-count="pageCount"
      align="center"
      style='margin-top: 30px'
    ></el-pagination>
    <el-dialog
      class="updataDialog"
      :visible.sync="updataDialogVisible"
      width="1000px"
      center
      :before-close="handleClose"
    >
      <updata-pro :goods="goods" @closeDialog='handleClose' ref="child"></updata-pro>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import currentPage from "@/views/common/currentPage";
import updataPro from "./updataPro.vue";
import { post, get } from "../../config/axios";
export default {
  components: {
    currentPage,
    updataPro
  },
  data() {
    return {
      updataDialogVisible: false,
      goods: {},
      seval: "all",
      input: "",
      mold: "",
      loading: false,
      tableData: [],
      status: "",
      page: 1,
      pageCount: 0,
      loading: true,
      ifsigning: 1
    };
  },
  watch: {
    mold() {
      this.searchgo();
    },
    status() {
      this.searchgo();
    }
  },
  mounted() {
    this.searchgo();
  },
  methods: {
    handleClose(done) {
      this.updataDialogVisible = false;
      this.searchgo();
    },
    updataPro(id) {
      let that = this;
      post("Goods/goodsDetail", { id: id }).then(res => {
           if(res.data.code==1){
            that.goods = res.data.data;
             this.updataDialogVisible = true;
           }
      });
    },
    //封装接口----------------------------------------------
    interface() {
      post("Goods/index", {
        ifsigning: 1,
        page: this.page,

      })
        .then(res => {
          this.tableData = res.data.data.list;
          this.pageCount = res.data.data.rows;
          this.loading = false;
        })
        .catch(err => {
          alert(err);
        });
    },
    //分页器-----------------------------------------------
    prev(e) {
      this.page = e;
      this.changePage();
    },
    next(e) {
      this.page = e;
      this.changePage();
    },
    current(e) {
      this.page = e;
      this.changePage();
    },
    changePage() {
      this.loading = true;
      this.Interface();
    },

    //上架操作----------------------------------------------
    putaway(id) {
      this.loading = true;
      post("Goods/putaway", { id: id, ifsigning: 1 })
        .then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.searchgo();
        })
        .catch(err => {
          alert(err);
        });
    },

    //下架操作--------------------------------------------------
    soldOut(id) {
      this.loading = true;
      post("Goods/soldout", { id: id, ifsigning: 1})
        .then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.searchgo();
        })
        .catch(err => {
          alert(err);
        });
    },
    //删除操作-----------------------------------------------

    Delete(id) {
      this.$confirm("此操作将删除产品及该产品下所有规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          post("Goods/del", { id: id })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.searchgo();
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //搜索
    searchgo() {
      post("Goods/psearch", {
        value: this.input,
        status: this.status,
        mold: this.mold,
        ifsigning: 1
      })
        .then(res => {
          this.tableData = res.data.data.list;
          this.pageCount = res.data.data.rows;
          this.loading = false;
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style lang='scss'  rel='stylesheet/scss' scoped>
.obd-head {
  height: 70px;
  background: white;
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
.btnColor {
  background: RGBA(203, 203, 203, 1);
  border: 0px;
}
.btnColor:hover {
  background: RGBA(203, 203, 203, 1);
}

/deep/ .currentPage .current[data-v-42680f1e] {
  margin: 20px;
}
</style>