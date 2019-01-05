/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div class='apps'>
    <x-header style='text-align: center;background: rgb(237, 72, 35);line-height: 50px;color: #fff'>注册</x-header>
    <div class='loginContent'>
      <div style='text-align: center'><img height='100' src="../../../static/register.png" alt=""></div>
      <div style='padding: 0 30px'>
        <!--<group>-->
          <!--<x-input title="用户名：" placeholder="请输入手机号" ref='phoneNum' :max=11 :show-clear=false is-type='china-mobile' v-model="phoneNum" required>-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"  class="iconfont icon-shoujihao"  ></i>-->
          <!--</x-input>-->
          <!--<x-input title="密码：" :type='passwordType' ref='password' :min=6 :max=16 placeholder='请输入密码' :show-clear=false v-model="password" required>-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-mima1"  ></i>-->
            <!--<i slot="right" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-chakanmima"  @click='passwordTypeChange'></i>-->
          <!--</x-input>-->
          <!--<x-input title="密码："  placeholder='请再次输入密码' :min=6 :max=16 ref='passwordAgin' :show-clear=false :type='passwordAginType' v-model="passwordAgin" required>-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-mima1"  ></i>-->
            <!--<i slot="right" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-chakanmima"  @click='passwordAginTypeFun'></i>-->
          <!--</x-input>-->
          <!--&lt;!&ndash;<x-input  title="验证码" placeholder='请输入验证码' v-model="verificationCode " :show-clear=false ref='verificationCode' required>&ndash;&gt;-->
          <!--&lt;!&ndash;<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-yanzhengma"  ></i>&ndash;&gt;-->
          <!--&lt;!&ndash;<img slot="right-full-height" :src="imgUrl" @click='imgFun'>&ndash;&gt;-->
          <!--&lt;!&ndash;</x-input>&ndash;&gt;-->
          <!--<x-input   placeholder='请输入手机验证码' title="发送验证码" class="weui-vcode" v-model='phoneCode' :show-clear=false ref='phoneCode' required>-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont  icon-yanzhengma"  ></i>-->
            <!--<x-button slot="right" type="primary"   :disabled='codeBtn!="发送验证码"'  @click.native='sendCodeFun' mini >{{codeBtn}}</x-button>-->
          <!--</x-input>-->
          <!--<div style='height:1px;background: #D9D9D9; '></div>-->
          <!--<x-button style='margin-top: 20px;border-radius: 20px' type="primary" @click.native='registerFun'>注册</x-button>-->
        <!--</group>-->
        <div class='inputList' >
          <span class='inputTitle' >用户名：</span>
          <input class='inputClass'  v-model="phoneNum" type="text" maxlength="11" placeholder='请输入手机号' style='height: 30px;' >
        </div>
        <div class='inputList'>
          <span class='inputTitle'>密码：</span>
          <input class='inputClass' v-model="password" maxlength="16" type="password" placeholder='请输入密码'>
        </div>
        <div class='inputList'>
          <span class='inputTitle'>确认密码：</span>
          <input class='inputClass' v-model="passwordAgin" maxlength="16" type="password" placeholder='请输入确认密码'>
        </div>
        <div class='inputList'>
          <span class='inputTitle'>验证码：</span>
          <input class='inputClass inputCode' v-model="phoneCode" type="text" placeholder='手机验证码'>
          <x-button slot="right" type="primary"   :disabled='codeBtn!="发送验证码"'  @click.native='sendCodeFun' mini >{{codeBtn}}</x-button>
        </div>
        <x-button style='margin-top: 20px;border-radius: 20px' type="primary" @click.native='registerFun'>注册</x-button>
        <div v-transfer-dom>
          <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
        </div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="showMsg" position="middle"></toast>
        <div style='margin-top: 20px;'>
          如果您已经拥有账号,请点击<router-link to='/'> <x-button  type="primary" mini  >登录</x-button></router-link>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { XInput,Group,XButton,XHeader,Alert, TransferDomDirective as TransferDom ,Toast } from 'vux'
    export default {
        name: "register",
      directives: {
        TransferDom
      },
      components: {
        XInput,
        Group,
        XButton,
        XHeader,
        Alert,
        Toast
      },
        props: [],
        data() {
            return {
              phoneNum:"",
              password:"",
              passwordAgin:"",
              // verificationCode:"",
              phoneCode:"",
              codeBtn:"发送验证码",
              // imgUrl:"api/system/kaptcha",
              show:false,
              msg:"",
              passwordAginType:"password",
              passwordType:"password",
              showPositionValue:false,
              showMsg:"",

            }
        },
        mounted() {
          let vm=this;

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
          registerFun(){
            let vm=this;
            vm.msg="请输入";
            if(vm.phoneNum.replace(/\s/g,"")==""||vm.phoneNum.length!=11){
              vm.msg+="正确的手机号";
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
              vm.$api.post("api/system/register",{
                // kaptcha: vm.verificationCode,
                tel: vm.phoneNum,
                telCode: vm.phoneCode,
                password:vm.password
              },function ({data}) {
                if(data.code==20){
                  vm.showPositionValue=true;
                  vm.showMsg="注册成功";
                  vm.$router.push({
                    path:"/"
                  })
                }else {
                  vm.showPositionValue=true;
                  vm.showMsg=data.message
                }
              })
            }else {
              vm.msg="密码和确认密码不一致，请重新输入";
              vm.show=true;
            }


          },
          sendCodeFun(){
            let vm=this;
           let telRegex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
            if(telRegex.test(vm.phoneNum)){
              vm.codeBtn="";
              vm.$api.get("api/system/"+vm.phoneNum+"/code","",function ({data}) {
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
                  vm.codeBtn="发送验证码";
                  vm.showPositionValue=true;
                  vm.showMsg=data.message
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

  .loginContent{
    .inputList{
      line-height: 40px;
      border: 1px solid #ccc;
      border-radius: 20px;
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
