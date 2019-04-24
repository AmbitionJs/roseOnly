<template>
  <div class="forgot-password">
    <!-- 找回密码title -->
    <div class="forgot-pass-title">
      <h3>找回密码</h3>
    </div>
    <!-- 步骤条 -->
    <div class="steps">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写账户名"></el-step>
        <el-step title="验证身份"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 步骤一：填写账户名 -->
    <div class="step1" v-if="active==0">
      <el-form :label-position="labelPosition" label-width="125px" :model="step1">
        <!-- select选择框 -->
        <el-form-item label="国家和地区">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号账户 -->
        <el-form-item label="账户名">
          <el-input type="tel" v-model="step1.phone" placeholder="输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码">
          <el-input v-model="step1.verify" placeholder="输入验证码" class="verify"></el-input>
          <canvas id="canvas" width="150" height="40" style="border-radius:4px"></canvas>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 12px;" @click="next1" class="step-btn">下一步</el-button>
    </div>
    <!-- 步骤二：验证身份 -->
    <div class="step2" v-if="active==1">
      <el-form :label-position="labelPosition" label-width="125px" :model="step2">
        <el-form-item label="已验证手机">
          <el-input v-model="step2.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="请填写手机校验码">
          <el-input v-model="step2.verify" class="verify"></el-input>
           <el-button type="info" class="verify" @click="getCode">获取手机校验码</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 12px;" @click="next2" class="step-btn">下一步</el-button>
    </div>
    <!-- 步骤三：设置新密码 -->
    <dir class="step3" v-if="active==2">
      <el-form :model="step3" status-icon ref="ruleForm" label-width="85px" class="demo-ruleForm">
        <el-form-item label="登录新密码" prop="pass">
          <el-input type="password" v-model="step3.pass" autocomplete="off" placeholder="6-16 位数字和字母组合"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="step3.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="margin-top: 12px;margin-left:85px" @click="next3" class="step-btn">提交密码</el-button>
    </dir>
    <!-- 第四步：完成，跳转登录页面 -->
    <el-alert title="新密码设置成功！即将跳转到登录页面" type="success" show-icon v-if="active==4"></el-alert>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import '@/assets/zjl/js/verifyCode.js';

export default {
  data() {
    return {
      active: 0, // 步骤条
      options: [ // 国家和地区选择
        {
          value: "选项1",
          label: "中国"
        },
        {
          value: "选项2",
          label: "中国台湾"
        },
        {
          value: "选项3",
          label: "中国澳门"
        },
        {
          value: "选项4",
          label: "中国香港"
        }
      ],
      value: "中国", // 默认国家地区
      labelPosition: "right", // lable位置靠右
      step1: { // step1 步骤一：填写账户名
        phone: '',
        verify: ''
      },
      step2: { // step2 步骤二：验证身份
        phone: "",
        verify: ""
      },
      step3: { // step3 步骤三：设置新密码
        pass: "",
        checkPass: ""
      },
      checkCode: '', // 手机验证码
    }
  },
  methods: {
    next1() {
      // 第一步：输入账户名
      if(this.active == 0) {
        var patPhone = /^[1][3,4,5,7,8][0-9]{9}$/
        if(patPhone.test(this.step1.phone) && this.step1.verify.toLowerCase() == window.code) {
          this.step2.phone = this.step1.phone
          this.active = 1
        } else {
          if (this.step1.phone == '') this.errorAlert('请输入账户名')
          else if (!patPhone.test(this.step1.phone)) this.errorAlert('请输入正确的账户名')
          else if (this.step1.verify == '') this.errorAlert('请输入4位图片验证码')
          else if (this.step1.verify.toLowerCase() != window.code) this.errorAlert('请输入正确的图片验证码')
        }
      }
    },
    next2() {
      // 第二步：验证身份
      if(this.active == 1) {
        if(this.step2.verify == this.checkCode && this.step2.verify != '' && this.checkCode != '') {
          this.active = 2
        } else {
          if(this.step2.verify == '') {
          this.errorAlert('请输入短信验证码')
          } else {
            this.errorAlert('短信验证码不正确')
          }
        }
      }
    },
    next3() {
       // 第三步：设置新密码
      if(this.active == 2) {
        const patPass = /^[a-zA-Z0-9]{6,16}$/
        if(this.step3.pass != '' && this.step3.checkPass != '') {
          if(patPass.test(this.step3.pass)) {
            if(this.step3.pass === this.step3.checkPass) {
              this.active = 3
              // 第四步：完成，跳转登录界面
              this.axios.post('/users/newpass', {
                password: this.step3.checkPass
              }).then(res => {
                if(res) setTimeout(() => {
                  this.active = 4
                  
                    if(this.active == 4) {
                      setTimeout(() => {
                        console.log('设置成功')
                        this.$router.push('/login')
                      },3000) 
                  }
                },300)
              }).catch(err => {console.log(err)})
            }
            else this.errorAlert('两次密码输入不正确')
          } else this.errorAlert('密码格式不正确')
        } else this.errorAlert('请输入密码')
      }
    },
    // 验证信息弹框
    errorAlert(msg) {
      this.$alert(msg, '警告', {
        confirmButtonText: '确定',
        center: true,
        type: 'error'
      }).then(()=>{}).catch(()=> {})
    },
    // 获取手机验证码
    getCode() {
      this.axios.post('/users/sms/{'+ this.step2.phone + '}', {
        cellphone: this.step2.phone
      })
      .then(res => {
        if(res.code == 200) {
          this.checkCode = res.data.smsCode
        } 
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
};
</script>

<style>
.forgot-password {
  width: 500px;
  margin: 0 auto;
}
.forgot-pass-title {
  text-align: center;
}
.forgot-pass-title,
.steps {
  margin-bottom: 50px;
}
.forgot-password
.el-input {
  width: 300px;
}
.step-btn {
  width: 300px;
  margin-left: 125px;
}
.forgot-password
.verify {
  width: 150px;
  float: left;
}
</style>
