<template>
    <div class='Agreement'>
        <el-dialog  title="协议" :visible="Agreement_State" width="45%" @close="close" center>
            <div class='Agreement_content'>
                <p class='download'><button @click='download'>下载协议</button></p>
                 <div v-html='data' class='content'></div>
                <p class='radio'> <el-checkbox v-model="checked">我已阅读并同意该协议</el-checkbox></p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" :disabled='!checked' @click="Sure" class='Sure'>确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { protocol } from '@/server/serverData'
    export default{
        name:'Agreement',
        data(){
            return{
                checked:false,
                data:''
            }
        },
        computed:{
                ...mapState(['Agreement_State'])
       },
       methods:{
           close(){  //关闭协议弹出框
               this.$store.commit('OPEN_AGREEMENT',false)
               this.checked=false
           },
           Sure(){ //用户已经阅读该协议，跳转注册页
               this.$store.commit('OPEN_AGREEMENT',false)
               this.$router.push('/Selective_registerType')
           },
         /** 获取网签协议 **/
         async Agreement(){
               let res = await protocol();
               if(res.status==200){
                  this.data=res.data;
               }
           },
           /** 下载协议 **/
           download(){
               window.location.href='https://ceshi.ctbls.com/uploads/shop/a.docx'
           }
       },
       mounted(){
          this.Agreement()
       }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>

    /deep/ .el-dialog{
        overflow: hidden;
        margin-top: 60px !important;
    }
    .Agreement /deep/ .el-dialog__header{
         border-bottom: 1px solid #D7E1E6 !important;
         padding: 0;
        line-height: 60px;
     }
    .Agreement /deep/ .el-dialog__body{
        overflow: hidden;
        .content{
            height: 600px;
            overflow: auto;
            p{
              line-height: 30px;
                position: relative;

                span{
                    position: relative;
                    z-index: 9999 !important;
                }
            }
            #xiusheng{
                position: absolute;
                right: 60px;
                top: -25px;
                z-index: 1;
            }
        }
    }
    .download{
        text-align: center;
        button{
            width: 100px;
            line-height: 28px;
            height: 28px;
            background-color: #B9C3CD;
            border: none;
            color: #32373C;
        }
    }

    .Agreement_content>p{

        font-size: 14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(50,55,60,1);
        line-height:24px;
    }
    .radio{
        text-align: center;

    }
    .Sure{
        width:370px;
    }
</style>