<template>
    <div class='Unpaid'>
        <Head :news='true'></Head>
        <QR_code></QR_code>
    </div>
</template>
<script>
    import Head from '@/views/common/header'
    import QR_code from './components/QR_code'
    export default{
        name:'Unpaid',
        components:{
            Head,
            QR_code:()=>import('./components/QR_code')
        }
    }
</script>
<style lang='scss' scoped rel="stylesheet/scss">
    .Unpaid{
        height: 100%;
        overflow: auto;
        background-color: #EBEDF0;
    }
</style>