
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div> 
      <!-- <div id="Bar"> 
            二维码弹框   
            <div v-transfer-dom>
            <x-dialog v-model="showHideOnBlur"   :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <div id="comone">
                     <img src="../../../static/img/gongzhonghaoLogo.jpg"  /> 
                </div>
            </x-dialog>
            </div> 
            <iframe src="" ref="getCode" frameborder="0" style="visibility:hidden"></iframe>
      </div> -->

 
      <form style="visibility:hidden"  id="myForm1" enctype='multipart/form-data' action="https://open.weixin.qq.com/connect/oauth2/authorize"      method="get"  >
          <!-- 测试APPId wxce4d12348f8df94d -->
          <!-- <input name="appid" value="wxce4d12348f8df94d"/> 
          <input name="redirect_uri" value="http://api.wqbol.net/Wx/invback"  />  -->
         
          <!-- 正式APPId  wx238223a471f69798 -->
          <input name="appid" value="wx238223a471f69798"/>  
          <input name="redirect_uri" value="http://api.wqbol.com/Wx/invback"  />

          

          <input name="response_type" value="code"/>
          <input name="scope" value="snsapi_base"/>
           <input name="state"  :value="state"/>   
      </form>
   
   </div>
</template>



 
<script>
import { mapState, mapActions, mapGetters } from "vuex";

import { setSession, getSession } from "@util/sessionStorage";

import getD from "@vuex/ajaxAPI/getData.js";

export default {
  data() {
    return {
      showHideOnBlur: false,
      iframeSrc:'',
      iframeCode:'',
      iframeBeforeRedirect:'',
      iframeRedirect:'',
      //----------------------
      state: "",
    };
  },
  computed: {
    ...mapState({
      code: "code",
      weixinAuthData: "weixinAuthData",
      WxData: "WxData",
      WxIdData: "WxIdData"
    }),
    ...mapGetters("home", ["_info"])
  },

  components: {},
  mounted() {
      //若本地有数据 则表示已经授权成功了 ,无需再次授权
    if (getSession("_id")) {
      return false;
    }

    //  https://host.wqbol.net/IsWeixinAuth/IsWeixinAuth?redirect=home&beforeRedirect=%2Fhome&code=0
    //进入授权页面 
    // console.log('什么鬼',this.$refs)
    // console.log('什么鬼',this.$refs.getCode)
    // console.log('什么鬼222',this.$refs.getCode.src)
    // this.$refs.getCode.onload = function(){
    //   this.iframeSrc = this.$refs.getCode.src
    //   this.iframeCode = this.getQueryString(this.$refs.getCode.src,code)
    //   this.iframeBeforeRedirect = this.getQueryString(this.$refs.getCode.src,beforeRedirect)
    //   this.iframeRedirect = this.getQueryString(this.$refs.getCode.src,redirect)
    // }
    if (this.$route.query.code != "0") {
      setSession("_code", this.$route.query.code);
      let _params = {
        params: {
          code: this.$route.query.code
          // state: this.$route.query.state
        }
      };
      //获取用户openid
      this.weixinAuthOpenid(_params)
        .then(() => {
          let _params = {
            params: {
              openid: this.weixinAuthData.openid
            }
          };
          this.weixinIsFocus(_params).then(() => {
            let success = this.weixinAuthData.isFocus;
            if (success) {
              this.showHideOnBlur = false;
              //-------------微信新用户推荐信息记录--------------
              let Data = {
                openid: this.weixinAuthData.openid
              };
              this.BindCusAndRefCode(Data).then(res => {
                if (this.WxIdData.success) {
                  //把WxId存入本地
                  setSession("_WxId", this.WxIdData.data.WxId);
                  //------------是否是微企宝用户---------------
                  let isParams = {
                    unionid: this.weixinAuthData.unionid
                  };
                  this.GetUserInfo(isParams).then(
                    res => {
                      if (this.WxData.success) {
                        //存用户ID
                        setSession("_info", this.WxData.data);
                        //success = true 表示已经关注,停留当前页面
                        //已关注并已绑定微企宝-存本地
                        let paramsDate = {
                          params: {
                            openid: this.weixinAuthData.openid,
                            RefCode: ""
                          }
                        };
                        this.weixinBindCusAndRefCode(paramsDate).then(() => {
                          //数据同步后台后 存入session
                          setSession("_id", this.weixinAuthData.unionid);
                          let replacePath = this.$route.query.beforeRedirect;
                          if (replacePath == "") {
                            replacePath = "/";
                          }
                          this.$router.replace({ path: replacePath });
                        });
                      }
                    },
                    err => {
                      setSession("_id", this.weixinAuthData.unionid);
                      this.$router.push({
                        path: "/unionBind/UnionBind",
                        query: { tag: "bind" }
                      });
                      return;
                    }
                  );
                }
              });
            } else {
              //未关注 则弹出二维码关注
              // gongzhonghaoLogo
              // console.log("没有关注");
              this.$router.push('/codeFocus');
              this.showHideOnBlur = true;
              document.body.style.overflow = "hidden";
            }
          });
        })
        .catch(error => {
          this.showHideOnBlur = true;
          this.$router.push('/codeFocus');
          document.body.style.overflow = "hidden";
          // console.log(error, "isWeixinAuth.vue页面授权报错了");
        });
    } else {
      //用户扫码后进入页面 1 => 获取code 2=> 在获取用户openid   3=>判断用户是否关注
      let  state = this.$route.query.redirect;
      this.state = `${state}`;
      this.$nextTick(() => {  
          document.getElementById("myForm1").submit();
      })
    }
  },

  methods: {
    ...mapActions({
      weixinAuthOpenid: "weixinAuthOpenid",
      weixinIsFocus: "weixinIsFocus",
      weixinBindCusAndRefCode: "weixinBindCusAndRefCode",
      GetUserInfo: "GetUserInfo",
      BindCusAndRefCode: "BindCusAndRefCode"
    }),

    onHide(onHide) {
      // console.log("点击我隐藏");
    },
     getQueryString(result, name) {
     var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i"); 
				var r = result.substr(result.indexOf("?")  ).match(reg);  
				if(r != null) {
					return unescape(r[2]);
				} 
				return false;
    },
  },
  beforeDestroy() {
    document.body.style.overflow = "visible";
  }
};
</script>

 


<style lang="less" type="stylesheet/css" scoped>
#Bar /deep/ .weui-dialog {
  position: fixed;
  display: table;
  z-index: 5000;
  width: auto;
  height: auto;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0%;
  background-color: #ffffff;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  margin: -25% 0 0 0;
}
#comone {
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 10%;
  img {
    margin: 0 auto;
    width: 6.666667rem;
    height: 6.666667rem;
  }
}
</style>
