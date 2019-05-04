<template>
  <div class="shipAddress">
    <!-- 显示基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ info.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">设为常用地址</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialogFormVisible = true"
        >编辑</el-button>
      </div>
      <div class="content">
        <span class="name">{{ info.name }} 收</span>
        <div class="address">
          <span class="province">{{ info.province }}</span>
          <span class="city">{{ info.city }}</span>
          <span class="area">{{ info.area }}</span>
          <span class="detailAddress">{{ info.detailAddress }}</span>
        </div>
        <span class="tel">{{ info.tel }}</span>
      </div>
    </el-card>
    <!-- 显示修改基本信息的模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="info.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="info.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件" :label-width="formLabelWidth">
          <el-input v-model="info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-select v-model="info.province" placeholder="省份">
            <el-option :label="info.province" :value="info.province"></el-option>
          </el-select>
          <el-select v-model="info.city" placeholder="城市">
            <el-option :label="info.city" :value="info.city"></el-option>
          </el-select>
          <el-select v-model="info.area" placeholder="市区">
            <el-option :label="info.area" :value="info.area"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="info.detailAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设为常用地址">
          <el-checkbox-group v-model="form.isDefault">
            <el-checkbox label="设为常用地址" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加新地址 -->
    <div class="addNewAddress">
      <el-row>
        <el-col :span="24">
          <div class="addNewButton">
            <el-button type="text">默认按钮</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style>
.addNewButton {
  border: 1px dashed #000;
  margin-top: 10px;
}
.addNewButton button {
  width: 100%;
  height: 100%;
  display: block;
}
</style>


<script>
export default {
  data() {
    return {
      info: {
        name: "章三",
        province: "辽宁省",
        city: "鞍山市",
        area: "立山区",
        detailAddress: "奥赛法赛法",
        tel: "13131313131",
        email: "123123",
        region: "",
        isDefault: true
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    console.log("shipAddress created");
    this.axios({
      method: "get",
      url: "/users/1/addresses/list",
      data: {
        userId: 1
      }
    })
      .then(result => {
        console.log("所有地址请求成功，所有地址有");
        console.log(result);
      })
      .catch(e => {
        console.log("获取所有地址请求失败，失败原因是");
        console.log(e);
      });
  }
};
</script>

