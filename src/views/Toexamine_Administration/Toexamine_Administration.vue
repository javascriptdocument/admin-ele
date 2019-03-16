<template>
    <div class='Toexamine_Administration'>
        <sidebar></sidebar>
        <div class='right'>
                <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { number } from '@/server/serverData'
    import sidebar from './components/sidebar'
    import Head from '@/views/common/header'
    export default{
        name:"capital",
        components:{
            sidebar,
            Head
        },
        methods:{
           /** 获取审核条数 **/
           async getNumber(){
              let res =  await number()
              if(res.data.code==1){
                  this.$store.commit('ACTION_NUMBER',res.data.data)
              }
           }
        },
        watch:{
            $route(to,from){
                this.getNumber()
            }
        },
        mounted(){
           this.getNumber()
        }
    }
</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .Toexamine_Administration{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .left{
            width: 160px;
            height: 100%;
            float: left;
        }
        .right{
            width: calc(100% - 160px);
            background-color: #EBEDF0;
            position: relative;
            display: inline-block;
            float: right;
            height: 100%;
        }
    }
</style>