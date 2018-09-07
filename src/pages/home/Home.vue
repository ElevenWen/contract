<!-- 已经全局引入不用每个页面单独引入 -->
<template>
  <div id="home">
    <router-view  id="dddddddddddd">子路由页面</router-view>
    <!-- 头部图片 -->
    <div class="headerImg">
      <img src="../../assets/images/banner@2x.png" alt="">
    </div>
    <!-- 合同状态 -->
    <div class="statusWrap">
      <div class="waitMe" @click="waitMe">
        <div class="waitMeNum">{{meSign.toString()?meSign.toString():'-'}}</div>
        <div class="waitWord">待我签</div>
      </div>
      <div class="waitHe" @click="waitHe">
        <div class="waitHeNum">{{heSign.toString()?heSign.toString():'-'}}</div>
        <div class="waitWord">待他签</div>
      </div>
      <div class="completed" @click="completed">
        <div class="completedNum">{{isSigned.toString()?isSigned.toString():'-'}}</div>
        <div class="waitWord">已完成</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="listWrap">
      <div class="list" @click="toSign">
        <div @click="goS">
          <img src="../../assets/images/stamp@3x.png" alt="">
          <div class="listRight">
            <div>创建签章</div>
            <div>创建属于个人/企业的签章</div>
            <div class="rightArrow"></div>
          </div>
        </div>
      </div>
      <div class="list" @click="toMyPackage">
        <img src="../../assets/images/package@2x.png" alt="">
          <div class="listRight">
            <div>我的套餐</div>
            <div>更多免费/付费合同模板等你使用</div>
            <div class="rightArrow"></div>
          </div>
      </div>
      <div class="list" @click="toContract">
        <img src="../../assets/images/understand@2x.png" alt="">
          <div class="listRight">
            <div>了解电子合同</div>
            <div>电子合同传输方便、节约、储存方便</div>
            <div class="rightArrow"></div>
          </div>
      </div>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>



<script>
import { mapActions, mapGetters,mapState } from "vuex";
import { getSession,setSession } from "@util/storage";
import Vue from  "vue";
import getData from "@vuex/ajaxAPI/getData";
export default {
  name: "Home",
  data() {
    return {

    };
  },
  computed: {
    ...mapState("personalCenter", ["meSign","heSign","isSigned"])
  },
  created() { 
    let params = {
       Id:getSession("_info").Id,
    }
    this.GetContractNumber(params);
  },
  methods: {
    ...mapActions("personalCenter", {
        GetContractNumber:"GetContractNumber",
    }),
    toMyPackage(){
      this.$router.push({path:"/myPackage/MyPackage",query:{value:"home"}});
    },
    toSign(){
      this.$router.push("/Signature/SignatureManagement/id");
    },
    toContract(){
        this.$router.push('/userCenter/KnowContract');
    },
    waitMe(){
        this.$router.push({path:"/ContractStateManagement",query:{Name:"WaitForMe"}});
    },
    waitHe(){
        this.$router.push({path:"/ContractStateManagement",query:{Name:"WaitForThey"}});
    },
    completed(){
        this.$router.push({path:"/ContractStateManagement",query:{Name:"CompleteContract"}});
    },
    goS(){
      this.$router.push('/Signature/SignatureManagement/id')
    }
  },
};
</script>







<style  lang="less" scoped>
@import "./Home.less";
</style>
