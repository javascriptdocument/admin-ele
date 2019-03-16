<template>
  <div class="form">
    <p class="col-32373C ft-36">请完善店铺信息</p>
    <div class="form_input">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="维修厂名称">
          <el-input v-model="form.company" placeholder="请输入维修厂名称"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.leader" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="主修" class="Major" prop="major">
          <div class="Major_input">
            <el-input placeholder="请输入" v-model="form.major[0]"></el-input>
            <el-input placeholder="请输入" v-model="form.major[1]"></el-input>
            <el-input placeholder="请输入" v-model="form.major[2]"></el-input>
            <el-input placeholder="请输入" v-model="form.major[3]"></el-input>
            <el-input placeholder="请输入" v-model="form.major[4]"></el-input>
            <el-input placeholder="请输入" v-model="form.major[5]"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="所在城市" class="city">
          <el-select placeholder="请选择省" v-model="form.province" @change="GET_City">
            <el-option
              v-for="item of provinceList"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            ></el-option>
          </el-select>
          <el-select placeholder="请选择市" v-model="form.city" @change="GET_area">
            <el-option
              v-for="item of cityList"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            ></el-option>
          </el-select>
          <el-select placeholder="请选择区/县" v-model="form.county" @change="GET_countyId">
            <el-option
              v-for="item of areaList"
              :key="item.id"
              :value="item.name"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input placeholder="输入街道名称及门牌号" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="服务电话" prop="serphone">
          <el-input placeholder="请输入服务电话" v-model="form.serphone"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介" prop="about">
          <el-input type="textarea" autosize v-model="form.about" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="店铺照片" class="upload cft" prop="upload">
          <div class="upload_item">
            <upload :on-success="uploadShopSuccess" :on-remove="uploadShopRemove"></upload>
          </div>
          <div class="upload_item">
            <upload :on-success="uploadShopSuccess" :on-remove="uploadShopRemove"></upload>
          </div>
          <div class="upload_item">
            <upload :on-success="uploadShopSuccess" :on-remove="uploadShopRemove"></upload>
          </div>
        </el-form-item>
        <el-form-item label="营业执照" class="upload cft" prop="upload">
          <div class="upload_item">
            <upload :on-success="uploadLicense" :on-remove="uploadLicenseRemove"></upload>
          </div>
        </el-form-item>
        <el-form-item label="提现卡号" prop="account" v-if="shop_type == 1">
          <el-input placeholder="输入提现卡号" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="开户名" prop="account_name" v-if="shop_type == 1">
          <el-input placeholder="输入开户名" v-model="form.account_name"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="branch" v-if="shop_type == 1">
          <el-select v-model="form.bank" placeholder="请选择开户行" style="width: 100%;">
            <el-option
              v-for="item of BankList"
              :key="item.id"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分行" prop="branch" v-if="shop_type == 1">
          <el-input placeholder="输入所属分行（例：石家庄支行）" v-model="form.branch"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" :disabled="disabled" @click="Submit('form')" class="Submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getPro,
  getSon,
  setShopInfo,
  getShopInfo,
  getBankCode
} from "@/server/serverData";
import upload from "@/views/common/upload";
export default {
  data() {
    return {
      BankList: [], //银行列表
      provinceList: [], //省份数据
      cityList: [], //市数据
      areaList: [], //县或区数据
      form: {
        company: 1,
        leader: "",
        major: [],
        province: "",
        city: "",
        county: "",
        address: "",
        serphone: "",
        about: "",
        photo: [],
        license: "",
        county_id: "",

        account: "",
        account_name: "",
        bank: "",
        branch: ""
      },
      disabled: false,
      shop_type: window.sessionStorage.getItem("shop_type")
    };
  },
  components: {
    upload
  },
  methods: {
    async getBank() {
      let res = await getBankCode();
      this.BankList = res;
    },
    async init() {
      try {
        /** 获取用户默认信息 **/
        let res = await getShopInfo();
        console.log(res);
        if (res.status == 200) {
          this.form.company = res.data.company;
          this.form.leader = res.data.leader;
        }
      } catch (err) {
        console.log(err);
      }
      try {
        /** 获取所有省份 **/
        let res = await getPro();
        if (res.status == 200) {
          this.provinceList = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async GET_City(item) {
      //获取所有市
      let id = this.finID(this.provinceList, item);
      this.form.city = "";
      this.form.county = "";
      let res = await getSon(id);
      if (res.status == 200) {
        this.cityList = res.data;
      }
    },
    async GET_area(item) {
      //获取区或者县
      let id = this.finID(this.cityList, item);
      this.form.county = "";
      let res = await getSon(id);
      if (res.status == 200) {
        console.log(res);
        this.areaList = res.data;
      }
    },
    GET_countyId(item) {
      //获取县或区id
      this.form.county_id = this.finID(this.areaList, item);
    },
    uploadShopSuccess(
      res,
      file //上传成功的店铺照片
    ) {
      console.log(res);
      this.form.photo.push(res);
    },
    uploadShopRemove(
      file //删除成功的店铺照片
    ) {
      let findIndex = this.form.photo.findIndex(v => {
        return v == file.response;
      });
      this.form.photo.splice(findIndex, 1);
    },
    uploadLicense(res) {
      //上传成功的营业执照

      this.form.license = res;
    },
    uploadLicenseRemove(file) {
      //删除营业执照
      this.form.license = "";
    },
    async Submit(
      form //提交
    ) {
      this.disabled = true;
      console.log(this.disabled);
      let res = await setShopInfo(this.form);
      if (res.data.code == 1) {
        var that = this;
        this.$message({
          message: res.data.msg,
          type: "success",
          onClose() {
            /** 拿去缓存中的数据,进行判断选择了那个店铺,根据选择的店铺跳转到指定的页面**/
            let shop_type = window.sessionStorage.getItem("shop_type");

            switch (shop_type) {
              /** 1.邦保养加盟,完善信息后,跳转到审核页面,查看注册状态 **/
              case "1":
                that.$router.push("/Submit_Toexamine");
                break;
              /*2.车管家合作,完善信息后=>扫码进入小程序激活系统**/
              // case '2':
              //     that.$router.push({path:"/Unpaid",query:{sid:that.$route.query.sid}})
              //     break;
              /* 19/01/07  隐藏 扫描二维码到小程序购买流程,改为填写完信息后直接注册成功
                         首年免费,第二年开始每年365 */
              case "2":
                that.$router.push("/Submit_Toexamine");
                break;
            }

            that.disabled = false;
          }
        });
      } else {
        this.$message.error(res.data.msg);
        this.disabled = false;
      }
      console.log(res);
    },
    finID(arr, item) {
      //查询id
      let findIndex = arr.findIndex(v => {
        return v.name == item;
      });
      return arr[findIndex].id;
    }
  },
  mounted() {
    this.init();
    this.getBank();
  }
};
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.form {
  text-align: center;
  padding-top: 87px;
  .form_input {
    width: 62%;
    background-color: white;
    margin: 30px auto 0 auto;
    padding: 40px 0 42px 0;
    & > form {
      width: 50%;
      margin: 0 auto;
      /deep/ .el-form-item {
        margin-bottom: 10px;
      }
      /deep/ .el-form-item__error {
        position: absolute;
        top: 10px;
        right: -130px;
        left: inherit;
      }
      .Major {
        position: relative;
        margin-left: -10px;
        /deep/ .el-form-item__label {
          position: absolute;
          left: 10px;
        }
        .el-input {
          width: calc(100% / 3 - 10px);
          margin-bottom: 10px;
          margin-left: 10px;
        }
      }
      .city {
        margin-left: -10px;
        position: relative;
        /deep/ .el-form-item__label {
          position: absolute;
          left: 10px;
        }
        .el-select {
          width: calc(100% / 3 - 10px);
          margin-left: 10px;
        }
      }
      .upload {
        .upload_item {
          float: left;
          text-align: left;
          width: 64px;
          height: 64px;
          margin-right: 10px;
          overflow: hidden;
        }
      }
      .Submit {
        width: 70%;
        margin-top: 20px;
      }
    }
  }
}
</style>