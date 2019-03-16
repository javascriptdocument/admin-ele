<template>
  <div class="obd-chance">
    <currentPage :id='215'/>
    <div class="select">
      <div v-bind:class="gaibian =='lb1'?[fc,fc2]:'fc2'" @click="change('lb1')">故障处理</div>
      <div v-bind:class="gaibian =='lb2'?[fc,fc2]:'fc2'" @click="change('lb2')">常规处理</div>
      <div v-bind:class="gaibian =='lb3'?[fc,fc2]:'fc2'" @click="change('lb3')">养护处理</div>
    </div>
    <div class="obd-head">
      <div class="searcharea">
        <input type="text" v-model="input" placeholder="车牌号/姓名">
        <div @click="searchgo">搜索</div>
      </div>
      <div class="date-select">
        <!-- <el-date-picker v-model="dateval" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker> -->
      </div>
      <!-- <el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="已提醒" value="after"></el-option>
				<el-option label="已忽略" value="over"></el-option>
      </el-select>-->
    </div>
    <el-table
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
            <p v-if="gaibian=='lb1'" class="widlimit">{{scope.row._title}}</p>
            <p v-else class="widlimit">{{scope.row._alarmdescription}}</p>
            <span>&nbsp;&nbsp;</span>
            <el-button type="text" v-if="gaibian=='lb1'" @click="open(scope.row._title)">查看</el-button>
            <el-button type="text" v-else @click="open(scope.row._alarmdescription)">查看</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="gaibian=='lb1'" align="center" prop="_fcdate" label="发生时间"></el-table-column>
      <el-table-column v-else align="center" prop="_indate" label="发生时间"></el-table-column>
      <el-table-column v-if="gaibian=='lb1'" align="center" prop="time" label="操作时间"></el-table-column>
      <el-table-column v-else align="center" prop="time" label="操作时间"></el-table-column>
    </el-table>
    <el-dialog title="提醒内容" :visible.sync="centerDialogVisible" width="30%" center>
      <span>{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <component v-show="gaibian=='lb1'" is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    <component v-show="gaibian=='lb2'" is='paging' :pageCount='routineCount' :currentChange='routineChange'></component>
     <component v-show="gaibian=='lb3'" is='paging' :pageCount='curingCount' :currentChange='curingChange'></component>
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
      page: 1,
      content: "",
      pageCount: 1,
      routineCount:1,
      routinePage:1,
      curingCount:1,
      curingPage:1,
      centerDialogVisible: false,
      searchwd: "",
      seval: "all",
      // start_time:'',
      // end_time:'',
      // dateval:[],
      input: "",
      tableData: [],
      loading: true,
      gaibian: "lb1",
      fc: "fc",
      fc2: "fc2"
      // pickerOptions: {
      // 	shortcuts: [{
      // 		text: '最近一周',
      // 		onClick(picker) {
      // 			const end = new Date();
      // 			const start = new Date();
      // 			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      // 			picker.$emit('pick', [start, end]);
      // 		}
      // 	}, {
      // 		text: '最近一个月',
      // 		onClick(picker) {
      // 			const end = new Date();
      // 			const start = new Date();
      // 			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      // 			picker.$emit('pick', [start, end]);
      // 		}
      // 	}, {
      // 		text: '最近三个月',
      // 		onClick(picker) {
      // 			const end = new Date();
      // 			const start = new Date();
      // 			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      // 			picker.$emit('pick', [start, end]);
      // 		}
      // 	}]
      // },
    };
  },
  watch: {},
  created() {},
  mounted() {
    //默认显示故障处理记录
    post("BusOppos/faultHand", {  page: this.page })
      .then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.Rows;
          this.pageCount = res.data.data.total;
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
      .catch(res => {});
  },
  methods: {
    //封装接口-----------------------------------
    Interface() {
      if (this.gaibian == "lb1") {
        post("BusOppos/faultHand", { 
            page: this.page,
            search: this.input
          })
          .then(res => {
             if(res.data.code==1){
                 this.tableData = res.data.data.Rows;
                 this.pageCount = res.data.data.total;
             }else{
                this.tableData=[]
             }
          })
          .catch(res => {});
      } else if (this.gaibian == "lb2") {
        post("BusOppos/mainWarn", { 
            page: this.routinePage,
            search: this.input
          })
          .then(res => {
              if(res.data.code==1){
                  this.tableData = res.data.data.Rows;
                  this.routineCount = res.data.data.total;
             }else{
               this.tableData=[]
             }
          })
          .catch(res => {});
      } else {
        post("BusOppos/yiMain", { 
            page: this.curingPage,
            search: this.input
          })
          .then(res => {
            this.tableData = res.data.data.list;
            this.curingCount = res.data.data.rows;
            this.loading = false;
          })
          .catch(res => {});
      }
    },

    //-------------------------------

    /** 分页,获取当前页数 **/
    currentChange(e){
        this.page=e;
        this.Interface()
    },
    routineChange(e){
      this.routinePage=e;
      this.Interface()
    },
    curingChange(e){
      this.curingPage=e;
      this.Interface()
    },
    /** 搜索指定内容 **/
    searchgo() {
      this.page = 1;
      this.routinePage=1;
      this.curingPage=1
      this.routineCount=1;
      this.pageCount=1;
      this.curingCount=1
      this.loading = true;
      this.Interface();
    },
    change(e) {
      //页签切换方法
      this.gaibian = e;
      this.page = 1; //页签切换的时候将页数重置为1
      this.input = "";
      this.loading = true;
      this.Interface();
    },
    open(e) {
      this.centerDialogVisible = true;
      this.content = e;
    }
  },
  computed: {}
};
</script>
<style scoped>
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
.label {
  width: 200px;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 40px;
}
.fc {
  line-height: 40px;
  color: white;
  background: RGBA(0, 153, 255, 1);
}
.fc2 {
  width: 200px;
  height: 40px;
  cursor: pointer;
  float: left;
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
  border-top: 1px solid RGBA(151, 151, 151, 1);
  border-left: 1px solid RGBA(151, 151, 151, 1);
  border-right: 1px solid RGBA(151, 151, 151, 1);
}
</style>