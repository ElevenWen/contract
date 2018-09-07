<template>
	<div>
    <div id="unionBind">
		<router-view  id="dddddddddddd">是不是进啦这里</router-view>
    <headerCom :titleScoped="'联合登录绑定'"/>
		<div class="content">
			<div class="des">关联后，您的微信账号和手机号账户都可以登录</div>
			<div class="fromWrap">
				<form>
					<div>
						<span class="text">手机号</span>
						<input type="number"  placeholder="输入手机号码" v-model="phone" @blur="verifyP"/>
					</div>
					<div class="verification">
						<span class="text">验证码</span>							
						<input type="text" maxlength="6" placeholder="输入验证码" v-model="noteCode" @blur="verifyM"/>
						<span class="getVerification" @click.stop.prevent="getVerification" v-if="isGet" >获取验证码</span>
						<span class="getVerification" style="color:#999999" v-if="!isGet">重新获取{{time}}s</span>
					</div>																					
				</form>
			</div>
			<div class="registDes">
				若你输入的手机号未注册，将为您直接注册，注册即视为同意
				<span @click="goAgreement">《微企宝用户注册协议》</span>
			</div>
		</div>
		<div class="bindBtn" :class="{active: phone && noteCode }" @click="bind">绑定</div>
	</div>
  </div>
</template>

<script>
import tool from "../../util/tool.js";
import api from "../../vuex/ajaxAPI/getData";
import {mapState ,mapActions} from 'vuex'
import { getSession , setSession } from "@util/sessionStorage";
export default {
  data() {
    return {
      phone: "", //手机号
      noteCode: "", //验证码
      password: "", //密码
      isGet: true, //是否获取验证码
      isPhone: false, //判断手机号是否填写整缺
      isCode: false, //判断验证码是否填写整缺
      time: 45,
      nowCoutTime: 0,  //计时 
      APPID: 'wx238223a471f69798',  //正式环境公众号 appid
      code: "", //微信code
      openId: "",
      UnionId: '',
      state: "" //推荐码
    };
  },
  computed:{
    ...mapState(
      'unionBind',{
        'getCode':'code',
        'info': 'info'
      }
    )
  },
  created(){ 
  },
  methods: {
    ...mapActions(
      'unionBind',{
        'getCodee':'getCodee',
        'BindMerchant':'BindMerchant'
      }
    ),
    //注册协议
    goAgreement() {
    
      this.$router.push("/unionBind/agreement");
    },
    //验证手机号
    verifyP() {
      if(!this.phone){
        return
      }
      var status = tool.regularJudgement("phone", this.phone);
      if (status) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    },
    //判断验证码
    verifyM() {
      if(!this.noteCode){
        return
      }
      var status = tool.regularJudgement("noteCode", this.noteCode);
      if (status) {
        this.isCode = true;
      } else {
        this.isCode = false;
      }
    },
    //获取验证码
    getVerification() {
      var timer = null;
      if (this.isPhone) {
        this.isGet = false;
        var params = {
          mobile: this.phone
        };
        this.getCodee(params).then(res=>{
          if(this.getCode.success){
            this.$vux.toast.text(this.getCode.msg,'middle')
          }
        },err=>{
          this.$vux.toast.text(err.msg,'middle')
        })
        //倒计时45s
        timer = setInterval(() => {
          if (this.time == 1) {
            this.time = 45;
            clearInterval(timer);
            this.isGet = true;
          } else {
            this.time--;
          }
        }, 1000);
      } else {
        return;
      }
    },
    bind(){
      if(this.isCode&&this.isPhone){
        let params = {
          WxId: getSession("_WxId"),
          Mobile: this.phone,
          VerifyCode: this.noteCode
        }
        this.BindMerchant(params).then(res=>{
          if(this.info.success){
            setSession('_info',this.info.data)
            this.$router.push('/Home')
          }
        })
      }
    }
  },
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@rem: 75rem;

#unionBind {
  width: 100%;
  min-height: 100%;
  padding-top: 1.19rem;
  background: #fff;
  .content {
    width: 100%;
    .des {
      padding: 0 25 / @rem;
      width: 100%;
      height: 90 / @rem;
      line-height: 90 / @rem;
      background-color: #f6f6f6;
      font-family: PingFang-SC-Medium;
      font-size: 28 / @rem;
      color: #999999;
    }
    .fromWrap {
      padding: 0 25 / @rem;
      width: 100%;
      form {
        div {
          width: 100%;
          height: 100 / @rem;
          position: relative;
          input {
            padding-left: 150 / @rem;
            padding-right: 160 / @rem;
            border: none;
            border-bottom: 1px solid #ebe5e1;
            height: 100 / @rem;
            width: 100%;
            outline: none;
            font-size: 0.373333rem;
            /*解决ios input默认阴影*/
            -webkit-appearance: none;
          }
          .text {
            position: absolute;
            top: 32%;
            left: 0;
            font-size: 32 / @rem;
            color: #1f1f1f;
          }
        }
        .verification {
          .getVerification {
            position: absolute;
            right: 0;
            top: 40%;
            color: #30a1f8;
            font-size: 26 / @rem;
          }
        }
      }
    }
    .registDes {
      padding: 30 / @rem 25 / @rem;
      font-family: PingFang-SC-Medium;
      font-size: 28 / @rem;
      line-height: 40 / @rem;
      color: #666666;
      span {
        color: #30a1f8;
      }
    }
  }
  .bindBtn {
    margin: 0 auto;
    margin-top: 80 / @rem;
    width: 670 / @rem;
    height: 80 / @rem;
    line-height: 80 / @rem;
    text-align: center;
    background-color: #B2B2B2;
    background-blend-mode: normal, normal;
    border-radius: 2px;
    font-size: 34 / @rem;
    color: #ffffff;
  }
  .active{
    background-image: linear-gradient(-90deg, #f95008 0%, #fc7303 100%),
      linear-gradient(#d5d5d5, #d5d5d5);
  }
}
</style>