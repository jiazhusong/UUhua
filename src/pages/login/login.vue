<template>
    <div>
      <x-header  style='text-align: center;background: rgb(94, 35, 237);line-height: 50px;color: #fff'>零花卡</x-header>
      <div class='loginContent' style=''>
        <div style='text-align: center;'><img src="../../../static/lhklogo.png" height='130' alt=""></div>
        <div style='padding: 0 30px'>
          <!--<group>-->
            <div class='inputList' >
              <span class='inputTitle' >账号：</span>
              <input class='inputClass'  v-model="useName" type="text" placeholder='请输入用户名' style='height: 30px;'>
            </div>
            <div class='inputList'>
              <span class='inputTitle'>密码：</span>
              <input class='inputClass' v-model="password" type="password" placeholder='请输入密码'>
            </div>
            <!--<x-input class='inputClass' title="用户名：" placeholder="请输入用户名" v-model="useName" ref='useName' is-type='china-mobile'  required>-->
              <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"  class="iconfont icon-yonghu"  ></i>-->
            <!--</x-input>-->
            <!--<x-input title="密码：" type='password' placeholder='请输入密码' v-model="password" ref='password' required>-->
              <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-icon-test"  ></i>-->
            <!--</x-input>-->
            <!--<x-input  title="验证码" placeholder='请输入验证码' v-model="num" ref='num' required>-->
            <!--<i slot="label" style="padding-right:10px;display:block;width: 24px;height:24px"   class="iconfont icon-yanzhengma"  ></i>-->
            <!--<img slot="right-full-height" @click='imgClick' :src="imgUrl">-->
            <!--</x-input>-->
            <!--<div style='height:1px;background: #D9D9D9; '></div>-->
            <x-button style='margin-top: 20px;border-radius: 5px' type="primary" @click.native='loginFun'>登录</x-button>
          <!--<x-button style='margin-top: 20px;border-radius: 5px' type="primary" @click.native='registerFun'>注册</x-button>-->
          <!--</group>-->
          <div class='parent-box'>
            <!--<router-link  to='/register'>注册</router-link>-->
            <router-link to='/resetpass'>忘记密码</router-link>
          </div>
          <div style='text-align: center;margin-top: 30px;'>
            没有账号？
            <router-link  to='/register'>立即注册</router-link>

          </div>
        </div>
      </div>

      <div v-transfer-dom>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="showMsg" position="middle"></toast>
    </div>
</template>

<script>
  import { XInput,Group,XButton,XHeader,Alert,TransferDomDirective as TransferDom,Toast } from 'vux'
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
          Alert,
          Toast
      },
      data(){
          return{
            useName:"",
            password:"",
            num:"",
            // imgUrl:"api/system/kaptcha",
            show:false,
            msg:"",
            showPositionValue:false,
            showMsg:"",
            maxHei:""
          }
      },
      mounted(){
        let vm=this;
        vm.maxHei=window.screen.height-100+"px";
        document.querySelector(".loginContent").style.height=window.screen.height-50+"px";
      // :left-options="{showBack: false}"

        // vm.$api.get("api/system/kaptcha",{responseType: 'arraybuffer'},function (data) {
        //   console.log(data);
        //   // vm.imgUrl =  'data:image/png;base64,' + btoa(
        //   //   new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        // })
      },
      methods:{
        // http://39.105.80.106:9000/swagger-ui.html
        // imgClick(){
        //   this.imgUrl="api/system/kaptcha?"+Math.random()
        // },
          loginFun(){
          let vm=this;
          // vm.$router.push({
          //   path:"/userlayout"
          // })
            if(vm.useName.replace(/\s/g,"")==""){
              vm.showPositionValue=true;
              vm.showMsg="请输入正确的手机号码";
              return false;
            }
            if(vm.password.replace(/\s/g,"")==""){
              vm.showPositionValue=true;
              vm.showMsg="请输入正确的密码";
              return false;
            }
            // if(!vm.$refs["num"].valid){
            //   vm.showPositionValue=true;
            //   vm.showMsg="请输入正确的验证码";
            //   return false;
            // }
            vm.$api.post("api/system/login",{
              // kaptcha:vm.num,
              tel:vm.useName,
             password:vm.password
            },function ({data}) {
              console.log(data);
              if(data.code==20){
                vm.showPositionValue=true;
                vm.showMsg="恭喜您登录成功"
                sessionStorage.setItem('username',vm.useName)
                vm.$router.push({
                  path:"/userlayout",
                })
              }else {
                vm.showPositionValue=true;
                vm.showMsg=data.message
              }
            })
        },
        registerFun(){
            this.$router.push({
              path:"/register"
            })
        },
        onHide () {
          console.log('on hide')
        },
        onShow () {
          console.log('on show')
        },
      }
    }
</script>

<style scoped lang='less'>
.parent-box{
  text-align: right;
  margin-top: 10px;
}
  .loginContent{
    background: url("../../../static/loginbg.jpg");
    background-size: cover;
    .inputList{
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      padding: 0 5px;
      margin-top: 20px;
      background: #fff;
      .inputClass{
        border: none;
        font-size: 14px;
        &:focus{
          outline: none;
        }
      }
      .inputTitle{
        display: inline-block;
        width: 70px;
        text-align: right;
      }
    }
  }

</style>
