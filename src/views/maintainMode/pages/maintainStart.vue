<template>
  <div class="maintain">
    <div class="viewMain">
      <h2 class="col-32373C">邦保养服务</h2>
      <div class="whiteBlock">
        <div class="searchBox">
          <input type="text" v-model="form.plate" @input="getRecord" placeholder="输入车牌号">
          <div class="recordBox" v-if="plateRecord.length!=0">
            <p v-for="item in plateRecord" @click="selectPlate(item)">{{item}}</p>
          </div>
          <button @click="search">查找</button>
          <img class="plateImg" :src="carInfo.car_pic" alt v-if="carInfo.car_pic" title="车牌照片">
        </div>
        <div class="carInfo" v-if="carInfo.name">
          <div class="card">
            <table class="infoTabal">
              <tr>
                <td>车型：</td>
                <td>{{carInfo.type}}</td>
                <td>物料名称：</td>
                <td>{{carInfo.oil}}</td>
              </tr>
              <tr>
                <td>用户名：</td>
                <td>{{carInfo.name}}</td>
                <td>物料型号：</td>
                <td>{{carInfo.remain_times}}</td>
              </tr>
              <tr>
                <td>联系方式：</td>
                <td>{{carInfo.phone}}</td>
                <td>使用数量：</td>
                <td>{{carInfo.litre}}</td>
              </tr>
              <tr>
                <td>建议保养周期：</td>
                <td>{{carInfo.month}}</td>
                <td>滤芯补贴：</td>
                <td>{{carInfo.filter}}</td>
              </tr>
              <tr>
                <td>建议保养里程：</td>
                <td>{{carInfo.km}}</td>
                <td>工时费：</td>
                <td>{{carInfo.hour_charge}}</td>
              </tr>
            </table>
            <span class="col-32373C">此卡剩余次数：{{carInfo.remain_times}}次</span>
            <span class="col-32373C">{{carInfo.msgs}}</span>
          </div>
          <el-form class="elForm" ref="form" :model="form" label-width="120px">
            <el-form-item label="上次养护里程" v-if="carInfo.last_mileage">
               <span>{{carInfo.last_mileage+'公里'}}</span>
            </el-form-item>
            <el-form-item label="本次养护里程">
              <el-input
                v-model="form.the_mileage"
                placeholder="输入本次保养里程（公里）"
                min="0
                      "
                type="number"
                @keyup.native="mileageRule"
              ></el-input>
            </el-form-item>
            <el-form-item label v-if="form.the_mileage != ''">
              <span style="color: #606266;">下次保养里程：{{nextMileage}}公里</span>
            </el-form-item>
            <el-form-item label="确认码">
              <el-input placeholder="输入用户确认码" v-model="form.code" type="number">
                <el-button
                  slot="append"
                  @click="sendCode"
                  :disabled="disabled"
                  style="width: 120px;"
                >{{time}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submit" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <span class="col-32373C" v-else>输入车牌号查找邦保养用户信息</span>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1000px" :before-close="complate">
      <div class="serveDialog">
        <img src="../images/serveEnd.png" alt>
        <span class="col-32373C">{{Tips}}</span>
        <el-button type="primary" @click="complate">好的</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import {
  getPlateRecord,
  searchByPlate,
  sendCode,
  submitServeForm
} from "@/server/serverData";
export default {
  data() {
    return {
      // 京A12345
      form: {
        plate: "",
        code: "",
        the_mileage: ""
      },
      plateRecord: [],
      last_mileage: "",
      carInfo: {},
      time: "发送验证码",
      disabled: false,
      dialogVisible: false,
      Tips:''
    };
  },
  computed: {
    nextMileage() {
      return this.form.the_mileage < 0
        ? Number(this.carInfo.km) + Number(this.carInfo.last_mileage)
        : Number(this.carInfo.km) +
            Number(this.form.the_mileage) +
            Number(this.carInfo.last_mileage);
    },
    ThisTimeMileage() {
      return this.form.the_mileage;
    }
  },
  watch: {
    ThisTimeMileage(newValue) {
      if (newValue < 0) {
        this.form.the_mileage = 1;
      }
    }
  },
  methods: {

    selectPlate(item) {
      this.form.plate = item;
      this.plateRecord = [];
      this.search();
    },
    async getRecord() {
      let res = await getPlateRecord(this.form.plate);
      console.log(res.data);
      this.plateRecord = res.data;
    },
    mileageRule() {},
    // 根据车牌号查询车主信息
    async search() {
      let shop_type=window.sessionStorage.getItem('shop_type')
      console.log(shop_type)
      if(shop_type==2){
        this.$confirm('暂无权限','提示',{
           confirmButtonText: "确定",
           showCancelButton: false,
           type: "warning",
           showClose: false,
           closeOnClickModal: true,
           closeOnPressEscape: true,
           center: true,
        })
        return;
      }
      let res = await searchByPlate(this.form.plate);
      if (res.data.code == 1) {
        this.carInfo = res.data.data;
      } else {
        this.carInfo={}
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    //发送验证码
    async sendCode() {
      let that = this;
      that.time = 10;
      that.disabled = true;
      var time = window.setInterval(function() {
        that.time--;
        if (that.time < 0) {
          that.time = "重新发送";
          that.disabled = false;
          window.clearInterval(time);
        }
      }, 1000);
      let res = await sendCode(this.carInfo.phone, this.carInfo.card_number);
      // let res = Math.floor(Math.random() * 10);
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
    // 提交服务表单
    async submitForm() {
      let form = this.form,
        carInfo = this.carInfo;
      let fomrData =
        qs.stringify({ ...form }) + "&" + qs.stringify({ ...carInfo });
      let res = await submitServeForm(qs.parse(fomrData));
      if (res.data.code == 1) {
        this.dialogVisible = true;
        this.Tips=res.data.msg
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    // 服务完成后
    complate() {
      this.form = {
        plate: "",
        code: "",
        the_mileage: ""
      };
      this.carInfo = {};
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.maintain {
  background-color: #ebedf0;
  min-height: calc(100vh - 105px);
  .viewMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
      height: 50px;
      font-size: 36px;
      font-weight: 400;
      line-height: 50px;
    }
    .whiteBlock {
      margin-top: 20px;
      border-radius: 5px;
      min-height: 363px;
      max-width: 1200px;
      width: 80%;
      min-width: 900px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .searchBox {
        margin-top: 80px;
        display: flex;
        align-items: center;
        position: relative;
        .plateImg {
          position: absolute;
          right: -80px;
          height: 50px;
          width: 50px;
        }
        input {
          width: 300px;
          height: 44px;
          background-color: #f1f3f6;
          border: 1px solid #b9c3cd;
          outline: none;
          padding: 0 10px;
        }
        .recordBox {
          position: absolute;
          left: 0;
          top: 44px;
          z-index: 100;
          overflow-y: scroll;
          max-height: 440px;
          p {
            box-sizing: border-box;
            line-height: 44px;
            border: 1px solid #b9c3cd;
            border-top: 0;
            width: 300px;
            background-color: #f1f3f6;
            padding: 0 10px;
            height: 44px;
          }
        }
        ::-webkit-input-placeholder {
          color: #cbcbcb;
          font-size: 14px;
        }
        button {
          color: #fff;
          outline: none;
          border: 0;
          width: 120px;
          height: 44px;
          background: #3498e9;
          font-size: 18px;
          font-weight: 400;
          line-height: 25px;
          cursor: pointer;
        }
        button:active {
          background-color: #66b1ff;
        }
      }
      span {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
      .carInfo {
        margin-top: 20px;
        .card {
          max-width: 960px;
          width: 80%;
          min-width: 800px;
          height: 300px;
          box-sizing: border-box;
          padding: 10px 0;
          margin: 0 auto;
          background: rgba(246, 243, 243, 1);
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .infoTabal {
            width: 90%;
            height: 206px;
            border: 1px solid #b9c3cd;
            tr {
              border: 1px solid #b9c3cd;
              height: 42px;
              td {
                width: 25%;
                vertical-align: middle;
                font-size: 14px;
                font-weight: 400;
                line-height: 40px;
              }
              td:first-child,
              td:nth-child(3) {
                text-align: right;
                color: #64696e;
              }
              td:nth-child(2),
              td:last-child {
                text-align: left;
                border-right: 1px solid #b9c3cd;
                color: #32373c;
              }
            }
          }
          span {
            margin-top: 0;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
          }
        }
        .elForm {
          margin: 20px 290px 50px 170px;
          width: 500px;
          .submit {
            width: 370px;
            height: 44px;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .serveDialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 210px;
      width: 210px;
    }
    span {
      margin-top: 10px;
      font-size: 24px;
      font-weight: 400;
      line-height: 33px;
    }
    button {
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      line-height: 25px;
      margin: 50px;
      width: 300px;
      height: 50px;
      background: rgba(52, 152, 233, 1);
      border-radius: 5px;
    }
  }
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
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
