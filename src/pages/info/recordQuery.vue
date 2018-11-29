/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
    <div>
      <x-header style='text-align: center;background: #ff9000;line-height: 50px;color: #fff'>申请记录</x-header>
      <div :style='{"height":maxHei}'>

        <x-table  :cell-bordered="false" style="background-color:#fff;">
          <thead>
          <tr>
            <th>申请周期</th>
            <th>申请时间</th>
            <th>状态</th>
            <th>申请额度</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='item in datas'>
            <td>{{item.loanDay}}天</td>
            <td>{{item.submitDate}}</td>
            <td>{{item.status|statusFun}}</td>
            <td style='color: rgb(255, 144, 0)'>{{item.bill}}</td>
          </tr>
          </tbody>
        </x-table>
        <p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>
      </div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>
      <tabbar style='position: fixed'>
        <tabbar-item link="/layout">
          <i slot="icon" class='iconfont icon-yemian-copy'></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item selected link="/userlayout">
          <i slot="icon" class='iconfont icon-wodedangxuan'></i>
          <span slot="label">我的</span>
        </tabbar-item>

      </tabbar>
      <div v-transfer-dom>
        <loading :show="show2" text=""></loading>
      </div>
    </div>
</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable ,Toast,Loading,TransferDomDirective as TransferDom } from 'vux'
    export default {
        name: "recordQuery",
      directives: {
        TransferDom
      },
        components: {
          XHeader,
          Tabbar,
          TabbarItem,
          XTable,
          Toast,
          Loading
        },
        props: [],
      filters:{
        statusFun(value){
          if(value=="PENDING"){
            return "待审核"
          }else if(value=="PASS"){
            return "审核通过"
          }else {
            return "结束"
          }
        }
      },
        data() {
            return {
              maxHei:"",
              tipshow:false,
              datas:[],
              showPositionValue:false,
              popmsg:"",
              show2:false,
            }
        },
        mounted() {
          let vm=this;
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.maxHei=window.screen.height-100+"px";
          vm.$api.get("api/bill/loan/check",{
            page:0,
            size:50,
          },function ({data}) {
            vm.$vux.loading.hide();
            if(data.code==20){
              vm.tipshow=true;
              vm.datas=data.data.list
            }else if(data.code==401){
              sessionStorage.clear();
              vm.$router.push({
                path:"/"
              })

            }else {
              vm.popmsg=data.message;
              vm.showPositionValue=true;
            }
          })
        },
        methods: {}
    }
</script>

<style scoped lang='less'>

</style>
