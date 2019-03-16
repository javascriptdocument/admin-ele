<template>
    <div class='password'>
        <p class='col-32373C ft-36'>修改密码</p>
        <div class='input_password'>
            <table class='col-64696E'>
                <tr>
                    <td>原密码:</td>
                    <td>
                        <el-input placeholder="请输入原密码" type='password'   v-model='form.passwd'></el-input>
                    </td>
                </tr>
                <tr>
                    <td>新密码:</td>
                    <td>
                        <el-input placeholder="请输入新密码" type='password' v-model='form.npasswd'></el-input>
                    </td>
                </tr>
                <tr>
                    <td>确认新密码:</td>
                    <td>
                        <el-input placeholder="确认新密码" type='password' v-model='form.spasswd'></el-input>
                    </td>
                </tr>
                <tr class='Verification'>
                    <td>验证码:</td>
                    <td>
                        <el-input placeholder="输入验证码" v-model='form.code'></el-input>
                        <el-button @click='getCode' :disabled='isdisabled'>{{btnVal}}</el-button>
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
    import { setPasswd,pass_code } from "@/server/serverData"
    export default{
        data(){
            return{
                isdisabled:false,
                time:60,
                btnVal:'获取验证码',
                form:{
                    passwd:'',
                    npasswd:'',
                    spasswd:'',
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
                let res=await pass_code()
                if(res.data.code==1){
                    this.$message({message:res.data.msg,type:'success'})
                }else {
                    this.$message.error(res.data.msg)
                }
            },
            /** 确认修改密码**/
           async modify(){
               let res=await setPasswd(this.form)
               if(res.data.code==1){
                   let that=this;
                   this.$message({message:res.data.msg,type:'success',duration:1500,onClose(){
                       that.form={
                           passwd:'',
                           npasswd:'',
                           spasswd:'',
                           code:''
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
    .password{
        text-align: center;
        .input_password{
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
                    width: 100px;
                }
                .Verification{
                    &>td:last-child{
                        text-align: left;
                        button{
                            width: calc((100% - 65%) - 10px);
                        }
                        @media screen and (max-width: 1700px){
                            button{
                                font-size: 12px;

                            }
                        }
                        @media screen and (max-width: 1650px){
                            button{
                                text-align: left;
                                position: relative;
                               /deep/ span{
                                    text-align: left;
                                    font-size: 10px !important;
                                    margin-left: -10px;


                                }
                            }
                        }
                    }
                    /deep/ .el-input{
                        text-align: left;
                        width: 65%;
                        margin-right: 10px;

                    }
                }
            }
        }
    }
</style>