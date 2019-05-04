<template>
    <div class="login note" ref="login" :style ="note">
        <loginForm></loginForm>
    </div>
</template>
<script>
import loginForm from "@/components/wyj/LoginForm"
import {mapMutations, mapState} from 'vuex'
export default {
    name:'login',
    components:{
        loginForm
    },
     data(){
        return{
            note:{
                backgroundImage: "url(" + require("../../../public/login.jpg") + ")",
                backgroundSize:"cover",
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center'
            }
            
        }
    },
    created() {
        console.log('created')
        this.setIsLogin()
    },
    destroyed() {
        console.log('destroyed')
        this.setIsLogin()
    },
    computed: {
        ...mapState('hsj',['isLogin']),
    },
    methods: {
        ...mapMutations('hsj', ['setIsLogin'])
    }
}
</script>
<style scoped>
.login{
    width: 100%;
    height: 600px;
    position: relative;
    /* background-color: black; */
    min-width: 1346px;
    
}
/* .login {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
} */
/* .container {
    width: auto;
} */
</style>


