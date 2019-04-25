<template>
    <div class="regester note" :style = "note">
        <regesterForm></regesterForm>
    </div>
</template>
<script>
import regesterForm from "@/components/wyj/RegesterForm"
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