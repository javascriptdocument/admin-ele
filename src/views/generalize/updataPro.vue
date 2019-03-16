<template>
  <div class="content">
    <div class="name">产品名称：
      <div class="input">
        <el-input v-model="goods.product.name" disabled placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="name">产品种类：
      <div class="input">
        <el-input
          v-model="goods.product.type === 0 ? '实物产品':goods.product.type == 1? '服务项':''"
          disabled
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="content_serveItem">
      <table width="620">
        <tr>
          <td v-if="goods.specId[0] !== 0">
            <p v-if="goods.specId[0]==1">尺寸</p>
            <p v-if="goods.specId[0]==2">颜色</p>
            <p v-if="goods.specId[0]==3">升数</p>
            <p v-if="goods.specId[0]==4">厚度</p>
          </td>
          <td v-if="goods.specId[1] !== 0">
            <p v-if="goods.specId[1]==1">尺寸</p>
            <p v-if="goods.specId[1]==2">颜色</p>
            <p v-if="goods.specId[1]==3">升数</p>
            <p v-if="goods.specId[1]==4">厚度</p>
          </td>
          <td>已售数量</td>
          <td>库存数量</td>
          <td>市场价格</td>
          <td>活动价格</td>
        </tr>
        <tr v-for="(item,index) in goods.proDet">
          <td v-if="goods.specId[0] !== 0">
            <el-input v-model="item.spec1" placeholder="请输入"></el-input>
          </td>
          <td v-if="goods.specId[1] !== 0">
            <el-input v-model="item.spec2" placeholder="请输入"></el-input>
          </td>
          <td>
            <el-input type="number" v-model="item.sold" placeholder="输入数量"></el-input>
          </td>
          <td>
            <el-input type="number" v-model="item.stock" placeholder="输入数量"></el-input>
          </td>
          <td>
            <el-input type="number" v-model="item.price" placeholder="输入价格"></el-input>
          </td>
          <td>
            <el-input type="number" v-model="item.discount" placeholder="输入价格"></el-input>
            <img
              class="removeObj"
              src="@/assets/generalize/del.png"
              title="移除该规格产品"
              @click="removeObj(index)"
              v-if="goods.product.type != 1"
            >
          </td>
        </tr>
        <el-button class="addObj" title="增加规格" @click="addObj" v-if="goods.product.type != 1">＋</el-button>
      </table>
    </div>
    <div class="uploadImg">
      <p>产品图片:</p>
      <img class="uploadBox resPic" :src="goods.product.img" alt>
    </div>
    <div class="text">
      <p>产品描述:</p>
      <div id="fuwenben"></div>
    </div>
    <div class="name">
      <el-button class="submitProBtn" type="primary" @click="submitPro">上传</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import { post, get } from "../../config/axios";
export default {
  data() {
    return {
      editor: ""
    };
  },
  props: ["goods"],
  watch: {
    goods() {
      // 初始化编辑器的内容
      this.editor.txt.html(this.goods.product.detail);
    }
  },
  methods: {
    submitPro() {
      let that = this,
        product = { ...that.goods.product, desc: that.goods.product.detail },
        specNum = that.goods.specNum,
        specId = that.goods.specId,
        proDet = that.goods.proDet,
        ifsigning = that.goods.product.ifsigning;
      post("Goods/alterGoods", {
        product: product,
        specNum: specNum,
        specId: specId,
        proDet: proDet,
        ifsigning: ifsigning
      }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.$emit('closeDialog')
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    addObj() {
      this.goods.proDet.push({
        spec_id: "",
        spec1: "",
        spec2: "",
        sold: "",
        stock: "",
        price: "",
        discount: ""
      });
    },
    removeObj(id) {
      let that = this;
      this.$alert("确定要删除该规格产品吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        callback: action => {
          if (action == "confirm") {
            let spec_id;
            for (let i = 0; i < that.goods.proDet.length; i++) {
              if (that.goods.proDet[id] == that.goods.proDet[i]) {
                spec_id = that.goods.proDet[id].spec_id;
              }
            }
            post("Goods/del_detail", {
              spec_id: spec_id
            }).then(res => {
              if (that.goods.proDet.length == 1) {
                that.goods.proDet = [
                  {
                    spec_id: "",
                    spec1: "",
                    spec2: "",
                    sold: "",
                    stock: "",
                    price: "",
                    discount: ""
                  }
                ];
              } else {
                that.goods.proDet.splice(id, 1);
              }
            });
          } else if (action == "cancel") {

          }
        }
      });
    },
    clearGoods() {
      this.goods = {};
    }
  },
  mounted() {
    let that = this;
    var E = require("wangeditor");
    this.editor = new E("#fuwenben");
    this.editor.customConfig.menus = [
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
    this.editor.customConfig.onchange = html => {
      this.goods.product.detail = html;
    };
    this.editor.customConfig.uploadImgParams = { token: that.token };
    this.editor.customConfig.uploadImgServer = `${this.baseUrl}Goods/images`; //上传URL

    this.editor.customConfig.uploadFileName = "file";
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
    this.editor.customConfig.uploadImgMaxLength = 5;
    // editor.customConfig.debug = true;
    this.editor.customConfig.uploadImgHooks = {
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
    this.editor.customConfig.uploadImgTimeout = 50000;
    this.editor.create();
  }
};
</script>
<style type="text/css" scoped>
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
  margin-left: 20px;
  width: 100px;
  height: 100px;
}
.resPic {
  border: 1px solid #ccc;
  border-radius: 5px;
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
<style lang="scss" el='stylesheet/scss' scoped>
.input {
  font-size: 13px;
}
.content {
  width: 900px;
  min-height: 100%;
  // height: 700px;
  background: white;
  // overflow: hidden;
  margin: 30px auto;
  // padding-top: 30px;
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
  margin-left: 180px;

  & > table {
    border-left: 1px solid RGBA(185, 195, 205, 1);
    border-top: 1px solid RGBA(185, 195, 205, 1);
    border-bottom: 1px solid RGBA(185, 195, 205, 1);
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
  height: 250px;
  margin: auto;
  & > p {
    font-size: 14px;
    margin-top: 20px;
    float: left;
  }
  & > #fuwenben {
    max-height: 200px;
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
</style>