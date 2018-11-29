/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div>
    <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>修改密码</x-header>
    <div style='text-align: center'><img src="../../../static/editPass.png" height='100' alt=""></div>
    <div style='padding: 0 30px'>
      <group>
        <x-input  placeholder="请输入手机号" is-type='china-mobile' required ref='phoneNum' v-model="phoneNum">
          <i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"  class="iconfont icon-shouji"  ></i>
        </x-input>
        <x-input  placeholder="请输入真实姓名" required ref='useName' v-model="useName">
          <i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"  class="iconfont icon-zhenshixingming"  ></i>
        </x-input>

        <!--<x-input  placeholder='请输入验证码' required ref='verificationCode' v-model="verificationCode">-->
          <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-yanzhengma"  ></i>-->
          <!--<img slot="right-full-height" @click='imgFun' :src="imgUrl">-->
        <!--</x-input>-->
        <x-input placeholder='请输入短信验证码' required ref='phoneCode' v-model="phoneCode" phoneCode class="weui-vcode">
          <i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont  icon-yanzhengma2"  ></i>
          <x-button slot="right" type="primary" :disabled='codeBtn!="发送验证码"'  @click.native='sendCodeFun' mini >{{codeBtn}}</x-button>
        </x-input>
        <x-input  placeholder='请输入新密码' required v-model="password" :type='passwordType' ref='password'>
          <i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-mima"  ></i>
          <i slot="right" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-chakanmima"  @click='passwordTypeChange'></i>
        </x-input>
        <x-input  placeholder='确认新密码' required v-model="passwordAgin" :type='passwordAginType' ref='passwordAgin'>
          <i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-mima"  ></i>
          <i slot="right" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-chakanmima"  @click='passwordAginTypeFun'></i>

        </x-input>
        <div style='height:1px;background: #D9D9D9; '></div>
        <x-button style='margin-top: 20px;' type="primary" @click.native='editPassFun'>确认</x-button>
      </group>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
      <div v-transfer-dom>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
      </div>
      <!--<div class='parent-box'>-->
        <!--<router-link  to='/register'>注册</router-link>-->
        <!--<router-link to='/resetPass'>忘记密码</router-link>-->
      <!--</div>-->
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
            if(!vm.$refs["phoneNum"].valid){
              vm.msg+="正确的手机号，";
              vm.show=true;
            }
            if(!vm.$refs["password"].valid){
              vm.msg+="6-16位密码，";
              vm.show=true;
            }
            if(!vm.$refs["passwordAgin"].valid){
              vm.msg+="确认密码，";
              vm.show=true;
            }
            // if(!vm.$refs["verificationCode"].valid){
            //   vm.msg+="验证码，";
            //   vm.show=true;
            // }
            if(!vm.$refs["phoneCode"].valid){
              vm.msg+="手机验证码，";
              vm.show=true;
            }
            if( vm.show){
              return false;
            }else {
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
                      history.go(-1);
                    }
                })
              }else {
                vm.msg="密码和确认密码不一致，请重新输入";
                vm.show=true;
              }
            }
          },
          sendCodeFun(){
            let vm=this;
            if(vm.$refs["phoneNum"].valid){
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

</style>
