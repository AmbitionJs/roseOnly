<template>
  <div class="info">
    <el-tabs type="border-card">
      <!-- 基本信息 -->
      <el-tab-pane>
        <span slot="label">基本信息</span>
        <el-form ref="form" :model="form" label-width="80px">
          <div style="overflow: hidden;">
            <!-- 我的信息 -->
            <div class="detail-info user-info">
              <el-form-item label="我的信息"></el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="form.phone" :disabled="true">13689649260</el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-col>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.birth"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="居住地">
                <el-select v-model="form.region" placeholder="请选择居住地">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择居住地">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择居住地">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- 爱人信息 -->
            <div class="detail-info lover-info">
              <el-form-item label="爱人信息"></el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="lover.name"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="lover.phone"></el-input>
              </el-form-item>
              <el-form-item label="生日">
                <el-col>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="lover.birth"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="lover.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="submit">
            <el-form-item>
              <el-button>提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- 修改密码 -->
      <el-tab-pane>
        <span slot="label">修改密码</span>
        <div class="content">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="旧密码">
              <el-input v-model="form.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认">
              <el-input v-model="form.verifyPass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.box-card {
  width: 49%;
}
.box-card:nth-child(1) {
  float: left;
}
.box-card:nth-child(2) {
  float: right;
}
.detail-info {
  width: 50%;
  float: left;
}
.submit {
  text-align: center;
}
</style>


<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        oldPass: "",
        newPass: "",
        verifyPass: ""
      },
      lover: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  created() {
    console.log('created')
    // 个人信息
    this.axios({
      url: '/users/36/supplement',
      method: 'POST',
      data: {
        userToken: "1350239ad7bb40d89f5eb5091a9b9768",
        userId: 36,
        cellphone: '13689649260',
        sex: '男',
        idCard: '51130909919098787',
        age: 8,
        loverName: 'lover',
        loverSex: '女',
        loverBirth: '19951111',
        anivisary: '测试纪念日',
        userName: 'Alice',
        userBirthday: '19960208',
      }
    })
    .then(result => {
      console.log('result is', result)
    })
    .catch(e => {
      console.log(e)
    })
  },
  destroyed() {
    console.log('destroy')
  }
};
</script>

