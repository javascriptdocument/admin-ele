<template>
    <div class='Member'>
        <div class='navBar'>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="首次录入奖励" name="first">
                    <component is='firstLogin_reward'></component>
                </el-tab-pane>
                <el-tab-pane label="再次服务收入" name="second">
                    <component is='ServiceAgain_income'></component>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import firstLogin_reward from './MemberIncome_details/firstLogin_reward'
    import ServiceAgain_income from './MemberIncome_details/ServiceAgain_income'
    export default{
        data(){
            return{
                activeName:'first'
            }
        },
        methods:{
            handleClick(tab,event){
                console.log(this.activeName)
            }
        },
        components:{
            firstLogin_reward,
            ServiceAgain_income
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .Member{
        padding-left: 30px;
        .navBar{
            /deep/ .el-tabs__nav-wrap::after{
                width: 98%;
            }
        }
    }
</style>