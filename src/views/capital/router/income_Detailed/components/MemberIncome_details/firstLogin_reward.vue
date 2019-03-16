<template>
    <div class='firstLogin_reward'>
        <div class='form'>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item class='search'>
                    <el-input placeholder="输入车牌号"class="input-with-select">
                        <el-button slot="append" >搜索</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="收入时间">
                    <el-select  placeholder="请选择时间范围起始">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="-">
                    <el-select  placeholder="请选择时间范围结束">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class='table'>
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
                <el-table-column prop="vin_num" label="VIN码"  align="center"></el-table-column>
                <el-table-column prop="brand_car_displa" label="车型"  align="center"></el-table-column>
                <el-table-column prop="plate" label="车牌号" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式"   align="center"></el-table-column>
                <el-table-column prop="f_name" label="服务项"   align="center"></el-table-column>
                <el-table-column prop="pro_name" label="产品名称"  align="center"></el-table-column>
                <el-table-column  label="详情"  align="center">
                    <template slot-scope="scope">
                        <a href='javascript:;' class='col-3498E9'>详情</a>
                    </template>
                </el-table-column>
                <el-table-column prop="one_price" label="收入(元)"  align="center"></el-table-column>
                <el-table-column prop="pay_time" label="时间"  align="center"></el-table-column>
            </el-table>
        </div>
        <component is='paging'></component>
    </div>
</template>
<script>
    import { getOneHalf } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                form:{},
                tableData:[],
                screenHeight:window.innerHeight-370
            }
        },
        components:{
            paging
        },
        methods:{
             /** 获取首次录入奖励 **/
             async firstInput(){
                 let res=await getOneHalf()
                console.log(res)
                if(res.data.code==1){
                    this.tableData=res.data.data.list
                }
            }
        },
        computed:{

        },
        mounted(){
            this.firstInput()
            var that=this
            window.onresize = () => {
                return (() => {
                    that.screenHeight = window.innerHeight - 370
            })()
            }
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .form{
        /deep/ .el-form-item__content{
            .el-input-group__append, .el-input-group__prepend{
                border: none;
                background-color: #3498E9;
                color: white;
                padding: 0 30px;
            }
        }
        .search{
            margin-right: 40px;
        }
    }
    .table{
        /deep/ .el-table th, .el-table tr{
            background-color: #D7E1E6;
        }
    }
    .paging{
        text-align: center;
        margin-top: 30px;
    }
</style>