<template>
    <div class="regesterForm">
        <form >
            <!-- 这个国家选项 -->
            <select name="country" id="country">
                <option value="韩国">韩国</option>
                <option value="中国" selected ='selected'>中国</option>
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
                    <input type="text" placeholder="请输入手机号" @focus="telFocus" @blur ="telBlur" name="username" ref ="tel">
                </div>
            </div>
            <!-- 验证手机号 -->
            <p class="telText" ref="telText"></p>
            <!-- 实现图形验证 -->
            <div class="picture-test clear">
                <input type="text" placeholder="图形验证码" @blur="picTest" ref="pictureInput">
                <!-- 这个是随机生成的动态验证码 -->
                <div class="picture-text">
                <identify :identifyCode="identifyCode"></identify>
                </div>
                  <!-- 这个是换一张 -->
                 <span class="change-picture" @click="refreshCode">换一张</span>
            </div>
            <!-- 图形验证结果 -->
            <p class="pictureTest" ref="pictureTest"></p>
          
            <!-- 这个是手机短信验证 -->
            <div class="msg-test clear" >
                <input type="tel" placeholder="短信验证" v-model="inputCode" @blur="msgTest" class="letter-input">
                <!-- 这个是随机生成的动态验证码 -->
                <span class="send-msg" @click="sendMsg">发送验证码</span>
            </div>
            <!-- 短信验证结果 -->
            <p class="msgTest" ref="letterTest"></p>
            <!-- 输入密码 -->
            <div class="pass">
                <input type="password" placeholder="6-16位数字或字母" name="userpass" @blur="passBlur" ref="passInput">
            </div>
            <!-- 验证密码 -->
            <p class="passText" ref="passText"></p>
            <!-- 已有账号点击跳转登录页面-->
            <div class="have-login">
                <span class="get-login" @click="tologin">已有账号</span>
            </div>
            <div class="submit">
                <button type="button" class="regesterBtn" ref="regesterBtn" @click="regesterBtn">注册</button>
            </div>
        </form>
        <!-- 支持同城配送 -->
        <div class="distribution">
            <p>roseOnly支持门店城市同城速递服务!</p>
        </div>
    </div>
</template>
<script>
import identify from "@/components/wyj/identify"
export default {
    name:'regesterForm',
    data(){
        return{
             identifyCodes: "1234567890",
             identifyCode: "",
             cellphone:'',
             smsCode: '',
             inputCode: '',
             telstyle:''
        }
    },
    components:{
        identify
    },
    mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
     },
    methods:{
        //这些是图形验证的方法
        randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
        for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
        },
        // 这个是当获取输入手机号焦点的时候的效果
        telFocus(){
            console.log('获取焦点了')
            this.$refs.borderChang.style.border = "3px solid #ddd6d6";
        },
        // 这个是当账号失去焦点的时候的效果
        telBlur(){
            //这个是输入框的边框恢复
            this.$refs.borderChang.style.border = "1px solid #e7e4e4";
            //这个是进行验证
            var pat  = /^1(3|4|5|7|8|9)\d{9}$/;
            var username  = this.$refs.tel.value;
            console.log(username);
            if(pat.test(username)){
                this.axios.get('/users/{cellphone}/verification',{
                    cellphone:this.$refs.tel.value,
                })
                .then(res=>{
                    if(res.code ==200){
                         this.$refs.telText.innerText = "手机号码已注册";
                          this.$refs.telText.style.color = "red";
                    }else{
                        this.$refs.telText.innerText = "手机号码可以使用";
                        this.$refs.telText.style.color = "green"; 
                        this.telstyle = 1;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }else if(username ==''){
                this.$refs.telText.innerText = "手机号码不能为空";
                this.$refs.telText.style.color = "red";
            }
            else{
                this.$refs.telText.innerText = "请填写正确的手机号码";
                this.$refs.telText.style.color = "red";
            }
        },
        // 这个是当密码框失去焦点的时候验证
        passBlur(){
            var userpass = this.$refs.passInput.value;
            var pat  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            console.log(userpass)
            if(userpass ==""){
                this.$refs.passText.innerText="密码不能为空";
                this.$refs.passText.style.color="red";
            }else if(!(pat.test(userpass))){
                this.$refs.passText.innerText = "密码格式不正确，请输入6-16位字母或数字";
                this.$refs.passText.style.color="red";
            }else{
                this.$refs.passText.innerText = "密码格式正确";
                this.$refs.passText.style.color="green";
            }
        },
        //这个是图形验证
        picTest(){
            if(this.identifyCode == this.$refs.pictureInput.value){
                this.$refs.pictureTest.innerText = "图形验证正确";
                this.$refs.pictureTest.style.color = 'green';
            }else if(this.$refs.pictureInput.value == ""){
                this.$refs.pictureTest.innerText = "图形验证不可以为空";
                this.$refs.pictureTest.style.color = 'red';
            }else{
                this.$refs.pictureTest.style.color = 'red';
                this.$refs.pictureTest.innerText = "请输入4位图片验证码";
            }
        },
        //注册按钮被点击
        regesterBtn(){
            console.log('注册按钮被点击了')
            //获取username
            var username = this.$refs.tel.value;
            //获取验证电话号码
            var telpat =  /^1(3|4|5|7|8|9)\d{9}$/;
            //获取密码验证
            var passpat =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            //获取userpass
            var userpass = this.$refs.passInput.value;
            //获取输如验证图形验证框的内容
            var pictureIpt  = this.$refs.pictureInput.value
            if(username ==" " || userpass=="" || pictureIpt =="" || this.inputCode ==''){
                this.$refs.passText.innerText = "账号,密码,短信验证或图形验证不能为空",
                this.$refs.passText.style.color = 'red';
                //这个是当不为空的时候
            }else {
                //这个是当账号格式不正确
                if(!(telpat.test(username))){
                     this.$refs.passText.innerText = "账号格式不正确，请重新输入";
                     this.$refs.passText.style.color = "red";
                }
                else if (!(passpat.test(userpass))){
                    this.$refs.passText.innerText = "密码格式不正确，请重新输入";
                    this.$refs.passText.style.color = "red";
                }else if(!(pictureIpt == this.identifyCode)){
                    this.$refs.passText.innerText = "图形验证不正确，请重新输入";
                    this.$refs.passText.style.color = "red";
                    //当有2个同时错误
                }else{
                     this.$refs.passText.innerText = "账号，密码,短信或图形验证不正确，请重新输入";
                     this.$refs.passText.style.color = "red";
                }
                //当账号，密码，图形验证都正确的时候
                if(this.telstyle==1 && passpat.test(userpass) && pictureIpt == this.identifyCode && this.inputCode == this.smsCode){
                    console.log(username,userpass)
                  //发送ajax请求，将创建的账号传入数据库
                  this.axios.post('/users/register',{
                      cellphone:username,
                      password:userpass
                  })
                   .then((res)=>{
                       if(res.code ==200){
                           //成功，跳转到登录页面
                        this.$router.oush('/login')
                       }
                   })
                   .catch((err)=>{
                       console.log(err);
                   })
                    
                }
            }
        },
        //点击跳转到login页面
        tologin(){
            this.$router.push("./login");
        },
        //这个是点击发送电话号码的验证码
        sendMsg(){
            var that = this;
            console.log('发送验证码')
           if(this.$refs.tel.value == ''){
               this.$refs.telText.innerText = "请输入正确的手机号码";
               this.$refs.telText.style.color ="red"
           }else{
                this.axios.post('/users/sms/{cellphone}',{
                cellphone:this.username,
            })
            .then((res)=>{
                console.log('手机验证请求成功',res.data.smsCode);
                  that.smsCode = res.data.smsCode
            })
            .catch((err)=>{
                console.log('手机验证请求失败',err);
            })
           }
        },
        //当短信验证框失去焦点的时候进行验证
        msgTest(){
            console.log(this.inputCode);
            //获取验证内容
            var letterTest = this.$refs.letterTest
            //判断短信验证
            if(this.inputCode ==''){
                letterTest.innerText = '短信验证不能为空'
                letterTest.style.color = 'red'
            }else{
                if(this.smsCode == this.inputCode){
                letterTest.innerText = '短信验证成功';
                letterTest.style.color = 'green'
                }else{
                 letterTest.innerText = '短信验证错误，请重新输入';
                letterTest.style.color = 'red';
            }
            }
        }
    }
}
</script>
<style>
/* 登录框整体样式 */
.regesterForm{
    width: 400px;
    height: auto;
    background-color: white;
    position: absolute;
    left:65%;
    top: 50px;
    font-size: 16px;
    padding-top: 40px;
}
/* form表单整体样式 */
form{
    width: 290px;
    height: auto;
    text-align: center;
    margin: auto;
}
/* input输入框整体样式 */
#country,.tele-number,.pass{
    width: 294px;
    height: 50px;
    margin-bottom: 10px;
}
/* select选框样式 */
select{
    outline: none;
    border: 1px solid #e7e4e4;
}
/* 手机号和密码验证样式 */
.telText,.passText{
    font-size: 12px;
    color: red;
    text-align:center;
}
/* +86和输入手机号样式 */
#beforetel{
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
    outline: none;
    background-color: white;
}
.text-left{
    float: left;
    width: 50px;
    height: 50px;
    border-right: 1px solid rgb(221, 214, 214);
}
/* 输入手机号input 输入框样式 */
.tele-number input {
    width: 219px;
    border:none;
    padding-left: 20px;
    height: 50px;
    outline: none;
}
/* 输入手机号整体样式 */
.tele-number{
    width: 290px;
    height: 50px;
    border: 1px solid #e7e4e4;
}
.tele-input{
    float: left;
}
/* 验证密码输入框的样式 */
.pass  {
    width: 290px;
    height: 50px;   
}
.pass input{
    padding-left: 20px;
    width: 290px;
    box-sizing: border-box;
    border: 1px solid #e7e4e4;
    height: 50px;
    outline: none;
}
/* 已有账号的设置*/
.get-login{
    cursor: pointer;
    float: right;
    line-height: 30px;
    font-size: 14px;
}
/* 注册按钮样式 */
.regesterBtn{
    width: 290px;
    height: 50px;
    background-color: #ccc7c7;
    color: white;
    outline: none;
    border: none;
    font-size: 16px;
}
/* 当鼠标移入登录按钮的时候的样式 */
.regesterBtn:hover{
    background-color: black;
    box-shadow: 0 0 2px #a19f9f;
    color: white;
}
/* 同城配送 */
.distribution{
    width: 400px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #ccc7c7;
    margin-top: 20px;
}
/* 这个是图形验证的样式 */
.picture-test,.msg-test{
    width: 290px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid   #e7e4e4;
    position: relative;
    margin-bottom: 10px;
}

/* 这里是个图形验证码的样式设置 */
.picture-test input,.msg-test input{
    width:60%;
    height: 50px;
    padding-left: 20px;
    border: none;
    /* display: inline-block; */
    float: left;
    border-right: 1px solid #ccc7c7;
    outline: none;
}
/* 这个是点击发送验证吗的样式 */
.send-msg{
    display: block;
    font-size: 14px;
    cursor: pointer;
    height: 51px;
    border: none;
    background: #ccc7c7;
    float: left;
    width: 95px;

}
.send-msg:hover{
    background:black;
    color: white;
}
/* 这个是换一张的样式 */
.change-picture{
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: none;
    display: block;
    font-size: 12px;
    color: #807d7d;
    position: absolute;
    right: -50px;
    top: 0px;
    cursor: pointer;
}
/* 这个是动态生成的图形验证 */
.picture-text{
    position: relative;
}
.pictureTest{
    font-size: 12px;
}
/* 这个是短信验证样式 */
.msgTest{
    font-size: 12px;
    text-align: center;
}

</style>



