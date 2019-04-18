<template>
    <div class="loginForm">
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
                    <input type="text" placeholder="请输入手机号" @focus="telFocus" @blur ="telBlur">
                </div>
            </div>
            <!-- 验证手机号 -->
            <p class="telText"></p>
            <!-- 输入密码 -->
            <div class="pass">
                <input type="password" placeholder="请输入密码">
            </div>
            <!-- 验证密码 -->
            <p class="passText"></p>
            <!-- 快速注册和忘记密码 -->
            <div class="forget">
                <span class="quick-regester" >快速注册</span>
                <span class="pass-forget">忘记密码?</span>
            </div>
        </form>
        <!-- 支持同城配送 -->
        <div class="distribution">
            <p>roseOnly支持门店城市同城速递服务!</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'loginForm',
    methods:{
        // 这个是当获取输入手机号焦点的时候的效果
        telFocus(){
            console.log('获取焦点了')
            this.$refs.borderChang.style.border = "3px solid #ddd6d6";
        },
        // 这个是当失去焦点的时候的效果
        telBlur(){
            this.$refs.borderChang.style.border = "1px solid #e7e4e4";
        }
    }
}
</script>
<style>
/* 登录框整体样式 */
.loginForm{
    width: 400px;
    height: auto;
    background-color: white;
    position: relative;
    left:70%;
    top: 50px;
    font-size: 16px;
    padding-top: 40px;
}
/* form表单整体样式 */
form{
    width: 290px;
    height: auto;
    background-color: aqua;
    text-align: center;
    margin: auto;
}
/* input输入框整体样式 */
#country,.tele-number,.pass,.forget{
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
/* 验证手机号整体的样式 */
</style>


