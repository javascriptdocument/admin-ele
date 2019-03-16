<template>
    <div class='account_balance'>
        <Small_header></Small_header>
        <currentPage class='currentPage' :id='189'></currentPage>
        <Main class='main'></Main>
    </div>
</template>
<script>
    import Small_header from '@/views/common/Small_header'
    import currentPage from '@/views/common/currentPage'
    import Main from './components/main'
    export default{
        components:{
            Small_header,
            currentPage,
            Main
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .account_balance{
        width: 100%;
        height: 100%;
        position: relative;
        .main{
            height: calc(100% - 95px);
            margin-top: 10px;
            background-color: white;
        }
    }
</style>