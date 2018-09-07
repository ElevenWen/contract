<template>
   <div>
        <div id="SignatureManagement"  class="SignatureChoiced"> 
        <headerCom :titleScoped="'选择签章'"  :rightScoped="'签章管理'" :rightGoTo="'/Signature/SignatureManagement/id'"/>
        <div class="Signature">
            
            <div class="container">
                <ul v-if="SignatureList.data != undefined && SignatureList.data.recordCount">
                    <li v-for="(item,index) in SignatureList.data.list" :key="index">
                        <div v-if="item.Type == 0">
                            <p class="personP">个人签章</p>
                            <h3>{{item.TrueName}}</h3>
                            <div class=" companyTag">
                                <span class="personTag">个人</span>
                                <p class="right" @click="checkSignatureFn(index,item)">
                                   <span class="commonStyle"  :class="{'highStyle':defaultIndex ==  index}"></span> 选择
                                </p>
                                <!-- <span v-if="item.ReviewState == 2" class="loseR" @click="openModel(item.ReviewFeedback)">失败原因<i><img src="../../assets/images/causeOfFailure@3x.png" alt=""></i></span> -->
                            </div>
                        </div>
                        <div v-if="item.Type == 1">
                            <p class="companyP">{{item.CompanyName}}</p>
                            <div class="imgBox">
                                <img src="../../assets/images/zhang@3x.png" alt="">
                            </div>
                            <div class="companyTag">
                                <span class="tag">企业</span>
                                 <p class="right" @click="checkSignatureFn(index,item)">
                                   <span class="commonStyle"  :class="{'highStyle':defaultIndex ==  index}"></span> 选择
                                </p>
                                <!-- <span v-if="item.ReviewState == 2" class="loseR" @click="openModel(item.ReviewFeedback)">失败原因<i><img src="../../assets/images/causeOfFailure@3x.png" alt=""></i></span>
                                <span class="modify" v-if="item.ReviewState == 2 || item.ReviewState == 1">修改</span> -->
                            </div>
                        </div>
                    </li>
                    
                </ul>
                <div v-else  class="height100">
                    <NothingData :dataSoped="dataSoped"></NothingData>
                </div>
            </div>
        </div>
        <div class="bnt" @click="next">
            <span>
                下一步
            </span>
        </div>
         
        
         
         
    </div>
   </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getSession } from "../../util/sessionStorage.js";
export default {
  data() {
    return {
      TabList: ["可用签章", "审核中", "已驳回"],
      defaultIndex: 0, //默认选中第一个
      defaultIndexSignatureId:'',//默认选中的id
      dataSoped: {
        //传去空白页的数据
        text: "",
        img: require("../../assets/images/commonImage/vacancy@3x.png")
      }
    };
  },
  computed: {
    ...mapState("signature", ["SignatureList"])
  },
  created() {
    this.init(1, 1);
  },
  methods: {
    ...mapActions("signature", {
      getCustomerSignatureList: "getCustomerSignatureList"
    }),
    //签章列表
    init(index, tag) { 
      let params = {
        Id: getSession("_info").Id,
        State: "1"
      };
      this.getCustomerSignatureList(params).then(res => { 
        this.defaultIndexSignatureId  = this.SignatureList.data.list[0].Id  
      });
    },
     
    next() {
      //添加签章 合同,簽章,來源
      this.$router.push({path:'/ContractStateManagement/ThirdPlatformContract',query:{Id:this.$route.query.Id ,SignId:this.defaultIndexSignatureId,From:this.$route.query.From}})
      
    },
    checkSignatureFn(index,{Id}) { 
      this.defaultIndex = index;
      //改变签章Id
      this.defaultIndexSignatureId = Id 
    }
  }
};
</script>

<style lang="less" scoped>
@import "./Signature.less";
</style>

