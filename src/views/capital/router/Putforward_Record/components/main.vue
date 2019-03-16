<template>
    <div class='main'>
        <div class='form'>
            <el-form :inline="true" :model="form" class="demo-form-inline" >
                <el-form-item label="申请时间">
                    <el-date-picker  type="daterange" align="right" unlink-panels range-separator="-"
                                     start-placeholder="开始日期" end-placeholder="结束日期" @change="search()"
                                     style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"  v-model='form.date' >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class='search' label='状态' style='margin-left: 40px'>
                      <el-select v-model='form.select' @change='draw_List()'>
                          <el-option label='全部'>全部</el-option>
                          <el-option value='0' label='审核中'>审核中</el-option>
                          <el-option value='1' label='已通过'>已通过</el-option>
                          <el-option value='2' label='已驳回'>已驳回</el-option>
                      </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class='tableData'>
            <div class='table'>
                <el-table :data="data" style="width: 100%" :max-height="screenHeight">
                    <el-table-column prop="account" label="提现账户"  align="center"></el-table-column>
                    <el-table-column prop="money" label="提现金额(元)"  align="center"></el-table-column>
                    <el-table-column prop="create_time" label="申请时间" align="center"></el-table-column>
                    <el-table-column prop="audit_time" label="审核时间"   align="center"></el-table-column>
                    <el-table-column prop='audit_status'  label="状态"   align="center">
                        <template slot-scope="scope">
                            <span :class="[scope.row.audit_status==0 ? 'col-32373C' : scope.row.audit_status==1 ? 'col-00912D' : scope.row.audit_status==2 ? 'col-FF2828':'' ]">{{scope.row.audit_status==0 ? '审核中' : scope.row.audit_status==1 ? '已通过' : scope.row.audit_status==2 ? '已驳回':'' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="驳回理由"  align="center">
                        <template slot-scope="scope">
                            <a href="javascript:;" class='col-3498E9' v-if='scope.row.audit_status==2'  @click="See(scope.row.id)">查看</a>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="驳回理由" :visible.sync="Reject_ReasonState" width="30%" center>
            <div class='Reason'>
                {{Reason}}
            </div>
        </el-dialog>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
</template>
<script>
    import { drawList,checkReason } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        name:'Main',
        data(){
          return{
              pageCount:1, //总页数,
              currentPage:1,//当前页
              form:{
                  date:'',
                  search:'',
                  select:''
              },
              data:[],
              screenHeight:window.innerHeight-300,
              Reject_ReasonState:false,
              Reason:'', //驳回理由
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
            async draw_List(){
               let res = await drawList(
                 {
                     search:this.form.search,
                     start_time:this.ApplyTime.startTime,
                     end_time:this.ApplyTime.endTime,
                     page: this.currentPage,
                     status:this.form.select
                 }
               );
               if(res.data.code==1){
                   this.data=res.data.data.list;
                   this.pageCount=res.data.data.rows;
               }else{
                   this.data=[]
               }
            },
            /** 搜索 **/
            search(){
                /** 搜索之前先把当前也和总页数设置为1,防止搜索的时候当前页和总页数不变 **/
                this.currentPage=1;
                this.pageCount=1;
                this.draw_List()
            },
           /** 获取当前页 **/
           currentChange(e){
             this.currentPage=e;
             this.draw_List()
           },
          async See(id){
               this.Reject_ReasonState=true
               let res = await checkReason({id:id})
               if(res.data.code==1){
                   this.Reason=res.data.data
               }else {
                   this.Reason=''
               }
           }
        },
       mounted(){
         this.draw_List()
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
        padding: 30px 0 0 30px;
        /deep/ .el-form-item__content{
          .el-input-group__append, .el-input-group__prepend{
            border: none;
            background-color: #3498E9;
            color: white;
            padding: 0 30px;
         }
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
    .Reason{
        min-height: 200px;
    }
</style>