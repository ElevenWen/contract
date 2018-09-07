<template>
    <div>
        <div id="IdInfo">
            <router-view  id="dddddddddddd"></router-view>
            <headerCom :titleScoped="'身份证信息'"/>
            <div class="ulContainer">
                <ul>
                    <li>
                        <div class="box">
                            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                            <span class="nameSpan">
                                <input type="text" placeholder="请输入姓名" v-model="obj.name">
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <span>身份证号</span>
                            <span class="nameSpan">
                                <input type="text" placeholder="请输入身份证号" v-model="obj.num">
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="box">
                            <span>有效期限</span>
                            <span class="nameSpan">
                                <input type="text" placeholder="请输入有效期限" v-model="obj.time">
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="button p_button">
                <span @click="aliFace">下一步</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSession, setSession} from '../../util/sessionStorage.js'
    import {mapActions , mapState} from 'vuex';
    export default{
        data(){
            return{
                //  name: this.$route.query.Id?getSession('_idCard').TrueName:getSession('_face').name,
                //  num: this.$route.query.Id?getSession('_idCard').IdCardNumber:getSession('_face').num,
                // _newTag : false
            }
        },
        created(){
            setSession('_newTag',true)
        },
        computed:{
            ...mapState(
               'signature',{
                    "aliDataOne":"aliDataOne"
                }
            ),
            // time(){
            //     let tag = this.$route.query.Id
            //     let s_time = tag?getSession('_idCard').IdCardStartTime:getSession('_back').startTime
            //     let e_time = tag?getSession('_idCard').IdCardEndTime:getSession('_back').endTime
            //     let time = s_time.substring(0,4) + "-"+ s_time.substring(4,6) + "-"+ s_time.substring(6,8) + ' 至 ' + e_time.substring(0,4) + "-"+ e_time.substring(4,6) + "-"+ e_time.substring(6,8)
            //     return time
            // },
            obj(){
                let obj = {
                    name : '',
                    num : '',
                    s_time : '',
                    e_time : '',
                    time : ''
                }
                if(this.$route.query.Id){
                    if(getSession('_face')){
                        obj.name = getSession('_face').name
                        obj.num = getSession('_face').num
                        obj.s_time = getSession('_idCard').IdCardStartTime
                        obj.e_time = getSession('_idCard').IdCardEndTime
                    }else if(getSession('_back')){
                        obj.name = getSession('_idCard').TrueName
                        obj.num = getSession('_idCard').IdCardNumber
                        obj.s_time = getSession('_back').startTime
                        obj.e_time = getSession('_back').endTime
                    }else{
                        obj.name = getSession('_idCard').TrueName
                        obj.num = getSession('_idCard').IdCardNumber
                        obj.s_time = getSession('_idCard').IdCardStartTime
                        obj.e_time = getSession('_idCard').IdCardEndTime
                    }
                }else{
                    obj.name = getSession('_face').name
                    obj.num = getSession('_face').num
                    obj.s_time = getSession('_back').startTime
                    obj.e_time = getSession('_back').endTime
                }
                obj.time = obj.s_time.substring(0,4) + "-"+ obj.s_time.substring(4,6) + "-"+ obj.s_time.substring(6,8) + ' 至 ' + obj.e_time.substring(0,4) + "-"+ obj.e_time.substring(4,6) + "-"+ obj.e_time.substring(6,8)
                return obj
            }
        },
        methods:{
            ...mapActions(
                'signature',['GetVerifyToken']
            ),
            aliFace(){
                if(this.obj.name&&this.obj.num&&this.obj.time){
                    let params = {
                        'biz':'wqbol2018',
                        'name': this.obj.name,
                        'identificationNumber': this.obj.num
                    }
                    this.GetVerifyToken(params).then(res=>{
                        if(this.aliDataOne.success){
                            let id = this.aliDataOne.data.TicketId
                            // let baseUrl = this.aliDataOne.data.AliData.CloudauthPageUrl
                            // let url = `${baseUrl}&successRedirect=https://host.wqbol.net/Signature/FaceSuccess/${id}`
                            // console.log('阿里阿里啊',url)
                            // console.log('什么鬼',this.aliDataOne.data.TicketId)
                            setSession('again','tag')
                            // alert(getSession('_back'))
                            // alert(getSession('_back').startTime)
                            // window.location.href = `${this.aliDataOne.data.AliData.CloudauthPageUrl}&successRedirect=https://host.wqbol.com/Signature/FaceSuccess/${this.aliDataOne.data.TicketId}&failRedirect=https://host.wqbol.com/Signature/SignatureManagement/tag`

                            window.location.href = `${this.aliDataOne.data.AliData.CloudauthPageUrl}&successRedirect=https:${process.env.innerGobleNetPort}/Signature/FaceSuccess/${this.aliDataOne.data.TicketId}&failRedirect=https:${process.env.innerGobleNetPort}/Signature/SignatureManagement/tag`

                        }
                    })
                }else{
                    this.$vux.toast.text('请完善信息')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
@import './CompanyVertify.less';
#routerView{
    width: 100%;
    height: 100%;
}
#IdInfo{
    width: 100%;
    height: 100%;
    background: #fff;
}
#IdInfo .ulContainer ul li .box span:nth-child(1){
    color: rgb(51,51,51);
}
#IdInfo .ulContainer ul li .box span.nameSpan{
    padding-left: 0.693333rem;
    input{
        font-size: 0.373333rem;
    }
}
</style>


                                         