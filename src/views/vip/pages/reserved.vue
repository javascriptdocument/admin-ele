<template>
    <div class="member">
        <div class="viewMain">
          <div class="secondBody">
            <el-form class="filterCondition demo-form-inline" ref="form" :inline="true" label-width="80px">
                <el-input placeholder="输入车牌号" v-model="plate" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;" @click="getMemberList">搜索</el-button>
                </el-input>
                <el-form-item label="预约时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="getMemberList"
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" style="margin-bottom: 0;">
                  <el-select v-model="status" @change="getMemberList" style="width: 100px;">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="已预约" value="0"></el-option>
                    <el-option label="已确认" value="1"></el-option>
                    <el-option label="已放弃" value="4"></el-option>
                    <el-option label="已完成" value="5"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
              <!-- <el-table-column prop="car_pic" label="车辆照片" align="center" >
                <template slot-scope="scope">
                  <img class="tableImg" :src="scope.row.car_pic" alt="">
                </template>
              </el-table-column> -->
              <el-table-column prop="plate" label="车牌号" align="center"  >
              </el-table-column>
              <el-table-column prop="odd_num" label="订单编号" align="center" >
              </el-table-column>
              <el-table-column prop="name" label="车主姓名" align="center" >
              </el-table-column>
              <el-table-column prop="phone" label="车主联系方式" align="center">
              </el-table-column>
              <el-table-column prop="goods_name" label="预约详情" align="center" >
                <template slot-scope="scope">
                  <el-button type="text" @click="viewDetail(scope.row)" style="text-decoration:underline">{{scope.row.goods_name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="服务费(元)" align="center" >
              </el-table-column>
              <el-table-column prop="reservation_time" label="预约时间" align="center" >
              </el-table-column>
              <el-table-column label="状态" align="center" >
                <template slot-scope="scope">
                  <span v-show="scope.row.order_status == 0">未确认预约</span>
                  <span v-show="scope.row.order_status == 1 && scope.row.material_status == 0">已确认预约</span>
                  <span v-show="scope.row.order_status == 1 && scope.row.material_status == 1">已发货</span>
                  <span v-show="scope.row.order_status == 4">已放弃</span>
                  <span v-show="scope.row.order_status == 1 && scope.row.material_status == 3">已确认预约</span>
                  <span v-show="scope.row.order_status == 1 && scope.row.material_status == 2">已收货</span>
                  <span v-show="scope.row.order_status == 5">已完成</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" v-show="scope.row.order_status == 0" @click="confirmView=true" size="small">确认预约</el-button>
                    <el-button type="info" v-show="scope.row.order_status == 0" @click="abandonOS(scope.row)" size="small">放弃</el-button>
                    <el-button type="danger" v-show="scope.row.order_status == 1 && scope.row.material_status == 0" @click="remind(scope.row)" size="small">催单</el-button>
                    <el-button type="success" v-show="scope.row.material_status == 1" @click="confirmCargo(scope.row)" size="small">确认收货</el-button>
                    <el-button type="text" v-show="scope.row.order_status == 4" @click="onreason(scope.row)" size="small">查看原因</el-button>
                    <el-button type="info" v-show="scope.row.order_status == 1 && scope.row.material_status == 3" @click="reasonView=true" size="small" disabled>已催单</el-button>
                    <span v-show="scope.row.order_status == 1 && scope.row.material_status == 2 || scope.row.order_status == 5">--</span>
                </template>
              </el-table-column>
            </el-table>

            <div class="">
              <el-pagination
              class="page"
              background
              layout="prev, pager, next"
              @current-change="getMemberList"
              :current-page.sync="currentPage"
              :page-count="totalPage">
              </el-pagination>
            </div>

            <div class="view_detail">
              <el-dialog
                title="预约详情"
                :visible.sync="viewDetailShow"
                width="900px"
                center>
                <div class="view_content">
                  <ul>
                    <li>
                      <p>
                        <i>车主姓名：</i>
                        <span>{{detailData.name}}</span>
                      </p>
                      <p>
                        <i>产品名称：</i>
                        <span>{{detailData.goods_name}}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>车主电话：</i>
                        <span>{{detailData.phone}}</span>
                      </p>
                      <p>
                        <i>产品品牌：</i>
                        <span>{{detailData.brand}}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>品牌/车型/排量：</i>
                        <span>{{detailData.brand_car_displa}}</span>
                      </p>
                      <p>
                        <i>产品型号：</i>
                        <span>{{detailData.stand}}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>车牌号：</i>
                        <span>{{detailData.plate}}</span>
                      </p>
                      <p>
                        <i>规格：</i>
                        <span>{{detailData.standard_detail}}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>VIN码：</i>
                        <span>{{detailData.vin_num}}</span>
                      </p>
                      <p>
                        <i>数量：</i>
                        <span>{{detailData.number}}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>供货商名称：</i>
                        <span>{{detailData.sm_name}}</span>
                      </p>
                      <p>
                        <i>服务费：</i>
                        <span>{{detailData.price}}</span>
                      </p>
                    </li>
                    <li>
                      <p><i>供货商电话：</i>
                        <span>{{detailData.phones}}</span>
                      </p>
                      <p><i>预约时间：</i>
                        <span>{{detailData.reservation_time}}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </el-dialog>
            </div>
            <div class="view_detail">
              <el-dialog
                title="确认预约"
                :visible.sync="confirmView"
                width="900px"
                center>
                <div class="">

                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="confirmView = false">取 消</el-button>
                  <el-button type="primary" @click="confirmOS(1)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="view_detail">
              <el-dialog
                title="填写放弃理由"
                :visible.sync="abandonView"
                width="600px"
                center>
                <div class="view_content">
                  <el-input type="textarea" :autosize="{ minRows: 6}" size="small" v-model="abandonText"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button :type="btnType" style="width:250px" :disabled="btnType=='info'?true:false" @click="confirmOS(2)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="view_detail">
              <el-dialog
                title="查看放弃理由"
                :visible.sync="reasonView"
                width="1000px"
                center>
                <div class="reason_content">
                  {{}}
                </div>
              </el-dialog>
            </div>

          </div>
        </div>
    </div>
</template>

<script>
import { getFilterMember } from "@/server/serverData";
import { post, get } from "../../../config/axios";
export default {
  data() {
    return {
      viewDetailShow:false,
      confirmView:false,
      abandonView:false,
      reasonView: false,
      detailData:[],
      reasonData:'',
      token: sessionStorage.getItem("token"),
      currentPage: 1,
      totalPage: 1,
      tableData: [],
      abandonText: "",
      btnType:'info',
      plate: "",
      cardType: "",
      status: "",
      intervalTime: "",
      currentRowData:[],
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
  watch:{
    abandonText(){
      this.btnType = this.abandonText?"primary":"info";
    }
  },
  created(){
    this.getMemberList()
  },
  methods: {
    getMemberList() {
      post("Privilege/userOrder",{
        token:this.token,
        plate:this.plate,
        startTime:this.intervalTime[0] || "",
        endTime:this.intervalTime[1] || "",
        status:this.status
      }).then(res=>{
        this.tableData = res.data.data.list
      })
    },

    viewDetail(e){
      this.viewDetailShow = true;
      post("Privilege/orderDetail",{
        token: this.token,
        id: e.id
      }).then(res=>{
        this.detailData = res.data.data
      })
    },
    // 查看原因
    onreason(e){
        this.reasonView=true;
        post("Privilege/checkReason",{
          token: this.token,
          id: e.id
        }).then(res=>{
          console.log(res)
        })
    },
    // 放弃操作
    abandonOS(e){
      this.abandonView=true;
      this.currentRowData = e;

    },

    // 确认收货
    confirmCargo(e){
      this.$confirm('是否确认收货?')
      .then(() => {
        post("Privilege/confirmCargo",{
          token: this.token,
          id: e.id
        }).then(res=>{
          this.$message.success(res.data.msg);
          this.getMemberList()
        })
      }).catch();

    },
    // 催单
    remind(e){
      // post("",{
      //
      // })
    },
    confirmOS(n){
      switch (n) {
        case 1:

          break;
        case 2:
          post("Privilege/waiveReservation",{
            token: this.token,
            id: this.currentRowData.id,
            reason: this.abandonText
          })
          .then(res=>{
            if(res.data.code == 1){
              this.$message.success(res.data.msg);
              this.abandonView=false;
              this.currentRowData = [];
              this.getMemberList();
            }else{
              this.$message.error(res.data.msg);
            }
          })
          break;
        case 3:

          break;
        case 4:

          break;
      }
    },


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
.view_content{
  width: 100%;
  border: 1px solid rgba(215,225,230,1);
  box-sizing: border-box;
  border-left: none;
  border-bottom: none;
}
.reason_content{
    border-top: 1px solid #ddd;
    padding: 30px
}

.view_content ul{
  width: 100%;
}
.view_content ul li {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.view_content ul li p{
  width: 50%;
  border-left: 1px solid #D7E1E6;
  border-bottom: 1px solid #D7E1E6;
  box-sizing: border-box;
  text-align: right;
  line-height: 42px;
  overflow: hidden;
}
.view_content ul li p i{
  font-style: normal;
  width: 140px;
  float: left;
  padding-right: 20px;
  box-sizing: border-box;
  display: block;
  text-align: right;
}
.view_content ul li p span{
  text-align: left;
  float: left;
  display: block;
  width: calc(100% - 140px)
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
