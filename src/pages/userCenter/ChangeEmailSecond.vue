<style lang="less" scoped>
    #ChangeEmailSecond{
        overflow-x: hidden;
    }
    .outside{
        padding-top: 0 !important;
    }
    .content{
        width: 100%;
        height: 5.333333rem;
        background: #fff;
        margin-top: 1.2rem;
        img{
            width: 1.733333rem;
            height: 1.666667rem;
            margin: 1.093333rem 0 0 4.106667rem;
        }
        div:nth-child(2){
            width: 3.686667rem;
            font-size: .4rem;
            color: black;
            margin: 0 auto;
            margin-top: .666667rem;
        }
        div:nth-child(3){
            width: 5.933333rem;
            color: rgb(153,153,153);
            font-size: .346667rem;
            margin: .266667rem auto;
        }
    }
    .btn{
        width: 8.933333rem;
        height: 1.066667rem;
        background: #0096FF;
        line-height: 1.066667rem;
        text-align: center;
        color: #fff;
        font-size: .453333rem;
        margin: 1.333333rem auto;
    }
</style>
<template>
    <div id="ChangeEmailSecond" class="routerView-44px">
        <headerCom :titleScoped="'绑定邮箱'"></headerCom>
        <div class="outside">
            <div class="content">
                <img src="../../assets/images/email@2x.png" alt="">
                <div>请前往邮箱完成验证</div>
                <div>在收到的邮件中点击验证链接完成绑定</div>
            </div>
            <div class="btn" @click="completed">完成</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        completed(){
            this.$router.push("/userCenter/AccountSet");
        }
    }
}
</script>
