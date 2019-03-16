<template>
    <div class='sidebar'>
        <div class='logo'>
            <img src="../../../assets/images/logo.png">
        </div>
        <div class='sidemenu'>
            <ul>
                <router-link tag='li' to='/maintainMode'>
                    <img src="../images/maintain.png" alt="">
                    <span>邦保养</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/gift'>
                    <img src="../images/gift.png" alt="">
                    <span>礼品兑换</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/materielM'>
                    <img src="../images/materiel.png" alt="">
                    <span>物料管理</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/member'>
                    <img src="../images/member.png" alt="">
                    <span>车主管理</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/technicianM'>
                    <img src="../images/tech.png" alt="">
                    <span>技师管理</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/activity'>
                    <img src="../images/gift.png" alt="">
                    <span>活动管理</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/upkeepRecord'>
                    <img src="../images/record.png" alt="">
                    <span>保养记录</span>
                </router-link>
                <router-link tag='li' to='/maintainMode/complaint'>
                    <img src="../images/complaint.png" alt="">
                    <span>投诉管理</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: "sidebar",
  components: {}
};
</script>
<style lang='scss' scoped rel='stylesheet/scss'>
.sidebar {
  width: 160px;
  height: 100%;
  position: fixed;
  .logo {
    width: 160px;
    height: 55px;
    background-color: #164870;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sidemenu {
    background-color: #3498e9;
    height: calc(100% - 55px);
    border-right: 1px solid #1c77c1;
    li {
      cursor: pointer;
      height: 100px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border: 0;
      border-bottom: 1px solid;
      border-image: linear-gradient(to right, #3192e1, #1b76c0, #3192e1) 10 10;
      // border-image:linear-gradient(270deg,rgba(49,146,225,1) 0%,rgba(27,118,192,1) 52%,rgba(49,146,225,1) 100%);
      img {
        height: 54px;
        width: 54px;
      }
      span {
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
    }
    .router-link-exact-active{
      position: relative;
      background: linear-gradient(to right, #008dff, #74b7ff);
    }
    .router-link-exact-active:before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 8px;
      background: linear-gradient(to right, #008dff, #59B5FF);
    }
    .router-link-exact-active:after{
        content: url(../../../assets/images/right.png);
        background-size:18px 18px;
        position: absolute;
        top: calc(50% - 9px);
        right: 5px;
    }
  }
}
</style>
