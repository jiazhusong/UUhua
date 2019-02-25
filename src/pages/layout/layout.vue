/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(17, 160, 0);line-height: 50px;color: #fff'>首页</x-header>
      <div :style='{"height":maxHei}' style='overflow: auto'>
        <div style=''>
          <swiper :list="list" auto style="width:100%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div style='padding: 30px 30px'>
          <div style='color: #fff;display: flex;justify-content: space-between'>
            <div :class='{"active":active==1}' style='background: rgb(16, 76, 165);height: 140px;width: 48%' @click='applyFun(1)'>
              <div style='font-size: 18px;display: flex;justify-content: space-between;line-height: 60px;padding: 0 5px'>
                <!--<countup style='color: rgb(0, 255, 92);font-size: 28px' :start-val="1" :end-val="1500" :duration="2" ></countup>-->
                <span style='font-size: 22px;color: #a1f397'>￥1500 </span>
                <span>7天</span>
              </div>

              <div style='margin-top: 40px;'>
                <x-button type='primary' style='' @click.native='appliyMoney'>立即申请</x-button>
              </div>
            </div>
            <div :class='{"active":active==2}' style='background: rgb(16, 76, 165);height: 120px;width: 48%' >
              <div style='font-size: 18px;display: flex;justify-content: space-between;line-height: 60px;padding: 0 5px'>
                <!--<countup style='color: rgb(0, 255, 92);font-size: 28px' :start-val="1" :end-val="1500" :duration="2" ></countup>-->
                <span style='font-size: 22px;color: #a1f397'>￥2000 </span>
                <span>14天</span>
              </div>

              <div style='margin-top: 40px;'>
                <x-button type='primary' style='' @click.native='applyFun(2)'>立即申请</x-button>
              </div>
            </div>
          </div>

          <!--<div style='margin-top: 50px;'>-->
            <!--<x-button type='primary' style='' @click.native='appliyMoney'>立即申请</x-button>-->
          <!--</div>-->
          <div style='margin-top: 30px;color: #54bd3a;' >
            注：点击申请即表示您已同意用户条款和隐私条款，本平台不对在校大学生开放
          </div>
        </div>
      </div>

      <footerCom></footerCom>
      <div v-transfer-dom>
        <alert v-model="show"  @on-show="onShow" @on-hide="onHide"> {{msg}}</alert>
      </div>
    </div>
</template>

<script>
  import {XButton,XHeader,Tabbar,TabbarItem,Swiper,Alert,TransferDomDirective as TransferDom,Countup } from 'vux'
  import footerCom from '../info/footerCom'
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
          Alert,
          footerCom,
          Countup
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
                img: '../../../static/time2.jpg',
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
              this.msg="暂不开放"
            }
          },
          appliyMoney(){
            let vm=this;
            vm.$api.post("api/bill/loan/1500","",function ({data}) {
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
  /*border: 2px solid #33a9b5;*/
}
  /deep/.weui-btn_primary{
    background: #3dd2c4;
    border-radius: 0px;
  }
/deep/.weui-btn_primary:not(.weui-btn_disabled):active{
  background: #2db5a2;
}
</style>
