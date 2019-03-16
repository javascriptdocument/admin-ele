<template>
    <div class='modify_content'>
        <div class='content ft-14'>
            <div class='shop_information col-64696E'>
                <div class='shop_details border_bottom'>
                    <p class='ft-18 col-32373C ft-weight6'>店铺信息</p>
                    <div>
                        <table>
                            <tr>
                                <td>手机号:</td>
                                <td>
                                    <span>{{shopInfoList.phone}}</span>
                                    <router-link :to="{path:'modify_Telephone',query:{phone:shopInfoList.phone} }" class='col-FF2828 margin-left30'>修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>维修厂名称:</td>
                                <td>
                                    <el-input  placeholder="输入维修厂名称" v-model='shopInfoList.company'></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>负责人:</td>
                                <td>
                                        <el-input v-model='shopInfoList.leader'  placeholder="输入负责人"></el-input>
                                </td>
                            </tr>
                            <tr >
                                <td>主修:</td>
                                <td class='Major'>
                                    <div class=''>
                                        <el-input   v-for='(item,index) of major'   :key='index' maxlength='5' v-model='major[index]'></el-input>

                                    </div>
                                </td>
                            </tr>
                            <tr >
                                <td>所在城市:</td>
                                <td class='City'>
                                    <el-select  placeholder="请选择" v-model='shopInfoList.province' @change='getCity'>
                                           <el-option v-for='item of province' :key='item.id' :value='item.name' :label='item.name'></el-option>
                                    </el-select>
                                    <el-select  placeholder="请选择" v-model='shopInfoList.city' @change='getCounty'>
                                        <el-option v-for='item of city' :key='item.id' :value='item.name' :label='item.name'></el-option>
                                    </el-select>
                                    <el-select  placeholder="请选择" v-model='shopInfoList.county' @change='getCountyID'>
                                        <el-option v-for='item of county' :key='item.id' :value='item.name' :label='item.name'></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>详细地址:</td>
                                <td>
                                    <el-input v-model='shopInfoList.address'></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>服务电话:</td>
                                <td>
                                    <el-input type='tel' v-model='shopInfoList.serphone'></el-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class='shop_introduce border_bottom'>
                    <div class='shop_introduce-title'>
                        <p class='ft-18 col-32373C ft-weight6'>店铺简介</p>
                    </div>
                    <div class='shop_content ft-14'>
                        <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入内容"
                                v-model='shopInfoList.about'
                                >
                        </el-input>
                    </div>
                </div>
                <div class='BusinessLicense border_bottom'>
                    <p class='ft-18 col-32373C ft-weight6'>营业执照</p>
                        <div class='picture'>
                            <el-upload   :before-upload='beforeUpload' :action='uploadUrl' list-type="picture-card" :data='token'    name="image" :on-success="uploadLicense"  :file-list='license' :on-remove='uploadLicenseRemove' >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                </div>
                <div class='shop_Photo border_bottom'>
                    <p class='ft-18 col-32373C ft-weight6'>店铺照片</p>
                    <div class='Photo cft'>
                        <p >
                            <el-upload  :action='uploadUrl' :before-upload='beforeUpload'   list-type="picture-card"  :limit="3"  :data='token'  :file-list='photoList'   name="image" :on-success='uploadShopSuccess' :on-remove='uploadShopRemove' >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </p>

                    </div>
                </div>
                <div class='Put_forward'>
                    <p class='ft-18 col-32373C ft-weight6'>提现账户</p>
                    <div>
                        <table>
                            <tr>
                                <td>开户名:</td>
                                <td> <el-input v-model='shopInfoList.account_name'></el-input></td>
                            </tr>
                            <tr>
                                <td>账户号:</td>
                                <td> <el-input v-model='shopInfoList.account'></el-input></td>
                            </tr>
                            <tr>
                                <td>开户行:</td>
                                <td>
                                    <el-select  placeholder="请选择"  v-model='shopInfoList.bank_name' @change='getBankID'>
                                        <el-option v-for='item of BankList' :key='item.id' :value='item.name' :label='item.name'></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>分行:</td>
                                <td> <el-input v-model='shopInfoList.branch'></el-input></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class='Preservation'>
                    <el-button type="primary" @click='Preservation'>保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import { getSon,getShopInfo,getPro,setShopInfo,getBankCode} from "@/server/serverData"
    import { mapState } from "vuex"
    export default{
        data(){
            return{
                dialogVisible:false,
                dialogImageUrl:'',
                province:null,
                city:null,
                county:null,
                BankList:null,
                token:{
                    token:window.sessionStorage.getItem('token')
                },
                shopInfoList:'',
                photoList:[],
                license:[],
            }
        },
        computed:{
            /** 主修一共显示6个,后台给的数据如果不是6个那么循环出来的则不是6个,所以在这里进行计算下,这样的话不论后台返回的是几条数据都是6个 **/
            major(){
                let major=this.shopInfoList.major || [], lenght=major.length,empty=[];
                for(var i=0;i<6-lenght;i++){
                    empty.push(null)
                }
                return [...major,...empty]
            },
        },
        methods:{
            /** 初始化数据**/
            async init(){
                /**  获取默认店铺信息**/
                let ShopInfo=await getShopInfo();
                this.shopInfoList=ShopInfo.data;

                /** 店铺照片默认显示图片**/
                let temp=ShopInfo.data.photo,photo=[];

                 if(temp.length>0){
                   for(var i=0;i<temp.length;i++){
                       photo.push({url:temp[i]})
                   }
                 }
                this.photoList=photo

                /** 营业执照默认显示图片 **/
                this.license=[{url:ShopInfo.data.license}]

                /** 获取省 **/
                let Province=await getPro()
                this.province=Province.data;

                /** 获取默认省id**/
                let  ProID=this.getID(this.province,this.shopInfoList.province)

                /** 根据省id获取市 **/
                let City= await getSon(ProID);
                this.city=City.data;

                /** 获取市id **/
                let cityID=this.getID(this.city,this.shopInfoList.city)

                /** 根据市id获取县或区 **/
                let County= await getSon(cityID);
                this.county=County.data;

                 /** 获取所有银行列表**/
                let getBank=await getBankCode()
                this.BankList=getBank;

            },
            /** 保存修改**/
            async Preservation(){
                   let form={
                       company:this.shopInfoList.company,
                       leader:this.shopInfoList.leader,
                       major:this.major,
                       province:this.shopInfoList.province,
                       city:this.shopInfoList.city,
                       county:this.shopInfoList.county,
                       address:this.shopInfoList.address,
                       photo:this.shopInfoList.photo,
                       about:this.shopInfoList.about,
                       license:this.shopInfoList.license,
                       serphone:this.shopInfoList.serphone,
                       county_id:this.shopInfoList.county_id,
                       account_name:this.shopInfoList.account_name,
                       account:this.shopInfoList.account,
                       branch:this.shopInfoList.branch,
                       bank:this.shopInfoList.bank
                   }
                  console.log(this.BankList)
                  let res= await setShopInfo(form)
                  console.log(res.data.code)
                  if(res.data.code==1){
                      let that=this
                      this.$message({message:res.data.msg,type:'success',onClose(){
                          that.$router.push('/account_information')
                      }})
                  }else {
                      this.$message.error(res.data.msg)
                  }


            },
            /** 上传之前,规定用户上传必须是jpeg、png、jpg并且图片上传最大不能超过2M **/
            beforeUpload(file){
                 const isvalid= file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
                 const isLt2M = file.size / 1024 / 1024 < 2;
                 if(!isvalid){
                     this.$message.error("上传图片格式应为 jpeg/png/jpg!");
                 }
                 if(!isLt2M){
                     this.$message.error("上传图片大小不能超过 2MB!");
                 }
                 return isvalid && isLt2M;
            },
            /** 上传成功的营业执照 **/
            uploadLicense(res)
            {
                console.log(res)
                this.shopInfoList.license = res
            },
            /** 删除营业执照 **/
            uploadLicenseRemove(){
                this.shopInfoList.license=''
            },
            /**  上传成功的店铺照片**/
            uploadShopSuccess(res, file)
            {
                console.log(file)
                this.shopInfoList.photo.push(res)
            },
            /** 删除店铺照片 **/
            uploadShopRemove(file,fileList)
            {
               let findIndex= this.shopInfoList.photo.findIndex(v=>{
                    return v==file.url || v==file.response
                })
                this.shopInfoList.photo.splice(findIndex,1)
            },
           /** 获取市 **/
           async getCity(name){
                 this.shopInfoList.city=null
                 this.shopInfoList.county=null
                 let id=this.getID(this.province,name);
                 let res= await getSon(id)
                 console.log(this.city)
                 this.city=res.data
            },
           /** 获取区或县**/
           async getCounty(name){
                this.shopInfoList.county=null
                let id=this.getID(this.city,name)
                let res=await getSon(id)
                this.county=res.data
            },
            /** 获取区或县的id**/
            getCountyID(name){
                 let id=this.getID(this.county,name)
                 this.shopInfoList.county_id=id
           },

           /** 获取银行列表当前被选中id**/
           getBankID(name){
                let bank_ID= this.getID(this.BankList,name)

                 let finIndex =  this.BankList.findIndex(v=>{
                             return v.name==name
                         })
                this.shopInfoList.bank=this.BankList[finIndex].code
           },
           /** 获取指定id **/
           getID(cover,name){
              /**因为需求这里,按道理是可以拿到省id但是最后提交的时候后台要的是name,所以这里根据name查询当前所选的id **/
              let findIndex = cover.findIndex(v=>{
                          return v.name==name    /** 如果当前name等于省数据里面的name则返回下标 **/
               })
                /** 根据下标查找,当前选中的id**/
               return cover[findIndex].id;
            }

        },
        mounted(){
          this.init()
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
                        margin-top: 10px;
                        tr{
                            &>td{
                                line-height: 49px;
                                /deep/ input{
                                    width: 60%;
                                }
                            }
                            .Major:after{
                                display: block;
                                content: '';
                                clear: both;
                            }
                            .Major{
                                /deep/ .el-input{
                                   width: calc((60%/6) - 8.5px);
                                    margin-right: 10px;
                                   .el-input__inner{
                                       width: 100%;
                                   }
                                }
                            }
                            .City{
                                /deep/ .el-select{
                                    width: 15% !important;
                                    margin-right: 10px;
                                    .el-input__inner{
                                        width: 100%;
                                    }
                                }
                            }
                            &>td:first-child{
                                text-align: right;
                                padding-right: 10px;
                                width: 85px;
                            }
                        }
                    }
                }
                .shop_introduce{
                    padding: 30px 0;
                    .shop_content{
                        line-height: 34px;
                        width: calc(100% - 110px);
                        margin-top:30px;
                    }
                }
                .BusinessLicense{
                    padding: 30px 0;
                    .picture{
                        width: 160px;
                        height: 160px;
                        overflow: hidden;
                        margin-top: 38px;
                        &>div{
                            width: 100%;
                            height: 100%;
                        }
                        /deep/ .el-upload-list--picture-card .el-upload-list__item{
                           margin: 0 0 30px 0;
                        }
                    }
                }
                .shop_Photo{
                    padding: 30px 0;
                    .Photo{
                        margin-top: 38px;
                        p{
                            /*overflow: hidden;*/
                            float: left;
                            margin-right: 20px;
                            /deep/ .el-upload-list--picture-card .el-upload-list__item{
                                margin: 0 20px 30px 0;
                            }

                        }

                    }
                }
                .Put_forward{
                    padding: 30px 0;
                    table{
                        margin-top: 22px;
                        margin-left: 30px;
                        td{
                            line-height: 50px;
                            /deep/ input{
                                width: 100%;
                            }
                        }
                        td:first-child{
                            padding-right: 10px;
                            text-align: right;
                        }
                    }
                }
                .Preservation{
                    text-align: center;
                   padding-bottom: 93px;
                   margin-top: 30px;
                    margin-bottom: 165px;
                    button{
                        width: 30%;
                    }
                }
            }
        }
</style>