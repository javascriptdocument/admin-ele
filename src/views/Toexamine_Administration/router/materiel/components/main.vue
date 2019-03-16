<template>
    <div class='main'>
        <div class='form'>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item class='search'>
                    <el-input placeholder="输入申请编号"class="input-with-select"  v-model='form.search'>
                        <el-button slot="append" @click='search()'>搜索</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker  type="daterange" align="right" unlink-panels range-separator="-"
                                    start-placeholder="开始日期" end-placeholder="结束日期" @change="search()"
                                    style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"  v-model='form.date'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class='table'>
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
                <el-table-column prop="apply_sn" label="申请编号"  align="center"></el-table-column>
                <el-table-column prop="create_time" label="申请时间"  align="center"></el-table-column>
                <el-table-column prop="audit_time" label="审核时间" align="center"></el-table-column>
                <el-table-column prop="address" label="状态"   align="center">
                    <template slot-scope='scope'>
                        <span>{{scope.row.audit_status==1 ? '已发货' : '未发货'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="物料详情"   align="center">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small"  @click='details(scope.row)'>查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button @click="ReceivingGoods(scope.row)"  type="primary" size="small">确认收货</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="sf" label="是否延迟"  align="center">
                    <template slot-scope='scope'>
                        <span>{{scope.row.if_delay==0 ? '否' : '是'}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog class='details' title="物料详情" :visible.sync="detailsDialogVisible" width="50%" center>
            <el-table
                    :data="tableData2"
                    border
                    style="width: 100%">
                <el-table-column prop="apply_sn" label="申请编号"  align='center'></el-table-column>
                <el-table-column prop="create_time" label="申请时间"  align='center'></el-table-column>
                <el-table-column prop="audit_time" label="审核时间" align='center'>
                </el-table-column>
            </el-table>
            <el-table
                    :data="tableData3"
                    border
                    style="width: 100%">
                <el-table-column prop="materiel" label="申请物料"  align='center'></el-table-column>
                <el-table-column prop="remarks" label="缺失数量(升)"  align='center'></el-table-column>
                <el-table-column prop="num" label="申请数量" align='center'>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmgGoods">确认收货</el-button>
            </span>
        </el-dialog>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange' :currentPage='currentPage' :sizeChange='sizeChange'></component>
    </div>
</template>
<script>
    import { unConfirm,confirm_goods,detail,materialSearch } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                currentPage:1, //当前页
                pageCount:1, //总页数
                form:{
                    search:'',
                    date:''
                },
                tableData:[],
                tableData2:[],
                tableData3:[],
                screenHeight:window.innerHeight-270,
                detailsDialogVisible:false, //物料详情对话框状态
                materielID:''
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
            /** 获取物料待确认收货列表 **/
           async init(){
                     let res = await materialSearch({
                                  value:this.form.search,
                                  startTime:this.ApplyTime.startTime,
                                  endTime:this.ApplyTime.endTime,
                                  page: this.currentPage
                               })
                    if(res.data.code==1){
                        this.pageCount=res.data.data.rows;
                        if(this.currentPage > this.pageCount){
                            this.currentPage = this.pageCount;
                        }
                        this.tableData=res.data.data.list;
                    }else{
                        this.tableData=[]
                        this.pageCount=1
                    }
            },

            /** 确定收货 **/
            ReceivingGoods(row){
                  /** 判断当前页是不是最后一页如果是最后一页并且是最后一条数据当前page-1 **/
                 if(this.pageCount > 1 && this.currentPage == this.pageCount && this.tableData.length <= 1)  this.currentPage-=1;

                 this.$confirm('您确定要收货吗?','提示',{
                     confirmButtonText:'确定',
                     cancelButtonText:'取消',
                     type:'warning'
                 }).then(()=>{
                     this.request(row.id)
                 }).catch(()=>{})
            },

            /** 点击查看物料详情 **/
            async details(row){
                this.detailsDialogVisible=true
                this.materielID=row.id
                let res=await detail({id:row.id})
                if(res.data.code==1){
                    let data=res.data.data;
                    this.tableData2=[
                        {apply_sn:data.apply_sn,create_time:data.create_time,audit_time:data.audit_time}
                    ]
                    this.tableData3=JSON.parse(data.detail)
                    console.log(this.tableData3)
                }
            },
            /** 物料详情确认收货**/
            confirmgGoods(){
                  this.request(this.materielID)
            },
            /** 请求收货接口 **/
           async  request(id){
                 let res = await confirm_goods({id:id})
                 if(res.data.code==1){
                     let that=this;
                     this.init()
                     this.$message({message:res.data.msg,type:'success',duration:1500,onClose(){
                         that.detailsDialogVisible=false
                         that.$store.commit('CHANGE_NUMBER','material')
                     }})
                 }else {
                     this.$message.error(res.data.msg)
                 }
            },
            /** 搜索 **/
            search(){
                /** 搜索之前先把当前也和总页数设置为1,防止搜索的时候当前页和总页数不变 **/
                this.currentPage=1;
                this.pageCount=1;
                this.init()
            },
            /** 获取当前页 **/
            currentChange(e){
               this.currentPage=e
               this.init()
            },
            sizeChange(e){
                 console.log(123)
            }
        },
        mounted(){
        this.init()
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

    /*物料详情弹框样式*/
    .details{
        /deep/ .el-dialog__header{
           padding-bottom: 20px;
            .el-dialog__title{
                color: #32373C;
                font-size: 20px;
                font-family:PingFangSC-Semibold;
            }
        }
        /deep/ .el-dialog__body{
            padding-top: 0;
           .el-table {
               margin-bottom: 30px;
               .el-table__header {
                   thead {
                       th {
                           background-color: #D7E1E6;
                           border: none;
                       }
                   }
               }
           }
           .el-table:last-child{
               margin-bottom: 0;
           }
        }
        /deep/ .dialog-footer{
            button{
                width: 30%;
            }
        }
    }
</style>