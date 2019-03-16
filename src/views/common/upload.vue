<template>
    <div class='upload'>
        <el-upload  :action='uploadUrl' list-type="picture-card" :data='token'  name="image" :on-success="onSuccess"  :before-upload='beforeUpload' :on-remove='onRemove' >
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
                dialogImageUrl:'',
                token:{
                  token:window.sessionStorage.getItem('token')
                },
                imgList:[],
                fileList2: [{ url: 'http://pic27.nipic.com/20130331/9252150_140012316365_2.jpg'}]
            }
        },
        props:{
            onSuccess: Function,
            onRemove:Function,
            fileList:String
        },
        methods:{
            /** 规定用户只能上传jpeg/png/jpg并且上传的图片不能大于2M **/
            beforeUpload(file){
                console.log(file)
                const isvalid= file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
                const isLt2M = file.size / 1024 / 1024 < 2;
                if(!isvalid){
                    this.$message.error("上传图片格式应为 jpeg/png/jpg!");
                }
                if(!isLt2M){
                    this.$message.error("上传图片大小不能超过 2MB!");
                }
                return isvalid && isLt2M;
            }
        },
        mounted(){
            console.log(this.uploadUrl)
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
