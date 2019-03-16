<template>
    <div class="maintain"> 
        <div class="viewMain"> 
          <div class="tabChange">
            <div :class="[currentTab==1?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(1)">技师列表</div>
            <div :class="[currentTab==2?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(2)">取消记录</div>
          </div>
          <div class="firstBody" v-show="currentTab == 1">
            <el-form class="filterCondition demo-form-inline" ref="form"  :inline="true" label-width="80px"> 
                <el-input placeholder="输入技师名称" v-model="keyword" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;" @click="getTechList">搜索</el-button>
                </el-input>  
                <el-form-item label="认证时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="dataChange" 
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}"> 
              <el-table-column prop="head" label="头像" align="center" >
                <template slot-scope="scope">  
                  <img class="tableImg" :src="scope.row.head" alt="">
                </template>
              </el-table-column>
              <el-table-column prop="name" label="技师姓名" align="center"  >
              </el-table-column>
              <el-table-column prop="phone" label="联系方式" align="center" >
              </el-table-column>
              <el-table-column prop="server" label="从业时间" align="center" >
              </el-table-column>  
              <el-table-column prop="certify_time" label="认证时间" align="center">
              </el-table-column>
              <el-table-column prop="skill" label="擅长技能" align="center" >
              </el-table-column>
              <el-table-column prop="server_num" label="服务次数" align="center" >
              </el-table-column>
              <el-table-column prop="server_money" label="服务奖励(元)" align="center" >
              </el-table-column>  
              <el-table-column prop="id" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="cancelAuthDialogVisible = true;cancelId = scope.row.id">取消认证</el-button>
                </template>
              </el-table-column>
            </el-table> 
            <el-pagination class="page" background layout="prev, pager, next" 
              @current-change="getTechList" :current-page.sync="currentPage" :page-count=totalpage >
            </el-pagination>                                                                      
          </div>
          <div class="secondBody" v-show="currentTab == 2">
            <el-form class="filterCondition demo-form-inline" ref="form"  :inline="true" label-width="80px"> 
                <el-input placeholder="输入技师姓名" v-model="keyword1" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;" @click="cancelRecordList">搜索</el-button>
                </el-input>  
                <el-form-item label="取消时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime1" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="dataReplace" 
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item> 
            </el-form>
            <el-table :data="tableData1" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">  
              <el-table-column prop="head" label="头像" align="center" >
                <template slot-scope="scope">  
                  <img class="tableImg" :src="scope.row.head" alt="">
                </template>
              </el-table-column>
              <el-table-column prop="name" label="技师姓名" align="center"  >
              </el-table-column>
              <el-table-column prop="phone" label="联系方式" align="center" >
              </el-table-column>
              <el-table-column prop="server" label="从业时间" align="center" >
              </el-table-column>  
              <el-table-column prop="certify_time" label="认证时间" align="center">
              </el-table-column>
              <el-table-column prop="skill" label="擅长技能" align="center" >
              </el-table-column>
              <el-table-column prop="server_num" label="服务次数" align="center" >
              </el-table-column>
              <el-table-column prop="server_money" label="服务奖励(元)" align="center" >
              </el-table-column>  
              <el-table-column prop="server_money" label="换店记录" align="center">
                <template slot-scope="scope">
                  <el-button type='text' @click='shopDialogVisible=true,shopRecord(scope.row.id)'>查看</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cancel_time" label="取消时间" align="center" >
              </el-table-column>  
            </el-table> 
            <el-pagination class="page" background layout="prev, pager, next" 
              @current-change="cancelRecordList" :current-page.sync="currentPage1" :page-count=totalPage1 >
            </el-pagination>
          </div>
        </div>
        <el-dialog title="补充物料" :visible.sync="recordDialogVisible" width="1000px" center>   
          <el-table :data="tableData" class="recordDialogBox" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}"> 
            <el-table-column prop="name" label="维修厂名称" align="center" >
            </el-table-column>
            <el-table-column label="换店理由" align="center">
                <template slot-scope="scope">

                </template>
              </el-table-column>
            <el-table-column prop="date" label="申请时间" align="center" >
            </el-table-column>
            <el-table-column prop="date" label="审核时间" align="center" >
            </el-table-column>
          </el-table>   
          <el-pagination class="page" background layout="prev, pager, next" 
            @current-change="getTechList" :current-page.sync="currentPage1" :page-count=totalpage 1 3>
          </el-pagination>
        </el-dialog> 
        <el-dialog title="填写取消认证理由" :visible.sync="cancelAuthDialogVisible" width="1000px" center @close='close'>
          <el-form class="cancelAuthDialogBox demo-form-inline" ref="form"  :inline="true">
            <textarea name="" v-model="reason" class="cancelAuthText" cols="30" rows="10" placeholder="输入理由"></textarea>
            <el-button class="supplySubmit" type="primary" @click="cancelAuth">立即申请</el-button> 
          </el-form>
        </el-dialog>
      <el-dialog title="换店记录" :visible.sync="shopDialogVisible" width="45%" center @close='close'>
           <div class='shop_Record'>
             <el-table :data="shopData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
               <el-table-column prop="company" label="维修厂名称" align="center"  >
               </el-table-column>
               <el-table-column prop="reason" label="换店理由" align="center" >
               </el-table-column>
               <el-table-column prop="create_time" label="申请时间" align="center" >
               </el-table-column>
               <el-table-column prop="audit_time" label="审核时间" align="center">
               </el-table-column>
             </el-table>
           </div>
      </el-dialog>
    </div>
</template>
<script>
import paging from '@/views/common/paging'
import {
  getTechnician,
  techCancelAuth,
  cancelAuthRecord,
  technicianWorkRecord
} from "@/server/serverData";
export default {
   
  data() {
    return { 
      cancelAuthDialogVisible: false,
      cancelId:'',
      reason:'',
      recordDialogVisible: false,
      shopDialogVisible:false,
      currentTab: 1,
      keyword: "",
      currentPage: 1,
      totalpage: 1,
      tableData: [],
      intervalTime: "",
      // intervalTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()],

      keyword1: "",
      currentPage1: 1,
      totalPage1: 1,
      tableData1: [],
      shopData:[],
      intervalTime1: "",
      // intervalTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()],
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
  components:{
    paging
  },
  computed: {},
  methods: {
    tabChange(tab) {
      this.currentTab = tab;
      if (tab == 1) {
        this.getTechList();
      } else {
        this.cancelRecordList();
      }
    },
    dataChange() {
      this.getTechList();
    },
    dataReplace() {
      this.cancelRecordList();
    },
    async getTechList() {
      let startTime, endTime; 
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }
      let res = await getTechnician(
        this.keyword,
        this.currentPage,
        startTime,
        endTime
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
    },
    async cancelRecordList() {
      let startTime1, endTime1; 
      if (this.intervalTime1 && this.intervalTime1[0] && this.intervalTime1[1]) { 
        startTime1 = this.intervalTime1[0];
        endTime1 = this.intervalTime1[1];
      } else {
        startTime1 = "";
        endTime1 = "";
      }
      let res = await cancelAuthRecord(
        this.keyword1,
        this.currentPage1,
        startTime1,
        endTime1
      ); 
      if (res.data.code == 1) {
        this.tableData1 = res.data.data.list;
        this.totalPage1 = res.data.data.rows;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      } 
    },
    async cancelAuth() {
      let res = await techCancelAuth(this.cancelId,this.reason); 
      if (res.data.code == 1) {
        this.cancelAuthDialogVisible = false;
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.reason=''
        this.getTechList()
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    close(){
       this.reason=''
       this.shopData=[]
    },
    /** 查看换店记录详情 **/
    async shopRecord(id){
        try {
           let res = await technicianWorkRecord(id)
           if(res.data.code==1){
                this.shopData=res.data.data
           }
        }catch (err){
          console.log(err)
        }
    },
  },
  mounted() {
    this.getTechList();
  }
};
</script>
<style lang="scss" scoped>

  /deep/ .el-input-group__append, .el-input-group__prepend{
    background-color: #3498E9;
    border: none;
    color: white;
  }
  .shop_Record{
    min-height: 300px;
  }
.maintain {
  min-height: calc(100vh - 105px);
  background-color: #fff;
  width: 100%;
  padding: 0 0 100px;
  overflow-x: hidden;
  box-sizing: border-box;
  .viewMain {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    position: relative;
    .tabChange {
      height: 50px;
      width: 100%;
      position: absolute;
      top: 10px;
      left: 30px;
      display: flex;
      div {
        height: 41px;
        width: 200px;
        border: 1px solid #b9c3cd;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        z-index: 10;
      }
      .tabActive {
        background-color: #3498e9;
        border: 0;
        color: #fff;
      }
    }
    .secondBody,
    .firstBody {
      position: absolute;
      top: 50px;
      width: 100%;
      border-top: 2px solid #b9c3cd;
      .filterCondition {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
      }
    }
  }
}
.firstBody .tableImg,
.secondBody .tableImg {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.recordDialogBox {
  margin-top: -15px;
}
.cancelAuthDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .cancelAuthText {
    width: 100%;
    min-height: 200px;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 20px;
    background-color: #f1f3f6;
  }
  .cancelAuthText::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #cbcbcb;
    line-height: 20px;
  }
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 30px;
    background: rgba(0, 153, 255, 1);
  }
}
.page {
  margin-top: 30px;
  display: flex;
  justify-content: center;
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


