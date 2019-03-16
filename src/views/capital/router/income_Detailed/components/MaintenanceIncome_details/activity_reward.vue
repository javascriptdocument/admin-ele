<template>
    <div class='activity_reward'>
        <div class='form'>
            <!--<el-form :inline="true" :model="form" class="demo-form-inline">-->
                <!--<el-form-item label="奖励时间">-->
                    <!--<el-date-picker  type="daterange" align="right" unlink-panels range-separator="-"-->
                                     <!--start-placeholder="开始日期" end-placeholder="结束日期"-->
                                     <!--style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"  v-model='form.date' @change='screen()'>-->
                    <!--</el-date-picker>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        </div>
        <div class='table'>
            <el-table :data="tableData" style="width: 100%" :max-height="screenHeight">
                <el-table-column prop="times" label="活动时间"  align="center">

                </el-table-column>
                <el-table-column  label="活动内容"  align="center">
                    <template slot-scope='scope'>
                        <span class='ellipsis'>{{scope.row.content}}</span>
                        <el-button type='text' size='small' @click='details(detailsContent=scope.row.content,detailsDialogVisible=true)'>详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column  label="是/否获取" align="center">
                    <template slot-scope="scope">
                            <span>{{scope.row.if_elicit==1 ? '已获取' : '未获取'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="award_time" label="奖励时间"   align="center"></el-table-column>
                <el-table-column prop="award" label="奖励金(元)"  align="center"></el-table-column>
                <el-table-column prop="finish" label="完成率"  align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.finish}}%</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class='total'>
            <span class='right col-3498E9'>{{total}}</span>
        </div>
        <el-dialog title="活动内容详情" class='details' :visible.sync="detailsDialogVisible" width="40%" center>
            <span>{{detailsContent}}</span>
        </el-dialog>
        <component is='paging' :pageCount='pageCount' :currentChange='currentChange'></component>
    </div>
</template>
<script>
    import { getActivityReward } from '@/server/serverData'
    import paging from '@/views/common/paging'
    export default{
        data(){
            return{
                currentPage:1, //当前页
                pageCount:1, //总页数
                detailsContent:'', //活动内容详情
                form:{
                    date:''
                },
                total:'', //合计
                tableData:[],
                screenHeight:window.innerHeight-370,
                detailsDialogVisible:false
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
            /** 活动奖励列表 **/
           async init (){
              console.log(this.ApplyTime.endTime)
              try{
                  let res = await getActivityReward(
                          {
                              page:this.currentPage,
                              start_time:this.ApplyTime.startTime,
                              end_time:this.ApplyTime.endTime,
                          }
                  )
                  if(res.data.code==1){
                      this.tableData=res.data.data.list
                      this.pageCount=res.data.data.rows;
                      this.total=res.data.data.total
                  }else {
                      this.tableData=[]
                      this.pageCount=1
                      this.total=res.data.data.total
                  }
              }catch (err){
                  console.log(err)
              }
           },
           /** 日期筛选 **/
           screen(){
                this.currentPage=1;
                this.pageCount=1
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
            .ellipsis{
                width: 120px;
                height: 100%;
                line-height: 100%;
                font-size: 12px;
                display: inline-block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;

            }
        }
    }
    .total{
        padding: 30px 80px;
    }
    .paging{
        text-align: center;
        margin-top: 30px;
    }
    .details{
        span{
            min-height: 200px;
            display: inline-block;
        }
    }
</style>