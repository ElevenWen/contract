<template>

<div>
    <HeaderCom  :titleScoped="'签署合同'"   :rightGoTo="`/ContractStateManagement/OverviewContract?Id=${$route.query.Id}`"   :rightScoped="'概览'"/>  
    <iframe class="fixedTop114T"    id="iframeWrap" :src="iframeSrc" frameborder="0"></iframe>
</div>
    
</template>


<script>
import { getSession } from "@util/storage";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      iframeSrc:''
    };
  },
  computed: { 
    ...mapGetters("contractStateManagement", [ "_ThirdPlatformContract"  ]) 
  },
  created() {
    let params = {
      Id: this.$route.query.Id, //	 合同Id 	 string 	 不可
      CusId: getSession("_info").Id, //		 用户Id 	 string 	 不可
      State: "1", //	 签署状态（0.拒签 1.签署 2.撤回 3.催签） 	 string 	 不可
      SignId: this.$route.query.SignId, //		 签章Id 	 string 	 可
      Remark: "", //		 拒签理由 	 string 	 可
      isApp: true //是否App端请求（默认false PC端）
    };
    this.SignContract(params)
      .then(() => {
        this.iframeSrc = this._ThirdPlatformContract;
      })
      .catch(error => {
        // console.log(flag, error);
      }); 
  },
  methods:{
    ...mapActions("contractStateManagement", ["SignContract"]),  
  }
};
</script>


<style  lang="less" scoped>
#iframeWrap {
  width: 100%;
}
</style>