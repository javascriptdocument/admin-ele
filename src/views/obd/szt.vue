<template>
	<div class="obd-chance">
		<currentPage :id='210'/>
		<div class="obd-head">
			<div class="searcharea">
				<input v-model="input" type="text" placeholder="车牌号/姓名">
				<div @click="searchgo()">搜索</div>
			</div>
			<el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="0"></el-option>
				<el-option label="已运行" value="1"></el-option>
				<el-option label="设备休眠" value="2"></el-option>
				<el-option label="设备异常" value="3"></el-option>
			</el-select>
		</div>
		<el-table v-loading="loading"  :data="tableData" :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}">
			<el-table-column width="220" align="center" prop="eq_num" label="设备号"></el-table-column>
			<el-table-column align="center" prop="plate" label="车牌号"></el-table-column>
			<el-table-column align="center" prop="type" label="车型"></el-table-column>
			<el-table-column align="center" prop="name" label="车主姓名"></el-table-column>
			<el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
			<el-table-column align="center"  label="设备状态">
				<template slot-scope="scope">
					<span v-if="scope.row.inDate==2" class="color-orange">休眠</span>
					<span v-if="scope.row.inDate==1" class="color-gray">已运行</span>
					<span v-if="scope.row.inDate==3" class="color-red">设备异常</span>
				</template>
			</el-table-column>
		</el-table>
		<component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
	</div>
</template>
<script>
	import currentPage from "@/views/common/currentPage";
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
				seval: '0',
				tableData: [],
				input:'',
				page:1,
				pageCount:0,
				loading:true
			};
		},
		created() {},
		watch:{
			seval(){
				this.Interface();
			}
		},
		mounted() {
			this.Interface();
		},
		methods: {

			//封装接口--------------------------------------
			 Interface(){
			 	post('BusOppos/doesRun',{page:this.page,search:this.input,type:this.seval}).then(res=>{
		      		this.loading = true;
				if (res.data.code == 1) {
					this.tableData = res.data.data.list;
					this.pageCount = res.data.data.rows;
					this.loading = false;
				}else{
					this.tableData = [];
					this.loading = false
					this.pageCount=1
				}

				})
			 },
			 //----------------------------------------

			/** 分页,获取当前页数 **/
			currentChange(e){
				this.page=e;
				this.Interface()
			},
		     /** 搜索 **/
			searchgo() {
				this.page = 1;
				this.Interface();
			},

		},
		computed: {},
	}
</script>
<style scoped>
	.paging{
		margin-top: 30px;
	}
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
		color: RGBA(0, 216, 4, 1);
	}

	.color-green {
		cursor: pointer;
		color: #0ACD00;
		text-decoration: underline;
	}
	.color-orange{
		color: orange;
	}
</style>