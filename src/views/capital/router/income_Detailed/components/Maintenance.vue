<template>
    <div class='Maintenance'>
         <div class='navBar'>
             <el-tabs v-model="activeName" @tab-click="handleClick">
                 <el-tab-pane label="服务费" name="first">
                     <component is='Service_charge'></component>
                 </el-tab-pane>
                 <el-tab-pane label="好评收入" name="second">
                     <component is='Praise_income'></component>
                 </el-tab-pane>
                 <el-tab-pane label="售卡奖励" name="third">
                     <component is='Salecard_reward'></component>
                 </el-tab-pane>
                 <el-tab-pane label="活动奖励" name="fourth">
                     <component is='activity_reward'></component>
                 </el-tab-pane>
                 <el-tab-pane label="滤芯补贴" name="a">
                     <component is='subsidy'></component>
                 </el-tab-pane>
                 <el-tab-pane label="推荐奖励" name="recommend">
                     <component is='recommend'></component>
                 </el-tab-pane>
             </el-tabs>
         </div>
    </div>
</template>
<script>
    import Service_charge from './MaintenanceIncome_details/Service_charge'
    import Praise_income from './MaintenanceIncome_details/Praise_income'
    import Salecard_reward from './MaintenanceIncome_details/Salecard_reward'
    import activity_reward from './MaintenanceIncome_details/activity_reward'
    import subsidy from './MaintenanceIncome_details/subsidy'
    import recommend from './MaintenanceIncome_details/recommend'
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
            Service_charge,
            Praise_income,
            Salecard_reward,
            activity_reward,
            subsidy,
            recommend
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .Maintenance{
        padding-left: 30px;
        .navBar{
            /deep/ .el-tabs__nav-wrap::after{
                width: 98%;
            }
        }
    }
</style>