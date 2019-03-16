<template>
    <div class='main'>
        <p class='ft-36 col-32373C'>账户余额</p>
        <div class='balance color-1' >
              <div class='bgImg'>
                  <div class='money'>
                      <p><img src="../../../images/money.png" alt=""></p>
                      <p class=''>账户余额</p>
                      <p class='ft-36'>{{balance}}<span class='ft-14'>元</span></p>
                  </div>
              </div>
            <div class='Putforward'>
                <el-button type="primary" @click='Putforward'>全部提现</el-button>
            </div>
        </div>
        <PutforwardForm :balance='balance'></PutforwardForm>
    </div>
</template>
<script>
    import { balance } from '@/server/serverData'
    import PutforwardForm from './Putforward_Form'
    export default{
        data(){
          return{
              balance:''
          }
        },
        components:{
            PutforwardForm
        },
        methods:{
            Putforward(){
                this.$store.commit('OPEN_PUTFORWARD',true)
            },
            /** 获取账户余额 **/
            async get_balance(){
                 let res=await balance();
                 console.log(res)
                 if(res.data.code==1){
                     this.balance=res.data.data
                 }else {
                     this.balance=0
                 }
            }
        },
       mounted(){
          this.get_balance()
       }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .main{
        text-align: center;
        .balance{
            width: 62%;
            margin: 20px auto;
            background-color: white;
            height: 500px;
           .bgImg{
               width: 100%;
               height: 70%;
               background-image: url("../../../images/balance_bg.png");
               background-repeat: no-repeat;

               .money{
                   padding-top: 54px;
                  &>p{
                      margin-bottom: 10px;
                      img{
                          width: 110px;
                          height: 110px;
                      }
                      &>span{
                          margin-left: 10px;
                      }
                  }
               }
           }
            .Putforward{
                width: 30%;
                margin: 0 auto;
                button{
                    width: 100%;
                }
            }
        }
    }
</style>