/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>首页</x-header>
      <div :style='{"height":maxHei}' style='overflow: auto'>
        <div style=''>
          <swiper :list="list" auto style="width:100%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div style='padding: 20px 30px'>
          <div style='color: #fff;'>
            <div :class='{"active":active==1}' style='width: 100%;background: #365F7D;height: 80px;text-align: center;display: flex;align-items: baseline;justify-content: center;' @click='applyFun(1)'>
              <p style='margin-top: 20px;font-size: 18px'>申请额度：</p>
              <div style='color: #ff9000;font-size: 28px'>
                <i  class='iconfont icon-qian-copy'></i>
                <span style='font-size: 28px'>1200</span>
              </div>
            </div>
            <div :class='{"active":active==2}' style='width: 100%;background: #365F7D;height: 80px;text-align: center;display: flex;align-items: baseline;justify-content: center;margin-top: 20px;' @click='applyFun(2)'>
              <p style='margin-top: 20px;font-size: 18px'>申请额度：</p>
              <div style='color: #ff9000;font-size: 28px'>
                <i  class='iconfont icon-qian-copy'></i>
                <span style='font-size: 28px'>2400</span>
              </div>
            </div>
          </div>
          <div>
            <p style='color:rgb(25, 131, 173);line-height: 50px;margin-top:10px;'>借款期限：7天</p>
          </div>
          <div>
            <x-button type='primary' @click.native='appliyMoney'>立即申请</x-button>
          </div>
          <div style='margin-top: 20px;color: rgb(25, 131, 173);' >
            注：点击申请即表示您已同意用户条款和隐私条款，本平台不对在校大学生开放
          </div>
        </div>
      </div>

      <tabbar style='position: fixed'>
        <tabbar-item selected link="/layout">
          <i slot="icon" class='iconfont icon-yemian-copy'></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item  link="/userlayout">
          <i slot="icon" class='iconfont icon-wodedangxuan'></i>
          <span slot="label">我的</span>
        </tabbar-item>

      </tabbar>
      <div v-transfer-dom>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
      </div>
    </div>
</template>

<script>
  import {XButton,XHeader,Tabbar,TabbarItem,Swiper,Alert,TransferDomDirective as TransferDom } from 'vux'

    export default {
        name: "layout",
        directives: {
          TransferDom
       },
        components: {

          XButton,
          XHeader,
          Tabbar,
          TabbarItem,
          Swiper,
          Alert
        },
        props: [],
        data() {
            return {
              active:1,
              show:false,
              msg:"",
              maxHei:"",
              list:[
                {
                url: 'javascript:',
                img: '../../../static/time1.jpg',
                title: ''
              },
                {
                url: 'javascript:',
                img: '../../../static/swiper4.png',
                title: '',
              }]
            }
        },
        mounted() {
          let vm=this;
          vm.maxHei=window.screen.height-120+"px";
        },
        methods: {
          applyFun(value){
            if(value==2){
              this.show=true;
              this.msg="暂不开放2400额度"
            }
          },
          appliyMoney(){
            let vm=this;
            vm.$api.post("api/bill/loan/1200","",function ({data}) {
              if(data.code==20){
                vm.show=true;
                vm.msg="申请成功"
              }else if(data.code==401){
                sessionStorage.clear();
                vm.$router.push({
                  path:"/"
                })

              }else {
                vm.show=true;
                vm.msg=data.message
              }
            })
          },
          onHide () {
          },
          onShow () {
          },
        }
    }
</script>

<style scoped lang='less'>
.active{
  box-shadow: 0 0 20px #2BFAFF
}
</style>
