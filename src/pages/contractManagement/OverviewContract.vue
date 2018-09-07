<!-- 合同概览 --> 
<template   >  
<div>
    <div id="OverviewContract"> 
        <HeaderCom  :titleScoped="'合同概览'"  />
         
             <ul class="overviewDetailWrap   fixedTop114T"    >
                  <li class="overviewDetail">
                     <span class="left">合同名称</span>
                     <span class="right">{{_GetContractInfoData.Name}}</span> 
                  </li>
                  <li class="overviewDetail">
                     <span class="left">合同状态</span>
                     <span class="right themeRed">{{_GetContractInfoData.changeSignedState}}</span>  
                     
                  </li >
                  <!-- 0 草稿不显示 --> 
                  <li class="resetStyle" v-if=" _GetContractInfoData.SignedState  != '0'">
                     <span class="left">发 起 人</span>
                     <div class="right">
                        <p class="name" v-if="_GetContractInfoData.CreateCustomerName">{{_GetContractInfoData.CreateCustomerName }}</p>
                        <p class="name"  v-else>匿名</p>
                        <p class="detailInfo">
                            <span class="tel" >手机:{{_GetContractInfoData.CreateCustomerMobile | telSecret}}</span>
                            <span class="dataTime">日期:{{_GetContractInfoData.CreateTime  | formatDateFn}}</span> 
                        </p>  
                    </div> 
                  </li>
                  <!-- 0 草稿不显示 -->
                  <li class="resetStyle"  v-if=" _GetContractInfoData.SignedState  != '0'">
                       <div class="clearFloat">
                           <span class="left">签 署 人</span>
                            <div class="right">
                                <p class="nameWrap">
                                    <span class="name">{{_GetContractInfoData.SignCusName1 }}</span>
                                    <span class="flag themeRed">{{Boolean(_GetContractInfoData.SignedState1)?'已签署':'未签署'}}</span>
                                </p>
                                <p class="detailInfo">
                                    <span class="tel" >手机:{{_GetContractInfoData.SignCusMobile1 | telSecret }}</span>
                                    <span class="dataTime">日期:{{_GetContractInfoData.SignedTime1  | formatDateFn}}</span> 
                                </p>     
                            </div> 
                       </div>
                     
                        <div class="clearFloat">
                           <span class="left displayNone">签 署 人</span>
                            <div class="right">
                                <p class="nameWrap">
                                    <span class="name">{{_GetContractInfoData.SignCusName2 }}</span>
                                    <span class="flag themeRed">{{Boolean(_GetContractInfoData.SignedState2)?'已签署':'未签署'}}</span>
                                </p>
                                <p class="detailInfo">
                                    <span class="tel" >手机:{{_GetContractInfoData.SignCusMobile2 | telSecret}}</span>
                                    <span class="dataTime">日期:{{_GetContractInfoData.SignedTime2 | formatDateFn}}</span> 
                                </p>     
                            </div> 
                       </div>
                 </li>
             </ul>
        
        <footer v-if="_GetContractInfoData.changeSignedState == '待我签'" @click="WaitForMe">签署</footer>
              
    
    </div>

 </div>


 
</template>


<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession } from "@util/storage";
import tool from "@util/tool";

export default {
  name: "OverviewContract",
  components: {},
  data() {
    return {
      stateTabData: ["待我签", "待他签", "已完成", "全部"],
      currentTabIndex: "0",
      pulldowntext: true,
      getinvoiceList: {
        list: ["1", "2"],
        recordCount: 2
      },
      hasData: true
    };
  },
  computed: {
    ...mapGetters("contractStateManagement", ["_GetContractInfoData"]),
    ...mapState("signature", ["companyListData"])
  },
  created() {
    //防止本页分享出去无数据 固重新调用接口
    this.init();
  },
  methods: {
    ...mapActions("signature", ["GetCustomerSignatureListOther"]),
    ...mapActions("contractStateManagement", ["GetContractInfo"]),
    init() {
      // 获取合同详情 + 概览
      let params = {
        Id: this.$route.query.Id,
        CustomerId: getSession("_info").Id
      };
      this.GetContractInfo(params).then(() => { 
      });
    },
    WaitForMe() {
      let params = {
        Id: getSession("_info").Id, //用户Id 	 string 	 不可
        Type: "", //签章类型(0=个人、1=公司) 	 int 	 可
        State: "1", // 审核状态（0.待审核 1.审核通过 2.驳回） 	 int 	 可
        Name: "", // 抬头名称（模糊匹配） 	 string 	 可
        containTyc: "1" //	 1 数据库 2天眼查 3 数据库+天眼查 	 int 	 可
      };

      this.GetCustomerSignatureListOther(params).then(() => { 
        document.body.style.overflow = "hidden";
        if (!this.companyListData.recordCount) {
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
          //进入签章选择页面
          document.body.style.overflow = "visible";
          this.$router.push({
            path: "/Signature/SignatureChoiced",
            query: { Id: this.$route.query.Id, From: "WaitForMe" }
          });
        }
      }); 
    }
  },
  filters: {
    formatDateFn(value) {
      return tool.formatDate(value, "yyyy-MM-dd");
    },
    telSecret(value) {
      if (value) {
        var reg = /^(\d{3})\d*(\d{4})$/;
        var _value = value.replace(reg, "$1****$2");
        return _value;
      }
      return value;
    }
  }
};
</script>

 

<style  lang="less" scoped>
// themeRed 是在mixin.less定义的样式
#OverviewContract {
  background: #fff;
  font-size: 0.373333rem;
  height: 100%;
}
.overviewDetailWrap {
  .overviewDetail {
    margin-left: 0.306667rem;
    height: 1.333333rem;
    line-height: 1.333333rem;
    border-bottom: 1px solid #f2f2f2;
  }
  .left {
    .fl;
    width: 20%;
    text-align: center;
  }
  .right {
    width: 80%;
    padding-left: 0.226667rem;
    overflow: hidden;
    padding-right: 0.36rem;
    .fl(left);
    .detailInfo {
      margin-top: 0.36rem;
      margin-bottom: 0.453333rem;
      .c(#888888);
      .dataTime {
        .fl(right);
      }
    }
    .flag {
      .fl(right);
    }
  }
  .resetStyle {
    margin-left: 0.306667rem;
    overflow: hidden;
    border-bottom: 1px solid #f2f2f2;
    .left,
    .right {
      padding-top: 0.493333rem;
    }
    &:last-child {
      .right {
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
  .clearFloat {
    overflow: hidden;
  }
  .displayNone {
    visibility: hidden;
  }
}
footer {
  width: 100%;
  height: 1.333333rem;
  line-height: 1.333333rem;
  background: #0096ff;
  .c(#fff);
  text-align: center;
  position: absolute;
  bottom: 0;
  font-size: 0.48rem;
}
</style>
