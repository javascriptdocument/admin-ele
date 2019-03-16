<template>
    <div class='news'>
        <div>
            <div v-for='item of data'>
                <span>{{item.title}}</span>
                <span>{{item.create_time}}</span>
            </div>
        </div>
        <div class='whole'>
            <router-link to='/news'>查看全部></router-link>
        </div>
    </div>
</template>
<script>
    import { getList } from '@/server/serverData'
    export default{
       data(){
           return{
                data:[]
           }
       },
        methods:{
            /** 获取消息 **/
            async init(){
                try {
                    let res = await getList()
                     if(res.data.code==1){
                       this.data=res.data.data.list
                     }
                }catch (err){
                    console.log(err)
                }
            }
        },
       mounted(){
           this.init()
        }
    }
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
    .news{
        &>div:first-child>div{
            display: flex;
            justify-content: space-around;
            margin: 0 10px;
            border-bottom: 1px solid #D7E1E6;
        }
        span{
            display: inline-block;
            padding: 17px 10px;
            flex: 1;

        }
        span:first-child{
            text-align: left;
            
        }
        span:last-child{
            text-align: right;
            font-size: 10px;
        }
        .whole{
            background:rgba(241,243,246,1);
            height: 40px;
            line-height: 40px;
            border: none;
        }
    }
</style>