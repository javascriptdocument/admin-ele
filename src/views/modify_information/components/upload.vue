<template>
    <div class='upload'>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    export default{
        name:'upload',
        data(){
            return{
                dialogVisible:false,
                dialogImageUrl:''
            }
        },
        methods:{
            handleRemove(url){ //删除所上传的图片
                  console.log(url)
            },
            handlePictureCardPreview(){

            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .upload{
           width: 100%;
           height: 100%;
        &>div{
            width: 100%;
            height: 100%;
           /deep/ .el-upload{
               width: 100%;
               height: 100%;
              display: flex;
               align-items: center;
               justify-content: center;
           }
           /deep/ .el-upload-list--picture-card .el-upload-list__item{
                width: 100%;
                height: 100%;
               line-height: 100%;
            }
        }



    }
</style>
