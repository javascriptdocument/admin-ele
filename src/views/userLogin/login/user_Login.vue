<template>
    <div class='Userlogin'>
         <div class='bg_left'></div>
          <login class='login'></login>
         <div class='bg_right'></div>
    </div>
</template>
<script>
    import { getBankCode} from "@/server/serverData"
    import login from '@/views/userLogin/login/components/login/login'
   export default{
       name:'userLogin',
       components:{
           login
       },
   }

</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .Userlogin{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(52,152,233,1);
        position: relative;
        .bg_left{
            width:50%;
            height: 321px;
            background-image: url("public/login/bg_left.png");
            background-repeat: no-repeat;
            background-size: 100% 100% ;
            position: absolute;
            top: 50%;
            margin-top: -160.5px;
        }
        .bg_right{
            width: 39%;
            height: 321px;
            right: 0;
            background-image: url("public/login/bg_right.png");
            background-repeat: no-repeat;
            background-size: 100% 100% ;
            position: absolute;
            top: 50%;
            margin-top: -160.5px;
            z-index: 0;
        }
    }
</style>