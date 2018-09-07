<style lang="less" scoped>
#AccountSet{
    height: 100%;
    position: relative;
    overflow-x: hidden;
}
.wrap{
    overflow-x: hidden;
    padding-top: 1.173333rem !important;
}
.baseInfoWrap,.infoWrap{
    background: #fff;
}
.avatarWrap{
    // width: 100%;
    height: 1.333333rem;
    border-bottom: 1px solid rgb(235,229,225);
    line-height: 1.333333rem;
    margin-left: .333333rem;
    margin-right: .333333rem;
    .avatar{
        width: .8rem;
        height: .8rem;
        background-size: 100%;
        float: right;
        margin: .266667rem 0 0 0;
        border-radius: 50%;
    }
    span{
        font-size: .426667rem;
    }
}
.nicknameWrap{
    // width: 100%;
    height: 1.333333rem;
    border-bottom: 1px solid rgb(235,229,225);
    line-height: 1.333333rem;
    margin-left: .333333rem;
    margin-right: .333333rem;
    span:nth-child(1){
        font-size: .426667rem;
    }
    span:nth-child(2){
        float: right;
        font-size: .4rem;
        color: rgb(85,85,85);
    }
}
.infoWrap{
    margin-top: .32rem;
}
.nameWrap{
    // width: 100%;
    height: 1.333333rem;
    border-bottom: 1px solid rgb(235,229,225);
    line-height: 1.333333rem;
    margin-left: .333333rem;
    margin-right: .333333rem;
    span:nth-child(1){
        font-size: .426667rem;
    }
    span:nth-child(2){
        display: inline-block;
        width: .2rem;
        height: .346667rem;
        // .bg-image("../../assets/images/right_arrow");
        background: url("../../assets/images/right_arrow@2x.png") no-repeat;
        background-size: 100%;
        float: right;
        margin: .493333rem 0 0 0;
    }
    .verified{
        float: right;
        margin: 0 .213333rem 0 0;
        font-size: .4rem;
        color: #555555 !important;
    }
    .noVerified{
        float: right;
        margin: 0 .213333rem 0 0;
        font-size: .4rem;
        color: rgb(232,42,42) !important;
    }
}
.tel{
    float: right;
    margin: 0 .213333rem 0 0;
    font-size: .4rem;
    color: rgb(85,85,85) !important;
}
.green{
    color: rgb(5,149,26) !important;
}
.wechatWrap{
    width: 100%;
    height: 1.333333rem;
   border-bottom: none;
    line-height: 1.333333rem;
    margin-left: .333333rem;
    span:nth-child(1){
        font-size: .426667rem;
    }
    span:nth-child(2){
        float: right;
        margin: 0 0.693333rem 0 0;
        font-size: .4rem;
        color: rgb(232,42,42);
    }
}
</style>
<template>
    <div id="AccountSet">
        <headerCom :titleScoped="'用户信息'"></headerCom>
        <div class="wrap">
            <div class="baseInfoWrap">
                <div class="avatarWrap">
                    <span>微企宝头像</span>
                    <img :src="userInfo.HeadImgUrl" alt="" class="avatar" v-if="userInfo.HeadImgUrl">
                    <img src="../../assets/images/headerDefault@2x.png" class="avatar" v-else>
                </div>
                <div class="nicknameWrap">
                    <span>微企宝昵称</span>
                    <span>{{userInfo.NickName}}</span>
                </div>
            </div>
            <div class="infoWrap">
                <div class="nameWrap" @click.stop.prevent="toPerson">
                    <span>姓名</span>
                    <span></span>
                    <span :class="userInfo.NameAuth==0 || userInfo.NameAuth== 1 ?'verified':'noVerified'">{{toPersonV(userInfo)}}</span>
                    <!-- <span :class="userInfo.NameAuth==1?'verified':'noVerified'">{{userInfo.NameAuth==1?userInfo.RealName:"未认证" }}</span> -->
                </div>
                <div class="nameWrap" @click.stop.prevent="toTel">
                    <span>手机号</span>
                    <span></span>
                    <span class="tel">{{userInfo.Mobile }}</span>
                </div>
                <div class="nameWrap" @click.stop.prevent="toEmail">
                    <span>邮箱</span>
                    <span></span>
                    <span :class="userInfo.EmailAuth==1?'verified':'noVerified'">{{userInfo.EmailAuth==1?userInfo.Email:"去绑定"}}</span>
                </div>
                <div class="wechatWrap">
                    <span>微信</span>
                    <span class="green">已绑定</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters,mapState } from "vuex";
import {getSession,setSession} from '@util/sessionStorage.js'
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState("personalCenter", ["userInfo"])
    },
    created(){
        let params = {
            Id:getSession("_info").Id,
        }
        this.GetUserInfo(params).then(() =>{
            // console.log("userInfo",this.userInfo)
        });
    },
    methods:{
        ...mapActions("personalCenter", {
            GetUserInfo:"GetUserInfo",
        }),
        toTel(){
            this.$router.push({path:"/userCenter/ChangeTelFirst",query:{tel:this.userInfo.Mobile}});
        },
        toEmail(){
            this.$router.push({path:"/userCenter/ChangeEmailFisrt",query:{email:this.userInfo.Email,tel:this.userInfo.Mobile}});
        },
        toPerson(){
            setSession('_idCard','')
            setSession('_face','')
            setSession('_back','')
            setSession('backImg','')
            setSession('faceImg','')
            setSession('_newTag','')
            // window.sessionStorage.removeItem("_tag1");
            // sessionStorage.removeItem("_tag2");
            setSession('_tag1','')
            setSession('_tag2','')
            if(this.userInfo.NameAuth == -1){
                this.$router.push("/Signature/PersonalVertify");
            }else if(this.userInfo.NameAuth == 2){
                this.$router.push({path:"/Signature/PersonalVertify",query:{Id:this.userInfo.SignerId,name:"account"}});
            }
        },
        toPersonV(val){
            switch(val.NameAuth){
                case -1:
                return "未认证";
                break;
                case 0:
                return "审核中";
                break;
                case 1:
                return val.RealName;
                break;
                case 2:
                return "未认证";
                break;
            }
        }
    }
}
</script>

