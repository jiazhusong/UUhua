/**
* 作者: jsz
* 日期: 2018-12-28
* 描述:
*/
<template>

      <tabbar style='position: fixed'>
        <tabbar-item :selected="isSelect==1" link="/layout">
          <i slot="icon" class='iconfont icon-shouye'></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="isSelect==2" link="/myinfo">
          <i slot="icon" class='iconfont icon-ziliaorenzheng'></i>
          <span slot="label">资料认证</span>
        </tabbar-item>
        <tabbar-item :selected="isSelect==3" link="/userlayout">
          <i slot="icon" class='iconfont icon-wode'></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>

</template>

<script>
  import {Tabbar,TabbarItem } from 'vux'
    export default {
        name: "footerCom",
        components: {
          Tabbar,
          TabbarItem,
        },
        props: [],
        data() {
            return {
              isSelect:""
            }
        },
        mounted() {
          let pa=this.$route.path;
          if(pa=="/layout"){
            this.isSelect=1;
          }else if(pa=="/myinfo"){
            this.isSelect=2;
          }else {
            this.isSelect=3;
          }
        },
        methods: {}
    }
</script>

<style scoped lang='less'>

</style>
