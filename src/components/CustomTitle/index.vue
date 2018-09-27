<template>
  <div flex-layout>
    <div class="tag"></div>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
  export default {
    name: 'custom-title',
    props: {
      title: ''
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "@/styles/common.scss";
  .tag {
    width: 5px;
    height: inherit;
    background-color: $blue;
    margin-right: 10px;
  }

  .title {
    font-weight: $semibold;
    font-size: $font-18;
  }
</style>
