<template>
	<div class="upload">
	<currentPage/>
		<h2>产品上传</h2>
		<div class="content">
			<div class="name">
				产品名称： <div class="input"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
			</div>
			<div class="name">
				产品种类：<div class="input">
						<el-select v-model="productAndService " placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						  <el-select v-if="productAndService==1" v-model="specificationNum" placeholder="请选择">
						    <el-option
						      v-for="item in options2"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</div>
			</div>
			<div class="type">
				<div class="input" style="margin-bottom:10px;" v-if="specificationNum==0&&productAndService==1">
						<el-select class="btn" v-model="zhonglei1" placeholder="请选择规格种类">
						    <el-option
						      v-for="item in options3"
						      :key="item.id"
						      :label="item.content"
						      :value="item.id">
						    </el-option>
						  </el-select>
						  <el-tag
						  	  style="float:left;margin-right:10px;"
							  v-for="tag in tags1"
							  :key="tag.index"
							  closable
							  :type="tag.type">
							  {{tag.name}}
							</el-tag>
						<el-popover
							class="btn2"
						    placement="bottom"
						    width="50"
						    trigger="click"
						    >
						    <el-button slot="reference">＋</el-button>
						    <template>
						    	<el-input style="width:100px;" v-model="Model1" placeholder="请输入内容"></el-input>
						    	<button @click="isOk1" class="isOk">确定</button>
						    </template>
						  </el-popover>
				</div>
				<div class="input" style="margin-bottom:10px;" v-if="specificationNum==1&&productAndService==1">
						<el-select class="btn" v-model="zhonglei2" placeholder="请选择规格种类">
						    <el-option
						      v-for="item in options3"
						      :key="item.id"
						      :label="item.content"
						      :value="item.id">
						    </el-option>
						  </el-select>
						  <el-tag
						  	  style="float:left;margin-right:10px;"
							  v-for="tag in tags2"
							  :key="tag.index"
							  closable
							  :type="tag.type">
							  {{tag.name}}
							</el-tag>
						<el-popover
							class="btn2"
						    placement="bottom"
						    width="50"
						    trigger="click"
						    >
						    <el-button slot="reference">＋</el-button>
						    <template>
						    	<el-input style="width:100px;" v-model="Model2" placeholder="请输入内容"></el-input>
						    	<button @click="isOk2" class="isOk">确定</button>
						    </template>
						  </el-popover>
						  <el-select style="margin-top:10px" class="btn" v-model="zhonglei3" placeholder="请选择规格种类">
						    <el-option
						      v-for="item in options3"
						      :key="item.id"
						      :label="item.content"
						      :value="item.id">
						    </el-option>
						  </el-select>
						  <el-tag
						  	  style="float:left;margin-right:10px;"
							  v-for="tag in tags3"
							  :key="tag.index"
							  closable
							  :type="tag.type">
							  {{tag.name}}
							</el-tag>
						<el-popover
							class="btn2"
						    placement="bottom"
						    width="50"
						    trigger="click"
						    >
						    <el-button slot="reference">＋</el-button>
						    <template>
						    	<el-input style="width:100px;" v-model="Model3" placeholder="请输入内容"></el-input>
						    	<button @click="isOk3" class="isOk">确定</button>
						    </template>
						  </el-popover>
				</div>
			</div>
			<div class="content_serveItem">
				<table v-if="productAndService==0"  width="620">
					<tr>
						<td>已售数量</td>
						<td>库存数量</td>
						<td>市场价格/元</td>
						<td>活动价格/元</td>
					</tr>
					<tr>
						<td><el-input type="number" v-model="input" placeholder="输入数量"></el-input></td>
						<td><el-input type="number" v-model="input" placeholder="输入数量"></el-input></td>
						<td><el-input type="number" v-model="input" placeholder="输入价格"></el-input></td>
						<td><el-input type="number" v-model="input" placeholder="输入价格"></el-input></td>
					</tr>
				</table>
				<table v-if="productAndService==1&&specificationNum==0"  width="620">
					<tr>
						<td>
						<p v-if="zhonglei1==1">尺寸</p>
						<p v-if="zhonglei1==2">颜色</p>
						<p v-if="zhonglei1==3">升数</p>
						<p v-if="zhonglei1==4">厚度</p>
						</td>
						<td>已售数量</td>
						<td>库存数量</td>
						<td>市场价格/元</td>
						<td>活动价格/元</td>
					</tr>
					<tr v-for='item in tags1'>
						<td>{{item.name}}</el-input></td>
						<td><input type="" class="inputName" name="" placeholder="输入数量"></td>
						<td><input type="" class="inputName" name="" placeholder="输入数量"></td>
						<td><input type="" class="inputName" name="" placeholder="输入数量"></td>
						<td><input type="" class="inputName" name="" placeholder="输入数量"></td>
					</tr>
					</table>
					<table v-if="productAndService==1&&specificationNum==1"  width="620">
					<tr>
						<td>
						<p v-if="zhonglei2==1">尺寸</p>
						<p v-if="zhonglei2==2">颜色</p>
						<p v-if="zhonglei2==3">升数</p>
						<p v-if="zhonglei2==4">厚度</p>
						</td>
						<td>
						<p v-if="zhonglei3==1">尺寸</p>
						<p v-if="zhonglei3==2">颜色</p>
						<p v-if="zhonglei3==3">升数</p>
						<p v-if="zhonglei3==4">厚度</p>
						</td>
						<td>已售数量</td>
						<td>库存数量</td>
						<td>市场价格</td>
						<td>活动价格</td>
					</tr>
					<tr v-for='(item,index) in tags2'  >
						<td>{{item.cond1}}</td>
						<td>{{item.cond2}}</el-input></td>
						<td><input  @blur="input1(index,$event)" class="inputName" type="" name="" placeholder="输入数量"></td>
						<td><input  @blur="input2(index,$event)" class="inputName" type="" name="" placeholder="输入数量"></td>
						<td><input  @blur="input3(index,$event)" class="inputName" type="" name="" placeholder="输入数量"></td>
						<td><input  @blur="input4(index,$event)" class="inputName" type="" name="" placeholder="输入数量"></td>
					</tr>
					<!-- <tr v-for='item in tags3'>
						<td><el-input class="input" type="number" v-model="input" placeholder="输入数量"></el-input></td>
						<td>{{item.name}}</td>
						<td><el-input class="input" type="number" v-model="input" placeholder="输入数量"></el-input></td>
						<td><el-input class="input" type="number" v-model="input" placeholder="输入数量"></el-input></td>
						<td><el-input class="input" type="number" v-model="input" placeholder="输入价格"></el-input></td>
						<td><el-input class="input" type="number" v-model="input" placeholder="输入价格"></el-input></td>
					</tr> -->
				</table>
			</div>
			<div class="uploadImg">
				<p>产品图片:</p>
				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove">
					<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="text">
				<p>产品描述:</p>
					<div id="fuwenben">
						
					</div>
			</div>
			<!-- <el-button type="primary">上传</el-button> -->
		</div>
	</div>
</template>
<script type="text/javascript">
import currentPage from "../common/currentPage.vue";
export default {
  components: {
    currentPage
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: "服务项"
        },
        {
          value: 1,
          label: "实物产品"
        }
      ],
      options2: [
        {
          value: 0,
          label: "一种规格"
        },
        {
          value: 1,
          label: "两种规格"
        }
      ],
      options3: [],
      productAndService: 0,
      specificationNum: 0, //选择几种规格
      specificationOne: "",
      specificationList: [],
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      editorContent: "",
      selectListNum: [], //选择的规格数量
      tags1: [
        // { name: '标签三', type: 'info' },
      ],
      tags2: [
        // { name: '标签三', type: 'info' },
      ],
      tags3: [
        // { name: '标签三', type: 'info' },
      ],
      Model1: "",
      Model2: "",
      Model3: "",
      //请选择规格种类----------------------

      zhonglei1: "",
      zhonglei2: "",
      zhonglei3: "",

      //-----------------------

      array: [
        {
          cond1: "",
          cond2: "",
          sold: "",
          repertory: "",
          mPrice: "",
          proPrice: ""
        }
      ],
    };
  },
  watch: {
    productAndService() {
      post("Goods/standard")
        .then(res => {
          this.options3 = res.data.data;
        });
    }
    // 'specificationNum'(){//如果不是一种规格请求规格列表接口

    // 		post('Goods/standard').then(res => {
    // 			this.options3 = res.data.data;
    // 		})
    // 		for (var i = 0; i <= this.specificationNum; i++) {//取到用户选择的规格数后,渲染相同数量的可选规格类型下拉框
    // 			var a={Model:''};
    // 			this.selectListNum.push(a);
    // 		} 
    // },
  },
  mounted() {
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
      this.editorContent = html;
    };
    editor.create();
  },
  methods: {
    handleRemove(file, fileList) { 
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //用户填写规格详情确定---------------------------------------------
    isOk1() {
      this.tags1.push({ name: this.Model1, type: "info" });
    },
    isOk2() {
      this.tags2.push({
        name: this.Model2,
        type: "info",
        cond1: "",
        cond2: "",
        sold: "",
        repertory: "",
        mPrice: "",
        proPrice: ""
      });
      for (var i = 0; i < this.tags2.length; i++) {
        // this.array[i].push({cond1:'',cond2:'',sold:'',repertory:'',mPrice:'',proPrice:''})
        this.tags2[i].cond1 = this.tags2[i].name;
        // 	if (this.tags3[i].name!='') {
        // 	this.tags2[i].cond2 = this.tags3[i].name
        // }
      }
    },
    isOk3() {
      this.tags3.push({
        name: this.Model3,
        type: "info",
        cond1: "",
        cond2: "",
        sold: "",
        repertory: "",
        mPrice: "",
        proPrice: ""
      });
      for (var i = 0; i < this.tags3.length; i++) {
        // this.array.push({cond1:'',cond2:'',sold:'',repertory:'',mPrice:'',proPrice:''})
        // if (this.tags2[i].name!='') {
        // 	this.tags2[i].cond1 = this.tags2[i].name
        // }
        this.tags2[i].cond2 = this.tags3[i].name;
        // }
      }
    },
    //input框失去焦点触发事件----------------------------------------------------
    input1(index, e) {
      this.tags2[index].sold = e.target.value; 
    },
    input2(index, e) {
      this.tags2[index].repertory = e.target.value;
    },
    input3(index, e) {
      this.tags2[index].mPrice = e.target.value;
    },
    input4(index, e) {
      this.tags2[index].proPrice = e.target.value; 
    }
  }
};
</script>
<style type="text/css">
.name .el-input__inner {
  color: black;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.el-upload {
  margin-left: 20px;
}
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.w-e-text-container {
  max-height: 170px !important;
}
</style>
<style lang="scss" rel='stylesheet/scss' scoped>
.upload {
  width: 100%;
  height: 100%;
  background: RGBA(235, 237, 240, 1);

}
h2 {
  text-align: center;
}
.input {
  font-size: 13px;
}
.content {
  width: 1200px;
  height: 700px;
  background: white;
  overflow: hidden;
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
  height: 100px;
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
  overflow: hidden;
  border-left: 1px solid RGBA(185, 195, 205, 1);
  border-top: 1px solid RGBA(185, 195, 205, 1);
  border-bottom: 1px solid RGBA(185, 195, 205, 1);
  margin-left: 330px;
  & > table td {
    border-right: 1px solid RGBA(185, 195, 205, 1);
    border-bottom: 1px solid RGBA(185, 195, 205, 1);
    padding: 0px 20px 0 20px;
  }
  & > table tr:nth-child(1) {
    background: RGBA(215, 225, 230, 1);
    font-size: 14px;
  }
  & > table tr {
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
.text {
  width: 700px;
  height: 200px;
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
.el-button {
  display: block;
  width: 60px;
  height: 30px;
  font-size: 20px;
  text-align: left;
  line-height: 0px;
  // margin: 40px auto;
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
/deep/ .currentPage .current[data-v-42680f1e] {
  margin: 20px;
}
</style>