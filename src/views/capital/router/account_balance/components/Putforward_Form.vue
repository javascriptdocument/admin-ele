<template>
    <div>
        <el-dialog :visible="Putforward_Dialog" width="40%" center @close="close">
              <div class='Tips'>
                  <p class='col-32373C ft-20'>可提现金额</p>
                  <p class='col-0099FF ft-36'>{{form.balance}}</p>
                  <div class='form'>
                      <el-form ref="form" :model="form" label-width="100px">
                          <el-form-item label="提现账户信息">
                              <p>手机号：{{form.phone}}</p>
                              <p>开户行：{{form.bank}}</p>
                              <p>开户名：{{form.account_name}}</p>
                              <p>账户号：{{form.account}}</p>
                          </el-form-item>
                          <el-form-item label="手机验证码">
                              <el-input placeholder="输入用户确认码" v-model='code' class="input-with-select">
                                  <el-button slot="append" :disabled='isdisabled' @click='getCode'>{{btnVal}}</el-button>
                              </el-input>
                          </el-form-item>
                          <el-form-item>
                              <el-button type="primary" class='submit' @click='deposit'>申请提现</el-button>
                          </el-form-item>
                      </el-form>
                  </div>
              </div>
        </el-dialog>
    </div>
</template>
<script>
    import { drawInfo,drawCode,Money_handle,balance } from "@/server/serverData"
    import { mapState } from 'vuex'
    export default{
        name:'Putforward_Form',
        data(){
            return{
                isdisabled:false,
                btnVal:'发送验证码',
                time:60,
                form:{

                },
                code:''
            }
        },
        computed:{
                ...mapState(['Putforward_Dialog'])
        },
       methods:{

           /** 提现信息详情 **/
           async getDrawInfo(){
               let res=await drawInfo()
               if(res.data.code==1){
                   this.form=res.data.data
               }
           },

           /** 点击获取验证码按钮 **/
           getCode(){
               var that = this;
               this.isdisabled = true;
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
               let res=await drawCode()
               if(res.data.code==1){
                   this.$message({message:res.data.msg,type:'success'})
               }else {
                   this.$message.error(res.data.msg)
               }
           },

           /** 申请提现 **/
           async deposit(){
               console.log(123)
               let form={
                   mobile:this.form.phone,
                   money:Number(this.form.balance),
                   code:this.code
               }
               let res=await Money_handle(form)
               if(res.data.code==1){
                   let that=this;
                   this.$message({message:res.data.msg,type:'success',onClose(){
                       that.$store.commit('OPEN_PUTFORWARD',false)
                   }})
                   this.$router.push('/capital/Putforward_Record')
               }else {
                   this.$message.error(res.data.msg)
               }
           },
          /** 关闭对话框 **/
           close(){
               this.$store.commit('OPEN_PUTFORWARD',false)
           }
       },
       mounted(){
           this.getDrawInfo()
       }
    }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
    .Tips{
        p{
            text-align: center;
            width: 100%;
            margin-bottom: 10px;
        }
    }
    .form{
        width: 70%;
        margin: 31px auto;
        p{
           border-bottom: 1px solid #D7E1E6;
            text-align: left;
            padding-left: 10px;
        }
        .submit{
            width: 72%;
        }
    }
</style>