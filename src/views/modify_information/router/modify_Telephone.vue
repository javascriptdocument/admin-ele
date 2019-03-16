<template>
    <div class='modify_Telephone'>
          <Head :isShow='true' class='header'></Head>
          <currentPage class='currentPage' :id='205'></currentPage>
          <Telephone></Telephone>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import currentPage from '@/views/common/currentPage'
    import Telephone  from './components/modify_input'
    export default{
        components:{
            Head,
            currentPage,
            Telephone
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .modify_Telephone{
        background-color: #EBEDF0;
        height: 100%;
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