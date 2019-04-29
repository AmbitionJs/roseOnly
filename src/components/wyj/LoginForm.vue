<template>
  <div class="loginForm">
    <form>
      <!-- 这个国家选项 -->
      <select name="country" id="country">
        <option value="韩国">韩国</option>
        <option value="中国" selected="selected">中国</option>
        <option value="澳大利亚">澳大利亚</option>
        <option value="加拿大">加拿大</option>
        <option value="马来西亚">马来西亚</option>
        <option value="美国">美国</option>
        <option value="日本">日本</option>
        <option value="英国">英国</option>
        <option value="澳大利亚">澳大利亚</option>
        <option value="中国澳门">中国澳门</option>
        <option value="中国台湾">中国台湾</option>
        <option value="中国香港">中国香港</option>
      </select>
      <!-- 输入手机号 -->
      <div class="tele-number clear" ref="borderChang">
        <div class="text-left">
          <button type="button" id="beforetel">+86</button>
        </div>
        <div class="tele-input">
          <input
            type="text"
            placeholder="请输入手机号"
            @focus="telFocus"
            @blur="telBlur"
            v-model="username"
            ref="tel"
          >
        </div>
      </div>
      <!-- 验证手机号 -->
      <p class="telText" ref="telText"></p>
      <!-- 输入密码 -->
      <div class="pass">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="userpass"
          @blur="passBlur"
          ref="passInput"
        >
      </div>
      <!-- 验证密码 -->
      <p class="passText" ref="passText"></p>
      <!-- 快速注册和忘记密码 -->
      <div class="forget clear">
        <span class="quick-regester" @click="toregester">快速注册</span>
        <span class="pass-forget">忘记密码?</span>
      </div>
      <div class="submit">
        <button type="button" class="submitBtn" ref="submitBtn" @click="loginBtn">登录</button>
      </div>
    </form>
    <!-- 支持同城配送 -->
    <div class="distribution">
      <p>roseOnly支持门店城市同城速递服务!</p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'

export default {
  name: "loginForm",
  data() {
    return {
      username: "",
      userpass: "",
      identity: 2
    };
  },
  methods: {
    // 这个是当获取输入手机号焦点的时候的效果
    telFocus() {
      console.log("获取焦点了");
      this.$refs.borderChang.style.border = "3px solid #ddd6d6";
    },
    // 这个是当账号失去焦点的时候的效果
    telBlur() {
      //这个是输入框的边框扩大
      this.$refs.borderChang.style.border = "1px solid #e7e4e4";
      //这个是进行验证
      var pat = /^1(3|4|5|7|8|9)\d{9}$/;
      var username = this.$data.username;
      console.log(username);
      if (pat.test(username)) {
        this.$refs.telText.innerText = "号码格式正确";
        this.$refs.telText.style.color = "green";
      } else if (username == "") {
        this.$refs.telText.innerText = "请输入正确的手机号码";
        this.$refs.telText.style.color = "red";
        this.$refs.submitBtn.disabled = false;
      } else {
        this.$refs.telText.innerText = "号码格式错误";
        this.$refs.telText.style.color = "red";
      }
    },
    // 这个是当密码框失去焦点的时候验证
    passBlur() {
      var userpass = this.$data.userpass;
      if (userpass == "") {
        this.$refs.passText.innerText = "密码不能为空";
        this.$refs.passText.style.color = "red";
        this.$refs.submitBtn.disabled = false;
      }
    },
    //登录按钮被点击的时候
    loginBtn() {
      console.log("登录按钮被点击了");
      //获取md5
      var md5 = require("md5");
      //获取username
      var username = this.$data.username;
      //获取userpass
      var userpass = this.$data.userpass;
      //定义账号验证
      var pat = /^1(3|4|5|7|8|9)\d{9}$/;
      //判断账号和密码有一个为空的时候，那么按钮就不能进行点击
      if (username == " " || userpass == "") {
        (this.$refs.passText.innerText = "账号或密码不能为空"),
          (this.$refs.passText.style.color = "red");
        console.log("账号密码有一个为空");
        //不为空
      } else {
        this.$refs.passText.innerText = "";
        console.log("不为空");

        //不为空的时候判断格式是否正确，如果格式正确发送请求
        if (pat.test(username)) {
          console.log("格式正确，可以发送请求");
          console.log(this.username, md5(this.userpass), this.identity);
          this.axios
            .post("/users/login", {
              cellphone: this.username,
              password: md5(this.userpass),
              identity: this.identity
            })
            //请求成功
            .then(res => {
              console.log(res);
              console.log("userId is ", res.data.userId);
              if (res.data.code == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem('cellphone',res.data.cellphone)
                this.changeLoginState(true)
                console.log("登录成功");
                //跳转到根路径
                this.$router.push("/");
              } else {
                this.$refs.passText.innerText = "账号或密码错误";
                this.$refs.passText.style.color = "red";
              }
            })
            // 请求失败的情况
            .catch(err => {
              console.log(err);
              console.log("登录失败");
            });
        } else {
          console.log("格式不正确，不能发送请求");
        }
      }
    },
    // 点击跳转到注册
    toregester() {
      this.$router.push("./regester");
      console.log("跳转到注册");
    },
    ...mapMutations('hjs',['changeLoginState'])
  }
};
</script>
<style>
/* 登录框整体样式 */
.loginForm {
  width: 400px;
  height: auto;
  background-color: white;
  position: relative;
  left: 65%;
  top: 50px;
  font-size: 16px;
  padding-top: 40px;
}
/* form表单整体样式 */
form {
  width: 290px;
  height: auto;
  text-align: center;
  margin: auto;
}
/* input输入框整体样式 */
#country,
.tele-number,
.pass {
  width: 294px;
  height: 50px;
  margin-bottom: 10px;
}
/* select选框样式 */
select {
  outline: none;
  border: 1px solid #e7e4e4;
}
/* 手机号和密码验证样式 */
.telText,
.passText {
  font-size: 12px;
  color: red;
}
/* +86和输入手机号样式 */
#beforetel {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  outline: none;
  background-color: white;
}
.text-left {
  float: left;
  width: 50px;
  height: 50px;
  border-right: 1px solid rgb(221, 214, 214);
}
/* 输入手机号input 输入框样式 */
.tele-number input {
  width: 219px;
  border: none;
  padding-left: 20px;
  height: 50px;
  outline: none;
}
/* 输入手机号整体样式 */
.tele-number {
  width: 290px;
  height: 50px;
  border: 1px solid #e7e4e4;
}
.tele-input {
  float: left;
}
/* 验证密码输入框的样式 */
.pass {
  width: 290px;
  height: 50px;
}
.pass input {
  padding-left: 20px;
  width: 290px;
  box-sizing: border-box;
  border: 1px solid #e7e4e4;
  height: 50px;
  outline: none;
}
/* 忘记密码和注册的样式 */
.quick-regester {
  cursor: pointer;
  float: left;
  line-height: 30px;
  /* display: inline-block; */
  font-size: 14px;
}
/* 忘记密码 */
.pass-forget {
  cursor: pointer;
  float: right;
  line-height: 30px;
  font-size: 14px;
}
/* 登录按钮样式 */
.submitBtn {
  width: 290px;
  height: 50px;
  background-color: #ccc7c7;
  color: white;
  outline: none;
  border: none;
  font-size: 16px;
}
/* 当鼠标移入登录按钮的时候的样式 */
.submit :hover {
  background-color: black;
  box-shadow: 0 0 2px #a19f9f;
  color: white;
}
/* 同城配送 */
.distribution {
  width: 400px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #ccc7c7;
  margin-top: 20px;
}
</style>


