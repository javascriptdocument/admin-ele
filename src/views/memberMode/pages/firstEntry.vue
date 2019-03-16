<template>
    <div class="firstEntry">
        <div class="current">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">邦保养管理</el-breadcrumb-item>
                <el-breadcrumb-item>邦保养</el-breadcrumb-item> 
            </el-breadcrumb>
            <span class="helpDoc col-64696e">帮助文档</span>
        </div>
        <div class="viewMain">
            <h2 class="col-32373C">首次录入</h2>
            <div class="whiteBlock">
              <el-form class="elForm" ref="form" :model="form" label-width="80px">
                <el-form-item label="车牌号">
                  <el-input placeholder="请输入车牌号"  >
                    <el-button slot="append" style="width: 100px;">查找</el-button>
                  </el-input>
                </el-form-item> 
                <el-form-item label="车主">
                  <el-input v-model="form.name" disabled="true" placeholder="" ></el-input>
                </el-form-item> 
                <el-form-item label="品牌">
                  <div style="display:flex;">
                    <el-select v-model="form.region" placeholder="请选择车辆品牌" style="width: 148px;">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-form-item label="车型">
                      <div style="display:flex;">
                        <el-select v-model="form.region" placeholder="请选择车型" style="width: 147px;">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <el-form-item label="排量">
                          <el-select v-model="form.region" placeholder="请选择汽车排量" style="width: 147px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item> 
                      </div>
                    </el-form-item> 
                  </div>
                </el-form-item> 
                <el-form-item label="VIN码">
                  <el-input v-model="form.name" placeholder="输入本次保养里程"></el-input>
                </el-form-item> 
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-form-item label="服务项">
                  <el-select v-model="form.region" placeholder="请选择服务项" style="width: 600px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品名称">
                  <el-select v-model="form.region" placeholder="请选择产品名称" style="width: 600px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item label="产品品牌">
                  <div style="display: flex;">
                    <el-input v-model="form.name" placeholder="请输入品牌" style="width: 250px;"></el-input>
                    <el-form-item label="产品型号" style="margin-left: 20px;">
                      <el-input v-model="form.name" placeholder="请输入型号" style="width: 250px;"></el-input> 
                    </el-form-item>
                  </div>
                </el-form-item> 
                <el-form-item label="产品数量">
                  <div style="display: flex;">
                    <el-input v-model="form.name" placeholder="请输入数量" style="width: 250px;"></el-input>
                    <el-form-item label="产品规格" style="margin-left: 20px;">
                      <el-input v-model="form.name" placeholder="请输入规格" style="width: 250px;"></el-input> 
                    </el-form-item>
                  </div>
                </el-form-item>
                <el-form-item label="价格(元)" style="margin-bottom: 0;">
                  <el-input v-model="form.name" placeholder="输入价格"></el-input>
                </el-form-item> 
                <el-form-item label="">
                  <span class="col-FF2828">包括产品及工时费，请实际填写</span>
                </el-form-item> 
                <el-form-item label="产品图片">
                  <div style="display: flex;"> 
                    <el-upload
                      class="entryUpload"
                      :limit="6"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i></el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <span class="uploadTip col-64696e">注：限6张</span>
                  </div>
                </el-form-item>
                <el-form-item label="车辆照片"> 
                  <div style="display: flex;"> 
                    <el-upload
                      class="entryUpload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <span class="uploadTip col-64696e">注：限6张</span>
                  </div>
                </el-form-item>
                <el-form-item label="VIN码照片"> 
                  <div style="display: flex;"> 
                    <el-upload
                      class="entryUpload"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> 
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="submit">提交</el-button> 
                </el-form-item>
              </el-form>
            </div>
        </div>
        <el-dialog 
          :visible.sync="dialogVisible"
          width="1000px" 
          :before-close="handleClose">
          <div class="serveDialog"> 
            <span class="col-32373C">本次服务已完成</span>
            <el-button type="primary">好的</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "firstEntry",
  data() {
    return {
      form: {
        name: ""
      },
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    search() {}
  }
};
</script>
<style lang="scss" scoped>
.firstEntry {
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
    h2 {
      height: 50px;
      font-size: 36px;
      font-weight: 400;
      line-height: 50px;
    }
    .whiteBlock {
      margin-top: 20px;
      border-radius: 5px;
      width: 1200px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .elForm {
        margin: 40px 290px 50px 210px;
        width: 680px;
        .submit {
          width: 370px;
          height: 44px;
          border-radius: 5px;
        }
      }
    }
  }
  .serveDialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 210px;
      width: 210px;
    }
    span {
      margin-top: 10px;
      font-size: 24px;
      font-weight: 400;
      line-height: 33px; 
    }
    button {
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      line-height: 25px;
      margin: 50px;
      width: 300px;
      height: 50px;
      background: rgba(52, 152, 233, 1);
      border-radius: 5px;
    }
  }
}
.col-32373C {
  color: #32373c;
}
.col-64696e {
  color: #64696e;
}
.col-FF2828 {
  color: #ff2828;
}
</style>
<style lang="scss">
.entryUpload > .el-upload--picture-card {
  height: 64px;
  width: 64px;
  line-height: 64px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .uploadTip { 
    font-size: 12px; 
    font-weight: 400;
    color: rgba(100, 105, 110, 1); 
    vertical-align:text-bottom; 
  }
}
</style>


