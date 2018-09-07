<template>
  <div id="footerNav"  > 
    <ul class="fixBottom"   @touchmove.stop.prevent="footerNavFn"> 
        <router-link :to="{path:'/'}" tag="li"  exact class="home"><p>首页</p></router-link>
        <router-link :to="{path:`/ContractStateManagement?Name=WaitForMe`}" tag="li"   class="serve"><p>合同管理</p></router-link>
        <router-link :to="{path:'/userCenter/UserCenter'}" tag="li"    class="cart"><p>用户中心</p></router-link>
    </ul>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  methods:{
    footerNavFn(){
      // console.log(1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="less"  scoped> 
// @import "../common/index.less";
  #footerNav {
    position: fixed;
    bottom: 0px;
    z-index: 9999;
    width: 100%;
  }

  #footerNav > .fixBottom {
    position: relative;
    z-index: 9822;
    width: 100%;
    display: flex;
    flex-wrap: no-wrap;
    background: #fff;
    // .border-1pxT(#ebe5e1);
    border-top: 1px solid #ebe5e1;
  }
  .fixBottom > li {
    background-size: .586667rem .586667rem;
    background-repeat: no-repeat;
    background-position: center 0.1891891891891892rem;
    display: inline-flex;
    flex: 1 0 20%;
    height: 1.3243243243243243rem; 
    &.home {
      .bg-image("../assets/images/commonImage/Home");
    }
    &.serve {
      .bg-image("../assets/images/commonImage/management");
    }
    &.cart {
      .bg-image("../assets/images/commonImage/user");
    }
    &.router-link-active {
      &.home {
        .bg-image("../assets/images/commonImage/Home2");
        color: rgb(0,150,255);
      }
      &.serve {
        .bg-image("../assets/images/commonImage/management2");
        color: rgb(0,150,255);
      }
      &.cart {
        .bg-image("../assets/images/commonImage/user2");
        color: rgb(0,150,255);
      }
    }
    > p {
          text-align: center;
          width: 100%;
          padding-top: 0.8648648648648649rem;
          font-size: 0.32432432432432434rem;
      }
  }
  .fixBottom > li:nth-child(1){
      background-size: .613333rem .533333rem;
  }
  li.cart {
    position: relative;
  }
  .spotIcon {
    position: absolute;
    top: 0.13513513513513514rem;
    left: 1.4864864864864864rem;
    text-align: center;
    color: #ff2a00;
    border-radius: 0.35135135135135137rem;
    border: 1px solid #ff2a00;
    padding: 0 0.05405405405405406rem;
    height: 0.34rem;
    line-height:0.32rem;
    background: #fff; 
  }
</style>
