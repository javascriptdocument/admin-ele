<template>
    <div class="serve"> 
        <div class="viewMain">
            <h2 class="col-32373C">车主服务</h2>
            <div class="whiteBlock">
              <el-form class="elForm" ref="form" :model="form" label-width="80px">
                <el-form-item label="VIN码">
                  <el-input placeholder="请输入17位VIN码">
                    <el-button slot="append" style="width: 100px;">查找</el-button>
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="infoCard">
                <table class="infoTable">    
                      <tr>
                        <td>车型：</td>
                        <td>北京奔驰-C级</td>
                        <td>物料名称：</td>
                        <td>机油</td>
                      </tr>
                      <tr>
                        <td>用户名：</td>
                        <td>XXXXXX</td>
                        <td>物料型号：</td>
                        <td>SM半合成(邦保养1号)</td>
                      </tr>
                      <tr>    
                        <td>联系方式：</td>
                        <td>18000000000</td>
                        <td>使用数量：</td>
                        <td>1.5L</td>
                      </tr>
                      <tr>
                        <td>建议保养周期：</td>
                        <td>6个月</td>
                        <td>滤芯补贴：</td>
                        <td>10元</td>
                      </tr>
                      <tr>
                        <td>建议保养里程：</td>
                        <td>10000公里</td>
                        <td>工时费：</td>
                        <td>20元</td>
                      </tr>
                    </table> 
                <div class="infoPic">
                  <span class="picSpan col-64696E">照片</span>
                  <div class="proImgBox" v-for="n in 6">
                    <img class="proImg" src="../images/finish.png" alt="">
                    <span class="col-64696e">产品1</span>
                  </div>
                </div>
              </div>
              <el-form class="elForm" ref="form" :model="form" label-width="80px">
                <el-form-item label="手机号">
                  <el-input placeholder="输入用户确认码" disabled="true">
                    <el-button slot="append"  >发送验证码</el-button>
                  </el-input>
                </el-form-item> 
                <el-form-item label="验证码">
                  <el-input v-model="form.name" placeholder="输入手机验证码"></el-input>
                </el-form-item> 
                <el-form-item label="产品编码" style="margin-bottom: 0;">
                  <el-input placeholder="输入产品编码" v-for="(item, index) in proCodeList" v-bind:index="index" v-model="proCodeList[index]" style="margin-bottom: 10px;">
                    <el-button slot="append" icon="el-icon-delete" @click="deleteCode(index)"></el-button>  
                  </el-input>
                  <el-input placeholder="输入产品编码" v-model="currentCode">
                    <el-button slot="append" icon="el-icon-plus" @click="addCode"></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <span class="col-FF2828">包括产品及工时费，请实际填写</span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="submit">提交</el-button> 
                </el-form-item>
              </el-form> 
            </div>
        </div>
        <el-dialog 
          :visible.sync="dialogVisible"
          width="1000px" 
          :before-close="handleClose">
          <div class="serveDialog">
            <span class="col-32373C">本次服务已完成</span>
            <el-button type="primary">好的</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "serve",
  data() {
    return {
      form: {
        name: ""
      },
      proCodeList: [],
      currentCode: '',
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    search() {},
    // 删除产品编码输入框
    deleteCode(index){
      this.proCodeList.splice(index,1)
    },
    // 增加产品编码输入框
    addCode(){
      this.proCodeList.push(this.currentCode);
      this.currentCode='';
    }
  }
};
</script>
<style lang="scss" scoped>
.serve {
  min-height: calc(100vh - 55px);
  background-color: #ebedf0;
  width: calc(100% - 160px);
  position: absolute;
  top: 55px;
  left: 160px;
  padding: 0 0 100px;
  overflow: hidden;
  .current {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 50px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .helpDoc {
      width: 48px;
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
    }
  }
  .viewMain {
    height: 100%;
    width: 100%;
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
      width: 1200px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .elForm {
        margin: 40px 290px 50px 210px;
        width: 550px;
        .submit {
          width: 370px;
          height: 44px;
          border-radius: 5px;
        }
      }
      .infoCard {
        margin-top: -50px;
        width: 1000px;
        min-height: 380px;
        box-sizing: border-box;
        padding: 20px;
        background-color: #f6f3f3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .infoTable {
          width: 880px;
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
        .infoPic {
          margin-top: 20px;
          width: 880px;
          min-height: 120px;
          background: rgba(246, 243, 243, 1);
          border: 1px solid #b9c3cd;
          position: relative;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 0 10px;
          box-sizing: border-box;
          .picSpan {
            position: absolute;
            left: 20px;
            top: -9px;
            text-align: center;
            width: 64px;
            height: 18px;
            font-size: 12px;
            background-color: #f6f3f3;
            font-weight: 400;
            line-height: 18px;
          }
          .proImgBox {
            margin: 15px 10px;
            height: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 64px;
            .proImg {
              height: 64px;
              width: 64px;
            }
            span { 
              font-size: 12px; 
              font-weight: 400; 
              line-height: 17px;
            }
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
  color: #64696e;
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


