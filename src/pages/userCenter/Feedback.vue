<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
		// 头部样式
		html,body{
			position:relative;
			height:100%;
			min-height:100%;
		}
		#feedback{
			height: 100%;
		}
 // 输入反馈意见 
 #content{
     width: 100%;
     min-height: 5.702702702702703rem;
     background: #fff;
    //  margin-top: 1.5135135135135136rem;
     padding: 0.2702702702702703rem 0 0 0.32432432432432434rem;
     color: #000;
     resize:none;
	 	 border: 0;
     font-size: 0.373333rem;
     padding-top: .386667rem !important;
}
 // 上传照片 
 .uploadImgWrap{
     height: 2.945945945945946rem;
     background: #fff;
     margin-top: 0.2702702702702703rem;
}
 .uploadImgFont{
     padding: 0.43243243243243246rem 0 0 0.32432432432432434rem;
     font-size: 0.40540540540540543rem;
     font-weight: 600;
}
 .uploadImgFont span{
     font-size: 0.3783783783783784rem;
     color: #B3B3B3;
}
 .uploadImgWrap .img{
     float: left;
     width: 1.2972972972972974rem;
     height: 1.2972972972972974rem;
     margin: 0.40540540540540543rem 0 0 0.32432432432432434rem;
     img{
         width: 100%;
         height: 100%;
    }
}
.img{
	position: relative;
}
 // 改变input[file]的样式 
 .add{
     float: left;
     display: inline-block;
     vertical-align: middle;
     width: 1.3243243243243243rem;
     height: 1.3243243243243243rem;
     background: #EFEFF4;
     box-sizing: content-box;
     overflow: hidden;
     margin: 0.40540540540540543rem 0 0 0.32432432432432434rem;
     position: relative;
     div{
         width: 1.3243243243243243rem;
         height: 1.3243243243243243rem;
         line-height: 1.2702702702702702rem;
         font-size: 0.7027027027027027rem;
         color: #666;
         text-align: center;
    }
}
#coverImg,#file{
		width: 1.2972972972972974rem ;
		height: 1.2972972972972974rem;
		position: absolute;
		cursor: pointer;
		top: 0rem;
		left: 0;
		z-index: 22;
		opacity: 0;
}
.appC{
	width: 1.2972972972972974rem ;
	height: 1.2972972972972974rem;
	position: absolute;
	z-index: 9999;
}
 // 联系方式 
 .telWrap{
	 width: 100%;
	 height: 1.3783783783783783rem;
	 line-height: 1.3783783783783783rem;
	 background: #fff;
	 margin-top: 0.2702702702702703rem;
	 span{
		 font-size: .4rem;
		 color: #000;
		 padding-left: 0.32432432432432434rem;
		 vertical-align: top;
	 }
 }
 .telphone{
	 border: 0;
	 font-size: 0.373333rem;
	 padding-left: .693333rem;
	 font-size: .4rem;
}
 // 感谢 
 .thankful{
     margin: 0.43243243243243246rem 0 0 0.32432432432432434rem;
	 color: #8C8C8C;
	 font-size: 0.373333rem;
	 line-height: 0.506667rem;
}
.submit,.isSubmit{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.333333rem;
    line-height: 1.333333rem;
    text-align: center;
    color: #fff;
    font-size: .48rem;
		letter-spacing: .066667rem;
		overflow: hidden;
}
.submit{
    background: rgb(213,213,213);
}
.isSubmit{
    background: rgb(0,150,255);
}
.deleteImg{
	display: inline-block;
	width: .266667rem;
	height: .266667rem;
	background: url("../../assets/images/delete@2x.png") no-repeat;
	background-size: 100%;
	position: absolute;
    top: .053333rem;
	left: 0.956667rem;
	z-index: 9999999;
}
</style>
<template>
	<div id="feedback">
		<!-- 头部 -->
        <headerCom :titleScoped="'意见反馈'"></headerCom>
		<!-- /头部 -->
		<div>
		<!-- 输入反馈意见 -->
		<textarea name="textarea" v-model="content" id="content" placeholder="欢迎反馈，以便为您提供更好的服务" maxlength="160" @input="check"></textarea>
		<!-- /输入反馈意见 -->
		<!-- 上传照片 -->
		<div class="uploadImgWrap">
			<div class="uploadImgFont">上传照片<span>（选填，最多5张）</span></div>
			<div class="img" v-for="(data,index) in arr" :key="index">
				<div class="appC"></div>
				<input type="file" id="coverImg" @change="upload2($event,data,index)"/>
				<img id="upload" :src="data" alt="" v-show="headerImage">
				<span class="deleteImg" @click.stop.prevent="deleteImg(data,index)"></span>
			</div>
			<div class="add" v-show="isShow">
				<div>+</div>
				<input type="file" id="file" @change="upload($event)" accept="image/*"/>
			</div>

		</div>
		<!-- /上传照片 -->
		<!-- 联系方式 -->
		<div class="telWrap">
			<span>联系方式</span>
			<input type="tel" v-model="phone" name="text" class="telphone"  @blur="verifyP" @input="check" maxlength="11" placeholder="请输入联系方式">
		</div>
		<!-- /联系方式 -->
		<div class="thankful">感谢您对我们产品及服务的关注，您还可以联系在线客服，直接向我们反馈。</div>
		<img :src="imgUrl" alt="">
			<!-- 发送 -->
			<!-- :class="isOkey?'isSubmit':'submit'" -->
			<div :class="isOkey?'isSubmit':'submit'"  id="send" @click.stop.prevent="submitFeedBack">发送</div>
		</div>
	</div>
</template>
<script>
	import getD from '@vuex/ajaxAPI/getData.js';
	import tool from "../../util/tool";
	import {getSession} from '@util/sessionStorage.js';
	var ua = navigator.userAgent.toLowerCase();
	export default {
		data(){
			return {
				headerImage:"",
				phone:"",
				arr:[],
				isShow:true,//是否选了五张
				content:"",//反馈内容
				isTrue:false,//手机号是否正确
				currentImg:"",
				currentIndex:-1,
				isShowMessageBox:false,//显示扫一扫弹窗
				isOkey:false,
				imgUrl:"",
				oldImg:[],
			}
		},
		created(){
			this.weixin({});
		},
		mounted(){
			this.$watch('headerImage',(newVal,oldVal)=>{
				// console.log("newVal",newVal)
				// console.log("oldVal",oldVal)
				if (this.arr.length==4) {
					this.arr.push(newVal);
					this.isShow = false;
				}
				else{
					this.arr.push(newVal);
				}
			})
			window.onresize= function(e){
				if(window.innerHeight< 568){
					document.getElementById("send").style.position = "static";
				}else{
					document.getElementById("send").style.position = "fixed";
				}
			}
		},
		methods:{
			submitFeedBack(){
				if (this.isOkey) {
					this.isOkey = true;
					var _arr = this.arr.join("|");
					var params = {
						// params:{
							Id:getSession("_info").Id,
							source:1,
							content:this.content,
							phone:this.phone,
							image:_arr,
						// }
					}
					getD.feedback(params).then((res) => {
						// console.log(res);
						this.$router.replace('/userCenter/AboutUs')
						this.$vux.toast.text('提交成功', 'middle')
					},err => {
						// console.log(err);
					}).catch(error => {
						console.log(error)
					})
					
				}else{
					this.$vux.toast.text('请确保内容填写完整', 'middle')
				}
				
			},
			check(){
				if(this.content.length !=0 && this.content.length<=160 && this.checkTel()){
					this.isOkey = true;
				}else{
					this.isOkey = false;
				}
			},
			checkTel(){
				let reg = /(^1[3|4|5|7|8][0-9]{9}$)/.test(this.phone);
				// console.log(reg)
				if (!reg) {
						return false;
				} else {
						return true;
				}
			},
			// 删除图片
			deleteImg(val,i){
				this.arr.splice(i,1);
				this.isShow = true;
				// console.log(document.getElementById("file").value)
				document.getElementById("file").value = "";
			},
		// 	//判断手机号
        	verifyP(){
                if(!this.phone){
                    return
                }
        		var status = tool.regularJudgement("phone",this.phone);
        		if (status) {
					this.isTrue = true;
				}else{
					this.isTrue = false;
				}
			},
			upload2(e,val,i){
				// console.log(val,i,this.arr[i])
				let self = this;
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				//传给后台
				var acv = new FormData();
				acv.append('file', files[0]);
				// acv.append('Token',self.getToken());
				acv.append('type', 'avatar');
				
				getD.upNetImage(acv)
				.then((res)=>{
					self.currentImg = res.data.storeResult.path;
					this.$set(self.arr,self.currentIndex+1,self.currentImg)
				})
				.catch((error)=>{
					console.log(error);
				})	
			},
		//     //上传图片
			upload(e) {
				// console.log("eeeeeeeeee",e);
				let self = this;
				let files = e.target.files || e.dataTransfer.files;
				// console.log("files",files);
				if(!files.length) return;
				// 传给后台
				var acv = new FormData();
				acv.append('file', files[0]);
				// acv.append('Token',self.getToken());
				acv.append('type', 'avatar');
				
				getD.upNetImage(acv)
				.then((res)=>{
					self.headerImage = res.data.storeResult.path;
				})
				.catch((error)=>{
					// console.log(error);
				})	
			},
		}
	}
</script>
