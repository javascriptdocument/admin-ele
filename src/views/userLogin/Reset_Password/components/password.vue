<template>
    <div class='register_account'>
        <div class='main'>
            <h2>找回密码</h2>
            <div class='form'>
                  <div>
                      <div class='form_input'>
                          <div>
                              <input type='text' placeholder='输入账号' v-model='form.usname'>
                          </div>
                          <div>
                              <input type='password' placeholder='输入新密码' v-model='form.passwd'>
                          </div>
                          <div>
                              <input type='password' placeholder='确认新密码' v-model='form.spasswd'>
                          </div>
                          <div>
                              <input type='tel' placeholder='输入手机号码' v-model='form.phone'>
                          </div>
                          <div>
                              <input type='text' placeholder='输入手机验证码' v-model='form.code'>
                              <button class='Verification' :disabled='isdisabled' @click='getCode'>{{btnVal}}</button>
                          </div>
                      </div>
                       <div class='form_btn'>
                           <el-button type="primary" :disabled='nextVisible' @click='SureRetrieve'>确定</el-button>
                       </div> 
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { forget,vcode } from "@/server/serverData"
    export default{
        name:'password',
        data(){
            return{
                isdisabled:false,
                time:60,
                btnVal:'获取验证码',
                form:{
                    usname:'',
                    passwd:'',
                    spasswd:'',
                    phone:'',
                    code:''
                }
            }
        },
        computed:{
            /**  用户如果没有完善信息不能进行下一步 **/
            nextVisible(){
                let state=true,usname=this.form.usname,passwd=this.form.passwd,spasswd=this.form.spasswd,phone=this.form.phone,code=this.form.code;
                if(usname && passwd  && spasswd && phone && code){
                    state=false
                }
                return state
            }
        },
        methods:{
            getCode(){
                if (!this.form.phone) this.$message.error('请输入手机号')
                else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.phone))  this.$message.error('手机号格式不对')
                else {  //手机号有并且正确
                    var that = this;
                    that.isdisabled = true;
                    var interval = setInterval(function () {//按钮的值
                        that.btnVal = '(' + that.time + ')秒后';
                        --that.time;
                        if (that.time < 0) {
                            that.btnVal = '重新发送';
                            that.isdisabled = false;
                            that.time = 60;
                            clearInterval(interval);
                        }
                    }, 1000);
                    this.VerificationCode()
                }

            },
            async VerificationCode(){ //获取验证码
                  try {
                      let res= await vcode({
                          phone:this.form.phone
                      })
                      if(res.data.code==1){
                          this.$message({message:res.data.msg,type:'success'})
                      }else {
                          this.$message.error(res.data.msg)
                      }
                  }catch(err){
                      console.log(err)
                  }
            },
             /** 确定找回密码 **/
            async SureRetrieve(){
                try {
                    let res = await forget(this.form)
                    if(res.data.code==1){
                        let that=this;
                        this.$message({message:res.data.msg,type:'success',duration:2000,onClose(){
                            that.$router.push('/login')
                        }})
                    }else {
                        this.$message.error(res.data.msg)
                    }
                }catch (err){
                    console.log(err)
                }
            }
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .register_account{
        height: 100%;
        position: relative;
        .main{
            width: 490px;
            margin: 0 auto;
            padding-top: 154px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -245px;
            margin-top: -440px;
            z-index: 2;
            h2{
                margin-bottom: 20px;
                text-align: center;
                color: white;
            }
            .form{
                height: 530px;
                background-color: white;
                box-shadow:0px 0px 8px 0px rgba(100,145,190,0.6);
                border-radius:5px;
                &>div{
                    padding: 65px 59px;
                    .form_input{
                        &>div:after{
                            display: block;
                            content: '';
                            clear: both;
                        }
                        &>div{
                            border-bottom: 1px solid #E5E5E5;
                            margin-bottom: 20px;
                            input{
                                border: none;
                                outline: none;
                                padding: 10px 0;
                            }
                            input::-webkit-input-placeholder{
                                color:#B9C3CD;
                            }
                            .Verification{
                                background: none;
                                float: right;
                                border: 1px solid #E5E5E5;
                                height: 36px;
                                line-height: 36px;
                                border-radius:5px;
                                width: 120px;
                                text-align: center;
                                margin-top: -5px;
                            }
                        }
                    }
                    .form_btn{
                        margin-top: 26px;
                        button{
                            width: 100%;

                            font-size: 18px;
                        }
                    }
                    .Return{
                        text-align: center;
                        font-size: 14px;
                        margin-top: 10px;
                        a{
                          color: #3498E9;
                        }
                    }
                }
            }
        }
    }


</style>