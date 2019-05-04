<template>
    <div class="regester note" :style = "note">
        <regesterForm></regesterForm>
    </div>
</template>
<script>
import regesterForm from "@/components/wyj/RegesterForm"
import {mapMutations, mapState} from 'vuex'
export default {
    name:'regester',
    components:{
        regesterForm
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
<style>
.regester{
    width: 100%;
    height: 600px;
    background-color:black;
    position: relative;
    min-width: 1346px;
}

</style>