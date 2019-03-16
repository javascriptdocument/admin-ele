<template>
    <div>
        <div class='content ft-14'>
            <div class='shop_information col-64696E'>
                <div class='shop_title cft'>
                    <p class='ft-18 col-32373C ft-weight6'>店铺信息</p>
                    <el-button type="primary" @click="$router.push('modify_information')">修改</el-button>
                </div>
                <div class='shop_details  border_bottom'>
                    <table>
                        <tr>
                            <td>手机号:</td>
                            <td>{{shopInfo.phone}}</td>
                        </tr>
                        <tr>
                            <td>维修厂名称:</td>
                            <td>{{shopInfo.company}}</td>
                        </tr>
                        <tr>
                            <td>负责人:</td>
                            <td>{{shopInfo.leader}}</td>
                        </tr>
                        <tr>
                            <td>主修:</td>
                            <td>
                                <span  v-for='item of shopInfo.major'>{{item|major}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>所在城市:</td>
                            <td>{{shopInfo.province+shopInfo.city+shopInfo.county}}</td>
                        </tr>
                        <tr>
                            <td>详细地址:</td>
                            <td>{{shopInfo.address}}</td>
                        </tr>
                        <tr>
                            <td>服务电话:</td>
                            <td>{{shopInfo.serphone}}</td>
                        </tr>
                    </table>
                </div>
                <div class='shop_introduce border_bottom'>
                    <div class='shop_introduce-title'>
                        <p class='ft-18 col-32373C ft-weight6'>店铺简介</p>
                    </div>
                    <div class='shop_content ft-14'>
                         {{shopInfo.about}}
                    </div>
                </div>
                <div class='BusinessLicense border_bottom'>
                    <p class='ft-18 col-32373C ft-weight6'>营业执照</p>
                    <div class='picture'>
                        <img :src="shopInfo.license">
                    </div>
                </div>
                <div class='shop_Photo border_bottom'>
                    <p class='ft-18 col-32373C ft-weight6'>店铺照片</p>
                    <div class='Photo cft'>
                        <p v-for='item in shopInfo.photo'>
                           <img :src="item">
                        </p>
                    </div>
                </div>
                <div class='Put_forward'>
                    <p class='ft-18 col-32373C ft-weight6'>提现账户</p>
                    <div>
                        <table>
                            <tr>
                                <td>开户名:</td>
                                <td>{{shopInfo.account_name}}</td>
                            </tr>
                            <tr>
                                <td>账户号:</td>
                                <td>{{shopInfo.account}}</td>
                            </tr>
                            <tr>
                                <td>开户行:</td>
                                <td>{{shopInfo.bank_name}}</td>
                            </tr>
                            <tr>
                                <td>分行:</td>
                                <td>{{shopInfo.branch}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['shopInfo'],
        filters:{
            major(item){
                return  item ? `${item} / ` : ''
            }
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
        .content{
            width: 62%;
            margin: 0 auto;
            border-radius:5px;
            background-color: white;
            padding-top: 50px;
            &>div{
                padding: 0 50px;
            }
            .shop_information{
                .shop_title{
                    p{
                        float: left;
                    }
                    button{
                        float: right;
                    }
                }
                .shop_details{
                    margin-top: 7px;
                    padding-bottom:20px ;
                    table{
                        tr{
                            &>td{
                                line-height: 44px;
                            }
                            &>td:first-child{
                                text-align: right;
                                padding-right: 10px;
                            }
                        }
                    }
                }
                .shop_introduce{
                    padding: 30px 0;
                    .shop_content{
                        line-height: 34px;
                        width: calc(100% - 110px);
                        margin-top:15px ;
                        word-wrap: break-word;
                        word-break: normal;
                    }
                }
                .BusinessLicense{
                    padding: 30px 0;
                    .picture{
                        width: 160px;
                        height: 160px;
                        background-color: #F0F0F0;
                        margin-top: 38px;
                        &>img{
                          width: 100%;
                            height: 100%;
                            border: 1px solid #ccc;
                        }
                    }
                }
                .shop_Photo{
                    padding: 30px 0;
                    .Photo{
                        margin-top: 38px;
                        p{
                            width: 160px;
                            height: 160px;
                            background-color: #F0F0F0;
                            float: left;
                            margin-right: 20px;
                            &>img{
                                width: 100%;
                                height: 100%;
                                border:1px solid #ccc;
                            }
                        }
                    }
                }
                .Put_forward{
                    padding: 30px 0;
                    margin-bottom: 96px;
                    table{
                        margin-top: 22px;
                        margin-left: 30px;
                        td{
                            line-height: 44px;
                        }
                        td:first-child{
                            padding-right: 10px;
                            text-align: right;
                        }
                    }
                }
            }
        }
</style>