<style lang="less" scoped>
#AboutUs{
    border: 1px solid transparent;
}
.outside{
    padding-top: 1.173333rem !important;
}
.headerWrap{
    height: 4.266667rem;
    background: rgb(40,121,255);
    // padding-top: 1.233333rem !important;
    .title{
        font-size: .533333rem;
        color: #fff;
        font-weight: 400;
        text-align: center;
        padding-top: .8rem;
    }
    .detailWrap{
        display: flex;
    }
    .one,.two,.three,.four{
        display: inline-block;
        width: 2.493333rem;
        // flex: 0 0 auto;
        margin-left: .106667rem;
        margin-top: .8rem;
        text-align: center;
        img{
            width: .8rem;
            height: .8rem;
        }
        div{
            color: #fff;
            font-size: .32rem;
            margin-top: .24rem;
        }
    }
}
.companyInfo{
    height: 5.333333rem;
    background: #fff;
    margin-top: .32rem;
    .tel{
        height: 1.32rem;
        line-height: 1.32rem;
        border-bottom:1px solid rgb(235,229,225);
        margin-left:.373333rem;
        margin-right:.373333rem;
        span:nth-child(1){
            font-size: .426667rem;
        }
        span:nth-child(2){
            float: right;
            font-size: .4rem;
            color: rgb(85,85,85);
        }
    }
}
.last{
    border-bottom: none !important;
}
.feedbackWrap{
    background: #fff;
    margin-top: .32rem;
}
.feedback{
    height: 1.32rem;
    line-height: 1.32rem;
    margin-left:.373333rem;
    span:nth-child(1){
        font-size: .426667rem;
    }
    span:nth-child(2){
        display: inline-block;
        width: .2rem;
        height: .346667rem;
        float: right;
        margin: .493333rem .4rem 0 0;
        // .bg-image("../../assets/images/right_arrow");
        background: url("../../assets/images/right_arrow@2x.png") no-repeat;
        background-size: 100%;

    }
}
</style>
<template>
    <div id="AboutUs">
        <headerCom :titleScoped="'关于我们'"></headerCom>
        <div class="outside">
            <div class="headerWrap">
                <div class="title">微企宝电子合同</div>
                <div class="detailWrap">
                    <div class="one">
                        <img src="../../assets/images/one@2x.png" alt="">
                        <div>支持自动备份</div>
                    </div>
                    <div class="two">
                        <img src="../../assets/images/two@2x.png" alt="">
                        <div>支持上传模板</div>
                    </div>
                    <div class="three">
                        <img src="../../assets/images/three@2x.png" alt="">
                        <div>支持在线编辑</div>
                    </div>
                    <div class="four">
                        <img src="../../assets/images/four@2x.png" alt="">
                        <div>支持草稿文件</div>
                    </div>
                </div>
            </div>

            <div class="companyInfo">
                <div class="tel">
                    <span>电话</span><span>{{companyInfo.Tel}}</span>
                </div>
                <div class="tel">
                    <span>邮箱</span><span>{{companyInfo.Email}}</span>
                </div>
                <div class="tel">
                    <span>QQ</span><span>{{companyInfo.QQ}}</span>
                </div>
                <div class="tel last">
                    <span>官网</span><span>{{companyInfo.Site}}</span>
                </div>
            </div>

            <div class="feedbackWrap">
                <div class="feedback" @click.stop.prevent="toFeedback">
                    <span>意见反馈</span><span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters,mapState } from "vuex";
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState("personalCenter", ["companyInfo"])
    },
    mounted(){
        this.GetCompanyInfo()
        .then(() => {
            // console.log("this.companyInfo",this.companyInfo)
        })
    },
    methods:{
        ...mapActions("personalCenter", {
            GetCompanyInfo:"GetCompanyInfo",
        }),
        toFeedback(){
            this.$router.push("/userCenter/Feedback");
        }
    }
}
</script>
