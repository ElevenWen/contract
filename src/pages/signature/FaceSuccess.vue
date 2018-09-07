<template>
    <div>
        <div id="FaceSuccess">
           <router-view  id="dddddddddddd"></router-view>
            <h3>人脸认证</h3>
            <div class="container">
                <div class="img">
                    <img src="../../assets/images/payS@2x.png" alt="">
                </div>
                <p>恭喜你，身份认证成功！</p>
                <div class="btn">
                    <div class="btn_img">
                        <img src="../../assets/images/highlighted-button@3x.png" alt="">
                    </div>
                    <span @click="goSignature">前往签章管理({{num}}s)</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
#routerView{
    height: 100%;
}
    #FaceSuccess{
        height: 100%;
        background: #fff;
        h3{
            position: absolute;
            top: 0;
            left: 0;
            height: 1.12rem;
            width: 100%;
            text-align: center;
            line-height: 1.12rem;
            font-size: 0.453333rem;
            box-shadow: 1px 1px 1px #eee;
        }
        .container{
            padding-top: 1.173333rem;
            text-align: center;
            position: relative;
            .img{
                width: 1.866667rem;
                height: 1.866667rem;
                margin: 1.333333rem auto 0.4rem auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            p{
                color: rgb(51,51,51);
                font-size: 0.426667rem;
                margin-bottom: 1.333333rem;
            }
            .btn{
                height: 1.333333rem;
                line-height: 1.2rem;
                width: 8.933333rem;
                position: absolute;
                left: 50%;
                margin-left: -4.466667rem;
                span{
                    position: absolute;
                    top: 0;
                    left: 2.72rem;
                    font-size: 0.453333rem;
                    color: #fff;
                }
            }
        }
    }
</style>


<script>
import {getSession, setSession} from '../../util/sessionStorage.js'
import {mapActions , mapState} from 'vuex';
    export default{
        data(){
            return{
                num: 5
            }
        },
        created(){
            this.Status()
            this.$nextTick(()=>{
                // alert(getSession('_info').Id)
                // alert(window.location.href)
                // let str = window.location.href
                // let index = str.indexOf("FaceSuccess/")
                // alert(str.slice(index+12))
                
                // alert(str.slice(index+11))
                // alert(str.slice(index+13))
            })
        },
        computed:{
            ...mapState(
                'signature',['aliData',"endSuccess",'imgData']
            )
        },
        methods:{
            ...mapActions(
                'signature',{
                    "GetMaterials":"GetMaterials",
                    "personalTo":"personalTo",
                    "transition":"transition"
                }
            ),
            Status(){
                // let str = window.location.href
                // let index = str.indexOf("FaceSuccess/")
                // let params = {
                //     "biz" : 'wqbol2018',
                //     'ticketId' : str.slice(index+12)
                // }
                // this.GetMaterials(params).then(res=>{
                    
                // })

                let start = ''
                let end = ''
                let finalFaceImg = ''
                let finalBackImg = ''
                let finalNum = ''
                let finalName = ''
                let SignId = getSession('_modify')?getSession('_modify'):''
                // if(getSession('_modify')){
                //     start = getSession('_idCard').IdCardStartTime
                //     end = getSession('_idCard').IdCardEndTime
                // }else{
                //     start = getSession('_back').startTime
                //     end = getSession('_back').endTime
                // }
                if(getSession('_idCard')){
                    if(!getSession('_back')&&!getSession('_face')){
                        start = getSession('_idCard').IdCardStartTime
                        end = getSession('_idCard').IdCardEndTime
                        finalName = getSession('_idCard').TrueName
                        finalNum = getSession('_idCard').IdCardNumber
                        finalFaceImg = getSession('_idCard').IdCardPositive
                        finalBackImg = getSession('_idCard').IdCardOpposite
                    }else if(getSession('_back')&&!getSession('_face')){
                        start = getSession('_back').startTime
                        end = getSession('_back').endTime
                        finalName = getSession('_idCard').TrueName
                        finalNum = getSession('_idCard').IdCardNumber
                        finalFaceImg = getSession('_idCard').IdCardPositive
                        finalBackImg = getSession('backImg')
                    }else if(!getSession('_back')&&getSession('_face')){
                        start = getSession('_idCard').IdCardStartTime
                        end = getSession('_idCard').IdCardEndTime
                        finalName = getSession('_face').name
                        finalNum = getSession('_face').num
                        finalFaceImg = getSession('faceImg')
                        finalBackImg = getSession('_idCard').IdCardOpposite
                    }
                }else{
                    start = getSession('_back').startTime
                    end = getSession('_back').endTime
                    finalName = getSession('_face').name
                    finalNum = getSession('_face').num
                    finalFaceImg = getSession('faceImg')
                    finalBackImg = getSession('backImg')
                }

                    let data = {
                        "CustomerId":getSession('_info').Id,
                        "SignId" : SignId,
                        "Type" : 0,
                        "TrueName" : finalName,
                        "IdCardNumber" : finalNum,
                        "IdCardStartTime" : start,
                        "IdCardEndTime" : end,
                        "IdCardPositive" : finalFaceImg,
                        "IdCardOpposite" : finalBackImg,
                        "isRPH":true
                    }

                    this.personalTo(data).then(res=>{
                        if(this.endSuccess.success){
                            this.daojishi();
                        }
                    },err=>{
                        alert(err)
                    })
            },
            daojishi(){
                var timer = setInterval(()=>{
                    if(this.num > 1){
                        this.num--
                    }else{
                        this.$router.push('/Signature/SignatureManagement/id')
                        clearTimeout(timer)
                        setSession('_modify','')
                    }
                },1000)
            },
            goSignature(){
                this.$router.push('/Signature/SignatureManagement/id')
            }
        }
    }
</script>
