<template>
    <div class='modify_input'>
        <p class='col-32373C ft-36'>修改手机号</p>
         <div class='input_tel'>
             <table class='col-64696E'>
                 <tr>
                     <td>原手机号:</td>
                     <td>
                         <el-input placeholder="请输入内容" v-model='usedPhone' disabled class="input-with-select">
                             <el-button slot="append" @click='getCode' :disabled='isdisabled'>{{btnVal}}</el-button>
                         </el-input>
                     </td>
                 </tr>
                 <tr>
                     <td>新手机号:</td>
                     <td>
                         <el-input placeholder="请输入新手机号" v-model='form.r_phone'></el-input>
                     </td>
                 </tr>
                 <tr>
                     <td>验证码:</td>
                     <td>
                         <el-input placeholder="请输入验证码" v-model='form.code'></el-input>
                     </td>
                 </tr>
                 <tr>
                     <td></td>
                     <td>
                         <el-button type="primary" class='confirm_modify' @click='modify'>确认修改</el-button>
                     </td>
                 </tr>
             </table>
         </div>
    </div>
</template>
<script>
    import { pcode,modifyPhone } from '@/server/serverData'
    export default{
        data(){
            return{
                usedPhone:this.$route.query.phone,
                isdisabled:false,
                btnVal:'获取验证码',
                time:60,
                form:{
                    r_phone:'',
                    code:''
                }
            }
        },
        methods:{
            /** 点击获取验证码按钮 **/
            getCode(){
                    var that = this;
                    that.isdisabled = true;
                    var interval = window.setInterval(()=>{  /** 按钮的值 **/
                           this.btnVal = '(' + that.time + ')秒后';
                            --this.time;
                        if (this.time < 0) {
                            this.btnVal = '重新发送';
                            this.isdisabled = false;
                            this.time = 60;
                            window.clearInterval(interval);
                        }
                    },1000);
                    this.VerificationCode()
            },
            /** 获取验证码 **/
            async VerificationCode(){
                 let  res= await pcode()
                 console.log(res.data.code)
                 if(res.data.code==1){
                     this.$message({message:res.data.msg,type:'success'})
                 }else {
                     this.$message.error(res.data.msg)
                 }
            },
           /** 确认修改手机号 **/
           async modify(){
               let res= await modifyPhone(this.form)
               console.log(res)
               if(res.data.code==1){
                   this.$message({message:res.data.msg,type:'success'})
                   this.$router.push('/modify_information')
               }else {
                   this.$message.error(res.data.msg)
               }
           }
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .modify_input{
         text-align: center;
        .input_tel{
            width: 62%;
            background-color: white;
            margin: 30px auto 0 auto;
            padding-top: 87px;
            table{
               width: 40%;
                margin: 0 auto;
                text-align: right;
                td{
                    padding-bottom: 10px;
                    .confirm_modify{
                        width: 100%;
                        margin-top: 33px;
                        margin-bottom: 180px;
                    }
                }
                td:first-child{
                    padding-right: 10px;
                    width: 80px;
                }
            }
        }
    }
</style>