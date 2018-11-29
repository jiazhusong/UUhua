<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
#app{

  /deep/ .vux-header .vux-header-left a, .vux-header .vux-header-left button, .vux-header .vux-header-right a, .vux-header .vux-header-right button{
    color: #fff!important;
  }
  /deep/ .vux-header .vux-header-left .left-arrow:before{
    border:1px solid  #fff;
    border-width:1px 0 0 1px;
  }
  /deep/.vux-x-input .weui-icon{
    display: none;
  }
}
</style>
