<template>
   <div class='account_information'>
       <heaDer :isShow='true' class='header'></heaDer>
       <currentPage class='currentPage' :id='203'></currentPage>
       <shopContent :shopInfo='shop_info'></shopContent>
   </div>
</template>
<script>
    import heaDer from '@/views/common/header'
    import currentPage from '@/views/common/currentPage'
    import shopContent from './components/shop_content'
    import { getShopInfo } from "@/server/serverData"
    export default{
        data(){
             return{
                 shop_info:''
             }
        },
        components:{
            heaDer,
            currentPage,
            shopContent
        },
        methods:{
            /** 获取维修厂原有信息**/
           async ShopInfo(){
              let res=await getShopInfo();
              console.log(res.data)
              this.shop_info=res.data;

          }
        },
        mounted(){
          this.ShopInfo()
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.account_information{
   height: 100%;
    overflow: auto;
    background-color: #EBEDF0;
    position: relative;
    .header{
        position: fixed;
        top: 0;
    }
    .currentPage{
        padding: 73px 60px 0 60px;
    }
}
</style>