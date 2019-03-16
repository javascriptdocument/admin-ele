<template>
    <div class='feedback'>
        <Head :isShow='true' class='header'></Head>
        <currentPage class='currentPage' :id='207'></currentPage>
        <feedbackContent></feedbackContent>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import currentPage from '@/views/common/currentPage'
    import feedbackContent from './components/feedback_content'
    export default{
        name:'feedback',
        components:{
            Head,
            currentPage,
            feedbackContent
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .feedback{
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