<template>
    <div class='main'>
        <div class='form'>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item class='search'>
                    <el-input placeholder="输入技师名称"class="input-with-select" v-model='form.search'>
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
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight" >
                <el-table-column prop="" label="头像"  align="center">
                    <template slot-scope='scope'>
                        <img :src="scope.row.wx_head">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="技师姓名"  align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="server" label="从业时间"   align="center"></el-table-column>
                <el-table-column prop="reg_time" label="申请时间"   align="center"></el-table-column>
                <el-table-column label="擅长技能"  align="center">
                    <template slot-scope='scope'>
                        <span class='ellipsis'>{{scope.row.skill}}</span>
                        <el-button type='text' size='small' @click='details(scope.row)'>详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作"  align="center">
                    <template slot-scope='scope'>
                       <el-button type='primary' size='small' @click='Authentication(scope.row)'>认证</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="擅长技能详情" class='details' :visible.sync="detailsDialogVisible" width="40%" center>
            <span>{{detailsContent}}</span>
        </el-dialog>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
</template>
<script>
    import { unverified,auditTns,skillDetail,techSearch } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                currentPage:1,//当前页
                pageCount:1, //总页数
                form:{
                    search:'',
                    date:''
                },
                tableData:[],
                screenHeight:window.innerHeight-370,
                detailsDialogVisible:false,
                detailsContent:''
            }
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
        components:{
            paging
        },
        methods:{

          /** 获取技师未认证列表 **/
          async init(){  //currentPage 当前页,如果不传值,默认是第一页
               let res = await techSearch({
                   name:this.form.search,
                   startTime:this.ApplyTime.startTime,
                   endTime:this.ApplyTime.endTime,
                   page:this.currentPage
               })
               if(res.data.code==1){
                   this.tableData=res.data.data.list
                   this.pageCount=res.data.data.rows
               }else{
                   this.tableData=[];
                   this.pageCount=1
               }
        },

          /** 查看技师技能详情 **/
          async details(row){
              this.detailsDialogVisible=true
              let res = await skillDetail({id:row.id})
              if(res.data.code==1){
                  this.detailsContent=res.data.data
              }
          },
          /** 认证 **/
          Authentication(row){
                 /** 判断当前页是不是最后一页如果是最后一页并且是最后一条数据当前page-1 **/
                 if(this.pageCount > 1 && this.currentPage == this.pageCount && this.tableData.length <= 1)  this.currentPage-=1;

                 this.$confirm('您确定要认证吗?','提示',{
                     confirmButtonText:'确定',
                     cancelButtonText:'取消',
                     type:'warning'
                 }).then(()=>{
                       this.request(row.id,row.cert)
                 }).catch(()=>{})
          },
          /** 请求认证接口 **/
          async request(id,cert){
             let res = await auditTns({id:id,cert:cert})
             if(res.data.code==1){
                 let that=this
                 this.init(that.currentPage)
                 this.$message({message:res.data.msg,type:'success',duration:1500,onClose(){

                     that.$store.commit('CHANGE_NUMBER','engineer')
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
            this.currentPage=e;
            this.init()
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
            .ellipsis{
                width: 70px;
                height: 100%;
                line-height: 100%;
                font-size: 12px;
                display: inline-block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        /deep/ .el-table__row{
            td{
                 .cell{
                    font-size: 12px;
                }
            }
        }
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
    .paging{
        text-align: center;
        margin-top: 30px;
    }
    .details{
        /deep/ .el-dialog__body{
            height: 200px;
            overflow: auto;
        }
    }
</style>