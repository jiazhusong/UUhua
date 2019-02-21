/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: rgb(94, 35, 237);line-height: 50px;color: #fff'>首页</x-header>
      <div :style='{"height":maxHei}' style='overflow: auto'>
        <div style=''>
          <swiper :list="list" auto style="width:100%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
        <div style='padding: 20px 30px'>
          <div style='color: #fff;'>
            <div :class='{"active":active==1}' style='background: #6c27a0;height: 140px;border-radius: 70px;text-align: center' @click='applyFun(1)'>
              <div>
                <span>借款金额：</span>
                <countup style='color: #00ffe7;font-size: 28px' :start-val="1" :end-val="1500" :duration="2" ></countup>
                <span>元</span>
              </div>

              <div style=''>
                <!--<span style='font-size: 28px'>1500</span>-->
                <span>周期</span>
                <span>7天</span>
                <x-button type='primary' style='margin-top:20px;border-bottom-left-radius: 70px;border-bottom-right-radius: 70px;width: 95%' @click.native='appliyMoney'>立即申请</x-button>
              </div>
            </div>
            <!--<div :class='{"active":active==2}' style='background: rgb(216, 122, 122);height: 80px;display: flex;justify-content: space-around;' @click='applyFun(2)'>-->
              <!--<div>-->
                <!--<countup style='color: rgb(0, 255, 92);font-size: 28px' :start-val="1" :end-val="3000" :duration="2" ></countup>-->
                <!--<span>元</span>-->
              <!--</div>-->
              <!--<div style=';font-size: 24px'>-->
                <!--&lt;!&ndash;<span style='font-size: 28px'>1500</span>&ndash;&gt;-->
                <!--<br>-->
                <!--<span>14天</span>-->
              <!--</div>-->
            <!--</div>-->
          </div>

          <div style='margin-top: 50px;'>
            <!--<x-button type='primary' style='' @click.native='appliyMoney'>立即申请</x-button>-->
          </div>
          <div style='margin-top: 20px;color: #5b0bdc;' >
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
              this.msg="正常还款多次以上可申请"
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
  box-shadow: 0 0 30px #3c10a5;
  border: 2px solid #5dc55b;
}
</style>
