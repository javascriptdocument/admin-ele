<template>
    <div class='perfect_information'>
        <Head :news='true'></Head>
        <Form></Form>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import Form from './components/form'
    export default{
        name:'perfectInformation',
        components:{
            Head,
            Form
        }
    }
</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .perfect_information{
        height: 100%;
        overflow: auto;
        background-color: #EBEDF0;
    }
</style>