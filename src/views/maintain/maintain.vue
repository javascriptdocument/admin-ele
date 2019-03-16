<template>
    <div class='maintain'>
       <sidebar></sidebar>
        <div style='width: 80%'>
            <headerBar></headerBar>
            <div>
               <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from './components/sidebar';
    import  headerBar  from '../common/header';
    export default{
        name:'maintain',
        components:{
            sidebar,
            headerBar
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .maintain{
        height: 100%;
        overflow: hidden;
        &>div{
            float: left;
        }
    }
</style>