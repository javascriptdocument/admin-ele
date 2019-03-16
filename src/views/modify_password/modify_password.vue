<template>
    <div class='modify_password'>
        <Head :isShow='true' class='header'></Head>
        <currentPage class='currentPage' :id='206'></currentPage>
        <password></password>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import currentPage from '@/views/common/currentPage'
    import password from './components/password'
    export default{
        name:'modifyPassword',
        components:{
            Head,
            currentPage,
            password
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .modify_password{
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