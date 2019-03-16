<template>
    <div class="complain"> 
        <div class="viewMain">
          <h2 class="col-32373C">投诉</h2>
          <div class="whiteBlock">
            <el-form class="elForm" ref="form" :model="form" label-width="80px"> 
              <el-form-item label="投诉类型" >
                <el-select v-model="type" @change="search" placeholder="请选择" style="width: 100%;">
                  <el-option label="服务经理" value="2"></el-option>
                  <el-option label="运营商" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="被投诉人" v-if="complainant.name !== ''">
                <span>{{complainant.name}}</span>
              </el-form-item>
              <el-form-item label="投诉事由">
                <el-input type="input" v-model="title" placeholder="输入投诉标题" ></el-input>
              </el-form-item>
              <el-form-item label="投诉内容"> 
                <el-input type="textarea" v-model="content" placeholder="输入投诉内容" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit" @click="submitComplaint" :disabled="disabled">提交</el-button> 
              </el-form-item>
            </el-form> 
          </div>
          <div class="finishBox" v-hidden="withdrawList.length != 0&&unWithdrawList.length != 0">
            <el-row class="complainFinish" :gutter="30" style="margin: 0;" v-for="item in unWithdrawList"> 
              <el-col :span="21">
                <el-form ref="form"   label-width="100px">
                  <el-form-item label="投诉类型：" style="margin-bottom: 0;">  
                    <span>{{item.type}}</span>
                  </el-form-item>
                  <el-form-item label="被投诉人：" style="margin-bottom: 0;">
                    <span>{{item.name}}</span>
                  </el-form-item>
                  <el-form-item label="投诉内容：" style="margin-bottom: 0;">
                    <span>{{item.content}}</span>
                  </el-form-item> 
                  <el-form-item label="撤回时间：" style="margin-bottom: 0;">
                    <span>{{item.create_time}}</span>
                  </el-form-item> 
                </el-form>  
              </el-col>
              <el-col class="btnBox" :span="3">
                <el-button class="withdraw" type="primary" @click="withdrawComplaint(item.id)">撤回</el-button> 
              </el-col>
            </el-row>
            <el-row class="complainFinish" :gutter="30" style="margin: 0;" v-for="item in withdrawList" v-if="muchShow"> 
              <el-col :span="21">
                <el-form ref="form"  label-width="100px">
                  <el-form-item label="投诉类型：" style="margin-bottom: 0;">  
                    <span>{{item.type}}</span>
                  </el-form-item>
                  <el-form-item label="被投诉人：" style="margin-bottom: 0;">
                    <span>{{item.name}}</span>
                  </el-form-item>
                  <el-form-item label="投诉内容：" style="margin-bottom: 0;">
                    <span>{{item.content}}</span>
                  </el-form-item> 
                  <el-form-item label="撤回时间：" style="margin-bottom: 0;">
                    <span>{{item.create_time}}</span>
                  </el-form-item> 
                </el-form>
              </el-col>
            </el-row>
            <div class="showOrHide" @click="muchShow = !muchShow" v-if="withdrawList.length != 0"><span>{{muchShow?'收起其它':'查看其它'}}</span></div>
          </div>
        </div> 
    </div>
</template>
<script>
import {
  getAgentName,
  submitComplaint,
  getUnWithdrawList,
  getWithdrawList,
  withdrawComplaint
} from "@/server/serverData";
export default {
  name: "complain",
  data() {
    return {
      form: {
        name: ""
      },
      disabled: true,
      type: "",
      complainant: { id: "", name: "" },
      title: "",
      content: "",
      unWithdrawList: [],
      withdrawList: [],
      muchShow: false
    };
  },
  computed: {},
  methods: {
    async search() {
      let res = await getAgentName(this.type);
      if (res.data.code == 1) {
        this.complainant = res.data.data;
        this.disabled = false;
      } else {
        this.complainant = { id: "", name: "" };
        this.disabled = true;
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async submitComplaint() {
      let res = await submitComplaint(
        this.type,
        this.complainant.id,
        this.title,
        this.content
      );
      if (res.data.code == 1) {
        this.title = "";
        this.content = "";
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
    async getUnWithdrawList() {
      let res = await getUnWithdrawList();
      if (res.data.code == 1) {
        this.unWithdrawList = res.data.data;
      } else {
        this.unWithdrawList = [];
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async getWithdrawList() {
      let res = await getWithdrawList();
      if (res.data.code == 1) {
        this.withdrawList = res.data.data.list;
      } else {
        this.withdrawList = [];
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    },
    async withdrawComplaint(id){
      console.log(id)
      let res = await withdrawComplaint(id);
      if (res.data.code == 1) {
        this.getUnWithdrawList();
        this.getWithdrawList();
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
    }
  },
  mounted() {
    this.getUnWithdrawList();
    this.getWithdrawList();
  }
};
</script>
<style lang="scss" scoped>
.complain {
  min-height: calc(100vh - 105px);
  background-color: #ebedf0;
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
      .elForm {
        margin: 50px 245px 50px 215px;
        width: 450px;
        .submit {
          width: 370px;
          height: 44px;
          border-radius: 5px;
        }
      }
    }
    .finishBox {
      margin-top: 20px;
      border-radius: 5px;
      padding: 20px 0 0;
      box-sizing: border-box;
      max-width: 1200px;
      width: 80%;
      min-width: 900px;
      background-color: #fff;
      .complainFinish {
        border-bottom: 1px solid #ccc;
        display: flex;
        max-width: 1200px;
        width: 100%;
        min-width: 900px;
        align-items: center;
        .btnBox {
          height: 40px;
          .withdraw {
            max-width: 120px;
            width: 100%;
            height: 40px;
            background: rgba(0, 153, 255, 1);
            border-radius: 5px;
          }
        }
      }
      .showOrHide {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        span {
          line-height: 50px;
        }
      }
      .showOrHide:hover {
        background-color: #ddd;
      }
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


