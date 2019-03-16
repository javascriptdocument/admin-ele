<template>
    <div  class='main'>
        <div class='tableBar cft'>
             <p v-for='(item,index) of tableBarList' @click='active=index' :class="[active==index?'active':'']">{{item.name}}</p>
        </div>
        <component :is='currentAssembly'></component>
    </div>
</template>
<script>
    import Maintenance from './Maintenance'
    import Member from './Member'
    export default{
        data(){
            return{
                tableBarList:[
                    {name:'邦保养收入明细'},
                ],
                active:0
            }
        },
        computed:{
            currentAssembly(){
                return this.active==0?'Maintenance':'Member'
            }
        },
        components:{
            Maintenance,
            Member
        }

    }
</script>
<style scoped lang='scss' rel="stylesheet/scss">
    .main{

    }
    .active{
        background-color: #3498E9;
        color: #fff;
    }
   .tableBar{
       padding-top: 10px;
       padding-left: 30px;
       border-bottom: 1px solid #B9C3CD;
       p{
           border: 1px solid #B9C3CD;
           display: block;
           width: 200px;
           height: 40px;
           line-height: 40px;
           float: left;
           text-align: center;
           border-bottom: 0;
           cursor:pointer;
       }
       p:first-child{
           border-right: 0;
       }
   }
</style>