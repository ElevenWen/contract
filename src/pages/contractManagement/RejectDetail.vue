<!--  tab  选项卡: 已完成-->
<template   >  
<div>
    <div id="WaitForMe"> 
        <HeaderCom  :titleScoped="'拒签原因'"     /> 
        
        <div  class="outWrapper"  >
            <textarea name="" minlength="3" v-model="rejectMessage" maxlength="100" id="rejectMessage" cols="30" rows="10"   placeholder="请说明拒绝签署原因，便于对方与你沟通！（100
字以内）"   ></textarea>   
                
            <div class="blueStyle" @click="submitReject">提交</div>
        </div>
              
    
    </div>

 </div>


 
</template>


<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { getSession } from "@util/storage";
export default {
  name: "RejectDetail",
  components: {},
  data() {
    return {
      rejectMessage: ""
    };
  },
  computed: {
    //  _AllContractData 数据来源
    ...mapGetters("contractStateManagement", ["_CompleteContractData"])
  },
  created() {},
  methods: {
    ...mapActions("contractStateManagement", ["SignContract"]),
    submitReject() {
      var that = this; 
      if (this.rejectMessage.length < 3 || this.rejectMessage.length > 100) {
        this.$vux.toast.text("至少3个字符,最大不能超过100个字符", "middle");
        return false;
      }
      let params = {
        Id: this.$route.query.Id, // 合同Id 	 string 	 不可
        CusId: getSession("_info").Id, // 用户Id 	 string 	 不可
        State: "0", //	 签署状态（0.拒签 1.签署 2.撤回 3.催签） 	 string 	 不可
        SignId: "", //	 签章Id 	 string 	 可
        Remark: this.rejectMessage //,//	 拒签理由 	 string 	 可
      };

      this.SignContract(params).then(() => { 
        this.$vux.toast.show({
          type: "text",
          text: "2s后自动返回合同管理页面",
          onShow() {},
          width: "auto",
          time: 2000,
          onHide() {
           
            that.$router.replace({ path: "/ContractStateManagement" ,query:{Name:that.$route.query.Name}});
            
          }
        });
      }).catch((error)=>{
        this.$vux.toast.text(error, "middle"); 
      });
    }
  }
};
</script>







<style  lang="less" scoped>
#rejectMessage {
  width: 100%;
  height: 5.333333rem;
  border: 0;
  font-size: 0.4rem;
  padding: 0.4rem;
  outline: none;
  resize: none;
}

textarea::-webkit-input-placeholder {
  color: #b2b2b2;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #b2b2b2;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #b2b2b2;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #b2b2b2;
}
.blueStyle {
  background: #0096ff;
  margin: 0 auto;
  width: 9.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  color: #fff;
  font-size: 0.48rem;
  margin-top: 1.066667rem;
}
</style>
