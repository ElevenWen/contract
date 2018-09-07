<style lang="less" scoped>
    .container {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        padding-top: 0 !important;
    }
    .content{
        font-size: .4rem;
        background: #fff;
        text-indent: .4rem;
        padding: 0 .4rem;
        padding-top: 1.6rem !important;
        line-height: .533333rem;
        flex: 1;
    }
    .routerView-44px {
        height: calc(100% - 0.29333rem)!important;
    }
</style>
<template>
    <div>
        <!-- class="routerView-44px" -->
        <div id="knowContract" >
            <headerCom :titleScoped="'了解电子合同'"></headerCom>
            <div class="container">
                <div class="content" v-html="aboutContractDes" id="content">{{aboutContractDes}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters,mapState } from "vuex";
import getData from "@vuex/ajaxAPI/getData";
export default {
    data(){
        return {

        }
    },
    mounted(){
        // console.log(window.innerHeight,document.getElementById("content").style.height);
        // if(window.innerHeight <= window.innerHeight){
        //     document.getElementById("knowContract").style.height = "100%";
        //     console.log("555555",document.getElementById("knowContract").style.height)
        // }else{
        //     // document.getElementById("knowContract").style.height = window.innerHeight + "px";
        //     // console.log("66666",document.getElementById("knowContract").style.height)
        // }
        this.GetContractDesc();
    },
    computed: {
        ...mapState("personalCenter", ["aboutContractName","aboutContractDes"])
    },
    methods:{
        ...mapActions("personalCenter", {
            GetContractDesc:"GetContractDesc",
        }),
    }
}
</script>

