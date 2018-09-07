<template>
  <div id="headerWrap"  @touchmove.stop.prevent> 
     <div class="header">
       <span class="left" @click.stop.prevent="returnFn"></span>
       <span class="center">{{titleScoped}}</span> 
       <span class="right"  @click.stop.prevent="overviewFn">{{rightScoped}}</span>
     </div>
     

      <slot name="ContractStateManagement"> 
      </slot>
     
      <slot  name="SignatureManagement"> 
      </slot>
     
  </div>
</template>

<script>
import { getStyle } from "@util/tool.js";
// import { Toast } from 'vux'
import { mapActions, mapGetters } from "vuex";
import { setSession , getSession } from '@util/sessionStorage';
export default {
  name: "HeaderCom",
  inheritAttrs: false,
  props: {
    titleScoped: {
      type: String,
      default: "合同管理"
    },
    rightScoped: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("billingProcessing", ["getinvoiceList"])
  },
  created() {
    function getHeight(dom, property) {
      //兼容ie
      if (window.currentStyle) {
        return dom.currentStyle[property].replace(/[a-z]/gi, "");
      } else {
        //chrome
        return window
          .getComputedStyle(dom, null)
          [property].replace(/[a-z]/gi, "");
      }
    }

    this.$nextTick(() => { 
        // 动态获取头部的高度
        var dynamicHeight = getStyle(
          document.getElementById("headerWrap"),
          "height"
        ); 
        document.getElementById(
          "headerWrap"
        ).nextElementSibling.style = `padding-top:${dynamicHeight}px;height:100%;`; 
    });
  },
  
  methods: {
    returnFn() { 
      //  alert('returnFn') 
      if (this.$attrs.from) {
        // alert('from--from')
        // alert(this.$attrs.from)

        this.$router.replace(this.$attrs.from);
        return;
      } else if (this.$route.name == "AccountSet") {
        this.$router.push("/userCenter/UserCenter");
        return;
      }else if(this.$route.name == "PersonalVertify" && this.$route.query.name == "account"){
          this.$router.push('/userCenter/AccountSet')
      }else if (this.$attrs.from) {
        this.$router.push(this.$attrs.from);
        return;
      }else if(this.titleScoped == '身份证信息'){
        //  console.log('dddddd')
        if(!getSession('_modify1')){
          console.log('sssss')
          this.$router.push('/Signature/PersonalVertify')
        }else{
          this.$router.go(-1)
        }
      }else if(this.titleScoped == '身份证识别'){
        if(getSession('_tag')&&getSession('again')){
          this.$router.push('/Signature/SignatureManagement/tag')
          setSession('again','')
        }else if(getSession('tt')){
          this.$router.push('/Signature/SignatureManagement/tt')
        }else{
          this.$router.push('/Signature/SignatureManagement/id')
        }
      }else if(this.titleScoped == '企业实名认证'){
        if(getSession('_tag')&&getSession('again')){
          this.$router.push('/Signature/SignatureManagement/tag')
          setSession('again','')
        }else if(getSession('tt')){
          this.$router.push('/Signature/SignatureManagement/tt')
        }else{
          this.$router.push('/Signature/SignatureManagement/id')
        }
      }
      else if(this.$route.name == 'OverviewContract'){ 
        this.$router.replace({path:'/ContractStateManagement/ContractContent',query:{Id:this.$route.query.Id,From:this.$route.query.From}});
        return;
      }else if(this.titleScoped == '签章管理'){
        if(getSession('UserCenter')){
          this.$router.push('/userCenter/UserCenter')
          setSession('UserCenter','')
        }else{
          this.$router.push('/')
        }
      }else if(this.$route.name == "MyPackage" && this.$route.query.name == "user"){
        this.$router.push('/userCenter/UserCenter')
      }else if(this.$route.name == "MyPackage" && this.$route.query.value == "home"){
        this.$router.push('/')
      }
      else{  
        // alert('go(-1)')
        this.$router.go(-1);
      }
    
      
    },
    overviewFn() { 
      //合同内容概览 跳转
      this.$router.replace({ path: this.$attrs.rightGoTo });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="less"  scoped>
@import "../common/index.less";

#headerWrap {
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 888;
  .header {
    height: 1.173333rem;
    line-height: 1.173333rem;
    font-size: 0.453333rem;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0px 1px 2px #f2f2f2;
    position: relative;
  }
  .left {
    .fl;
    .bg-image("../assets/images/return");
    width: 1rem;
    height: 100%;
    background-size: 0.28rem 0.493333rem;
    background-position: 0.346667rem center;
    z-index: 199;
  }
  .right {
    height: 100%;
    .fl(right);
    padding-right: 0.4rem;
    font-size: 0.4rem;
    background-size: 0.533333rem 0.386667rem;
    background-position: left center;
  }
  .center {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
  }
}
</style>
