<template>
  <div class="header">
    <div class="logo">
      <div>
        <img src="@/assets/images/logo.png">
      </div>
      <div class>仲达集团-WDA维修厂管理系统</div>
      <div class="ubidate" v-if="status == 2">
        <!-- <div class="ubilabel">车管家服务店</div> -->
        <div class="ubivalue">
          <!-- <span style="padding:0 20px">有效期</span> -->
          <div class="col-line" v-for="item in days">{{item}}</div>
          <div class="col-line">天</div>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li v-show="isShow">
          <a href="javascript:;" @click="$router.go(-1)">返回上一页</a>
          <router-link to="/home">返回首页</router-link>
        </li>
        <li v-show="!news" class="news">
          <img src="@/assets/images/news.png">
          <el-badge is-dot class="item" :hidden="!newsData"></el-badge>
          <div class="news_details">
            <div
              class="tabBar"
              v-for="(item,index) of newsList"
              :class="{active:cur==index}"
              @click="cur=index,newsDetails(index)"
            >{{item}}</div>
            <component :is="current"></component>
          </div>
        </li>
        <li class="border" v-show="!news"></li>
        <li class>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-show="!news">
                <router-link to="/account_information">资料与账号</router-link>
              </el-dropdown-item>
              <el-dropdown-item v-show="!news">
                <router-link to="/modify_password">修改密码</router-link>
              </el-dropdown-item>
              <!-- <el-dropdown-item v-show="!news">
                <router-link to="/abolish">取消合作</router-link>
              </el-dropdown-item> -->
              <el-dropdown-item v-show="!news">
                <router-link to="/feedback">反馈</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="javascript:;" @click="log_out">退出</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import news from "@/views/common/news";
import system_news from "@/views/common/system_news";
import { msgStatus } from "@/server/serverData";

export default {
  data() {
    return {
      newsData: "",
      newsList: ["消息", "系统消息"],
      cur: 0,
      current: "news"
    };
  },
  computed: {
    username() {
      return window.sessionStorage.getItem("username");
    },
    shop_type() {
      return window.sessionStorage.getItem("shop_type");
    },
    days() {
      let day = window.sessionStorage.getItem("days");
      if (day) {
        return window.sessionStorage.getItem("days").split(",");
      }
    },
    status() {
      console.log(
        "this.$store.state.shop_status",
        this.$store.state.shop_status
      );
      return this.$store.state.shop_status;
    }
  },
  components: {
    news,
    system_news
  },
  props: ["isShow", "news"],
  methods: {
    log_out() {
      this.$confirm("确定要退出该系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功",
            duration: 2000
          });
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    async init() {
      try {
        /** 是否有消息或者系统消息 **/
        let res = await msgStatus();
        if (res.data.code == 1) {
          this.newsData = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    newsDetails(index) {
      this.current = index == 0 ? "news" : "system_news";
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.bgColor {
  background-color: #fff;
  color: #32373c;
  a {
    color: #32373c;
  }
}
.header {
  z-index: 999;
  height: 55px;
  line-height: 55px;
  background: rgba(52, 152, 233, 1);
  width: 100%;
  top: 0;
  .logo:after {
    display: block;
    content: "";
    color: black;
  }
  .logo {
    padding-left: 54px;
    float: left;
    & > div {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      float: left;
      color: rgba(255, 255, 255, 1);
      .img {
        margin-right: 20px;
      }
      & > img {
        vertical-align: middle;
        padding-right: 10px;
        height: 30px;
        margin-top: -5px;
      }
    }
    & > .ubidate {
      display: flex;
      height: 55px;
      text-align: center;
      .ubilabel {
        width: 100px;
        height: 28px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(52, 152, 233, 1);
        line-height: 28px;
        margin: 14px 20px;
      }
      .ubivalue {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 14px 0;
        width: 150px;
        height: 28px;
        background: rgba(29, 126, 204, 1);
        border-radius: 5px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
        padding: 0 20px;
        .col-line {
          height: 15px;
          width: 30px;
          line-height: 15px;
          border-left: 1px solid #3498e9;
        }
      }
    }
  }
  .right {
    float: right;
    margin-right: 54px;
    .border {
      height: 18px;
      width: 1px;
      background-color: white;
      padding: 0;
    }
    & > ul:after {
      display: block;
      content: "";
      clear: both;
    }
    & > ul {
      height: 15px;
      line-height: 15px;
      margin-top: 20px;
      & > li {
        float: left;
        text-align: center;
        color: white;
        font-size: 14px;
        position: relative;
        padding: 0 10px;
        /deep/ .el-dropdown {
          color: white;
        }
        a {
          color: white;
          margin-left: 15px;
          display: inline-block;
        }
        .item {
          position: absolute;
          left: 28px;
          top: -10px;
        }
        /deep/ .el-badge__content {
          border: none;
        }
        img {
          vertical-align: middle;
          margin-top: -6px;
          width: 28px;
          height: 28px;
          margin-right: 10px;
        }
      }
      .news {
      }
      .news_details {
        display: none;
        width: 400px;
        box-shadow: 0px 4px 10px 0px rgba(198, 204, 211, 0.6);
        position: absolute;
        border-radius: 5px;
        z-index: 100;
        left: -300px;
        top: 23px;
        background-color: white;
        color: #64696e;
        & > .tabBar {
          display: inline-block;
          width: 50%;
          line-height: 39px;
          border: 1px solid #d7e1e6;
          box-sizing: border-box;
          border-left: none;
        }
        & > div:last-child {
          border-right: none;
        }
      }
      .second_level {
        position: relative;
        & > a {
          color: white;
          padding-bottom: 20px;
        }
        & > div {
          position: absolute;
          width: 100px;
          color: #545454;
          font-size: 12px;
          display: none;
          left: 0;
          background: #fff;
          box-shadow: 0px 10px 10px 0px rgba(198, 204, 211, 0.6);
          margin-top: 20px;
          & > p {
            border-bottom: 1px solid #d7e1e6;
            padding: 10px 0;
            margin: 0 5px;
          }
          & > p:last-child {
            border: none;
          }
        }
      }
      li:hover .news_details {
        display: block;
      }
    }
  }
}
.active {
  color: #3498e9;
}
</style>
<style>
.el-dropdown-menu__item a {
  display: inline-block;
  width: 100%;
}
</style>
