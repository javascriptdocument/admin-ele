<template>
    <div class='main'>
        <div class='box'>
            <ul>
                <router-link tag='li' to='/maintainMode' class='maintain'>邦保养管理</router-link>
                <router-link tag='li' :to='{path:"/generalize",query: {ifsigning: 1}}' class='Storefront'>店面推广</router-link>
                <router-link tag='li' to='/obd' class='Maintenance'>维保商机</router-link>
                <!-- <router-link tag='li' to='/vip' class='vip'>会员专属</router-link> -->
                <router-link tag='li' to='/capital' class='capital'>资金管理</router-link>
                <router-link tag='li' to='/Toexamine_Administration' class='Toexamine'>审核管理<el-badge :value="total" :hidden='total<=0'  :max="99" class="item Tips"></el-badge></router-link>
                <!--<li tag='li' @click="msgtip" class='data'>数据分析</li>-->
                <router-link tag='li' to='/dataAnalysisMode' class='data'>数据分析</router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    import { number } from '@/server/serverData'
    export default {
        data(){
          return{
              data:{}
          }
        },
        computed:{
            total(){
                let data=this.data,temp=0;
                for(var  i in data){
                    temp+=data[i]
                }
                return temp
            }
        },
        methods: {
            msgtip (){
                this.$confirm("敬请期待！", "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning",
                    showClose: false,
                    closeOnClickModal: true,
                    closeOnPressEscape: true,
                    center: true,
                })
            },
            addifsigning(){
                window.sessionStorage.setItem("ifsigning", 1);
            },
            async init(){
                 try {
                     let res = await number()
                     if(res.data.code==1){
                         this.data=res.data.data
                     }
                 }catch (err){
                     console.log(err)
                 }
            },

        },
        mounted(){
           this.init();
        }
    }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
    .main {
		    width: 1100px;
        width:850px;
        margin: 20vh auto 0 auto;
        .box {
            ul:after {
                content: "";
                clear: both;
            }
            ul {
                width: 1100px;
                width:850px;
                height: 360px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                li {
                    margin: 10px;
                    width: 250px;
                    height: 160px;
                    text-align: center;
                    line-height: 270px;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    position: relative;
                    .Tips{
                        position: absolute;
                        top: 0;
                        right: 30px;
                        /deep/ .el-badge__content{
                            position: absolute;
                            top: 10px;
                            right: 0;
                            border: none;
                        }
                    }
                }

                .maintain {
                    background-image: url("../images/maintain.png");
                    background-size: 100% 100%;
                }
                .Member {
                    background-image: url("../images/Member.png");
                    background-size: 100% 100%;
                }
                .Storefront {
                    background-image: url("../images/Storefront.png");
                    background-size: 100% 100%;
                }
                .Maintenance {
                    background-image: url("../images/Maintenance.png");
                    background-size: 100% 100%;
                }
                .capital {
                    background-image: url("../images/capital.png");
                    background-size: 100% 100%;
                }
                .Toexamine {
                    background-image: url("../images/Toexamine.png");
                    background-size: 100% 100%;
                    position: relative;
                    span {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: #ff2828;
                        text-align: center;
                        line-height: 15px;
                        font-size: 12px;
                        right: 10px;
                        top: 10px;
                    }
                }
                .data {
                    background-image: url("../images/data.png");
                    background-repeat: no-repeat;
                    background-size: 200% 100%;
                    /*width: 520px;*/
                    background-position: center;
                    border-radius: 10px;
                }
                .vip{
                    background-image: url("../images/Member.png");
                    background-repeat: no-repeat;
                    background-size: 100%;
                    background-position: center;
                    border-radius: 10px;
                }
            }
        }
    }

    // .main .box ul .Maintenance {
    //   position: relative;
    // }
    // .main .box ul .Maintenance:after {
    //   content: "5";
    //   line-height: 20px;
    //   font-size: 16px;
    //   color: #fff;
    //   width: 20px;
    //   height: 20px;
    //   position: absolute;
    //   right: -24px;
    //   top: 0px;
    //   background-color: red;
    //   border-radius: 50%;
    // }
</style>
