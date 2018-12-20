/**
* 作者: jsz
* 日期: 2018-11-08
* 描述:
*/
<template>
  <div>
    <x-header style='text-align: center;background: rgb(89, 92, 204);line-height: 50px;color: #fff'>申请记录</x-header>
    <div :style='{"height":maxHei}' style='overflow: auto;margin-bottom: 60px; '>
      <div>逾期滞纳金：<span style='color: rgb(63, 33, 222)'>{{datas.length>0?datas[0].penalty:0}}</span></div>
      <x-table :cell-bordered="false"  style="background-color:#fff;">
        <thead>
        <tr>
          <th>周期</th>
          <th>申请时间</th>
          <th>还款时间</th>
          <th>状态</th>
          <th>申请额度</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='item in datas'>
          <td>{{item.loanDay}}天</td>
          <td>{{item.submitDate.slice(0,10)}}</td>
          <td>{{item.billRepaymentTime?item.billRepaymentTime.substr(0,10):""}}</td>
          <td>{{item.status|statusFun}}</td>
          <td style='color: rgb(63, 33, 222)'>{{item.bill}}</td>
        </tr>

        </tbody>
      </x-table>
      <p style='text-align: center' v-if='datas.length==0&&tipshow==true'>暂无数据</p>
    </div>
    <tabbar style='position: fixed'>
      <tabbar-item link="/layout">
        <i slot="icon" class='iconfont icon-yemian-copy'></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/recordQuery">
        <i slot="icon" class='iconfont icon-zhangdan'></i>
        <span slot="label">账单查询</span>
      </tabbar-item>
      <tabbar-item selected link="/userlayout">
        <i slot="icon" class='iconfont icon-wodedangxuan'></i>
        <span slot="label">我的</span>
      </tabbar-item>

    </tabbar>
    <div v-transfer-dom>
      <loading :show="show2" text=""></loading>
    </div>
    <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask text="" position="middle">{{popmsg}}</toast>

  </div>

</template>

<script>
  import {XHeader,Tabbar,TabbarItem ,XTable,Loading,TransferDomDirective as TransferDom,Toast   } from 'vux'

  export default {
        name: "applicationRecord",
    directives: {
      TransferDom
    },
        components: {
          XHeader,
          Tabbar,
          TabbarItem,
          XTable,
          Loading,
          Toast

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
              datas:[],
              tipshow:false,
              show2:false,
              showPositionValue:false,
              popmsg:""
            }
        },
        mounted() {
          let vm=this;
          vm.maxHei=window.screen.height-100+"px";
          this.$vux.loading.show({
            text: '正在加载中...'
          })
          vm.$api.get("api/bill/loan/history",{
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
        methods: {

        }
    }
</script>

<style scoped lang='less'>

</style>
