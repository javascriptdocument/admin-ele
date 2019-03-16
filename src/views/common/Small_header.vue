<template>
  <div class="header">
    <div class="logo">
      <div class>仲达集团-WDA维修厂管理系统</div>
    </div>
    <div class="right">
      <ul>
        <li>
          <a href="javascript:;" @click="$router.go(-1)">返回上一页</a>
          <router-link to="/home">返回首页</router-link>
        </li>
        <li>
          <router-link to="/news">
            <img src="@/assets/images/news.png" class="news">
            <el-badge is-dot class="item" v-show="newsData"></el-badge>
          </router-link>
        </li>
        <li class="border"></li>
        <li class="second_level">
          <a href="javascript:;">{{name}}</a>
          <div class="Subgrade">
            <p>
              <router-link to="/account_information">资料与账号</router-link>
            </p>
            <p>
              <router-link to="/modify_password">修改密码</router-link>
            </p>
            <p>
              <router-link to="/abolish">取消合作</router-link>
            </p>
            <p>
              <router-link to="/feedback">反馈</router-link>
            </p>
            <p>
              <a href="javascript:;" @click="log_out">退出</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { msgStatus } from "@/server/serverData";
export default {
  data() {
    return {
      newsData: "",
      name: window.sessionStorage.getItem("username")
    };
  },
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
            duration: 2000,
            onClose() {
              // window.sessionStorage.removeItem("materielState");
              // window.sessionStorage.removeItem("token");
              // window.sessionStorage.removeItem("username");
               window.sessionStorage.clear()
            }
          });
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    /** 获取系统消息 **/
    async Systemnews() {
      try {
        let res = await msgStatus();
        if (res.data.code == 1) {
          this.newsData = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    this.Systemnews();
  }
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.header {
  z-index: 999;
  height: 55px;
  line-height: 55px;
  background: #fff;
  top: 0;

  .logo:after {
    display: block;
    content: "";
    clear: both;
  }
  .logo {
    padding-left: 30px;
    float: left;
    & > div {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      float: left;
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
  }
  .right {
    float: right;
    margin-right: 49px;
    .border {
      height: 18px;
      width: 1px;
      background-color: #32373c;
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
        font-size: 14px;

        & > a {
          margin-left: 15px;
          position: relative;
          .item {
            position: absolute;
            left: 18px;
            top: -10px;
          }
          /deep/ .el-badge__content {
            border: none;
          }
        }
        img {
          vertical-align: middle;
          margin-top: -6px;
          width: 28px;
          height: 28px;
        }
        .news {
          filter: brightness(0);
          padding-right: 20px;
        }
      }
      .second_level {
        position: relative;
        & > a {
          padding-bottom: 20px;
        }
        & > div {
          position: absolute;
          width: 100px;
          color: #545454;
          font-size: 12px;
          display: none;
          z-index: 11;
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
      .second_level:hover .Subgrade {
        display: block;
      }
    }
  }
}
</style>
<style>
.el-message-box__wrapper {
  z-index: 99998 !important;
}
</style>