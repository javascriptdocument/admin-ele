<template>
	<div class="obd-chance">
		<currentPage :id='212'/>
		<div class="obd-head">
			<div class="searcharea">
				<input type="text" placeholder="车牌号/姓名">
				<div @click="searchgo">搜索</div>
			</div>
			<el-select v-model="seval" placeholder="请选择">
				<el-option label="全部" value="all"></el-option>
				<el-option label="未提醒" value="before"></el-option>
				<el-option label="已提醒" value="after"></el-option>
			</el-select>
		</div>
		<el-table :data="tableData" :header-cell-style="{'background':'#F5F5FA','height':'50px','color':'#383838','font-size':'16px'}">
			<el-table-column width="220" align="center" prop="abc" label="设备号"></el-table-column>
			<el-table-column align="center" prop="bcd" label="车牌号"></el-table-column>
			<el-table-column align="center" prop="cde" label="车主姓名"></el-table-column>
			<el-table-column align="center" prop="def" label="电话"></el-table-column>
			<el-table-column align="center" prop="efg" label="车型"></el-table-column>
			<el-table-column align="center"  label="提醒内容">
				<template slot-scope="scope">
					<div class="flexrow">
						<p class="widlimit">{{scope.row.fgh}}</p>
						<span>&nbsp;&nbsp;</span>
						<span class="color-blue">查看</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="状态">
				<template slot-scope="scope">
					<span v-if="scope.row.ghj" class="color-red">未提醒</span>
					<span v-else class="color-gray">已提醒</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="hjk" label="时间"></el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<span v-if="scope.row.ghj" class="color-green">提醒</span>
					<span v-else class="color-gray">--</span>
					<span>&nbsp;&nbsp;</span>
					<span class="color-blue">忽略</span>
				</template>
			</el-table-column>
		</el-table>
		<component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
	</div>
</template>
<script>
	import currentPage from "@/views/common/currentPage";
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
				pageCount:1
			};
		},
		created() {},
		mounted() {},
		methods: {
			searchgo() {
				this.$alert('系统对接中，敬请期待!', '提示').then(() => {}).catch(() => {})
			},
			/** 分页，获取当前页数 **/
			currentChange(){

			}
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
		color: #969BA5;
	}
	
	.color-green {
		cursor: pointer;
		color: #0ACD00;
		text-decoration: underline;
	}
</style>