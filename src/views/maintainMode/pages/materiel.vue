<template>
    <div class="materiel"> 
        <div class="viewMain"> 
          <div class="tabChange">
            <div :class="[currentTab==1?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(1)">库存状态</div>
            <div :class="[currentTab==2?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(2)">补充记录</div>
          </div>
          <div class="firstBody" v-show="currentTab == 1">
            <div class="oilItem" v-for="i in oilData">
              <img :src="i.img" alt="">
              <div class="oilDet">
                <span class="oilName col-32373C">{{i.name}}</span>
                <table class="detTable">
                  <tr>
                    <td>期初授信</td>
                    <td>{{i.ration}}</td>
                  </tr>
                  <tr>
                    <td>物料库存</td>
                    <td>{{i.stock}}</td>
                  </tr>
                  <tr>
                    <td>结余</td>
                    <td>{{i.percentum}}%</td>
                  </tr>
                </table>
              </div>
              <el-button class="addOil" type="primary" v-if="i.status == 1" @click="materialWarn">补充物料</el-button>
            </div>                                                                           
          </div>
          <div class="secondBody" v-show="currentTab == 2">  
            <el-form class="filterCondition demo-form-inline" ref="form" :inline="true" label-width="80px"> 
                <el-input placeholder="输入订单编号" v-model="keyword" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" type='primary' class='search' style="width: 120px;" @click="supplyRecord">搜索</el-button>
                </el-input> 
                <el-form-item label="申请时间" style="margin-bottom: 0;width: 520px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" @change="reloadData"
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" style="margin-bottom: 0;">
                  <el-select v-model="status" @change="reloadData"  placeholder="请选择" style="width: 100px;">
                    <el-option label="待发货" value="0"></el-option>
                    <el-option label="已发货" value="1"></el-option>
                    <el-option label="已完成" value="2"></el-option>
                    <el-option label="已取消" value="3"></el-option> 
                  </el-select>
                </el-form-item> 
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}"> 
              <el-table-column prop="apply_sn" label="申请编号" align="center" >
              </el-table-column>
              <el-table-column prop="create_time" label="申请时间" align="center"  >
              </el-table-column>
              <el-table-column prop="audit_time" label="审核时间" align="center" >
              </el-table-column>
              <el-table-column prop="audit_status" label="状态" align="center" >
                <template  slot-scope="scope">  
                  <span v-if="scope.row.audit_status == 0">待发货</span>
                  <span v-if="scope.row.audit_status == 1">已发货</span>
                  <span v-if="scope.row.audit_status == 2">已完成</span>
                  <span v-if="scope.row.audit_status == 3">已取消</span> 
                </template>
              </el-table-column>  
              <el-table-column prop="id" label="物料详情" align="center">
                <template slot-scope="scope"> 
                  <a @click="orderDet(scope.row.id)">查看</a>
                </template>
              </el-table-column>
              <el-table-column prop="reason,id,audit_status,mold" label="操作" align="center" >
                <template slot-scope="scope"> 
                  <el-button v-if="scope.row.audit_status == 0" :disabled="scope.row.mold == 2" @click="withdrawDialogVisible = true;seasonId = scope.row.id;">取消申请</el-button>
                  <span class="col-32373C" v-if="scope.row.audit_status == 2">---</span>
                  <span class="col-FF2828" v-if="scope.row.audit_status == 3" @click="previewDialogVisible = true;resReason = scope.row.reason;">取消理由</span>
                </template>
              </el-table-column>
              <el-table-column prop="if_delay" label="是否延迟" align="center">
                <template slot-scope="scope"> 
                  <span v-if="scope.row.if_delay == 1">延迟</span>
                  <span v-if="scope.row.if_delay == 0">否</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="page" background layout="prev, pager, next" 
              @current-change="supplyRecord" :current-page.sync="currentPage" :page-count=totalPage >
            </el-pagination>
          </div>
        </div> 
        <el-dialog title="补充物料" :visible.sync="supplyDialogVisible" width="1000px" center>  
            <el-form class="supplyDialogBox demo-form-inline" ref="form"  :inline="true" label-width="70px"> 
              <table class="applyTable">
                <tr>
                  <th>物料名称</th>
                  <th>物料缺失状态(升)</th>
                  <th>申请数量(升)</th>
                </tr>
                <tr v-for="(item,index) in isLack">
                  <td>{{item.materiel}}</td>
                  <td>{{item.num}}</td>
                  <td>
                    <span>粘度30 :</span>
                    <el-select v-model="item.val30" style="min-width:0;width:96px;" size="mini" @change="getRemarks(index,30)">
                      <el-option v-for="opt in item.list30" :key="opt" :label="opt" :value="opt"></el-option>
                    </el-select>
                    <span>粘度40 :</span>
                    <el-select v-model="item.val40" style="min-width:0;width:96px;" size="mini" @change="getRemarks(index,40)">
                      <el-option v-for="opt in item.list40" :key="opt" :label="opt" :value="opt"></el-option>
                    </el-select>
                    <span></span>
                  </td>
                </tr>
              </table>
              <span class="col-FF2828">以上物料库存量不足，请点击相应物料进行申请！</span>
              <el-button class="supplySubmit" type="primary" @click="applyMaterial">立即申请</el-button> 
            </el-form> 
        </el-dialog>
        <el-dialog  class="" title="补充物料" :visible.sync="supplyDetDialogVisible" width="1000px" center>  
            <el-form class="supplyDetDialogBox demo-form-inline" ref="form" :inline="true" label-width="70px">
              <table class="applyTable">
                <tr>
                  <th>申请编号</th>
                  <th>申请时间</th>
                  <th>审核时间</th>
                </tr>
                <tr>
                  <td>{{orderDetData.apply_sn}}</td>
                  <td>{{orderDetData.create_time}}</td>
                  <td>{{orderDetData.audit_time}}</td> 
                </tr>
              </table>
              <table class="applyTable">
                <tr>
                  <th>物料名称</th>
                  <th>物料数量</th>
                  <th>备注信息</th>
                </tr>
                <tr v-for="item in orderDetData.detail" :key="orderDetData.detail[item]">
                  <td v-html="item.materiel"></td>
                  <td v-html="item.num"></td>
                  <td v-if="item.remarks" v-html="item.remarks"></td>
                  <td v-if="!item.remarks">--</td>
                </tr>
              </table>
            </el-form>
        </el-dialog>
        <el-dialog title="填写取消申请理由" :visible.sync="withdrawDialogVisible" width="1000px" center>  
          <el-form class="withdrawDialogBox demo-form-inline" ref="form"  :inline="true">
            <textarea name="" v-model="reason" class="withdrawText" cols="30" rows="10" placeholder="输入理由"></textarea>
            <el-button class="supplySubmit" type="primary" @click="cancelApply">立即申请</el-button>
          </el-form>
        </el-dialog>
        <el-dialog title="取消理由" :visible.sync="previewDialogVisible" width="1000px" center>
          <div class="previewDialogBox col-32373C">
            {{resReason}}
          </div>
        </el-dialog>
    </div>
</template>
<script>
import {
  getMaterial,
  materialIsLack,
  applyMaterial,
  materialSupplyRecord,
  applyOrderDet,
  cancelMaterialApply
} from "@/server/serverData";
export default {
  data() {
    return {
      supplyDialogVisible: false,
      supplyDetDialogVisible: false,
      withdrawDialogVisible: false,
      previewDialogVisible: false,
      currentTab: 1,
      seasonId:'',
      //
      oilData: [],
      isLack: [],

      // 列表数据
      currentPage: 1,
      totalPage: 50,
      tableData: [],

      orderDetData: "",

      reasonId: "",
      reason: "",

      resReason: "",
      // 筛选条件
      keyword: "",
      intervalTime: "",
      status: "",
      // intervalTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime()],
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
    tabChange(tab) {
      this.currentTab = tab;
      if (tab == 1) {
        this.getMaterial();
      } else {
        this.supplyRecord();
      }
    },
    reloadData() {
      this.supplyRecord();
    },
    async orderDet(id) {
      let res = await applyOrderDet(id);
      if (res.data.code == 1) {
        res.data.data.detail = eval(res.data.data.detail);
        this.orderDetData = res.data.data;
        this.supplyDetDialogVisible = true;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    getRemarks: function(index, oil) {
      var temp = this.isLack[index];
      if (oil == 30) {
        temp.val40 = temp.num - temp.val30;
      } else {
        temp.val30 = temp.num - temp.val40;
      }
      this.$forceUpdate();
    },
    async getMaterial() {
      let res = await getMaterial();
      if (res.data.code == 1) {
        this.oilData = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
async materialWarn() {
  let res = await materialIsLack();
  if (res.data.code == 1) {
    this.supplyDialogVisible = true;
    var arr = res.data.data,
            objArr = [];
    objArr.length = arr.length;
    for (var i = 0; i < arr.length; i++) {
      objArr[i] = {};
      objArr[i].num = arr[i].apply;
      objArr[i].materiel_id = arr[i].materiel_id;
      objArr[i].materiel = arr[i].materiel;
      objArr[i].remarks = "";
      let temparr = new Array(objArr[i].num + 1);
      for (let p = 0; p < temparr.length; p++) {
        temparr[p] = p;
      }
      objArr[i].list30 = objArr[i].list40 = temparr;
      objArr[i].val30 = Math.ceil(objArr[i].num * 0.5);
      objArr[i].val40 = Math.floor(objArr[i].num * 0.5);
    }
    this.isLack = objArr;
  } else {
    this.$message({
      message: res.data.msg,
      type: "warning"
    });
  }
},
    async applyMaterial() {
      var that = this,
        obj = that.isLack,
        subdata = [];
      if (obj.length == 0) {
        return;
      }
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i],
          enter = {};
        enter.num = temp.num;
        enter.materiel_id = temp.materiel_id;
        enter.materiel = temp.materiel;
        if (temp.materiel_id != 7) {
          enter.remarks =
            "粘度30：" + temp.val30 + "升，粘度40：" + temp.val40 + "升";
        } else {
          enter.remarks = temp.remarks;
        }
        subdata.push(enter);
      }
      subdata = JSON.stringify(subdata);
      this.supplyDialogVisible = false;
      let res = await applyMaterial(subdata);
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
    },
    async supplyRecord() {
      let startTime, endTime;
      if (this.intervalTime && this.intervalTime[0] && this.intervalTime[1]) {
        startTime = this.intervalTime[0];
        endTime = this.intervalTime[1];
      } else {
        startTime = "";
        endTime = "";
      }
      let res = await materialSupplyRecord(
        this.currentPage,
        this.keyword,
        startTime,
        endTime,
        this.status
      );
      if (res.data.code == 1) {
        this.tableData = res.data.data.list;
        this.totalPage = res.data.data.rows;
      } else {
        this.tableData = [];
        this.totalPage = 1;
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async cancelApply() {
      console.log(this.seasonId)
      let res = await cancelMaterialApply(this.seasonId, this.reason);
      if (res.data.code == 1) {
        this.withdrawDialogVisible = false;
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.supplyRecord()
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    }
  },
  created() {
    this.getMaterial();
  }
};
</script>
<style lang="scss" scoped>

  /deep/ .el-input-group__append, .el-input-group__prepend{
           background-color: #3498E9;
           border: none;
           color: white;
         }
.materiel {
  min-height: calc(100vh - 105px);
  background-color: #fff;
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
    .firstBody {
      position: absolute;
      top: 50px;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 100px 250px 0;
      width: 100%;
      border-top: 2px solid #b9c3cd;
      .oilItem {
        width: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          height: 240px;
          width: 240px;
        }
        .oilDet {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .oilName {
            display: inline-block;
            font-size: 18px;
            font-weight: 400;
            line-height: 25px;
            margin: 20px auto 26px;
          }
          .detTable {
            font-size: 14px;
            font-weight: 400;
            color: #32373c;
            line-height: 20px;
            width: 100%;
            background: #fff;
            border: 1px solid #b9c3cd;
            tr {
              width: 240px;
              height: 32px;
              td {
                width: 50%;
                line-height: 32px;
                text-align: center;
                border: 1px solid #b9c3cd;
              }
            }
          }
        }
        .addOil {
          margin-top: 30px;
        }
      }
    }
    .secondBody {
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
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.supplyDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin-top: 32px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 16px;
    background: rgba(0, 153, 255, 1);
  }
}
.supplyDialogBox,
.supplyDetDialogBox {
  .applyTable {
    width: 100%;
    tr {
      text-align: center;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #d7e1e6;
    }
    tr:first-child {
      td {
        height: 50px;
      }
      background-color: #d7e1e6;
    }
  }
}

.supplyDetDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .supplySubmit {
    width: 300px;
    height: 44px;
    margin-top: 40px;
    background: rgba(0, 153, 255, 1);
  }
}
.withdrawDialogBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  .withdrawText {
    width: 100%;
    min-height: 200px;
    padding: 6px 10px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 20px;
    background-color: #f1f3f6;
  }
  .withdrawText::placeholder {
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
.previewDialogBox {
  width: 100%;
  min-height: 300px;
  border-top: 2px solid #b9c3cd;
  margin-top: -15px;
  padding: 20px 25px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  line-height: 34px;
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


