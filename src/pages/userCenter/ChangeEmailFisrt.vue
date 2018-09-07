<style lang="less" scoped>
    .outside{
        padding-top: 0 !important;
    }
    #ChangeEmailFisrt{
        height: 100%;
        position: relative;
        overflow-x: hidden;
    }
    .wrap{
        height: 4rem;
        background: #fff;
    }
    .telWrap,.codeWrap,.EmailWrap{
        // width: 100%;
        height: 1.333333rem;
        background: #fff;
        line-height: 1.333333rem;
        margin-left: .333333rem;
        margin-right: .333333rem;
        input{
            width: 64%;
            height: 1.333333rem;
            padding-left: .946667rem;
            font-size: .4rem;
            color: rgb(178,178,178);
            color: #000;
        }
    }
    .EmailWrap{
        input{
            padding-left: .56667rem;
            color: #000;
        }
    }
    .telWrap{
        margin-top: 1.493333rem;
        border-bottom: 1px solid rgb(235,229,225);
    }
    .codeWrap{
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
    .routerView-44px {
        height: calc(100% - 2.773333rem)!important;
    }
</style>
<template>
    <div id="ChangeEmailFisrt" class="routerView-44px">
        <headerCom :titleScoped="'绑定邮箱'"></headerCom>
        <div class="outside">
            <div class="wrap">
                <div class="telWrap">
                    <span class="nameWord">手机号</span>
                    <input type="num" placeholder="请输入手机号" v-model="telPhone" maxlength="11" @blur="checkTel" @input="check" disabled>
                </div>
                <div class="codeWrap">
                    <span class="nameWord space">验证码</span>
                    <input type="number" placeholder="请输入验证码" v-model="code" @blur="checkCode" @input="check" maxlength="6">
                    <span class="getCode" @click="getCode" v-if="getCodee">获取验证码</span>
                    <span class="getCode2" v-else>{{"重新获取"+ timer}}</span>
                </div>
                <div class="EmailWrap">
                    <span class="nameWord">绑定邮箱</span>
                    <input type="text" placeholder="请输入邮箱" v-model="email" @blur="checkEmail" @input="check">
                </div>
            </div>
            <div :class="isShowBlue?'nextStep2':'nextStep'" @click="nextStep">下一步</div>
        </div>
    </div>
</template>
<script>
import getData from "@vuex/ajaxAPI/getData";
import tool from '@util/tool';
import { clearTimeout } from 'timers';
import { mapActions, mapGetters,mapState } from "vuex";
import {getSession} from '@util/sessionStorage.js'
var countDown = null;
export default {
    data(){
        return {
            telPhone:"",
            code:"",
            email:"",
            getCodee:true,
            timer:60,
            isShowBlue:false,
            tel:""
        }
    },
    created(){
        let _email = this.$route.query.email;
        this.tel = this.$route.query.tel;
        // console.log("this.tel",this.tel)
        this.telPhone = this.tel.substr(0,3)+"****"+this.tel.substr(7);
        if(_email){
            this.email = _email;
        }else{
            this.email = "";
        }
    },
    computed: {
        ...mapGetters("personalCenter", ["_BindEmail_"])
    },
    methods:{
        ...mapActions("personalCenter", {
            BindEmail:"BindEmail",
        }),
        nextStep(){
            if(this.isShowBlue){
                let params = {
                    Id:getSession("_info").Id,
                    Mobile:this.tel,
                    VerifyCode:this.code,
                    Email:this.email
                }
                this.BindEmail(params).then(() => {
                    // console.log(this._BindEmail_)
                    if(this._BindEmail_){
                        this.$router.push("/userCenter/ChangeEmailSecond");
                    }
                })
            }
        },
        getCode(){
            this.getCodee = false;
            let param = {
                // params : {
                    mobile: this.tel,
                // }
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
            if(this.checkCode2() && this.checkEmail2()){
                this.isShowBlue = true;
            }else{
                this.isShowBlue = false;
            }
            // console.log("this.checkEmail2",this.checkEmail2());
            
        },
        checkEmail(){
            if(this.email.length != 0){
                let status = tool.regularJudgement("email",this.email);
                if(!status){
                    return false;
                }
            }
        },
        checkEmail2(){
            let status = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.email);
            if(!status){
                return false;
            }else{
                return true;
            }
        }
    },
    beforeDestroy(){
        clearInterval(countDown);
    }
}
</script>
