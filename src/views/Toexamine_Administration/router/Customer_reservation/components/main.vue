<template>
    <div class='main'>
        <div class='form'>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item class='search'>
                    <el-input placeholder="输入车牌号"class="input-with-select" v-model='form.search'>
                        <el-button slot="append" @click='search()'>搜索</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker v-model="form.date" type="daterange" align="right" unlink-panels range-separator="-"
                                    start-placeholder="开始日期" end-placeholder="结束日期" @change="search()"
                                     style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class='table'>
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
                <el-table-column prop="plate" label="车牌号"  align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式"  align="center"></el-table-column>
                <el-table-column prop="make" label="预约时间" align="center"></el-table-column>
                <el-table-column prop="f_name" label="服务项"   align="center"></el-table-column>
                <el-table-column prop="pro_name" label="产品名称"   align="center"></el-table-column>
                <el-table-column prop="pro_brand" label="产品品牌"  align="center"></el-table-column>
                <el-table-column prop="pro_model" label="产品型号"  align="center"></el-table-column>
                <el-table-column prop="address" label="预约详情"  align="center">
                    <template slot-scope='scope'>
                        <el-button type="text" size='small' @click='details(scope.row)'>查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作"  align="center">
                    <template slot-scope='scope'>
                        <el-button type="primary" size='small' @click='confirm(scope.row)'>确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="预约详情" class='details' :visible.sync="detailsDialogVisible" width="40%" center>
            <table border>
                <tr>
                    <td>
                        <span>品牌/车型/排量： </span>
                        <span>{{detailsList.brand_car_displa}}</span>
                    </td>
                    <td>
                        <span>产品型号：</span>
                        <span>{{detailsList.pro_model}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>车牌号： </span>
                        <span>{{detailsList.plate}}</span>
                    </td>
                    <td>
                        <span>规格： </span>
                        <span>{{`${detailsList.number}${detailsList.spec}`}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>服务项： </span>
                        <span>{{detailsList.f_name}}</span>
                    </td>
                    <td>
                        <span>数量： </span>
                        <span>{{detailsList.number}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>产品名称： </span>
                        <span>{{detailsList.pro_ame}}</span>
                    </td>
                    <td>
                        <span>首次价格： </span>
                        <span>{{detailsList.one_price}}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>产品品牌：</span>
                        <span>{{detailsList.pro_brand}}</span>
                    </td>
                    <td>
                        <span>折扣率：</span>
                        <span>{{detailsList.redate}}</span>
                    </td>
                </tr>
            </table>
        </el-dialog>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
</template>
<script>
    import { reservationSearch,validation,getDetailMake,materialSearch } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                currentPage:1,//当前页数
                pageCount: 1, //总页数
                form:{
                    search:'',
                    date:''
                },
                tableData:[],
                screenHeight:window.innerHeight-370,
                detailsDialogVisible:false,
                detailsList:'',
            }
        },
        components:{
            paging
        },
        computed:{
            ApplyTime(){  /** 申请时间,如果有数据,返回此数据,如果没有返回空 **/
                return this.form.date instanceof Array ? {
                    startTime:this.form.date[0],
                    endTime: this.form.date[1]
                } :{
                    startTime:'',
                    endTime: ''
                }
            },

        },
        methods:{
          /** 获取客户预约列表+搜索 **/
          async search(){
               let res = await reservationSearch({
                   value:this.form.search,
                   startTime:this.ApplyTime.startTime,
                   endTime:this.ApplyTime.endTime,
                   page: this.currentPage
               })
               if(res.data.code==1){
                   this.tableData=res.data.data.list;
                   this.pageCount=res.data.data.rows;
               }else{
                   this.tableData=[]
                   this.pageCount=1
               }
           },

          /** 预约详情 **/
          async details(row){
              this.detailsDialogVisible=true
              let res = await getDetailMake({id:row.id})
              if(res.data.code==1){
                  this.detailsList=res.data.data
              }else {
                  this.detailsList=''
              }
          },

          /** 用户点击确认,同意该操作 **/
          confirm(row){
             /** 判断当前页是不是最后一页如果是最后一页并且是最后一条数据当前page-1 **/
              if(this.pageCount > 1 && this.currentPage == this.pageCount && this.tableData.length <= 1)  this.currentPage-=1;
                 this.$confirm('此用户已预先是否同意?','提示',{
                     confirmButtonText:'确定',
                     cancelButtonText:'取消',
                     type:'warning'
                 }).then(()=>{
                     console.log(123)
                     this.request(row.id)
                  }).catch(()=>{})
          },

          /** 客户预约确认接口 **/
          async request(id){
               let res = await validation({id:id})
               if(res.data.code==1){
                   let that=this;
                   this.search()
                   this.$message({message:res.data.msg,type:'success',duration:1500,onClose(){
                       that.$store.commit('CHANGE_NUMBER','reservation')
                   }})
               }else {
                   this.$message.error(res.data.msg)
               }
          },

         /** 获取当前页 **/
         currentChange(e){
             this.currentPage=e;
             this.search()
         }
        },
        mounted(){
        this.search()
            var that=this
            window.onresize = () => {
                return (() => {
                    that.screenHeight = window.innerHeight - 370
            })()
            }
        }
    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">

    .form{
        padding: 20px 0 20px 30px;
        margin-bottom: 0;
        /deep/ .el-form-item__content{
            .el-input-group__append, .el-input-group__prepend{
                border: none;
                background-color: #3498E9;
                color: white;
                padding: 0 30px;
            }

        }
       .el-form-item{
            margin-bottom: 0 !important;
        }
        .search{
            margin-right: 40px;
        }
    }
    .table{
        /deep/ .el-table th, .el-table tr{
            background-color: #D7E1E6;
        }
        /deep/ .el-table__row{
            td{
                .cell{
                    font-size: 12px;
                }
            }
        }
    }
    .paging{
        text-align: center;
        margin-top: 30px;
    }
    .details{
        /deep/ .el-dialog__header{
            padding-bottom: 20px;
        }
       /deep/ .el-dialog__body{
           min-height: 200px;
           overflow: auto;
           padding-top: 0;
          &>table{
              width: 100%;
              border: 1px solid #D7E1E6;
              td{
                  width: 50%;
                  span{
                      display: inline-block;
                      line-height: 40px;
                  }
                  span:first-child{
                      width: 110px;
                      text-align: right;
                  }
              }
          }
       }
    }
</style>