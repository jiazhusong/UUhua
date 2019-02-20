/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div>
    <x-header v-if='$route.name=="resetpass"'  style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>修改密码</x-header>
    <!--<div style='text-align: center'><img src="../../../static/editPass.png" height='100' alt=""></div>-->
    <div style='padding: 0 30px'>

      <div class='loginContent'>
        <div class='inputList' >
          <span class='inputTitle' >用户名：</span>
          <input class='inputClass'  v-model="phoneNum" type="text" maxlength="11" placeholder='请输入手机号' style='height: 30px;' >
        </div>
        <div class='inputList' >
          <span class='inputTitle' >真实姓名：</span>
          <input class='inputClass'  v-model="useName" type="text" maxlength="11" placeholder='请输入手机号' style='height: 30px;' >
        </div>
        <div class='inputList'>
          <span class='inputTitle'>新密码：</span>
          <input class='inputClass' v-model="password" maxlength="16" type="password" placeholder='请输入密码'>
        </div>
        <div class='inputList'>
          <span class='inputTitle'>确认密码：</span>
          <input class='inputClass' v-model="passwordAgin" maxlength="16" type="password" placeholder='请输入确认密码'>
        </div>
        <div class='inputList'>
          <span class='inputTitle'>验证码：</span>
          <input class='inputClass inputCode' v-model="phoneCode" type="text" placeholder='手机验证码'>
          <x-button slot="right" type="primary"   :disabled='codeBtn!="发送验证码"' @click.native='sendCodeFun' mini >{{codeBtn}}</x-button>
        </div>
      </div>
      <x-button style='margin-top: 20px;' type="primary" @click.native='editPassFun'>确认</x-button>
    </div>
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
    <div v-transfer-dom>
      <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
    </div>

  </div>
</template>

<script>
  import { XInput,Group,XButton,XHeader,Toast ,Alert,TransferDomDirective as TransferDom} from 'vux'
  export default {
    name: "login",
    directives: {
      TransferDom
    },
    components: {
      XInput,
      Group,
      XButton,
      XHeader,
      Toast,
      Alert
    },
        props: [],
        data() {
            return {
              phoneNum:"",
              useName:"",
              verificationCode:"",
              phoneCode:"",
              password:"",
              passwordAgin:"",
              imgUrl:"api/system/kaptcha",
              codeBtn:"发送验证码",
              showPositionValue:false,
              popmsg:"",
              msg:"",
              show:false,
              passwordType:"password",
              passwordAginType:"password",
            }
        },
        mounted() {
          console.log(this.$route.name=="resetpass");
        },
        methods: {
          // imgFun(){
          //   let vm=this;
          //   vm.imgUrl="api/system/kaptcha"+"?"+Math.random()
          // },
          passwordTypeChange(){
            let vm=this;
            vm.passwordType=vm.passwordType=="password"?"text":"password"
          },
          passwordAginTypeFun(){
            let vm=this;
            vm.passwordAginType=vm.passwordAginType=="password"?"text":"password"
          },
          editPassFun(){
            let vm=this;
            vm.msg="请输入";
            if(vm.phoneNum.replace(/\s/g,"")==""||vm.phoneNum.length!=11){
              vm.msg+="正确的手机号";
              vm.show=true;
              return false
            }
            if(vm.useName.replace(/\s/g,"")==""){
              vm.msg+="真实姓名";
              vm.show=true;
              return false
            }
            if(vm.password.replace(/\s/g,"")==""||vm.password.length<6){
              vm.msg+="6-16位密码";
              vm.show=true;
              return false
            }
            if(vm.passwordAgin.replace(/\s/g,"")==""){
              vm.msg+="确认密码";
              vm.show=true;
              return false
            }
            // if(!vm.$refs["verificationCode"].valid){
            //   vm.msg+="验证码";
            //   vm.show=true;
            //   return false
            // }
            if(vm.phoneCode.replace(/\s/g,"")==""){
              vm.msg+="手机验证码";
              vm.show=true;
              return false
            }
            if(!/^\d{6}$/.test(vm.phoneCode)){
              vm.msg+="6位手机验证码";
              vm.show=true;
              return false
            }
            if(vm.password===vm.passwordAgin){
              vm.$api.put("api/user/info",{
                // kaptcha: vm.verificationCode,
                realName: vm.useName,
                tel: vm.phoneNum,
                telCode: vm.phoneCode,
                password:vm.password
              },function ({data}) {
                if(data.code==20){
                  vm.popmsg="修改成功";
                  vm.showPositionValue=true;
                  // history.go(-1);
                }
              })}else {
              vm.msg="密码和确认密码不一致，请重新输入";
              vm.show=true;
              return false;
            }
          },
          sendCodeFun(){
            let vm=this;
            let telRegex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if(telRegex.test(vm.phoneNum)){
              vm.codeBtn="";
              vm.$api.get("api/system/code",{
                tel:vm.phoneNum
              },function ({data}) {
                if(data.code==20){
                  let n=60;
                  let timer=setInterval(function () {
                    vm.codeBtn=n+"S";
                    n--;
                    if(n==0){
                      vm.codeBtn="发送验证码";
                      clearInterval(timer);
                    }
                  },1000)
                }else {
                  vm.msg=data.message;
                  vm.show=true;
                  vm.codeBtn="发送验证码";
                }
              })
            }else {
              vm.msg="请输入正确的手机号";
              vm.show=true;
            }
          },
          onHide () {
          },
          onShow () {
          },
        }
    }
</script>

<style scoped lang='less'>
  /deep/.weui-btn_disabled.weui-btn_primary{
    background-color:#E22122;
  }
  .loginContent{
    .inputList{
      line-height: 40px;
      border: 1px solid #04BE02;
      border-radius: 5px;
      padding: 0 5px;
      margin-top: 20px;
      background: #fff;
      .inputClass{
        border: none;
        font-size: 14px;
        height: 30px;
        &:focus{
          outline: none;
        }
      }
      .inputCode{
        width: 80px;
      }
      .inputTitle{
        display: inline-block;
        width: 90px;
        text-align: right;
      }
    }
  }
</style>
