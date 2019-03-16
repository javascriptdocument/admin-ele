<template>
    <div class="member">
        <div class="current">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">邦保养管理</el-breadcrumb-item>
                <el-breadcrumb-item>邦保养</el-breadcrumb-item> 
            </el-breadcrumb>
            <span class="helpDoc col-64696e">帮助文档</span>
        </div>
        <div class="viewMain">
          <div class="secondBody">
            <el-form class="filterCondition demo-form-inline" ref="form" :model="form" :inline="true" label-width="80px"> 
                <el-input placeholder="输入车牌号" style="width: 420px;margin-left: 30px;">
                  <el-button slot="append" style="width: 120px;">搜索</el-button>
                </el-input>
                <el-form-item label="预约时间" style="margin-bottom: 0;width: 470px;margin-left: 30px;">
                  <el-date-picker v-model="intervalTime" type="daterange" align="right" unlink-panels range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerFastOptions" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" >
                  </el-date-picker>   
                </el-form-item>
                <el-form-item label="状态" style="margin-bottom: 0;">
                  <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" :header-cell-style="{background: '#D7E1E6',color: '#32373C'}">  
              <el-table-column prop="date" label="车牌号" align="center"  >
              </el-table-column>
              <el-table-column prop="date" label="联系方式" align="center" >
              </el-table-column>
              <el-table-column prop="name" label="发起时间" align="center" >
              </el-table-column>
              <el-table-column prop="date" label="预约时间" align="center" >
              </el-table-column>  
              <el-table-column prop="name" label="超出时间" align="center">
              </el-table-column>
              <el-table-column prop="date" label="服务项" align="center" >
              </el-table-column>
              <el-table-column prop="date" label="产品名称" align="center" >
              </el-table-column>
              <el-table-column prop="date" label="预约详情" align="center">
                <template slot-scope="scope"> 

                </template>
              </el-table-column>
              <el-table-column prop="date" label="物料状态" align="center" >
              </el-table-column> 
            </el-table>
            <el-pagination class="page" background layout="prev, pager, next" 
              @current-change="qingqiushuju" :current-page.sync="currentPage" :page-count=totalpage >
            </el-pagination>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "member",
  data() {
    return {  
      currentPage: 1,
      totalpage: 1,
      tableData: [
        {
          date: "2016",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        }
      ],
      form: {
        name: "",
        region: "",
        resource: "",
        desc: ""
      },
      intervalTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()],
      pickerFastOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {},
  methods: { 
    qingqiushuju(){}
  }
};
</script>
<style lang="scss" scoped>
.member {
  min-height: calc(100vh - 55px);
  background-color: #ebedf0;
  width: calc(100% - 160px);
  position: absolute;
  top: 55px;
  left: 160px;
  padding: 0 0 100px;
  overflow: hidden;
  .current {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 50px 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .helpDoc {
      width: 48px;
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
    }
  }
  .viewMain {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff; 
    .secondBody {
      position: absolute;
      height: 100%; 
      width: 100%;
      background-color: #fff;
      border-top: 2px solid #b9c3cd;
      .filterCondition {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
      }
      .page {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }
  }
} 
.col-32373C {
  color: #32373c;
}
.col-64696e {
  columns: #64696e;
}
.col-FF2828 {
  color: #ff2828;
}
</style>
<style>
.el-breadcrumb__inner {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
}
.el-breadcrumb__inner.is-link {
  color: #3498e9;
}
</style>


