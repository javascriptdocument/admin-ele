<template>
  <div class="header">
    <el-row>
      <el-col :span="12">
        <div class="logo">
          <div>
            <img src="../images/logo.png">
          </div>
          <div>仲达集团-维修厂管理系统</div>
          <div class="ubidate" v-if="shop_type == 2">
            <div class="ubilabel">车管家服务店</div>
            <div class="ubivalue">
              <div class="col-line" v-for="item in days">{{item}}</div>
              <div class="col-line"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <ul>
            <li v-show="isShow">
              <router-link to>返回上一页</router-link>
              <router-link to>返回首页</router-link>
            </li>
            <li>
              <img src="../images/news.png">
            </li>
            <li class="border second_level">
              <a href="javascript:;">维修厂简称</a>
              <div class="Subgrade">
                <p>
                  <router-link to>资料与账号</router-link>
                </p>
                <p>
                  <router-link to>修改密码</router-link>
                </p>
                <p>
                  <router-link to>反馈</router-link>
                </p>
                <p>
                  <router-link to>退出</router-link>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
//   未使用此页
export default {
  name: "header",
  data() {
    return {};
  },
  computed: {
    shop_type() {
      return window.sessionStorage.getItem("shop_type");
    },
    days() {
      let day = window.sessionStorage.getItem("days");
      if (day) {
        return window.sessionStorage.getItem("days").split(",");
      }
    }
  },
  props: ["isShow"]
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.header {
  height: 55px;
  line-height: 55px;
  background: rgba(52, 152, 233, 1);

  .logo:after {
    display: block;
    content: "";
    color: black;
  }
  .logo {
    padding-left: 54px;
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
      .ubilabel {
        width: 100px;
        height: 28px;
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
        text-align: center;
        align-items: center;
        justify-content: space-around;
        margin: 14px 0;
        width: 215px;
        height: 28px;
        background: rgba(29, 126, 204, 1);
        border-radius: 5px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
        padding-right: 20px;
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
    .border {
      border-left: 2px solid #fff;
    }
    text-align: right;
    margin-right: 45px;
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
        padding: 0 10px;
        text-align: center;
        color: white;
        font-size: 14px;
        & > a {
          color: white;
          margin-left: 20px;
        }
        img {
          vertical-align: middle;
          margin-top: -6px;
          width: 28px;
          height: 28px;
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
      .second_level:hover .Subgrade {
        display: block;
      }
    }
  }
}
</style>
