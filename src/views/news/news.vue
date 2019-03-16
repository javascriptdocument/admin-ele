<template>
  <div class="news">
    <component is="Header" :isShow="true"></component>
    <component is="currentPage" :id="208"></component>
    <div class="main">
      <el-tabs v-model="activeName" ref="el_tabs">
        <el-tab-pane label="通知" name="first">
          <div v-for="item of noticeList" class="noticeItem">
            <h2>{{item.title}}</h2>
            <p class="col-64696E">{{item.create_time}}</p>
            <p v-html="item.content" class="content"></p>
            <div class="company">
              <p>{{item.xxs}}</p>
              <p>{{item.xxs_time}}</p>
            </div>
          </div>
          <component is="paging" :pageCount="noticeCount" :currentChange="noticeChange"></component>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="second">
          <div v-for="item of newsList" class="newsItem">
            <p>
              {{item.title}},
              <a
                href="javascript:;"
                class="col-3498E9"
                @click="Seenews(item.id,item.type,item.sid,item.put_id)"
              >查看</a>
            </p>
            <p class="col-64696E">{{item.create_time}}</p>
            <img src="@/assets/generalize/del.png" class="del" @click="Delete(item.id)">
          </div>
          <el-dialog title="详情" :visible.sync="newsDialogVisible" width="40%" center>
            <div class="detail">
              <!-- <span>{{newsDetail}}</span>
              <span class="Tips">{{con}}</span> -->
              <span v-html="detail.detail"></span>
              <span class="Tips" v-html="con"></span>
              <el-table :data="tableData.detail" border style="width: 100%" v-show="tableData.detail && tableData.detail.length>0">
                <el-table-column prop="materiel" label="名称" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" align="center"></el-table-column>
                <el-table-column v-show="false" prop="remarks" label="备注" align="center"></el-table-column>
              </el-table>
              <el-table :data="tableData1.detail" border v-show="tableData1.detail && tableData1.detail.length>0" >
                <el-table-column prop="materiel" label="名称" align="center"></el-table-column>
                <el-table-column prop="num" label="数量" align="center"></el-table-column>
              </el-table>
            </div>
          </el-dialog>
          <component is="paging" :pageCount="newsCount" :currentChange="currentChange"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { msgList, typeChose, getList, ignore } from "@/server/serverData";
import Header from "@/views/common/header";
import currentPage from "@/views/common/currentPage";
import paging from "@/views/common/paging";
export default {
  data() {
    return {
      activeName: "first",
      newsList: {}, //系统消息数据
      noticeCount: 1,
      noticePage: 1,
      newsPage: 1,
      newsCount: 1, //系统消息总页数
      newsDialogVisible: false,
      detail: [], //系统消息详情
      noticeList: [], //通知列表
      tableData: [],
      tableData1: [],
      con: ""
    };
  },
  components: {
    Header,
    currentPage,
    paging
  },
  computed: { 
  },
  methods: {
    /** 系统消息列表 **/
    async init() {
      try {
        /** 系统消息 **/
        let res = await msgList({
          page: this.newsPage
        });
        if (res.data.code == 1) {
          this.newsList = res.data.data.list;
          this.newsCount = res.data.data.rows;
        }
      } catch (err) {
        console.log(err);
      }
      try {
        /** 通知 **/
        let res = await getList({
          page: this.noticePage
        });
        if (res.data.code == 1) {
          this.noticeList = res.data.data.list;
          this.noticeCount = res.data.data.rows;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async Seenews(id, type, sid, put_id) {
        console.log("seenews")
      this.newsDialogVisible = true;
      try {
        let res = await typeChose({
          id: id,
          type: type,
          sid: sid,
          put_id: put_id
        });
        if (res.data.code == 1) {
          this.con = res.data.data.con;
        // type == 2  有可能是表格
        // 101 可能是需要解析的文本
        // type:4   没有put_id 
          console.log("type",type)
          if(type == 101){
            let div=document.createElement('div');
            div.innerHTML=res.data.data.detail;
            let indiv=div.innerText||div.textContent;
            console.log("indiv",indiv)
            this.detail.detail = indiv;
            console.log("this.detail.detail",this.detail.detail)
          }else if (type != 2 && type != 3) {
            this.detail = res.data.data;
            this.tableData = [];
            this.tableData1 = [];
          } else if (type == 3) {
            this.tableData1 = res.data.data;
            this.detail = [];
          } else {
            this.tableData = res.data.data;
            this.tableData1 = [];
            this.detail = [];
          }
        } else {
          this.detail = "暂无数据";
        }
      } catch (err) {
        console.log(err);
      }
    },
    /** 忽略当前消息 **/
    async Delete(id) {
      let that = this;
      this.$confirm("是否要忽略该消息 ? 是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.ignoreCurrent(id);
        })
        .catch(() => {});
    },
    /** 忽略当前消息接口 **/
    async ignoreCurrent(id) {
      try {
        let res = await ignore({ id: id });
        if (res.data.code == 1) {
          this.init();
          this.$message({ message: res.data.msg, type: "success" });
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    /** 获取当前页 **/
    currentChange(e) {
      this.newsPage = e;
      this.init();
    },
    noticeChange(e) {
      this.noticePage = e;
      this.init();
    }
  },
  mounted() {
    this.init();
    let that = this;
    that.$refs.el_tabs.$el.children[1].style.height =
      window.innerHeight - 200 + "px";
    window.onresize = () => {
      return (() => {
        that.$refs.el_tabs.$el.children[1].style.height =
          window.innerHeight - 200 + "px";
      })();
    };
  }
};
</script>
<style scoped lang='scss' rel="stylesheet/scss">
.news {
  width: 100%;
  background-color: #ebedf0;
  height: 100%;
  overflow: hidden;
  .currentPage {
    margin: 12px 60px 21px 60px;
  }
  .main {
    width: 63%;
    margin: 0 auto;
    background-color: white;
    /deep/ .el-tabs__nav-scroll {
      margin-left: 40px;
    }
    /deep/ .el-tabs {
      height: 100%;
      /deep/ .el-tabs__content {
        margin: 0 30px;
        overflow: auto;
        .content {
          p {
            span {
              display: inline-block;
              padding: 8px 0;
              margin: 5px 0;
            }
          }
        }
        .noticeItem {
          width: 90%;
          border-bottom: 1px solid #d7e1e6;
          padding: 15px 0;
          font-size: 12px;
          & > p {
            width: 100%;
            line-height: 23px;
            margin: 10px 0;
            img {
              width: 20%;
              height: 20%;
            }
          }
          .company {
            text-align: right;
            margin-right: 10px;
            & > p {
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    .newsItem {
      border-bottom: 1px solid #d7e1e6;
      padding: 25px 0;
      font-size: 12px;
      position: relative;
      & > p {
        line-height: 20px;
        a {
          text-decoration: underline;
        }
      }
      .del {
        position: absolute;
        top: 50%;
        margin-top: -12px;
        right: 30px;
        cursor: pointer;
      }
    }
    .paging {
      text-align: center;
      margin: 30px 0;
    }
    .detail {
      width: 100%;
      line-height: 23px;
      min-height: 200px;
      display: inline-block;
      /deep/ .el-table__header {
        width: 100%;
      }
      .Tips {
        padding: 10px 0;
        display: inline-block;
      }
    }
  }
}
</style>
