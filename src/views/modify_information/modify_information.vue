<template>
    <div class='modify_information'>
        <heaDer :isShow='true' class='header'></heaDer>
        <currentPage class='currentPage' :id='204'></currentPage>
        <shopContent ></shopContent>
    </div>
</template>
<script>
    import heaDer from '@/views/common/header'
    import currentPage from '@/views/common/currentPage'
    import shopContent from './components/shop_content'
    import { getShopInfo,getPro,getSon  } from "@/server/serverData"
    import { mapState } from 'vuex'
    export default{
        name:'modifyInformation',
        data(){
            return{
                shop_info:'',
                province:null,
                City:null,
                county:null
            }
        },
        components:{
            heaDer,
            currentPage,
            shopContent
        },
        methods:{

        },
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .modify_information{
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