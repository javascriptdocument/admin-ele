<template>
  <div class="upload">
    <currentPage :id='187' />
    <h2>产品上传</h2>
    <div class="content">
      <div class="name">
        产品名称：
        <div class="input">
          <el-input v-model="product.name" placeholder="请输入内容">
          </el-input>
        </div>
      </div>
      <div class="name">
        产品种类：
        <div class="input">
          <el-select v-model="product.type" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="product.type===0" v-model="selectNum" placeholder="请选择">
            <el-option v-for="item in specNumOptions" :key="item.value" :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="type">
        <div class="input" style="margin-bottom:10px;">
          <el-select v-model="selectSpec1" placeholder="请选择规格种类" @change="spec1Current"
          v-if="product.type===0&&(selectNum===0||selectNum==1)">
            <el-option v-for="item in specOptions" :key="item.id" :label="item.content"
            :value="item.content">
            </el-option>
          </el-select>
          <el-select v-model="selectSpec2" placeholder="请选择规格种类" @change="spec2Current"
          v-if="product.type===0&&selectNum==1">
            <el-option v-for="item in specOptions" :key="item.id" :label="item.content"
            :value="item.content">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="content_serveItem">
        <table v-if="product.type==1" width="620">
          <tr>
            <td>已售数量</td>
            <td>库存数量</td>
            <td>市场价格/元</td>
            <td>活动价格/元</td>
          </tr>
          <tr v-for="(item,index) in obj1">
            <td>
              <el-input type="number" v-model="item.sold" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.stock" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.price" placeholder="输入价格">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.discount" placeholder="输入价格">
              </el-input>
            </td>
          </tr>
        </table>
        <table v-if="product.type===0&&selectNum===0" width="620">
          <tr>
            <td>
              <p>{{selectSpec1}}</p>
            </td>
            <td>已售数量</td>
            <td>库存数量</td>
            <td>市场价格/元</td>
            <td>活动价格/元</td>
          </tr>
          <tr v-for="(item,index) in obj2">
            <td>
              <el-input v-model="item.spec1" placeholder="请输入">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.sold" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.stock" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.price" placeholder="输入价格">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.discount" placeholder="输入价格">
              </el-input>
              <img class="removeObj" src="../../assets/generalize/del.png" title="移除该规格产品"
              @click="removeObj2(index)">
            </td>
          </tr>
          <el-button class="addObj" @click="addObj2">
            ＋
          </el-button>
        </table>
        <table v-if="product.type===0&&selectNum===1" width="620">
          <tr>
            <td>
              <p>{{selectSpec1}}</p>
            </td>
            <td>
              <p>{{selectSpec2}}</p>
            </td>
            <td>已售数量</td>
            <td>库存数量</td>
            <td>市场价格</td>
            <td>活动价格</td>
          </tr>
          <tr v-for="(item,index) in obj3">
            <td>
              <el-input v-model="item.spec1" placeholder="请输入">
              </el-input>
            </td>
            <td>
              <el-input v-model="item.spec2" placeholder="请输入">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.sold" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.stock" placeholder="输入数量">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.price" placeholder="输入价格">
              </el-input>
            </td>
            <td>
              <el-input type="number" v-model="item.discount" placeholder="输入价格">
              </el-input>
              <img class="removeObj" src="../../assets/generalize/del.png" title="移除该规格产品"
              @click="removeObj3(index)" >
            </td>
          </tr>
          <el-button class="addObj" @click="addObj3">
            ＋
          </el-button>
        </table>
      </div>
      <div class="uploadImg">
        <p>
          产品图片:
        </p>
        <el-upload class="uploadBox" :action="url"
        list-type="picture-card" :data="uploadData" :limit="1" :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
        :on-error="uploadShopPhotoErr" :on-exceed="shopPhotoMax">
          <i class="el-icon-plus">
          </i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>
      <div class="text">
        <p>
          产品描述:
        </p>
        <div id="fuwenben">
        </div>
      </div>
      <div class="name">
        <el-button class="submitProBtn" type="primary" @click="submitPro">
          上传
        </el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import currentPage from "@/views/common/currentPage";
import { post, get } from "../../config/axios";
export default {
  components: {
    currentPage,
  },
  data() {
    return {
      uploadData: {},
      url:this.baseUrl+'Goods/images',
      // 整体产品的属性
      product: {
        name: "",
        type: "", // 服务项    实物产品
        img: "",
        desc: ""
      },
      // 产品种类选项
      typeOptions: [
        {
          value: 1,
          label: "服务项"
        },
        {
          value: 0,
          label: "实物产品"
        }
      ],
      // 实物产品选项
      selectNum: "",
      specNumOptions: [
        {
          value: 0,
          label: "一种规格"
        },
        {
          value: 1,
          label: "两种规格"
        }
      ],

      specOptions: [], //  颜色 尺寸 升数 厚度 。。。
      selectSpec1: "",
      selectSpec2: "",
      // 服务项
      obj1: [
        {
          spec1: "",
          spec2: "",
          sold: "",
          stock: "",
          price: "",
          discount: ""
        }
      ],
      // 实物产品 一种规格
      obj2: [
        {
          spec1: "",
          spec2: "",
          sold: "",
          stock: "",
          price: "",
          discount: ""
        }
      ],
      // 实物产品 两种规格
      obj3: [
        {
          spec1: "",
          spec2: "",
          sold: "",
          stock: "",
          price: "",
          discount: ""
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      editorContent: "",
      token: sessionStorage.getItem("token")
    };
  },
  methods: {
    // 产品提交
    submitPro() {
      let that = this,
        product,
        specNum,
        specId,
        proDet;
      product = this.product;
      // 服务项
      if (this.product.type == 1) {
        proDet = this.obj1;
        specNum = "";
        specId = [];
      } else if (this.product.type === 0) {
        // 实物
        if (this.selectNum === 0) {
          // 一个规格
          proDet = this.obj2; // prodet
          specNum = 1;
          switch (this.selectSpec1){
            case "尺寸": specId = [1];
              break;
            case "颜色":specId = [2];
              break;
            case "升数":specId = [3];
              break;
            case "厚度":specId = [4];
              break;
          }
        } else if (this.selectNum == 1) {
          //两个规格
          proDet = this.obj3;
          specNum = 2;
          let specId1,specId2;
          switch (this.selectSpec1){
            case "尺寸": specId1 = 1;
              break;
            case "颜色":specId1 = 2;
              break;
            case "升数":specId1 = 3;
              break;
            case "厚度":specId1 = 4;
              break;
          }
          switch (this.selectSpec2){
            case "尺寸": specId2 = 1;
              break;
            case "颜色":specId2 = 2;
              break;
            case "升数":specId2 = 3;
              break;
            case "厚度":specId2 = 4;
              break;
          }
          specId = [specId1, specId2];
        }
      }
      post("Goods/addGoods", {
        product: product,
        specNum: specNum,
        specId: specId,
        proDet: proDet,
        ifsigning: 1
      }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.$router.push('/generalize/control')
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    // 当选择完一种规格后，去除当前规格
    spec1Current(e) {
      let that = this;
      post("Goods/standard").then(res => {
        this.specOptions = res.data.data;
        if (that.selectSpec1 !== "") {
          for (let i = 0; i < this.specOptions.length; i++) {
            if (that.selectSpec1 == this.specOptions[i].content) {
              this.specOptions.splice(i, 1);
            }
          }
        }
      });
    },
    spec2Current(e) {
      let that = this;
      post("Goods/standard").then(res => {
        this.specOptions = res.data.data;
        if (that.selectSpec2 !== "") {
          for (let i = 0; i < this.specOptions.length; i++) {
            if (that.selectSpec2 == this.specOptions[i].content) {
              this.specOptions.splice(i, 1);
            }
          }
        }
      });
    }, 
    handleRemove(file, fileList) {
      this.product.img = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      this.uploadData.token = this.token;
      const isvalid =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isvalid) {
        this.$message.error("上传图片格式应为 jpeg/png/jpg!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isvalid && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.product.img = res;
    },
    uploadShopPhotoErr: function(err) {
      this.$message.error("上传失败");
    },
    //上传照片数量超出限制
    shopPhotoMax: function() {
      this.$message({
        message: "最多可上传1张照片！",
        type: "warning"
      });
    },
    addObj2() {
      this.obj2.push({
        spec1: "",
        spec2: "",
        sold: "",
        stock: "",
        price: "",
        discount: ""
      });
    },
    addObj3() {
      this.obj3.push({
        spec1: "",
        spec2: "",
        sold: "",
        stock: "",
        price: "",
        discount: ""
      });
    },
    // 移除产品2
    removeObj2(id) {
      let that = this;

      this.$alert("确定要删除该规格产品吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        callback: action => {
          if (action == "confirm") {
            this.obj2.splice(id, 1);
          } else if (action == "cancel") {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        }
      });
    },
    // 移除产品3
    removeObj3(id) {
      this.$alert("确定要删除该规格产品吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        callback: action => {
          if (action == "confirm") {
            this.obj3.splice(id, 1);
          }
        }
      });
    }
  },
  watch: {
    selectNum() {
      let that = this;
      this.selectSpec2 = "";
      post("Goods/standard").then(res => {
        that.specOptions = res.data.data;
        if (that.selectNum === 1) {
          if (that.selectSpec1 !== "") {
            for (let i = 0; i < this.specOptions.length; i++) {
              if (that.selectSpec1 == this.specOptions[i].content) {
                this.specOptions.splice(i, 1);
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    let that = this;
    var E = require("wangeditor");
    var editor = new E("#fuwenben");
    editor.customConfig.menus = [
      "foreColor",
      "backColor",
      "head",
      "bold",
      "italic",
      "underline",
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon",
      "image"
    ];
    editor.customConfig.onchange = html => {
      this.product.desc = html;
    };
    editor.customConfig.uploadImgParams = { token: that.token };
    editor.customConfig.uploadImgServer = this.baseUrl+"Goods/images"; //上传URL

    editor.customConfig.uploadFileName = "file";
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    // editor.customConfig.debug = true;
    editor.customConfig.uploadImgHooks = {
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        insertImg(result);
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    };
    editor.create();
  }
};
</script>
<style type="text/css" scoped>
 /deep/ .current{
    margin-top: 0 !important;
  }
.name .el-input__inner {
  color: black;
}
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/deep/ input[type="number"] {
  -moz-appearance: textfield;
}
.uploadBox {
  margin-left: 80px;
}
.el-upload {
  /* margin-left: 20px; */
}
.el-upload--picture-card {
  /* width: 100px;
  height: 100px;
  line-height: 100px; */
}
.w-e-text-container {
  max-height: 170px !important;
}
</style>
<style lang="scss" rel='stylesheet/scss' scoped>
.upload {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: RGBA(235, 237, 240, 1);
  /deep/ .el-input__inner::-webkit-input-placeholder {
    font-size: 12px !important;
  }
  /deep/ .el-input__inner{

  }

}
h2 {
  text-align: center;
}
.input {
  font-size: 13px;
}
.content {
  width: 1200px;
  min-height: 100%;
  // height: 700px;
  background: white;
  // overflow: hidden;
  margin: 30px auto;
  padding-top: 30px;
}
.name {
  width: 700px;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  text-align: left;
  margin: 10px auto;
  & > .input {
    width: 620px;
    height: 100%;
    float: right;
  }
}
.uploadImg {
  width: 700px;
  margin: 10px auto;
}
.uploadImg p {
  float: left;
  font-size: 14px;
}
.content_serveItem {
  width: 620px;
  height: auto;
  border-radius: 5px;
  & > table {
    border-left: 1px solid RGBA(185, 195, 205, 1);
    border-top: 1px solid RGBA(185, 195, 205, 1);
    position: relative;
    .addObj {
      position: absolute;
      right: -50px;
      top: 10px;
      padding: 0;
      width: 32px;
      height: 32px;
      line-height: 32px;
    }
  }
  margin-left: 330px;
  & > table td {
    border-right: 1px solid RGBA(185, 195, 205, 1);
    border-bottom: 1px solid RGBA(185, 195, 205, 1);
    padding: 0px 10px 0 10px;
  }
  & > table tr:nth-child(1) {
    background: RGBA(215, 225, 230, 1);
    font-size: 14px;
  }
  & > table tr {
    height: 50px;
    text-align: center;
    line-height: 50px;
    td:last-child {
      position: relative;
      .removeObj {
        position: absolute;
        right: -50px;
        top: 10px;
      }
      .removeObj:hover {
        background-color: #ddd;
      }
    }
  }
}
.text {
  width: 700px;
  margin: auto;
  & > p {
    font-size: 14px;
    margin-top: 20px;
    float: left;
  }
  & > #fuwenben {
    max-height: 300px;
    width: 620px;
    float: right;
    margin-left: 20px;
  }
}
.submitProBtn {
  margin-left: 300px;
  margin-top: 20px;
}
.type {
  width: 700px;
  height: auto;
  font-size: 14px;
  text-align: left;
  margin: 10px auto;
  & > .input {
    width: 620px;
    height: auto;
    float: right;
  }
}
.btn {
  display: block;
  width: 150px;
  padding-bottom: 10px;
}
.add {
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: RGBA(185, 195, 205, 1);
  background: orange;
}
.isOk {
  width: 50px;
  height: 40px;
  background: red;
  border: 0px;
  border-radius: 3px;
  cursor: pointer;
  color: white;
}
.inputName {
  width: 50px;
}
/deep/ .w-e-text-container {
  height: 200px !important;
}

/deep/ .currentPage .current[data-v-42680f1e] {
  margin: 20px;
}
</style>