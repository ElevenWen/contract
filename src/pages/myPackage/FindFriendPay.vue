<template>
  <div>
	 <div id="findFriendPay">
        <headerCom :titleScoped="'发起代付请求'"></headerCom>
		<div class="mainWrap">
			<img  src="@/assets/images/daifu@3x.png" alt="">
			<p >
				通过微信、QQ、分享链接等方式请求好友代付，即可让您的好友为您买单！
			</p>
			<div class="headerTitleWrap">
				<p class="headerTitle">
					<span >应付：</span>
					<span class="themeC  nowPrice">{{_AmountData | formatPrice | currency}}<b style="font-weight: normal;font-size: 0.5405405405405406rem ;">{{_AmountData | formatPriceX}}</b></span>
				</p>
			</div>
			<main>
				<form action="" id="payForm">
					<div>捎句话呗：</div>
					<textarea name="" ref="textareaDom" @input.stop="textareaChange"  v-model="textareaData" maxlength="80" placeholder="亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报！"></textarea>
					<span class="fontLen">{{textareaLen}}/80</span>
				</form>
				
				<div class="submitPay" @click=" openActionsheet">请好友帮我付款</div>
			</main>
			


			<footer >
				说明：</br>
				1.付款前请和好友再次确认，避免遇到诈骗行为；</br>
				2.如果发生退款，已支付金额将原路退回付款人；</br>
			</footer>
		</div>
		

	 </div>


 
	<!-- <CodeDialog> -->
	 
	<!-- </CodeDialog> -->

	<!-- 底部自定义弹窗 -->
	 

		<!-- 微信右上角 -->
	<div id="img"   @touchmove.prevent  v-show="closeIsOpen"   @click="closeIsOpen = false"><img src="../../assets/images/corner@3x.png"/></div>
 
 </div>
</template>

<script>
import tool from "../../util/tool";
import { mapState, mapActions, mapGetters } from "vuex";

import Vue from "vue";

export default {
  data() {
    return {
      title: "交易详情",
      money: "",
      ab: require("@/assets/images/defeated@3x.png"),
      closeIsOpen: false,
      textareaData: "", //留言
      textareaLen: "25" //长度
    };
  },
  beforeRouteEnter: (to, from, next) => {
    
    if (to.path != location.pathname) { 
      location.replace(location.origin+to.fullPath); 
      return false;
    }
    next(vm => {
      //  '//host.wqbol.net/myPackage/FindFriendPay?orderNum=1533298780773824',
   
        // alert(`url=${location.href}`)
      

        // alert('fined')
        // alert(`${process.env.innerGobleNetPort}/myPackage/HelpFriendPay?orderNum=${to.query.orderNum}`)

      vm.weixin({
        houtaiData: `url=${location.href}`,
        title: "快来帮我付款",
        desc:
          vm.textareaData ||
          "亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报",
        link: `${process.env.innerGobleNetPort}/myPackage/HelpFriendPay?orderNum=${to.query.orderNum}`, 
        imgUrl: "https://host.wqbol.com/shareLogo.png"
      });
    });
  },
  created() {
    // 获取订单信息
    this.init();
  },
  computed: {
    ...mapGetters("myPackage", ["_AmountData"])
  },
  methods: {
    ...mapActions("myPackage", ["GetOrderInfoByOrderId"]),
    init() {
      let params = {
        orderNum: this.$route.query.orderNum
        // orderNum: "1531706788634251"
      };
      this.GetOrderInfoByOrderId(params).then(() => {});
    },
    openActionsheet() {
      
 
      //打开右上角分享 弹框 同时调用jssdk
      this.weixin({
        houtaiData: `url=${location.href}`,
        title: "快来帮我付款",
        desc:
          this.textareaData ||
          "亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报",
        link: `${process.env.innerGobleNetPort}/myPackage/helpFriendPay?orderNum=${this.$route.query.orderNum}`, 
        
        imgUrl: "https://host.wqbol.com/shareLogo.png"
      }); 
      this.closeIsOpen = true; 
    },

    textareaChange(value) {
      this.textareaLen = value.target.value.length;
    },

    qqBtn(val) {
      this.showCode = false;

      
    }
  },
  filters: {
    formatPrice(value) {
      return tool.formatPrice(value);
    },
    formatPriceX: value => {
      return tool.formatPriceX(value);
    },
    currency: value => {
      return tool.currency(value);
    },
    formatDate: value => {
      if (!value) return;
      //   value = parseInt(value.replace(/\D/g, ""));
      var _value = value.replace(/\D/g, "");
      return tool.formatDate(_value, "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
#findFriendPay {
  position: absolute;
  // height: 100%;
  top: 0;
  width: 100%;
  .mainWrap img {
    width: 100%;
    height: 4.1891891891891895rem;
  }
}
.mainWrap {
  // background: white;
  line-height: 0.4864864864864865rem;
  font-size: 0.346667rem;
  padding: 1.173333rem 0rem 0.35135135135135137rem 0rem;
  // padding-top: 1.173333rem !important;
  > p {
    background: #fff;
    // margin-top: 0.55rem;
    padding: 0.55rem 0.35135135135135137rem 0rem 0.35135135135135137rem;
    margin-top: -0.106667rem;
  }
}

.headerTitle {
  text-align: center;
  margin: 0 auto;
  background: #fff;
  padding-bottom: 0.266667rem;
  span:nth-child(1) {
    font-size: 0.3783783783783784rem;
  }
  span:nth-child(2) {
    color: #ff5000;
    font-size: 0.6216216216216216rem;
    color: #fa2802;
  }
}
main {
  margin-top: 0.32432432432432434rem;
}
#payForm {
  background: white;
  padding: 0 0.32432432432432434rem 0.2702702702702703rem 0.32432432432432434rem;
  color: #b2b2b2;
  div {
    color: black;
  }
  div {
    background: white;
    line-height: 0.8918918918918919rem;
  }
  textarea {
    font-size: 0.32rem;
    resize: none;
    height: 2.7027027027027026rem;
    width: 100%;
    padding: 0.24324324324324326rem 0.16216216216216217rem
      0.24324324324324326rem 0.16216216216216217rem;
    border: 1px solid #ebe5e1;
    .c(#999999);
  }
  .fontLen {
    float: right;
    margin-top: -0.65rem;
    position: relative;
    margin-right: 0.2702702702702703rem;
  }
}
.submitPayWrap {
  background: transparent;
}
.submitPay {
  height: 1.0810810810810811rem;
  line-height: 1.0810810810810811rem;
  color: white;
  text-align: center;
  font-size: 0.4594594594594595rem;
  margin: 0.8108108108108109rem 0.32432432432432434rem 0;
  background: linear-gradient(to bottom, #f95008, #fc7303 98%, #ffffff 100%);
}
footer {
  padding-left: 0.35135135135135137rem;
  margin-top: 0.6756756756756757rem;
  color: #666666;
  line-height: 0.6216216216216216rem;
}

input:focus,
textarea:focus {
  outline: none;
}

//提示微信右上角
#img {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.76;
  z-index: 99999;
}
#img img {
  position: absolute;
  right: 0.1333rem;
  width: 4.1066rem;
  height: 2.48rem;
  margin: 0.1066rem 0.9333rem 0 0;
}
</style>
