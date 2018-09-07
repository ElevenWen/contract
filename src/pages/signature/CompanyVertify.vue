<template>
    <div>
      
        <div id="CompanyVertify" @click="closeFixDialog">
            <router-view  id="dddddddddddd"></router-view>
            <headerCom :titleScoped="'企业实名认证'"/>
            <div class="ulContainer  fixedTop114T">
                <ul>
                    <li> 
                        <div class="box">
                            <span>*</span>
                            <span>企业名称：</span>
                            <span class="nameSpan">
                                <input type="text" placeholder="请输入企业名称"  v-model="businessData.name"  @input.stop.prevent= "sousouTianyanchaDialogFn"  @keydown.enter="sousouTianyancha($event,'2')"   @blur.stop.prevent = "sousouTianyancha($event,'2');nameVertify()"    />
                            
                                 <!-- 企业名称 本地数据库查询 下拉列表 -->
                               <div class="fixedWrap"  v-if="showDialog">
                                  <ul class="sousouTianyancha2Wrap" >  
                                    <li class="dataDetail" v-for=" (items,index )   in   companyListData.list"  :key="index" @click="changeBusinessData(items)">{{items.CompanyName}}</li>
                                  </ul> 

                               </div>
                                
                            </span>
                            <span class="addBtn" v-if="sousouTianyanchaDialog"><img src="../../assets/images/addCompany@3x.png" alt=""  @click.stop.prevent = "sousouTianyancha($event,'1');"></span>
                            <span class="addBtn" v-else ><img src="../../assets/images/addCompany@3x.png" alt=""  ></span>
                            
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <span>*</span>
                            <span>企业信用代码：</span>
                            <span>
                                <input type="text" placeholder="请输入信用代码"  v-model="businessData.reg_num"   @blur.stop.prevent  ="reg_numVertify()"    />
                            </span>
                        </div>
                    </li>
                    <li class="businessLi">
                        <div class="box">
                            <span>*</span>
                            <span>营业执照：</span> 
                            <p class="businessP fixTextCenter">照片所有信息需清晰可见，内容真实有效</p>
                            <div class="business" @click="uploadBImg(0,'businessLicense')">
							                	<div class="bBox">
                                    <input type="file"  accept="image/*" id="uploadBusiness" @change="uploadBusiness" v-if="isShowFile" />
								                    <div class="picture" :style="`backgroundImage:url(${businessData.Img})`"  @blur="ImgVertify()"     ></div>
                                </div>
					               		</div>
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <span>*</span>
                            <span>身份证号：</span>
                            <span>
                                <input type="text" placeholder="请输入法人带边证件号"  v-model="idCardData.num"   @blur="numVertify()"  />
                            </span>
                        </div>
                    </li>
                    <li class="businessLi id_Box">
                        <div class="box">
                            <span>*</span>
                            <span>身份证照片：</span>
                            <div class="business" >
								<div class="bBox idBox">
                                    <input type="file"   accept="image/*"    id="uploadidCardImgFace"  @change.stop="uploadidCardImg($event,'face')"    />
								     <div class="picture" :style="`backgroundImage:url(${idCardData.ImgFront})`"  @blur="ImgFrontVertify()"  ></div>
                                </div>
							</div>
                            <div class="text">带头像面</div>
                            <div class="business" >
								<div class="bBox idBox2 idBox"> 
                                    <input type="file"  accept="image/*"  id="uploadidCardImgBack"  @change="uploadidCardImg($event,'back')"    />
                              
								    <div class="picture" :style="`backgroundImage:url(${idCardData.ImgReverse})`"   @blur="ImgReverseVertify()" ></div>
                                </div>
							</div>
                            <div class="text text2">带国徽面</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="button noHighStyle"  v-if="!highStyle"   @click.stop="noInfoButton">
                <span  >提交实名认证</span>
            </div>
            <div class="button highStyle"     @click.stop="submitButton"  v-else>
                <span  >提交实名认证</span>
            </div>     
         
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "./CompanyVertify.less";
</style>

<script>
let index = 1;
import { getFileData } from "@util/otherAjaxPort";
import getData from "@vuex/ajaxAPI/getData";
import { getSession , setSession } from "@util/sessionStorage";
import tool from "@util/tool";

import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      showDialog: false,
      isShowFile: true,
      sousouTianyanchaDialog:true,//input 框输入遮罩 防止用户马上点击img+ 导致查询2次
    };
  },
  computed: {
    ...mapState("signature", ["companyListData", "businessData", "idCardData"]),
    
     highStyle : {
       get: function () { //处理ajax 数据传递 异步的问题   
          console.log('1=>get') ;//初始化一次get    
            if (
              this.nameVertify(true) &&
              this.reg_numVertify(true) &&
              this.ImgVertify(true) &&
              this.numVertify(true) &&
              this.ImgFrontVertify(true) &&
              this.ImgReverseVertify(true)
            ) {
              return true;
            } else {
              return false;
            }
        },
        // setter
        set: function (newValue , oldValue) { 
          
         }
     }
      
  },
  updated() {},
  created() {
    if(getSession('companyTag')){
      setSession('tt','person')
    }
    if (this.$route.query.Id) {
      this.init().then(() => {
        //判断 实名认证的 提交按钮是否应该点亮 同事处理ajax 数据异步的问题 
         // this.highStyle = true ; 
      });
    }

  },
  methods: {
    ...mapActions("signature", [
      "GetCustomerSignatureListOther",
      "businessLicenseFn",
      "idCardFn",
      "RealNameCertification",
      "GetCustomerSignatureById",
      "clearData",
      "Save"
    ]),
    ...mapMutations("signature", ["_businessLicense"]),
    init() {
      let params = {
        Id: this.$route.query.Id // 签章ID
      };
      //从个人页面跳转  获取企业实名认证数据
      return  this.GetCustomerSignatureById(params);
    },
    uploadBImg(type, val) {
      this.type = type;
      this.currentId = val;
    },

    async uploadBusiness(e) {
      // 销毁
      this.isShowFile = false;
      const getFileBase64 = await getFileData(e);
      if (getFileBase64.files) {
        //用户点击取消不做处理
        // 营业执照数据传入 阿里
        this.businessLicenseFn(getFileBase64)
          .then(res => {
            this.isShowFile = true;
            //阿里认真成功后, 传入后台
            var _files = new FormData();
            _files.append("file", this.businessData.files);
            _files.append("type", "avatar");
            let _params = {
              data: _files,
              type: "businessLicenseFiles"
            };
            this.Save(_params).then(() => {});
          })
          .catch(error => {
            this.isShowFile = true;
          });
      }
    },
    async uploadidCardImg(e, value) {
      const getFileBase64 = await getFileData(e);
      if (getFileBase64.files) {
        //用户点击取消不做处理
        // 个人身份证信息 数据传入 阿里
        getFileBase64.side = value;
        this.idCardFn(getFileBase64)
          .then(() => {
            //阿里识别出成功后 转net 地址
            if (value == "face") {
              var _files = new FormData();
              _files.append("file", this.idCardData.filesFront);
              _files.append("type", "avatar");
            } else {
              var _files = new FormData();
              _files.append("file", this.idCardData.filesReverse);
              _files.append("type", "avatar");
            }
            let _params = {
              data: _files,
              type: value
            };
            this.Save(_params).then(() => {});
          })
          .catch(error => {
            this.isShowFile = true;
          });
      }
    },
    sousouTianyanchaDialogFn(){ //防止用户从input 失去焦点 立刻点击 图片 + 号
      this.sousouTianyanchaDialog = false;
    },
    sousouTianyancha(event,containTyc) {
      if (containTyc == "1") {  // 用户点击 + 号
        document.body.style.overflow = "hidden";
      } 
      /********************
       * 用户   查询数据
       * containTyc == 1  从数据库查询  containTyc == 2 从天眼查 查询
       *
       */
      let params = {
        // Id: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, // 微信用户ID 	 string 	 不可
        Id: getSession("_info").Id, //	 用户Id 	 string 	 不可
        Type: "1", // 签章类型(0=个人、1=公司) 	 int 	 可
        State: "", // 审核状态（0.待审核 1.审核通过 2.驳回） 	 int 	 可
        Name: containTyc == "1" ? "" : this.businessData.name, // 抬头名称（模糊匹配） 	 string 	 可
        containTyc: containTyc //	 1 数据库 2天眼查 3 数据库+天眼查 	 int 	 可
      };
     
      this.GetCustomerSignatureListOther(params)
        .then(() => {

          if (this.companyListData.list.length) {
            this.showDialog = true;
          } else {
            this.showDialog = false;
            document.body.style.overflow = "visible";
          }
        })
        .catch(error => {
          this.$vux.toast.text(error, "middel");
        });
    },
    closeFixDialog() {
      this.showDialog = false;
      document.body.style.overflow = "visible";
    },
    async changeBusinessData(value) { 
      document.body.style.overflow = "hidden";
      this.isShowFile = false;
      let data = {
        name: value.CompanyName,
        reg_num: value.SocialCreditCode,
        getFileBase64: { dataURL: value.BusinessLicensePic, files: "" }
      };
      new Promise((resolve, reject) => {
        this._businessLicense(data);
        document.body.style.overflow = "visible";
        resolve();
      }).then(() => {

        document.body.style.overflow = "visible";
        this.showDialog = false;
        // 建立files
        this.isShowFile = true;
      });
    },
    // 企业名称正则
    nameVertify(value) {
      if (!value) {
        return tool.regularJudgement("companyName", this.businessData.name);
      } else {
        //不弹框
        return tool.regularJudgementPromptly(
          "companyName",
          this.businessData.name
        );
      }
    },

    reg_numVertify(value) {   
      //企业 信用代码
      if (!value) {
        return tool.regularJudgement(
          "accountNumber",
          this.businessData.reg_num
        );
      } else {
         
        return tool.regularJudgementPromptly(
          "accountNumber",
          this.businessData.reg_num
        );
      }
    },
    ImgVertify(value) {
      //企业 营业执照图片
      if (this.businessData.Img.length > 10) {
        return true;
      } else {
        if (!value) {
          this.$vux.toast.text("请传入营业执照", "middle");
        }
        return false;
      }
    },
    numVertify(value) { 

      //身份证号码
      if (!value) {
        return tool.regularJudgement("idcardNum", this.idCardData.num);
      } else {
        //不弹框
        return tool.regularJudgementPromptly("idcardNum", this.idCardData.num);
      }
    },
    ImgFrontVertify(value) {
      //身份证 正面图片
      if (this.idCardData.ImgFront.length > 10) {
        return true;
      } else {
        if (!value) {
          this.$vux.toast.text("请上传身份证正面图片", "middle");
        }
        return false;
      }
    },
    ImgReverseVertify(value) {
      //身份证 反面图片
      if (this.idCardData.ImgReverse.length > 10) {
        return true;
      } else {
        if (!value) {
          this.$vux.toast.text("请上传身份证反面图片", "middle");
        }
        return false;
      }
    },
    noInfoButton() {
      this.$vux.toast.text("♪(´ε｀) ,请完善信息!", "middle");
    },
    submitButton() {
      var obj = [
        "nameVertify",
        "reg_numVertify",
        "ImgVertify",
        "numVertify",
        "ImgFrontVertify",
        "ImgReverseVertify"
      ];

      for (let i = 0; i < obj.length; i++) {
        let _obj = obj[i];
        if (!this[obj[i]]()) {
          return false;
        }
      }
      function FormDataFn() {
        return new FormData();
      }

      //验证通过   可以提交
      let params = {
        CustomerId: getSession("_info").Id, //	 用户Id 	 string 	 不可
        SignId: this.$route.query.SignId, //	 签章Id(修改签章时必填) 	 string 	 可
        Type: "1", // 签章类型（0.个人签章,1.企业签章） 	 string 	 不可
        CompanyName: this.businessData.name, // 企业名称 	 string 	 可（企业签必填）
        SocialCreditCode: this.businessData.reg_num, //	 社会信用代码 	 string 	 可（企业签必填）
        BusinessLicensePic: this.businessData.filesNet || this.businessData.Img   , //	 营业执照 	 string 	 可（企业签必填）
        TrueName: this.idCardData.name, // 真实姓名） 	 string 	 不可
        IdCardNumber: this.idCardData.num, //	 身份证号码 	 string 	 不可
        IdCardPositive: this.idCardData.filesFrontNet || this.idCardData.ImgFront  , //	 身份证正面 	 string 	 不可
        IdCardOpposite: this.idCardData.filesReverseNet || this.idCardData.ImgReverse  //	 身份证反面 	 string 	 不可
      };
      this.RealNameCertification(params)
        .then(() => {
          var _this = this;
          this.$vux.confirm.show({ 
            title: "信息提交成功",
            content:
              "1-2个工作日反馈审核结果;</br>审核通过之后,系统自动帮您生成电子签章",
            showCancelButton: false,
            showConfirmButton: false
          });

          setTimeout(() => {
            new Promise((resolve, reject) => {
              this.$vux.confirm.hide();
              resolve();
            }).then(() => {
              this.$router.push("/Signature/SignatureManagement/id");
            });
          }, 500);
        })
        .catch(() => {
        });
    }
  },
  beforeDestroy() {
    this.clearData();
    setSession('companyTag','')
    setSession('tt','')
  }
};
</script>

                                         