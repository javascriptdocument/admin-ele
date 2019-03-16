<template>
    <div class='paging'>
        <el-pagination
                background
                :page-count="pageCount"
                @current-change="currentChange"
                layout="prev,pager,next,jumper,total,->"
                small
        >
        </el-pagination>
    </div>
</template>
<script>
    export default{
        props:{
            pageCount: Number || String,
            currentChange:Function
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    $deep: '>>>';
    .paging{
        text-align: center;
        margin-top: 30px;
        #{$deep} .el-pagination {
            button{
                background: none;
                border:1px solid #BEBEBE;
                color: #BEBEBE;
            }
            #{$deep} .el-pager{
                #{$deep} li{
                    background: none;
                    font-size: 12px !important;
                }
                #{$deep} .active{
                    background:rgba(255,255,255,1) !important;
                    border:1px solid #979797;
                    color: #545454 !important;
                    font-size: 12px !important;
                }
            }
        }

    }
</style>