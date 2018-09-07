<style lang="less" scoped>
.header{
    width: 100%;
    height: 4.726667rem;
    .bg-image("../../assets/images/background");
    background-size: 100%;
    margin-top: -0.373333rem;
    div:nth-child(1){
        font-size: .453333rem;
        color: #fff;
        padding-top: .72rem;
        text-align: center;
    }
    .avatar{
        width: 1.6rem;
        height: 1.6rem;
        margin: .493333rem auto;
        img{
            width: 1.6rem;
            height: 1.6rem;
            background: 100%;
            border-radius: 50%;
        }
    }
    div:nth-child(3){
        font-size: .4rem;
        color: #fff;
        text-align: center;
    }
}
.listWrap{
    width: 9.2rem;
    height: 7.506667rem;
    background: #fff;
    margin: 0 auto;
    margin-top: .52rem;
    border-radius: .066667rem;
}
.list{
    height: 1.866667rem;
    border-bottom: 1px solid rgb(229,229,229);
    margin-left: .32rem;
    img{
        width: .933333rem;
        height: .933333rem;
        background-size: 100%;
        margin: .466667rem 0 0 0;
    }
}
.list:nth-last-child(1){
    border-bottom: none;
}
.listRight{
    width: 85%;
    display: inline-block;
    vertical-align: top;
    padding:.533333rem 0 0 .293333rem;
    div:nth-child(1){
        font-size: .373333rem;
        color: black;
    }
    div:nth-child(2){
        font-size: .32rem;
        color: rgb(136,136,136);
        margin-top: .16rem;
    }
    .rightArrow{
        width: .213333rem;
        height: .4rem;
        background: url("../../assets/images/right_arrow@2x.png") no-repeat;
        background-size: 100%;
        float: right;
        margin-top: -0.666667rem;
    }
}
</style>
<template>
    <div>
        <div id="UserCenter">
            <div class="header" @click.stop.prevent="setAccount">
                <div>用户中心</div>
                <div class="avatar">
                    <img :src="userInfo.HeadImgUrl" alt="" v-if="userInfo.HeadImgUrl">
                    <img src="../../assets/images/headerDefault@2x.png" alt="" v-else>
                </div>
                <div>{{userInfo.NickName}}</div>
            </div>
            <div class="listWrap">
                <div class="list">
                    <div @click.stop.prevent="toSignatureManagement">
                    <img src="../../assets/images/stamp@2x.png" alt="">
                    <div class="listRight">
                        <div>创建签章</div>
                        <div>创建属于个人/企业的签章</div>
                        <div class="rightArrow"></div>
                    </div>
                    </div>
                </div>
                <div class="list" @click.stop.prevent="toMyPackage">
                    <img src="../../assets/images/package@2x.png" alt="">
                    <div class="listRight">
                        <div>我的套餐</div>
                        <div>更多免费/付费合同模板等你使用</div>
                        <div class="rightArrow"></div>
                    </div>
                </div>
                <div class="list" @click.stop.prevent="toUs">
                    <img src="../../assets/images/about@2x.png" alt="">
                    <div class="listRight">
                        <div>关于我们</div>
                        <div>让你对我们了解的更加深入</div>
                        <div class="rightArrow"></div>
                    </div>
                </div>
                <div class="list" @click.stop.prevent="setAccount">
                    <img src="../../assets/images/Setup@2x.png" alt="">
                    <div class="listRight">
                        <div>账户设置</div>
                        <div>对个人信息的设置及认证</div>
                        <div class="rightArrow"></div>
                    </div>
                </div>
            </div>
            <footer-nav></footer-nav>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters,mapState } from "vuex";
import {getSession,setSession} from '@util/sessionStorage.js';
export default {
    data(){
        return {

        }
    },
    mounted(){
        let params = {
            Id:getSession("_info").Id,
        }
        this.GetUserInfo(params).then(() => {
        })
    },
    computed: {
        ...mapState("personalCenter", ["userInfo"])
    },
    methods:{
        ...mapActions("personalCenter", {
            GetUserInfo:"GetUserInfo",
        }),
        toSignatureManagement(){
            setSession("UserCenter","UserCenter");
            this.$router.push("/Signature/SignatureManagement/id"); 
        },
        toMyPackage(){
            this.$router.push({path:"/myPackage/MyPackage",query:{name:"user"}});
        },
        toUs(){
            this.$router.push("/userCenter/AboutUs");
        },
        setAccount(){
            this.$router.push("/userCenter/AccountSet");
        },
    }
}
</script>


