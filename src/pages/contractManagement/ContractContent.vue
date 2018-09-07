<!-- 合同内容 -->
 
<template   >  
<div>
  
    <div id="contractContent">
        <HeaderCom  :titleScoped="'合同管理'" :rightGoTo="`/ContractStateManagement/OverviewContract?Id=${$route.query.Id}&From=${$route.query.From}`"   :rightScoped="'概览'"/> 
        <div class="contractImgWrap  fixedTop114T" >
             <img :src="item.ECImage" alt="" v-for="(item,index) in _GetContractInfoData.Imgs" :key="index"> 
             <!-- <img :src="item.ECImage" alt="" v-for="(item,index) in _GetContractInfoData.Imgs" :key="index+1">  -->
        </div>
    </div>
     
     <!-- 合同状态管理 -->
     <!-- 撤回 签署 催签 拒签 -->
    <div class="footerFix" v-if="this.$route.query.From == 'WaitForMe' && WaitForMePower">
      <!-- 签署人为合同发起人 撤回权限 -->
      <p class="fffStyle" @click="revocationFn">撤回</p>
      <p class="blueStyle" @click="signFn">签署</p>
    </div>
    <div class="footerFix" v-if="this.$route.query.From == 'WaitForMe' && !WaitForMePower">
      <!-- 签署人不为合同发起人 拒签权限 --> 
      <p class="fffStyle" @click="rejectDetail">拒签</p>
      <p class="blueStyle" @click="signFn">签署</p>
    </div>
    <div class="footerFix" v-else-if="this.$route.query.From  == 'WaitForThey' && WaitForMePower ">
      <!-- 签署人为合同发起人 撤回权限-->
      <!-- 签署人为合同发起人 催签别人权限 -->
      <p class="fffStyle" @click="revocationFn">撤回</p>
      <p class="blueStyle" @click="rushToSignFn">催签</p>
    </div>

     <div class="footerFix" v-else-if="this.$route.query.From  == 'WaitForThey' && !WaitForMePower">
      <!-- 签署人不为合同发起人 无撤回权限-->
      <!-- 签署人为合同发起人 催签别人权限 --> 
      <p class="blueStyle"  style="width:100%" @click="rushToSignFn">催签</p>
    </div>
    <div class="footerFix" v-else-if="this.$route.query.From  == 'CompleteContract'">
      <!-- 合同签署完成 -->
      <p class="fffStyle"  @click="shwoEmailDialogFn()">发送到邮箱</p>
      <p class="blueStyle" @click="printSign">打印合同</p>
    </div>
     <div class="footerFix" v-else-if="this.$route.query.From  == 'Sign'">
      <!-- 合同选择签章后 去法大大签署过程 --> 
      <p class="fffStyle">去法大大页面</p>
      <p class="blueStyle" @click="printSign">打印合同</p>
    </div>

    
    <!-- <div class="footerFix" v-else>
      <p class="fffStyle">已驳回_已撤回_草稿中合同详情</p>
      <p class="blueStyle" @click="signFn">签署</p>
    </div> -->
    


    <!-- 合同发送邮箱弹框 -->
    <div  id="emailDialogWrap"  v-show="shwoEmailDialog"  @click.stop="close()" >
      <div class="emailDialogFather"  @click.stop="close(true)">
            <div class="emailDialog">
              <p class="addressEmail">邮箱地址</p>
                <input type="text" id="emailInput"  v-model="emailData" placeholder='请输入邮箱' @blur="verifyEmail">
            </div>
            <div class="submitBtnWrap">
              <span class="left" @click.stop="close()">取消</span><span class="right" @click.stop="sendEmail">确定</span>
            </div>
      </div>
      
      <!-- 合同打印提示 -->
       <div v-transfer-dom>
          <confirm
            v-model="showPrintSign"
            :close-on-confirm="false"
            title="提示"
              confirm-text="知道了"
            @on-confirm="onConfirm4"
            :show-cancel-button='false'
            >
            <div class="titleWrap" style="text-align:center;">
                  <p class="title">请长按复制链接登录PC端进行打印 </p>
                  <a href="https://ec.wqbol.com/" style="color:#0e80fe;text-decoration:underline;">https://ec.wqbol.com/</a>
            </div>
          </confirm>
        </div>
    
    </div>

    <div>{{WaitForMePower}}</div>
    
     
 </div>


 
</template>

 
<script>
import { getStyle } from "@util/tool.js";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession, setSession, removeSession } from "@util/storage";
import tool from "@util/tool";
import { Confirm } from "vux";
export default {
  name: "ContractContent",
  components: { Confirm },
  data() {
    return {
      stateTabData: ["待我签", "待他签", "已完成", "全部"],
      currentTabIndex: "0",
      pulldowntext: true,
      getinvoiceList: {
        list: ["1", "2"],
        recordCount: 2
      },
      emailData: "", //邮箱地址
      show3: false,
      hasData: true,
      shwoEmailDialog: false, //邮箱地址弹框
      showPrintSign: false,
      emailRedirct: "" //邮箱发送成功后重新回去的地址
    };
  },
  computed: {
    ...mapGetters("contractStateManagement", [
      "_GetContractInfoData",
      "_ThirdPlatformContract"
    ]),
    ...mapState("signature", ["companyListData","SignatureList"]),
    // 判断签署人是否为合同发起人
    WaitForMePower() {
      let same =
        this._GetContractInfoData.CreateCustomerId == getSession("_info").Id
          ? true
          : false;
      return same;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.emailRedirct = from.fullPath;
    });
  },
  created() {
    //	 签署状态（0.草稿、1.待签署、2.已完成、3.已拒签、4.已撤销）

    this.init();
 
  },
  methods: {
    ...mapActions("contractStateManagement", [
      "GetContractInfo",
      "SendECToEmail",
      "SignContract"
    ]),
    ...mapActions("signature", ["GetCustomerSignatureListOther",'getCustomerSignatureList']),
    onConfirm4() {
      this.showPrintSign = false;
    },
    init() {
      // 获取合同详情 + 概览
      let params = {
        Id: this.$route.query.Id,
        CustomerId: getSession("_info").Id
      };
      this.GetContractInfo(params);
    },
    verifyEmail() {
      return tool.regularJudgement("email", this.emailData);
    },
    signFn() {
      //签署
      // 判断是否有可用签章 对应不同页面
      let params = {
        Id: getSession("_info").Id, //用户Id 	 string 	 不可
        Type: "", //签章类型(0=个人、1=公司) 	 int 	 可
        State: "1", // 审核状态（0.待审核 1.审核通过 2.驳回） 	 int 	 可
        Name: "", // 抬头名称（模糊匹配） 	 string 	 可
        containTyc: "1" //	 1 数据库 2天眼查 3 数据库+天眼查 	 int 	 可
      };

      this.getCustomerSignatureList(params).then(() => {
        // console.log(this.SignatureList.data.recordCount)
        document.body.style.overflow = "hidden";
        if (!this.SignatureList.data.recordCount) {
          var _this = this;
          this.$vux.confirm.show({
            title: "提示",
            content: "您还没可用的签章，请先创建签章",
            onShow() {
              document.body.style.overflow = "visible";
            },
            onHide() {
              document.body.style.overflow = "visible";
            },
            onCancel() {
              document.body.style.overflow = "visible";
            },
            onConfirm() {
              document.body.style.overflow = "visible";
              _this.$router.push({
                path: "/Signature/SignatureManagement/id",
                query: { From: "WaitForMe" }
              });
            }
          });
        } else {
          document.body.style.overflow = "visible";
          //进入签章选择页面
          this.$router.push({
            path: "/Signature/SignatureChoiced",
            query: { Id: this.$route.query.Id, From: "WaitForMe" }
          });
        }
      });
    },
    SignContractCommonFn(State, flag, goBack, SignId = "", isApp = false) {
      // 0.拒签 1.签署 2.撤回 3.催签 公用方法请误随意改动
      let params = {
        Id: this.$route.query.Id, //	 合同Id 	 string 	 不可
        CusId: getSession("_info").Id, //		 用户Id 	 string 	 不可
        State: State, //	 签署状态（0.拒签 1.签署 2.撤回 3.催签） 	 string 	 不可
        SignId: SignId, //		 签章Id 	 string 	 可
        Remark: "", //		 拒签理由 	 string 	 可
        isApp: isApp //是否App端请求（默认false PC端）
      };
      this.SignContract(params)
        .then(() => {
          if (flag) {
            this.$vux.toast.text(flag, "middle");
          }
          if (goBack) {
            this.$vux.toast.hide();
            this.$router.go(-1);
          }
        })
        .catch(error => {});
    },
    rushToSignFn() {
      //催签
      document.body.style.overflow = "hidden";
      var _this = this;

      this.$vux.confirm.show({
        title: "提示",
        content: "是否提醒对方签署？",
        hideOnBlur: true,
        onShow() {},
        onHide() {
          document.body.style.overflow = "visible";
        },
        onCancel() {
          document.body.style.overflow = "visible";
        },
        onConfirm() {
          document.body.style.overflow = "visible";
          _this.SignContractCommonFn("3", "催签成功");
        }
      });
    },
    revocationFn() {
      //撤回 2
      // document.body.style.overflow = "hidden";
      var _this = this;
      this.$vux.confirm.show({
        title: "提示",
        content: "是否撤回？撤回后合同将无法签署",
        hideOnBlur: true,
        onShow() {},
        onHide() {
          document.body.style.overflow = "visible";
        },
        onCancel() {
          document.body.style.overflow = "visible";
        },
        onConfirm() {
          document.body.style.overflow = "visible";
          _this.SignContractCommonFn("2", "撤回成功", "goBack");
        }
      });
    },
    printSign() {
      //打印合同
      this.showPrintSign = true;
    },
    rejectDetail() {
      //拒签
      //拒绝签订 跳转拒绝签订页面
      this.$router.replace({
        path: "/ContractStateManagement/RejectDetail",
        query: { Id: this.$route.query.Id, Name: this.$route.query.From }
      });
    },

    sendEmail() {
      if (this.verifyEmail()) {
        //邮箱验证通过
        this.shwoEmailDialog = true;
        let params = {
          Id: this.$route.query.Id, // 合同Id 	 string 	 不可
          CusId: getSession("_info").Id, //用户id
          Email: this.emailData //邮箱地址 	 string 	 不可
        };
        this.SendECToEmail(params).then(() => {
          document.body.style.overflow = "visible";
          //成功后跳转
          this.$router.replace(this.emailRedirct);
        });
      }
    },
    shwoEmailDialogFn() {
      this.shwoEmailDialog = true;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      document.body.style.overflow = "hidden";
      document.body.scrollTop = scrollTop;
    },
    close(value) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (value) {
        this.shwoEmailDialog = true;
        document.body.style.overflow = "hidden";
        document.body.scrollTop = scrollTop;
        return;
      }
      document.body.style.overflowY = "scroll";
      document.body.scrollTop = scrollTop;
      this.shwoEmailDialog = false;
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "visible";
  }
};
</script>

 

<style  lang="less" scoped>
#contractContent {
  height: 100%;
  background: #fff;
}
.footerFix {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
  font-size: 0.48rem;
  text-align: center;
  background: #fff;
  p {
    width: 50%;
    .fl;
  }
}
.fffStyle {
  border-top: 1px solid #ccc;
}
.blueStyle {
  border-top: 1px solid #0096ff;
  background: #0096ff;
  .c(#fff);
}

#emailDialogWrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.emailDialogFather {
  top: 50%;
  position: relative;
  transform: translateY(-50%);
}
.emailDialog {
  background: #fff;
  margin: 0 auto;
  width: 7.333333rem;
  height: 2.613333rem;
  font-size: 0.453333rem;
  text-align: center;
  border-radius: 10px 10px 0 0;
}
.addressEmail {
  padding: 0.333333rem 0;
}
#emailInput {
  display: block;
  margin: 0 auto;
  width: 5.866667rem;
  line-height: 0.666667rem;
  height: 0.666667rem;
  background: #f4f4f4;
  font-size: 0.373333rem;
  padding-left: 0.2rem;
  margin-bottom: 0.4rem;
}
.submitBtnWrap {
  border-radius: 0 0 10px 10px;
  background: #fff;
  margin: 0 auto;
  width: 7.333333rem;
  border-top: 1px solid #ccc;
  height: 1.106667rem;
  line-height: 1.106667rem;
  text-align: center;
  font-size: 0.453333rem;
  .c(#0e80fe);
  span {
    display: inline-block;
    width: 50%;
    border-right: 1px solid #ccc;
    &:nth-last-child(1) {
      border: 0;
    }
  }
}
.title {
  font-size: 0.373333rem;
  padding: 0.3rem 0 0.31rem 0;
}
.titleWrap {
  a {
    display: inline-block;
    font-size: 0.373333rem;
    padding-bottom: 0.1rem;
  }
}
</style>
