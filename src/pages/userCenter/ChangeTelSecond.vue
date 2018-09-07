<style lang="less" scoped>
    #ChangeTelSecond{
        height: 100%;
        position: relative;
        overflow-x: hidden;
    }
    .wrap{
        height: 2.666667rem;
        background: #fff;
    }
    .telWrap,.codeWrap{
        // width: 100%;
        height: 1.333333rem;
        background: #fff;
        line-height: 1.333333rem;
        margin-left: .333333rem;
        margin-right: .333333rem;
        input{
            width: 64%;
            height: 1.333333rem;
            padding-left: .96rem;
            font-size: .4rem;
            color: black;
        }
    }
    .telWrap{
        margin-top: 1.493333rem;
        border-bottom: 1px solid rgb(235,229,225);
    }
    .nameWord{
        font-size: .426667rem;
        color: black;
    }
    .getCode{
        color: rgb(0, 150, 255);
        font-size: .346667rem;
    }
    .getCode2{
        color: rgb(102,102,102);
        font-size: .346667rem;
    }
    .nextStep,.nextStep2{
        width: 8.933333rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        color: #fff;
        font-size: .453333rem;
        text-align: center;
        border-radius: .066667rem;
        margin: 1.333333rem 0 0 .533333rem;
    }
    .nextStep{
        background: rgb(213,213,213);
    }
    .nextStep2{
        background: #0096FF;
    }
    .outside{
        padding-top: 0 !important;
    }
    .sortWrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99999;
        background-color: rgba(0, 0, 0, 0.4);
        .windowsW {
            width: 7.333333rem;
            height: 3.813333rem;
            background: #fff;
            margin: 0 auto;
            margin-top: 5.28rem;
            border-radius: 0.533333rem;
        }
        .titleW {
            width: 3.93333rem;
            font-size: 0.453333rem;
            margin: 0 auto;
            padding-top: 0.533333rem;
            font-weight: 600;
            text-align: center;
        }
        .detail1 {
            font-size: 0.373333rem;
            margin: 0 auto;
            margin-top: 0.526667rem;
            font-weight: 400;
            text-align: center;
        }
        .detail2 {
            width: 7.653333rem;
            font-size: 0.373333rem;
            margin: 0.246667rem auto;
            font-weight: 400;
            text-align: center;
        }
        .btnWrap {
            height: 1.226667rem;
            margin-top: 0.52rem;
            span {
                width: 7.333333rem;
                display: inline-block;
                line-height: 0.526667rem;
                text-align: center;
                font-size: 0.453333rem;
                color: rgb(14, 128, 254);
            }
    }
}
.routerView-44px {
    height: calc(100% - 2.773333rem)!important;
}
</style>
<template>
    <div id="ChangeTelSecond" class="routerView-44px">
        <headerCom :titleScoped="'新手机号码'"></headerCom>
        <div class="outside">
            <div class="wrap">
                <div class="telWrap">
                    <span class="nameWord">手机号</span>
                    <input type="number" placeholder="请输入新手机号" v-model="telPhone" maxlength="11" @blur="checkTel" @input="check">
                </div>
                <div class="codeWrap">
                    <span class="nameWord space">验证码</span>
                    <input type="number" placeholder="请输入验证码" v-model="code" @blur="checkCode" @input="check">
                    <span class="getCode" @click="getCode" v-if="getCodee">获取验证码</span>
                    <span class="getCode2" v-else>{{"重新获取"+ timer}}</span>
                </div>
            </div>
            <div :class="isShowBlue?'nextStep2':'nextStep'" @click="nextStep">确定</div>
        </div>
         <!-- 修改成功后的弹窗 -->
        <div class="sortWrap" v-if="isShowW">
            <div class="windowsW">
                <div class="titleW">修改手机号成功</div>
                <div class="detail1">原手机号已不能用于登录！</div>
                <div class="detail2 copyI">请使用新手机号进行后续的登录操作！！</div>
                <div class="btnWrap">
                    <span @click="sure">确定</span>
                </div>
            </div>
        </div>     
    </div>
</template>
<script>
import getData from "@vuex/ajaxAPI/getData";
import tool from '@util/tool';
import { mapActions, mapGetters,mapState } from "vuex";
import {getSession} from '@util/sessionStorage.js';
var countDown = null;
export default {
    data(){
        return {
            telPhone:"",
            code:"",
            getCodee:true,
            timer:60,
            isShowBlue:false,
            isShowW:false,
        }
    },
    computed: {
        ...mapGetters("personalCenter", ["_EditMobile_"])
    },
    methods:{
        ...mapActions("personalCenter", {
            EditMobile:"EditMobile",
        }),
        nextStep(){
            if(this.isShowBlue){
                let params = {
                    Id:getSession("_info").Id,
                    Mobile:this.telPhone,
                    VerifyCode:this.code
                }
                this.EditMobile(params).then(() => {
                    // console.log(this._EditMobile_)
                    if(this._EditMobile_){
                        this.isShowW = true;
                    }
                })
            }
        },
        getCode(){
            if(this.checkTel2()){
                this.getCodee = false;
                let param = {
                    mobile: this.telPhone
                }
                getData.getVerifyCode(param).then((res) => {
                    countDown = setInterval(() => {
                        if (this.timer <= 1) {
                            this.timer = 60;
                            this.getCodee = true;
                            clearInterval(countDown);
                        } else {
                            this.timer--;
                        }
                    }, 1000);
                })
            }else{
                this.$vux.toast.text("请先填写手机号", "middel");
            }
        },
        checkCode(){
            if(this.code.length != 0){
              let status =  tool.regularJudgement("noteCode",this.code);
              if(!status){
                  return false;
              }
            }
        },
        checkCode2(){
            if(this.code.length > 5){
                return true;
            }else{
                return false;
            }
        },
        checkTel2(){
            let reg = /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telPhone);
            // console.log(reg,this.telPhone)
            if (!reg) {
                return false;
            } else {
                return true;
            }
        },
        checkTel(){
            if(this.telPhone.length != 0){
                let status =  tool.regularJudgement("phone",this.telPhone);
                if(!status){
                    return false;
                }
            }
        },
        check(){
            if(this.checkCode2() && this.checkTel2()){
                this.isShowBlue = true;
            }
        },
        sure(){
            this.$router.push("/userCenter/AccountSet");
        }
    },
    beforeDestroy(){
        clearInterval(countDown);
    }
}
</script>
