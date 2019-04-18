<template>
    <div class="login">
        <loginForm></loginForm>
    </div>
</template>
<script>
import loginForm from "@/components/wyj/LoginForm"
export default {
    name:'login',
    components:{
        loginForm
    }
}
</script>
<style>
.login{
    width: 100%;
    height: 600px;
    background-color:black;
    position: absolute;
}

</style>


