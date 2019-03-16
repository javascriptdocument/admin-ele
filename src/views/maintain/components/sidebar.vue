<template>
    <div class='sidebar'>
        <div class='logo'>
            <img src="../../../assets/images/logo.png">
        </div>
        <div class=''>
            <ul>
                <router-link tag='li' to='/maintain/state_maintain'>1111</router-link>
                <router-link tag='li' to='/maintain/gift'>1111</router-link>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default{
        name:'sidebar',
        components:{
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .sidebar{
        width: 160px;
        height: 100%;
        .logo{
            width: 160px;
            height: 10%;
            background-color: #164870;
        }
        &>div:last-child{
            background-color: #3498E9;
            height: 90%;
        }
    }
</style>