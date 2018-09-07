<template>
    <div>
        <div id="PersonalVertify">
            <router-view  id="dddddddddddd"></router-view>
            <headerCom :titleScoped="'身份证识别'"/>
            <div class="ulContainer">
                <ul>
                    <!-- <li class="businessLi id_Box" v-if="$route.query.Id&&personalInfo.success">
                        <div class="box">
                            <span class="notice">请上传以下证件照片，拍摄时注意避免照片反光！</span>
                            <div class="business">
								<div class="bBox idBox">
                                    <input type="file"  id="uploadidCardImgFace" @change="uploadidCardImg($event,'face')" v-if="true" accept="image/*">
								<div class="picture" :style="`backgroundImage:url(${personalInfo.data.IdCardPositive})`"></div>
                                </div>
							</div>
                            <div class="text">带头像面</div>
                            
                             <div class="business">
								<div class="bBox idBox2 idBox">
                                    <input type="file"  id="uploadidCardImgBack" @change="uploadidCardImg($event,'back')" v-if="true" accept="image/*">
								<div class="picture" :style="`backgroundImage:url(${personalInfo.data.IdCardOpposite})`"></div>
                                </div>
							</div>
                            <div class="text text2">带国徽面</div>
                        </div>
                    </li> --> 
                    <li class="businessLi id_Box">
                        <div class="box">
                            <span class="notice">请上传以下证件照片，拍摄时注意避免照片反光！</span>
                            <div class="business">
								<div class="bBox idBox">
                                    <input type="file"  id="uploadidCardImgFace" @change="uploadidCardImg($event,'face')" v-if="true" accept="image/*">
								<!-- <div class="picture" v-if="tag1&&personalInfo.success" :style="`backgroundImage:url(${personalInfo.data.IdCardPositive})`"></div>
                                <div class="picture" v-else :style="`backgroundImage:url(${idCardPersonalData.ImgFront})`"></div> -->
                                <div class="picture" :style="`backgroundImage:url(${obj._faceImg})`"></div>
                                </div>
							</div>
                            <div class="text">带头像面</div>
                            <!--  -->
                            <div class="business">
								<div class="bBox idBox2 idBox">
                                    <input type="file"  id="uploadidCardImgBack" @change="uploadidCardImg($event,'back')" v-if="true" accept="image/*">
								<!-- <div class="picture" v-if="tag2&&personalInfo.success" :style="`backgroundImage:url(${personalInfo.data.IdCardOpposite})`"></div>
                                <div class="picture" v-else :style="`backgroundImage:url(${idCardPersonalData.ImgReverse})`"></div> -->
                                <div class="picture" :style="`backgroundImage:url(${obj._backImg})`"></div>
                                </div>
							</div>
                            <div class="text text2"  >带国徽面</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="button p_button" @click="next">
                <span>下一步</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import './CompanyVertify.less';
#routerView{
    height: 100%;
    width: 100%;
}
#PersonalVertify{
    background: #fff;
    text-align: center;
    height: 100%;
    width: 100%;
}
#PersonalVertify .ulContainer ul li .box .notice{
        font-size: 0.32rem;
        color: rgb(153,153,153) !important;
    }

</style>

<script>
import {getFileData} from '@util/otherAjaxPort'
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import {setSession ,getSession} from '../../util/sessionStorage.js'
    export default{
        data(){
            return{
                tag1:this.$route.query.Id?false:true,
                tag2:this.$route.query.Id?false:true,
                obj:{
                    _faceImg : '',
                    _backImg : ''
                }
            }
        },
        created(){
            if(this.$route.query.Id){

                setSession('_modify',this.$route.query.Id)
                setSession('_modify1',this.$route.query.Id)
                this._getPersonalInfo();
            }
            this.imgShowData = 1;
            setSession('_tag','person')
            setSession('tt','person')
        },
        beforeDestroy(){
            setSession('_tag','')
            setSession('tt','')
        },
        computed:{
            ...mapState(
                'signature',['idCardPersonalData','personalInfo','imgData']
            ),
//---------------------------------------------------------

        imgShowData: {
                // getter
                get: function () {
                //   return this.firstName + ' ' + this.lastName
                return 1
                },
                // setter
                set: function (newValue) {
                    var c = 1;
                        // alert(this.tag1)  //false
                        // alert(this.tag2)  //true
                        // alert(this.$route.query.Id) //undefined
                if(this.$route.query.Id){
                  if(this.tag1&&this.tag2){
                    //   alert('你好')
                      this.obj._faceImg = getSession('_idCard').IdCardPositive
                      this.obj._backImg = getSession('_idCard').IdCardOpposite
                  }else if(this.tag1&&!this.tag2){
                    //   alert('你好ddd')
                      this.obj._faceImg = getSession('_idCard').IdCardPositive
                      this.obj._backImg = getSession('_back').ImgReverse
                  }else if(!this.tag1&&this.tag2){
                    //   alert('你好vvvv')
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_idCard').IdCardOpposite
                  }else if(!this.tag1&&!this.tag2){
                    //   alert('你好eeeee')
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_back').ImgReverse
                  }
              }else{
                //   alert('简历这个')
                  if(!this.tag1&&!this.tag2){
                    //   alert('?')
                    //   alert('什么',getSession('_back'))
                    //   alert('什么',getSession('_back'))

                    //   alert(getSession('_back'))
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_back').ImgReverse
                  }else if(this.tag1&&!this.tag2){
                    //   alert('折柳')
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_back').ImgReverse
                  }else if(!this.tag1&&this.tag2){
                    //   alert('折柳222')
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_back').ImgReverse

                    //  this.obj._faceImg = 'http://img2.imgtn.bdimg.com/it/u=1822900695,316759193&fm=27&gp=0.jpg'
                    //   this.obj._backImg = 'http://img2.imgtn.bdimg.com/it/u=1822900695,316759193&fm=27&gp=0.jpg'
                  }else if(this.tag1&&this.tag2){
                    //   alert('wwwww折柳')
                      this.obj._faceImg = getSession('_face').ImgFront
                      this.obj._backImg = getSession('_back').ImgReverse
                  }
                    // alert('zheli')
                    //   this.obj._faceImg = getSession('_face').ImgFront
                    //   this.obj._backImg = getSession('_back').ImgReverse
                    //   alert('什么鬼',getSession('_back'))
              }
                // console.log( this.obj._faceImg)
                // console.log( this.obj._backImg)

              return this.obj
                        
                    
             }
        },

//---------------------------------------------------------
        // imgShowData(){ //图片显示
        //       let obj = {
        //           _faceImg : '',
        //           _backImg : ''
        //       }
        //       if(this.tag1&&this.tag2&&this.$route.query.Id){
        //           obj._faceImg = getSession('_idCard').IdCardPositive
        //           obj._backImg = getSession('_idCard').IdCardOpposite
        //       }else if(this.tag1&&!this.tag2&&this.$route.query.Id){
        //           obj._faceImg = getSession('_idCard').IdCardPositive
        //           obj._backImg = getSession('_back').ImgReverse
        //       }else if(!this.tag1&&this.tag2&&this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //           obj._backImg = getSession('_idCard').IdCardOpposite
        //       }else if(!this.tag1&&!this.tag2&&this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //           obj._backImg = getSession('_back').ImgReverse
        //       }else if(!this.tag1&&!this.tag2&&!this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //               obj._backImg = getSession('_back').ImgReverse
        //       }else if(this.tag1&&!this.tag2&&!this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //               obj._backImg = getSession('_back').ImgReverse
        //       }else if(!this.tag1&&this.tag2&&!this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //               obj._backImg = getSession('_back').ImgReverse
        //       }else if(this.tag1&&this.tag2&&!this.$route.query.Id){
        //           obj._faceImg = getSession('_face').ImgFront
        //               obj._backImg = getSession('_back').ImgReverse
        //       }


        //     //   alert('computed', this.$route.query.Id)
        //     //   if(this.$route.query.Id){
        //     //       if(this.tag1&&this.tag2){
        //     //           alert('你好')
        //     //           obj._faceImg = getSession('_idCard').IdCardPositive
        //     //           obj._backImg = getSession('_idCard').IdCardOpposite
        //     //       }else if(this.tag1&&!this.tag2){
        //     //           alert('你好ddd')
        //     //           obj._faceImg = getSession('_idCard').IdCardPositive
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }else if(!this.tag1&&this.tag2){
        //     //           alert('你好vvvv')
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_idCard').IdCardOpposite
        //     //       }else if(!this.tag1&&!this.tag2){
        //     //           alert('你好eeeee')
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }
        //     //   }else{
        //     //       alert('简历这个')
        //     //       if(!this.tag1&&!this.tag2){
        //     //           alert('?')
        //     //         //   alert('什么',getSession('_back'))
        //     //           alert('什么',getSession('_back'))

        //     //         //   alert(getSession('_back'))
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }else if(this.tag1&&!this.tag2){
        //     //           alert('折柳')
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }else if(!this.tag1&&this.tag2){
        //     //           alert('折柳222')
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }else if(this.tag1&&this.tag2){
        //     //           alert('wwwww折柳')
        //     //           obj._faceImg = getSession('_face').ImgFront
        //     //           obj._backImg = getSession('_back').ImgReverse
        //     //       }
        //     //         // alert('zheli')
        //     //         //   obj._faceImg = getSession('_face').ImgFront
        //     //         //   obj._backImg = getSession('_back').ImgReverse
        //     //         //   alert('什么鬼',getSession('_back'))
        //     //   }
        //       return obj
        //     }
  },
        methods:{
            
            ...mapActions(
                'signature',{
                    'idCardFn':'idCardFn',
                    'getPersonalInfo':'getPersonalInfo',
                    'transition':'transition'
                }
            ),
           //身份证识别
           async uploadidCardImg(e,side){
               const getImg = await getFileData(e)
               if(getImg.files){
                   getImg.side = side
               this.idCardFn(getImg).then(res=>{
                //    this.tag1 = true
                //    this.tag2 = true
                   if(side == "face"){
                    //    alert('进了face',this.idCardPersonalData)
                       var _files = new FormData()
                       let files = e.target.files || e.dataTransfer.files;
                       _files.append("file", files[0]);
                       _files.append("type", "avatar");
    //-----------------------------------------------------------
                       this.transition(_files).then(res=>{
                            setSession('faceImg',this.imgData.data.storeResult.path)
                        //    alert('是不是这里的问题')
                            if(this.$route.query.Id&&getSession('_back')){ 
                           setSession('_idCard','')
                        //    this.tag1 = true
                       }else if(!this.$route.query.Id){  
                        //    console.log(this.imgShowData)
                       }
                          
                            var newObjet = Object.assign({},this.idCardPersonalData);
                            newObjet.ImgFront =this.imgData.data.storeResult.path
                            newObjet.ImgReverse = ''
                            setSession('_face',newObjet);
                           this.tag1 = false;
                           this.imgShowData = 1
                       })
                    //    console.log('假假按揭啊',this.$router.query)
    //-----------------------------------------------------------
                      
                   }else if(side == "back"){
                       var _files = new FormData()
                       let files = e.target.files || e.dataTransfer.files;
                       _files.append("file", files[0]);
                       _files.append("type", "avatar");
                       //把base64位 传后台 转url
                       this.transition(_files).then(res=>{
                            setSession('backImg',this.imgData.data.storeResult.path)
                            // this.tag2 = false;
                            //------------------------------
                            // console.log(this.imgData.data.storeResult.path)

                            if(this.$route.query.Id&&getSession('_face')){
                                 setSession('_idCard','')
                                //    this.tag2 = true
                            }else if(!this.$route.query.Id){  
                            }

                               var newObjet = Object.assign({},this.idCardPersonalData);
                                newObjet.ImgReverse =this.imgData.data.storeResult.path
                                newObjet.ImgFront = ''
                                 setSession('_back',newObjet);
                                  this.tag2 = false
                                 this.imgShowData = 1
                            //------------------------------


                       });


                    //    if(this.$route.query.Id&&getSession('_face')){
                    //             alert("wwdwdw1",this.idCardPersonalData.ImgReverse)
                            
                    //         setSession('_idCard','')
                    //         setSession('_back',this.idCardPersonalData)
                    //         //    this.tag2 = true
                    //         this.tag2 = false;
                    //         this.imgShowData = 1
                    //     }else if(!this.$route.query.Id){
                    //         // alert("11111",this.idCardPersonalData.ImgReverse)
                    //         alert(this.idCardPersonalData.ImgReverse)
                    //         alert(1);
                    //          alert(this.tag2) 

                    //         setSession('_back',this.idCardPersonalData)
                    //         //    this.tag2 = true
                    //         this.tag2 = false;
                    //         alert('20')
                    //         this.imgShowData = 1

                    //     }




                       
                   }
               })
               }
           },
           next(){
               if(this.$route.query.Id){
                     //编辑状态-换了其中一张图-下个页面-结合两种一起考虑
                   if(getSession('_idCard')){
                        this.$router.push(`/Signature/IdInfo?Id=${this.$route.query.Id}`)
                   }else{
                        //编辑状态-两张都换了-下个页面-只要考虑_face和_back  
                        setSession('_modify1','')  
                        this.$router.push(`/Signature/IdInfo`)
                        
                   }
               }else{
                   if(getSession('_face') && getSession('_back')){
                       setSession('_modify1','')
                       this.$router.push(`/Signature/IdInfo`)
                       
                   }else{
                       this.$vux.toast.text('请完善信息','middle')
                   }
               }
           },
           _getPersonalInfo(){
               let params = {
                   Id: this.$route.query.Id
               }
               this.getPersonalInfo(params).then(res=>{
                //    alert('编辑')
                //    console.log('编辑时',this.personalInfo.data)
                   setSession('_idCard',this.personalInfo.data)
                   if(getSession('_face')){
                    //    console.log('进了玛丽xxxxx')
                       this.tag1 = false;
                       this.tag2 = true;
                       this.imgShowData = 1
                   }else if(getSession('_back')){
                    //    console.log('进了玛丽eeeex')
                       this.tag2 = false;
                       this.tag1 = true;
                       this.imgShowData = 1
                   }else if(!getSession('_face')&&!getSession('_back')){
                    //    console.log('进了玛丽ffff')
                       this.tag1 = true;
                       this.tag2 = true;
                       this.imgShowData = 1
                   }
               })
           } 
        }
    }
</script>

                                         