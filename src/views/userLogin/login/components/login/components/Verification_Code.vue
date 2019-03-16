<template>
    <div class='Verification_Code'>
        <canvas ref='myCanvas' id='myCanvas' width="100" height="40" @click='getverify'></canvas>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    export default{
        name:'VerificationCode',
        data(){
            return{

            }
        },
        computed:{
                ...mapState(['verify'])
        },
    watch:{
        verify(){
            this.drawPic()
        }
    },
    methods:{
            randomNum(min, max) {   //随机数
                return Math.floor(Math.random() * (max - min) + min);
            },
            randomColor(min, max) {   //颜色随机
                var r = this.randomNum(min, max);
                var g = this.randomNum(min, max);
                var b = this.randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            },
            /** 绘制验证码**/
            drawPic(){
                let canvas =this.$refs.myCanvas;
                console.log(canvas.offsetWidth)
                let width = canvas.width;
                let height = canvas.height
                let ctx = canvas.getContext('2d');
                ctx.textBaseline = 'bottom';
                /**绘制背景色**/
                ctx.fillStyle = this.randomColor(220, 250); //颜色若太深可能导致看不清
                ctx.fillRect(0, 0, width, height);
                /**绘制文字**/
                // var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
                for (var i = 0; i < 4; i++) {
                    console.log(this.verify)
                    // var txt = str[this.randomNum(0,str.length)];
                    ctx.fillStyle = this.randomColor(50, 160);  //随机生成字体颜色
                    ctx.font = this.randomNum(16, 26) + 'px MicrosoftYaHei'; //随机生成字体大小
                    let x = 10 + i * 25;
                    let y = this.randomNum(25, 45);
                    let deg = this.randomNum(-45, 45);
                    //修改坐标原点和旋转角度
                    ctx.translate(x, y);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.fillText((this.verify + '').split('')[i], 0, 0);
                    //恢复坐标原点和旋转角度
                    ctx.rotate(-deg * Math.PI / 180);
                    ctx.translate(-x, -y);
                }
                /**绘制干扰线**/
                for (var i = 0; i < 5; i++) {
                    ctx.strokeStyle = this.randomColor(40, 180);
                    ctx.beginPath();
                    ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
                    ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
                    ctx.stroke();
                }
                /**绘制干扰点**/
                for (var i = 0; i < 30; i++) {
                    ctx.fillStyle = this.randomColor(0, 255);
                    ctx.beginPath();
                    ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
                    ctx.fill();
                }
            },
            /** 生成四位随机数 **/
            generateCode(){
               return `${this.randomNum(1,10)}${this.randomNum(1,10)}${this.randomNum(1,10)}${this.randomNum(1,10)}`
            },
            getverify(){
            let verify= this.generateCode()
                this.$store.commit('VERIFICATION_CODE',verify)
                this.drawPic()
            }
        },
        mounted(){
            let verify= this.generateCode()

            this.$store.commit('VERIFICATION_CODE',verify)
            this.drawPic()
        }
    }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
    .Verification_Code{
        width: 100px;
        height: 40px;
    }
</style>