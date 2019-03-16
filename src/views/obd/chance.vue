<template>
  <div class="obd-chance">
    <currentPage :id='211'/>
    <div class="obd-head">
      <div class="searcharea">
        <input type="text" v-model="input" placeholder="车牌号/姓名">
        <div @click="searchgo">搜索</div>
      </div>
      <!-- <el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="未提醒" value="before"></el-option>
				<el-option label="已提醒" value="after"></el-option>
      </el-select>-->
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="_obdid" label="设备号"></el-table-column>
      <el-table-column align="center" prop="plate" label="车牌号"></el-table-column>
      <el-table-column align="center" prop="type" label="车型"></el-table-column>
      <el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
      <el-table-column align="center" label="提醒内容">
        <template slot-scope="scope">
          <div class="flexrow">
            <p class="widlimit">{{scope.row._alarmdescription}}</p>
            <span>&nbsp;&nbsp;</span>
            <el-button type="text" @click="open(scope.row._alarmdescription)">查看</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="_indate" label="时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="remind(scope.row._flag,scope.row._obdid)">已提醒</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提醒内容" :visible.sync="centerDialogVisible" width="30%" center>
      <span>{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
  </div>
</template>
 <script>
   import currentPage from "@/views/common/currentPage";
import { post } from "../../config/axios";
import paging from '@/views/common/paging'
export default {
  components: {
    currentPage,
    paging
  },
  data() {
    return {
      searchwd: "",
      seval: "all",
      tableData: [],
      content: "",
      input: "",
      page: 1,
      pageCount: 1,
      loading: true,
      centerDialogVisible: false
    };
  },
  created() {},
  mounted() {
    this.Interface();
  },
  methods: {
    //封装接口
    Interface() {
      post("BusOppos/mainRem ", {
        page: this.page,
        search: this.input
      })
        .then(res => {
          if(res.data.code==1){
         this.tableData = res.data.data.Rows;
         this.pageCount = res.data.data.total;
          }
          this.loading = false;
        })
        .catch(res => {});
    },

    /** 分页,获取当前页 **/
    currentChange(e){
       this.page=e;
       this.Interface()
    },
    //-----------------------------
    open(e) {
      this.centerDialogVisible = true;
      this.content = e;
    },
    searchgo() {
      this.page = 1;
      this.loading = true;
      this.Interface();
    },
    //处理操作
    remind(e, obd) {
      this.loading = true;
      post("BusOppos/curHandle", {
        flagId: e,
        obd: obd
      })
        .then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          post("BusOppos/mainRem ", {
            page: this.page
          })
            .then(res => {
              this.tableData = res.data.data.Rows;
              this.pageCount = res.data.data.total;
              this.$store.commit("mutationsMsg", this.$store.state.rem - 1);
              this.loading = false;
            })
            .catch(res => {});
        })
        .catch(res => {});
    }
  },
  computed: {}
};
</script>
<style scoped>
  .paging{
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
</style>