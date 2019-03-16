<template>
    <div class='Submit_Toexamine'>
        <Head :news='true'></Head>
        <Submit_details></Submit_details>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import Submit_details from "./components/Submit_details"
    export default{
        name:'perfectInformation',
        components:{
            Head,
            Submit_details
        }
    }
</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .Submit_Toexamine{
        height: 100%;
        overflow: auto;
        background-color: #EBEDF0;
    }
</style>