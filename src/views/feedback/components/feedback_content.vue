<template>
    <div class='feedback_content'>
        <p class='col-32373C ft-36'>反馈</p>
        <div class='input_content'>
             <div>
                 <p class='col-FF2828'>尊敬的用户！您在使用本系统中如有不便或给我们的建议，请告诉我们。</p>
                 <p><el-input placeholder="请输入标题" v-model='form.title'></el-input></p>
                 <p> <el-input type="textarea" class='textarea' :autosize="{ minRows: 5, maxRows: 5}" v-model='form.content' placeholder="请输入反馈详情"></el-input></p>
                 <p><el-button type="primary" @click='submit'>提交</el-button></p>
             </div>
        </div>
    </div>
</template>
<script>
    import { feedback } from '@/server/serverData'
    export default{
        data(){
            return{
                form:{
                    title:'',
                    content:''
                }
            }
        },
        methods:{
             /** 提交反馈 **/
              async submit(){
                 let res=await feedback(this.form)
                 console.log(res)
                 if(res.data.code==1){
                     let that=this;
                     this.$message({message:res.data.msg,type:'success',duration:1500,onClose(){
                         that.form={
                             title:'',
                             content:''
                         }
                     }})
                 }else {
                     this.$message.error(res.data.msg)
                 }
              }
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .feedback_content{
        text-align: center;
        .input_content{
            width: 62%;
            background-color: white;
            margin: 30px auto 0 auto;
            padding-top: 54px;
            &>div{
                width: 70%;
                margin: 0 auto;
                &>p:first-child{
                    margin-bottom: 20px;
                }
                &>p{
                    margin-bottom: 10px;
                    button{
                        margin-top: 30px;
                        width: 40%;
                        margin-bottom: 66px;
                    }
                }
            }
        }
    }
</style>