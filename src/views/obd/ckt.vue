<template>
	<div class="obd-chance">
		<currentPage :id='214'/>
		<div class="obd-head">
			<div class="searcharea">
				<input type="text" v-model="input"  placeholder="车牌号/姓名">
				<div @click="searchgo">搜索</div>
			</div>
			<!-- <el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="未提醒" value="before"></el-option>
				<el-option label="已提醒" value="after"></el-option>
			</el-select> -->
		</div>
		<el-table  v-loading="loading" :data="tableData" :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}">
			<el-table-column width="220" align="center" prop="_obdid" label="设备号"></el-table-column>
			<el-table-column align="center" prop="plate" label="车牌号"></el-table-column>
			<el-table-column align="center" prop="type" label="车型"></el-table-column>
			<el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
			<el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
			<el-table-column align="center"  label="提醒内容">
				<template slot-scope="scope">
					<div class="flexrow">
						<p class="widlimit">{{scope.row._title}}</p>
						<span>&nbsp;&nbsp;</span>
						<el-button type="text"  @click="open(scope.row._title)">查看</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="_fcdate" label="时间"></el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="remind(scope.row._flag,scope.row._obdid)">已提醒</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
				title="提醒内容"
				:visible.sync="centerDialogVisible"
				width="30%"
				center>
				<span>{{content}}</span>
				<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
				</span>
				</el-dialog>
		<component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
	</div>
</template>
<script>
		import currentPage from "@/views/common/currentPage.vue";
        import { post } from "../../config/axios";
		import paging from '@/views/common/paging'
	export default{
		components:{
			currentPage,
			paging
		},
		
		data() {
			return {
				searchwd: '',
				seval: 'all',
				tableData: [], 
				page:1,
				input:'',
				content:'',
				pageCount:1,
				centerDialogVisible:false,
				loading:true,
			};
		},
		created() {},
		mounted() {
			this.Interface();
		},

		methods: {
			//封装接口-------------------------------------------
			Interface(){
				post('BusOppos/fault',{page:this.page,search:this.input}).then(res=>{
				this.loading = true;
				if (res.data.code==1) {
					this.tableData = res.data.data.Rows;
					this.pageCount = res.data.data.total
					this.loading = false;
				}
				else{
					this.tableData = [];
					this.pageCount = 1;
					this.loading = false;
				}
			}).catch(res=>{})
			},
			/** 分页，获取当前页数 **/
			currentChange(e){
				this.page=e;
				this.Interface()
			},
		      //-----------------------------------------------------
			open(e){
				this.centerDialogVisible = true;
				this.content = e;
			},
			/** 搜索 **/
			searchgo() {
				this.loading = true;
				this.page = 1;
				this.Interface();
			},
			/** 提醒 **/
			remind(e,obd){
				post('BusOppos/handle',{flagId:e,obd:obd}).then(res=>{
					  this.$message({
			          message: '操作成功',
			          type: 'success'
			        });
					this.loading = true;
					post('BusOppos/fault ',{page:this.page}).then(res=>{
				if (res.data.code == 1) {
					this.tableData = res.data.data.Rows;
					this.pageCount=res.data.data.total;
					this.$store.commit('mutationsMsg2',this.$store.state.fault-1)
					this.loading = false;
				}
				else{
					this.loading = false;
				}
			}).catch(res=>{});
				}).catch(res=>{})
			},
		},
		computed: {},
	}
</script>
<style scoped>
	.obd-head {
		height: 70px;
		display: flex;
		align-items: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}
	
	.searcharea {
		display: flex;
		margin-left: 40px;
		margin-right: 30px;
	}
	
	.searcharea>input,
	.searcharea>div {
		height: 40px;
		box-sizing: border-box;
		font-size: 16px;
	}
	
	.searcharea>input {
		border: 1px solid #E6E6EB;
		background: #F5F5FA;
		line-height: 38px;
		color: #1E2328;
		width: 432px;
		padding: 0 24px;
	}
	
	.searcharea>div {
		background: #1EA0FF;
		line-height: 40px;
		width: 120px;
		text-align: center;
		color: #fff;
		cursor: pointer;
	}
	
	.widlimit {
		width: 320px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.flexrow {
		display: flex;
		align-items: center;
	}
	
	.color-blue {
		cursor: pointer;
		color: #1EA0FF;
		text-decoration: underline;
	}
	
	.color-red {
		color: #FA644B;
	}
	
	.color-gray {
		color: #969BA5;
	}
	
	.color-green {
		cursor: pointer;
		color: #0ACD00;
		text-decoration: underline;
	}
</style>