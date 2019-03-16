<template>
  <div class="obd-shell cft">
    <div class="obd-side">
      <div class="obd-side-logo">
        <img src="@/assets/images/logo.png">
      </div>
      <ul class="obd-side-ul">
        <li @click="routerto('szt')" :class="{'cur':routercur=='szt'}">
          <div class="ic">
            <img src="@/assets/obd/sbzt.png">
          </div>
          <div class="wz">设备状态</div>
          <div v-if="routercur=='szt'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <span>养护提醒</span> -->
          <!-- <span>{{msg}}</span> -->
          <!-- <em v-if="rem!=0">{{rem}}</em> -->
        </li>
        <li @click="routerto('mar')" :class="{'cur':routercur=='mar'}">
          <div class="ic">
            <img src="../../assets/obd/yhtx.png">
          </div>
          <div class="wz">养护提醒</div>
          <div v-if="routercur=='mar'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          
          <em v-if="mar>0" >
               <el-badge :value="mar" :max='99' class="item"></el-badge>
          </em>
        </li>
        <li @click="routerto('chance')" :class="{'cur':routercur=='chance'}">
          <div class="ic">
            <img src="@/assets/obd/yhtx.png">
          </div>
          <div class="wz">常规提醒</div>
          <div v-if="routercur=='chance'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <img src="../../assets/obd/sbzt.png">
          <span>用户设备状态</span>-->
          <em v-if="rem>0" :value='99'>
              <el-badge :value="rem" :max='99' class="item"></el-badge>
          </em>
        </li>
        <li @click="routerto('let')" :class="{'cur':routercur=='let'}">
          <div class="ic">
            <img src="@/assets/obd/pftx.png">
          </div>
          <div class="wz">排放提醒</div>
          <div v-if="routercur=='let'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <img src="../../assets/obd/ggtx.png">
          <span>故障提醒</span>-->
          <!-- <em v-if="fault!=0">{{fault}}</em> -->
        </li>

        <li @click="routerto('put')" :class="{'cur':routercur=='put'}">
          <div class="ic">
            <img src="@/assets/obd/pztx.png">
          </div>
          <div class="wz">碰撞提醒</div>
          <div v-if="routercur=='put'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <img src="../../assets/obd/pftx.png">
          <span>排放提醒</span>-->
          <em v-if="collRem>0" >
               <el-badge :value="collRem" :max='99' class="item"></el-badge>
          </em>
        </li>
        <li @click="routerto('ckt')" :class="{'cur':routercur=='ckt'}">
          <div class="ic">
            <img src="@/assets/obd/gztx.png">
          </div>
          <div class="wz">故障提醒</div>
          <div v-if="routercur=='ckt'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <img src="../../assets/obd/pztx.png">
          <span>碰撞提醒</span>-->
          <em v-if="fault>0">
            <el-badge :value="fault" :max='99' class="item"></el-badge>
          </em>
        </li>
        <li @click="routerto('log')" :class="{'cur':routercur=='log'}">
          <div class="ic">
            <img src="@/assets/obd/cljl.png">
          </div>
          <div class="wz">处理记录</div>
          <div v-if="routercur=='log'" class="arrows">
            <img src="@/assets/images/right.png">
          </div>
          <!-- <img src="../../assets/obd/cljl.png">
          <span>处理记录</span>-->
        </li>
      </ul>
    </div>
    <div class="obd-body">
      <!-- <div class="obd-top cft">
        <div class="obd-top-wz">仲达集团-WDA维修厂管理系统</div>
        <ul class="obd-top-ul">
          <li class="obd-top-btn" @click="back">
            <span style="color:#1E2328;font-size:12px;">返回上一层</span>
          </li>
          <li class="obd-top-btn" @click="$router.push({'path':'/home'})">
            <span style="color:#1E2328;font-size:12px;">返回首页</span>
          </li>
          <li class="obd-top-news">
            <img src="../../assets/images/news2.png">
          </li>
          <li class="obd-top-line"></li>
      <li class="obd-top-btn">-->
      <!-- <span style="color:#32373C;">{{depotname}}</span> -->
      <!-- </li> -->
      <!-- <li class="obd-top-btn" @click="exit">
						<img src="../../assets/obd/quite.png">
						<span style="color:#FF4B4B;">退出</span>
      </li>-->
      <!-- </ul> -->
      <!-- 	<div class="help-btn">
					<el-popover placement="left" trigger="hover" content="遇到问题？点击查看帮助文档。">
						<el-button slot="reference" @click="showhelp = true">帮助文档</el-button>
					</el-popover>
      </div>-->
      <!-- </div> -->
      <model-head class="smallHeader"></model-head>
      <div class="obd-container">
        <router-view></router-view>
      </div>
    </div>
    <el-dialog title="帮助文档" center fullscreen :visible.sync="showhelp">
      <div v-html="helpdoc" class="helpdoc"></div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { post,GET } from "../../config/axios";
import { count } from '@/server/serverData'
import modelHead from "../common/Small_header";
export default {
  data() {
    return {
      depotname: "",
      routercur: location.href.split("/").pop(),
      showhelp: false,
      helpdoc: ""
    };
  },
  mounted() {
//    post("BusOppos/indexWarn").then(res => {
//      if (res.data.code == 1) {
//        this.$store.state.rem = res.data.data.rem;
//        this.$store.state.fault = res.data.data.fault;
//        this.$store.state.collRem = res.data.data.collRem;
//        this.$store.state.mar = res.data.data.yanghu;
//      }
//    });
  },
  components: {
    modelHead
  },
  created() {
    this.$router.beforeEach((to, last, next) => {
      //路由跳转时更改左侧导航栏按钮样式
      var towhere = to.path.split("/").pop();
      this.routercur = towhere;
      next();
    });
    post("main/getName")
      .then(e => {
        if (e.data.constructor == String) {
          //成功时e.data直接是维修厂名称
          this.depotname = e.data;
          return;
        }
        this.$alert(e.data.msg, "注意", {
          type: "error",
          callback: () => {
            if (!e.data.code) {
              this.$router.push({
                name: "用户登录"
              });
            }
          }
        });
      })
      .catch(err => {
//        console.warn(err);
      });
  },
  methods: {
    // ...mapActions(['changeMsg']),
    async init(){
            try {
              let res = await count()
              if (res.data.code == 1) {
                this.$store.commit('SET_MSGCOUNT',res.data.data)
              }
            }catch (err){
              console.log(err)
            }
    },
    routerto(where) {
      this.$router.push({
        path: "/obd/" + where
      });
    },
    back() {
      this.$router.go(-1);
    },
    exit() {
      var that = this;
      layer.confirm(
        "您要退出系统吗？",
        {
          title: "提示"
        },
        function(index) {
          layer.close(index);
          that.$router.push({
            name: "用户登录"
          });
        }
      );
    }
  },
  mounted(){
    this.init()
 },
  computed: { ...mapState(["rem", "fault", "collRem", "mar"]) }
};
</script>
<style lang='scss'  rel='stylesheet/scss' scoped>
.help-btn {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
}

ul {
  list-style: none;
}

img {
  display: block;
}

.obd-shell {
  min-width: 1280px;
  height: 100vh;
  min-height: 850px;
  /*overflow: hidden;*/
  // -webkit-user-select: none;
  // -moz-user-select: none;
  // -ms-user-select: none;
}

.obd-side {
  float: left;
  height: 100%;
  width: 160px;
  background: RGBA(52, 152, 233, 1);
}

.obd-side-logo {
  box-sizing: border-box;
  background: RGBA(22, 72, 112, 1);
  height: 55px;
  border-bottom: 1px solid #283741;
  overflow: hidden;
}

.obd-side-logo > img {
  width: 60px;
  height: 32px;
  margin: 10px auto;
}

.obd-side-logo > div {
  margin-top: 12px;
  font-size: 18px;
  color: #fff;
  text-align: center;
}

.obd-side-ul > li {
  height: 100px;
  color: #fff;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid RGBA(27, 118, 192, 1);
  cursor: pointer;
}

.obd-side-ul > li:hover {
  background: linear-gradient(
    to right,
    RGBA(0, 141, 255, 1),
    RGBA(116, 183, 255, 1)
  );
}

.obd-side-ul > li.cur {
  background: linear-gradient(
    to right,
    RGBA(0, 141, 255, 1),
    RGBA(116, 183, 255, 1)
  );
}

.obd-side-ul > li.cur:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 8px;
  background: linear-gradient(
    to right,
    RGBA(0, 141, 255, 1),
    RGBA(116, 183, 255, 1)
  );
}
.ic {
  width: 48px;
  height: 48px;
  margin: auto;
  margin-top: 10px;
}
.ic img {
  width: 100%;
  height: 100%;
}
.wz {
  width: 60%;
  height: 30px;
  margin: auto;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}
.arrows {
  width: 25px;
  height: 100%;
  // background: orange;
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  & > img {
    width: 18px;
    height: 18px;
  }
}
.obd-side-ul > li > em {
  position: absolute;
  right: 12px;
  top: 8px;
  display: block;
  font-style: normal;
  font-size: 12px;
  color: #fff;
 
  border-radius: 50px;
  padding: 4px 8px;
  /deep/ .el-badge__content{
    border:none
  }
}

.obd-body {
  float: left;
  background: #f5f5fa;
  width: calc(100% - 160px);
  height: 100%;
  /*overflow: hidden;*/
}

.obd-top {
  height: 55px;
  // margin-bottom: 10px;
  background: #fff;
  & > .obd-top-wz {
    width: 300px;
    height: 100%;
    line-height: 55px;
    padding-left: 30px;
    font-size: 18px;
    float: left;
  }
}

.obd-container {
  background: #fff;
  height: calc(100% - 80px);
  overflow: hidden;
}

.obd-top-ul {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  & > .obd-top-news {
    width: 30px;
    height: 25px;
    display: inline;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}

.obd-top-line {
  height: 30px;
  width: 1px;
  background: #e6e6eb;
}

.obd-top-btn {
  font-size: 16px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.obd-top-btn > img {
  width: 28px;
  margin-right: 8px;
}
</style>