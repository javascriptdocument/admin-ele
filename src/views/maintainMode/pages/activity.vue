<template>
	<div class="maintain">
	<div class="viewMain">
		<div class="tabChange">
			<div :class="[currentTab==1?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(1)">活动列表</div>
			<div :class="[currentTab==2?'second col-32373C tabActive':'','first col-32373C']" @click="tabChange(2)">上传活动</div>
		</div>
		<div class="upload" v-show="currentTab == 2">
			<div class="content">
				<h2>上传活动</h2>
				<div class="name">
					活动条件：
					<div class="input">
						<el-input v-model="product.content" placeholder="输入活动条件">
						</el-input>
					</div>
				</div>
				<div class="name">
					活动赠品：
					<div class="input">
						<el-input v-model="product.gift" placeholder="输入赠品名称">
						</el-input>
					</div>
				</div>
				<div class="uploadImg">
					<p>
						赠品图片：
					</p>
					<el-upload class="uploadBox" :action="url" ref="upload"
					list-type="picture-card" :data="uploadData" name="image" :limit="1" :before-upload="beforeAvatarUpload"
					:on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
					:on-error="uploadShopPhotoErr" :on-exceed="shopPhotoMax">
						<i class="el-icon-plus">
						</i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt>
					</el-dialog>
				</div>
				<div class="name">
					<el-button class="submitProBtn" type="primary" @click="submitPro">
						上传
					</el-button>
				</div>
			</div>
		</div>

		<div class="activity_list" v-show="currentTab == 1">
			<el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">
				<el-table-column prop="photo" label="赠品图片" align="center" >
					<template slot-scope="scope">
						<img class="tableImg" :src="scope.row.photo" alt="">
					</template>
				</el-table-column>
				<el-table-column prop="content" label="活动条件" align="center"  >
				</el-table-column>
				<el-table-column prop="gift" label="活动赠品" align="center" >
				</el-table-column>
				<el-table-column prop="create_time" label="上传时间" align="center" >
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
		        <el-button @click="clickEdit(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="clickDelete(scope.row)" type="text" style="color:#FF2828" size="small">删除</el-button>
		      </template>
				</el-table-column>
				<el-table-column prop="status" label="开关" align="center">
					<template slot-scope="scope">
	          <el-switch
	            :width="50"
	            v-model="scope.row.status"
	            @change="Switch(scope.row)"
	            active-text="显示"
	            inactive-text="隐藏"
							:active-value = '0'
							:inactive-value = '1'
	            active-color="RGBA(15, 210, 75, 1)"
	            inactive-color="RGBA(100, 105, 115, 1)"
	          ></el-switch>
	        </template>
				</el-table-column>
			</el-table>
		</div>


		<div class="dialog" v-show="dialogTableVisible">
			<el-dialog :visible.sync="dialogTableVisible">
				<div class="upload">
					<div class="">
						<h2>修改活动</h2>
							<div class="name">
									活动条件：
								<div class="input">
									  <el-input v-model="editProduct.content" placeholder="请输入内容"></el-input>
								</div>
							</div>
							<div class="name">
								活动赠品：
								<div class="input">
									<el-input v-model="editProduct.gift" placeholder="输入赠品名称" />
								</div>
							</div>
							<div class="uploadImg">
								<p>
									赠品图片：
								</p>
								<el-upload class="uploadBox" :action="url"
								list-type="picture-card" :data="uploadData" name="image" :limit="1" :before-upload="beforeAvatarUpload"
								:on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess"
								:on-error="uploadShopPhotoErr" :on-exceed="shopPhotoMax" :file-list="fileList" >
									<i class="el-icon-plus">
									</i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="editProduct.photo" alt>
								</el-dialog>
							</div>
							<div class="name">
								<el-button class="submitProBtn" type="primary" @click="editProBtn">
									提交
								</el-button>
							</div>

					</div>
				</div>
			</el-dialog>
		</div>


	</div>
</div>
</template>
<script type="text/javascript">
import { post, get } from "../../../config/axios";
export default {

  data() {
    return {
      uploadData: {},
			tableData:[],
			currentTab:1,
      url:this.baseUrl+'Action/uploadImg',
      product: {},
			fileList:[{
				url:""
			}],
			editProduct:{
				content:"",
				gift:"",
				photo:""
			},
      dialogImageUrl: "",
      dialogVisible: false,
			dialogTableVisible:false,
      token: sessionStorage.getItem("token")
    };
  },
	created(){
		this.renderList()
	},
  methods: {
		tabChange(val){
			this.currentTab = val;
		},
		renderList(){
			post("Action/actionList").then(res=>{
					this.tableData = res.data.data.list
			})
		},
		clickEdit(e){
			this.dialogTableVisible = true;
			this.editProduct.id = e.id;
			this.editProduct.content = e.content;
			this.editProduct.gift = e.gift;
			this.editProduct.photo = e.photo;
			this.fileList[0].url = e.photo
		},
		clickDelete(e){
			this.$confirm('确认删除？')
			.then(_=> {
          this.deleteAct(e)
      }).catch(err=>{})
		},
		deleteAct(e){
			post("Action/delAction",{
				token:this.token,
				id:e.id
			}).then(res=>{
				if(res.data.code == 1){
					this.$message.success(res.data.msg)
					this.renderList()
				}
			})
		},
		Switch(e){
			post("Action/handleAction",{
				token:this.token,
				id: e.id
			})
			.then(res=>{
				if(res.data.code == 1){
					this.$message.success(res.data.msg)
				}
			})
		},
		editProBtn(){
			post("Action/updateAction",this.editProduct)
			.then(res=>{
				if(res.data.code == 1){
					this.editProduct.photo = "";
					this.dialogTableVisible = false;
					this.$message.success(res.data.msg);
					this.renderList();
				}
			})
		},
    submitPro() {
			if(!this.product.gift){
				this.$message.error("活动条件不能为空")
				return false;
			}
			if(!this.product.content){
				this.$message.error("活动内容不能为空")
				return false;
			}
			if(!this.product.photo){
				return false
			}
			post("Action/addAction",this.product)
			.then(res=>{
				if(res.data.code == 1){
					this.$message.success(res.data.msg);
					this.product = {};
					this.$refs.upload.clearFiles()
					this.tabChange(1);
					this.renderList();
				}
			})
    },

    handleRemove(file, fileList) {
      this.product.photo = fileList;
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
      this.product.photo = res;
			this.editProduct.photo = res;
			this.product.token = this.token;
    },
    uploadShopPhotoErr: function(err) {
      this.$message.error("上传失败");
    },

    shopPhotoMax: function() {
      this.$message({
        message: "最多可上传1张照片！",
        type: "warning"
      });
    },
  },
};
</script>
<style type="text/css" scoped>
.tableImg{
	width: 50px;
	height: 50px;
	overflow: hidden;
	display: block;
	margin: 0 auto;
	border-radius: 100%;
}
.uploadBox {
  margin-left: 80px;
	overflow: hidden;
}
</style>
<style>
.uploadBox .el-upload{
	width:64px;
	height:64px;
	line-height: 64px;
}
</style>
<style lang="scss" rel='stylesheet/scss' scoped>
.activity_list{
	width: 100%;
	margin-top: 20px;
}
.upload {
  width: 100%;
  height: 100%;
  /deep/ .el-input__inner::-webkit-input-placeholder {
    font-size: 12px !important;
  }
}
h2 {
  text-align: center;
	font-size:36px;
  margin-bottom: 60px;
	font-weight:400;
	color:rgba(50,55,60,1);
	line-height:50px;
}
.input {
  font-size: 13px;
}
.content {
  min-height: 100%;
  background: white;
  margin: 40px auto;
	padding: 30px 0 60px;
	width:1200px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(185,195,205,1);
}
.name {
  width: 700px;
  line-height: 40px;
	overflow: hidden;
  font-size: 14px;
  text-align: center;
  margin: 10px auto;
	color: #32373C;
  & > .input {
    width: 620px;
    height: 100%;
    float: right;
  }
}
.maintain {
  min-height: calc(100vh - 105px);
  background-color: #fff;
  width: 100%;
  padding: 0 0 100px;
  overflow-x: hidden;
  box-sizing: border-box;
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
			width: 100%;
	    padding-left: 30px;
	    box-sizing: border-box;
	    border-bottom: 2px solid #B9C3CD;
			display: flex;
			div {
				height: 41px;
				width: 200px;
				border: 1px solid #b9c3cd;
     		border-bottom: 0;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				font-weight: 400;
				line-height: 20px;
				z-index: 10;
				cursor: pointer;
			}
			.tabActive {
				background-color: #3498e9;
				border: 0;
				color: #fff;
			}
		}
	}
}
.uploadImg {
  width: 700px;
  margin: 10px auto;
	p {
	  float: left;
		color: #32373C;
	  font-size: 14px;
	  width: 80px;
		text-align: center;
	}
}
.submitProBtn {
  margin-top: 20px;
	width: 370px
}





</style>
