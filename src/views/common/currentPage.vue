<template>
    <div  class='currentPage'>
        <div class='current cft'>
            <ul class='cft'>
                <router-link tag='li' :to='item.path' v-for='item of this.$route.meta.current' >
                    {{item.name}}
                </router-link>
            </ul>
           <p class='col-64696E'>
               <el-tooltip class="item" effect="dark" content="遇到问题 ？点击查看帮助文档" placement="left">
                   <el-button type='text' @click='Help_File'>帮助文档</el-button>
               </el-tooltip>
           </p>
        </div>
        <div style='display: none' ref='laybox' class='doc-laybox'>
            <div v-html='laycontent'></div>
        </div>
    </div>
</template>
<script>
    import { file } from '@/server/serverData'
    export default{
           data(){
             return{
                 laycontent:''
             }
           },
            props:['id'],
            methods:{
                async Help_File(){
                   console.log(this.id)
                   try {
                       let res = await file({
                           d_id:this.id
                       })
                      if(res.code==1){
                          console.log(res.data.content)
                          this.laycontent=window.etos(res.data.content);
                      }
                       let that=this;
                       layer.open({
                           type:1,
                           title:'帮助文档',
                           content:jQuery('.doc-laybox')
                       })
                   }catch (err){
                       console.log(err)
                   }

                }
            }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .currentPage{
        margin: 0 50px 0 30px;
        height: 40px;
        line-height: 40px;
        .current{
            margin-bottom: 30px;
            font-size: 12px;
            &>ul{
                float: left;
                &>li{
                    float: left;
                    margin-right: 5px;
                    color: #3498E9;
                    cursor: pointer;
                }
                &>li:last-child{
                    color: #64696E;
                }
            }
            &>p{
                float: right;
            }
        }
    }
</style>
<style>
    .layui-layer{
        width: 100% !important;
        height: 100%;

    }
    .layui-layer-content{
        margin-left: 10%;
        text-align: left;
    }
    .layui-layer-title{
        text-align: center;
    }
</style>