<style lang="less" scoped>
    .outside{
        padding-top: 0 !important;
    }
    #ChangeTelFirst{
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
            color: #000;
        }
    }
    .telWrap{
        margin-top: 1.493333rem;
        border-bottom: 1px solid rgb(235,229,225);
    }
    .nameWord{
        font-size: .426667rem;
        color: black;
        vertical-align: top;
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
    <div id="ChangeTelFirst" class="routerView-44px" ref="ChangeTelFirst">
        <headerCom :titleScoped="'身份验证'"></headerCom>
        <div class="outside">
            <div class="wrap">
                <div class="telWrap">
                    <span class="nameWord">手机号</span>
                    <input type="num" placeholder="请填写手机号" v-model="telPhone" maxlength="11" @blur="checkTel" @input="check" disabled>
                </div>
                <div class="codeWrap">
                    <span class="nameWord space">验证码</span>
                    <input type="text" placeholder="请输入验证码" v-model="code" @blur="checkCode" @input="check" maxlength="6" @focus="aaaa" id="noScroll">
                    <span class="getCode" @click="getCode" v-if="getCodee">获取验证码</span>
                    <span class="getCode2" v-else>{{"重新获取"+ timer}}</span>
                </div>
            </div>
            <div :class="isShowBlue?'nextStep2':'nextStep'" @click="nextStep">下一步</div>
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
            tel:""
        }
    },
    created(){
        this.tel = this.$route.query.tel;
        this.telPhone = this.tel.substr(0,3)+"****"+this.tel.substr(7);
    },
    computed: {
        ...mapGetters("personalCenter", ["_VerifyMobile_"])
    },
    methods:{
        ...mapActions("personalCenter", {
            VerifyMobile:"VerifyMobile",
        }),
        nextStep(){
            if(this.isShowBlue){
                let params = {
                    Id:getSession("_info").Id,
                    Mobile:this.tel,
                    VerifyCode:this.code
                }
                this.VerifyMobile(params).then(() => {
                    if(this._VerifyMobile_){
                        this.$router.push("/userCenter/ChangeTelSecond");
                    }
                }).catch(err => {
                    // console.log(err)
                })
            }
        },
        getCode(){
            this.getCodee = false;
            let param = {
                mobile: this.tel
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
        BlurOrFocus(){
            var obj = document.getElementById('noScroll');
            var  docTouchend = function(event){
                if(event.target!=obj){
                    setTimeout(function(){
                        obj.blur();
                        document.removeEventListener('touchend',docTouchend,false);
                    },1000);

                }
                if(obj){
                    obj.addEventListener('touchstart',function(){
                        document.addEventListener('touchend',docTouchend,false);
                    },false);
                }
            }
        },
        aaaa(){
            // this.BlurOrFocus();
            // console.log("666",document.getElementById("ChangeTelFirst"),this.$refs.ChangeTelFirst)
            // // this.$refs.ChangeTelFirst.style.height = window.innerHeight+ "px";
            // this.$refs.ChangeTelFirst.style.overflow = "hidden";
            // console.log("888",this.$refs.ChangeTelFirst.style)
            // console.log("777",this.$refs.ChangeTelFirst.style.height);

            // document.body.addEventListener('touchstart', function (e) {
                // alert("当前页面无法滚动")
                // e.preventDefault();
                // e.stopPropagation();
                // e.nativeEvent.stopImmediatePropagation();
            // }, false);

            // var move=function(e){
            //     e.preventDefault && e.preventDefault();
            //     e.returnValue=false;
            //     e.stopPropagation && e.stopPropagation();
            //     return false;
            // }

            // window.onscroll = function (){
            //     var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
            //     var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
            //     var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
            //     if(a + b == c){
            //        alert('已滚动到底部!')
            //     }
            // }
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
            if(this.checkCode2()){
                this.isShowBlue = true;
            }else{
                this.isShowBlue = false;
            }
        }
    },
    beforeDestroy(){
        clearInterval(countDown);
    }
}
</script>
