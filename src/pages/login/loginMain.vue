/**
* 作者: jsz
* 日期: 2019-01-15
* 描述:
*/
<template>
    <div>
      <!--<x-header :left-options="{showBack: false}" style='text-align: center;background: rgb(38, 142, 25);line-height: 50px;color: #fff'>霹雳火花</x-header>-->

      <div>
        <div style=''>
          <div style='position: fixed;top: 0;right: 0;width: 100%'>
            <div style='text-align: center;font-size: 26px;color:#fff;line-height: 50px; background: rgb(17, 160, 0);'>七彩宝</div>
            <tab  >
              <tab-item selected @on-item-click="onItemClick(0)">登录</tab-item>
              <tab-item @on-item-click="onItemClick(1)">注册</tab-item>
              <tab-item @on-item-click="onItemClick(2)">修改密码</tab-item>
            </tab>
          </div>
          <div style='margin-top: 94px;'>
            <div style='text-align: center;background: #fff;'>
              <img src="../../../static/logo.jpg" alt="">
            </div>
            <div>
              <login v-if='showNum==0'></login>
              <register  v-if='showNum==1'></register>
              <resetPassword v-if='showNum==2'></resetPassword>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import { XInput,XButton,XHeader,Alert,Loading , TransferDomDirective as TransferDom ,Toast,Tab, TabItem } from 'vux'
  import login from './login'
  import register from './register'
  import resetPassword from './resetPassword'
    export default {
        name: "loginMain",
        components: {
          XInput,
          XButton,
          XHeader,
          // Uploader,
          Tab,
          TabItem,
          Alert,
          Toast,
          Loading,
          login,
          register,
          resetPassword
        },
        props: [],
        data() {
            return {
              showNum:0,
            }
        },
        mounted() {

        },
        methods: {
          onItemClick(value){
            this.showNum=value;
          }
        }
    }
</script>

<style scoped lang='less'>
/deep/.vux-tab .vux-tab-item{
  font-size: 18px;
}
  /deep/.vux-tab .vux-tab-item.vux-tab-selected{
    background: #04BE02;
    color: #fff;
  }
</style>
