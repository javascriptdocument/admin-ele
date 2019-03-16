<template>
    <div class='screen '>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="申请时间">
                <el-select placeholder="请选择时间范围起始">

                </el-select>
            </el-form-item>
            <el-form-item label="-">
                <el-select placeholder="请选择时间范围结束">

                </el-select>
            </el-form-item>
            <el-form-item label="状态" v-show='state' class='state'>
                <el-select placeholder="全部">
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                form:{}
            }
        },
        props:['state']
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .screen{
        /deep/ .el-form-item__label{
            color:#32373C;
        }
        /deep/  .el-form-item{
            margin-bottom: 0;
        }
        .state{
            margin-left: 40px;
            /deep/ .el-form-item{
                 margin-bottom: 0;
            }
            /deep/ .el-select{
                width: 50%;
            }
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color:#32373C;
        }
    }
</style>