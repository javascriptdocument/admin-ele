<template>
    <div class='capital'>
        <sidebar></sidebar>
        <div class='right'>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import sidebar from './components/sidebar'

    import Head from '@/views/common/header'
    export default{
        name:"capital",
        components:{
            sidebar,
            Head
        }
    }
</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .capital{
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