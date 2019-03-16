<template>
  <div class="assessments">
    <currentPage :id='202'/>
    <div class="obd-head">
      <div class="searcharea">
        <input v-model="input" type="text" placeholder="产品名称/车主姓名">
        <div @click="searchgo">搜索</div>
      </div>
      <!-- 状态： <el-select v-model="seval" placeholder="请选择">
      <el-option label="全部" value="all"></el-option>
      <el-option label="未提醒" value="before"></el-option>
      <el-option label="已提醒" value="after"></el-option>
      </el-select>
      &nbsp&nbsp&nbsp
      产品种类：
      <el-select v-model="seval" placeholder="请选择">
      <el-option label="全部" value="all"></el-option>
      <el-option label="未提醒" value="before"></el-option>
      <el-option label="已提醒" value="after"></el-option>
      </el-select>-->
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{'background':'RGBA(215, 225, 230, 1)','height':'50px','color':'#383838','font-size':'16px'}"
    >
      <el-table-column width="220" align="center" prop="name" label="车主姓名"></el-table-column>
      <el-table-column align="center" prop="wname" label="产品名称"></el-table-column>
      <el-table-column align="center" label="评论星级">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.class"
            disabled

            :colors="['RGBA(5, 184, 247, 1)', 'RGBA(5, 184, 247, 1)', 'RGBA(5, 184, 247, 1)']"


          ></el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="评论时间"></el-table-column>
      <el-table-column align="center" width="520" label="评论内容">
        <template slot-scope="scope">
          <div class="scope">{{scope.row.content}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-switch
            :width="width"
            v-model="scope.row.isshow"
            @change="Switch(scope.row.id,scope.row.isshow)"
            active-text="显示"
            inactive-text="隐藏"
            active-color="RGBA(15, 210, 75, 1)"
            inactive-color="RGBA(100, 105, 115, 1)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <component is='paging' :currentChange='currentChange' :pageCount='pageCount'></component>
  </div>
</template>
<script type="text/javascript">
import currentPage from "@/views/common/currentPage";
import paging from '@/views/common/paging'
import { post, get } from "../../config/axios";
export default {
  components: {
    currentPage,
    paging
  },
  data() {
    return {
      seval: "all",
      input: "",
      loading: true,
      width: 50,
      pageCount: 1,
      value: "好评",
      tableData: [],
      page: 1,
      ifsigning: 1,
    };
  },
  mounted() {
    this.Interface();
  },
  methods: {
    currentChange(e){
         this.page=e;
         this.Interface()
    },
    //封装接口-----------------------------------------------------------------
    Interface() {
      post("Comment/comment", { 
        ifsigning: this.ifsigning,
        page: this.page
      })
        .then(res => {
          this.loading = false;
          if(res.data.code==1 && res.data.data){
            this.tableData = res.data.data.list;
            this.pageCount=res.data.data.rows;

          }
        })
        .catch(err => {
          alert(err);
        });
    },
    //评论隐藏与现实-------------------------------------------------------------
    Switch(id, show) { 
      post("Comment/ifShow", {id: id })
        .then(res => {})
        .catch(err => {
          alert(err);
        });
    },
    //搜索--------------------------------------------------------------------
    searchgo() {
      console.log(123)
      this.page=1
      this.pageCount=1
      post("Comment/search", { 
        ifsigning: this.ifsigning,
        value: this.input,
        page: this.page
      }).then(res => {
         if(res.data.code==1){
        this.tableData = res.data.data.list;
        this.pageCount=res.data.data.rows;
        this.loading = false;
         }
      });
    }
  }
};
</script>
<style lang='scss'  rel='stylesheet/scss' scoped>
  .paging{
    text-align: center;
    margin-top: 30px;
  }
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
.scope {
  width: 100%;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
 
</style>