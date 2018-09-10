<template>
    <img :src="path" alt="" @error="setDefaultImg" />
</template>

<script>
  export default {
    name: 'icon',
    props: {
      iconName: ''
    },
    data() {
      return {
        path: '',
        pathPrefix: '/static/icon/'
      }
  },
    created() {
      if (!this.iconName) return
      this.path = this.pathPrefix + this.iconName + '.png'
  },
    methods: {
      setDefaultImg() {
        this.path = '/static/icon/default.png'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/common.scss";
  img {
    width: 32px;
    height: 32px;
    &[default] {
      width: 32px;
      height: 32px;
    }
    &[small] {
      width: 24px;
      height: 24px;
    }
    &[xsmall] {
      width: 16px;
      height: 16px;
    }
    &[large]{
      width: 48px;
      height: 48px;
    }
    &[xlarge]{
      width: 96px;
      height: 96px;
    }
    &[xxlarge]{
      width: 192px;
      height: 192px;
    }

  }
</style>
