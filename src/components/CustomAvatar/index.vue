<template>
  <div class="icon-container" :class="bgColor" >
    <img :src="path" alt="" @error="setDefaultImg" />
  </div>
</template>

<script>
export default {
  name: 'custom-avatar',
  props: {
    iconName: '',
    bgColor: ''
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

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/common.scss";
.icon-container {
  display: inline-block;
  background-color: black;
  padding: 16px;
  width: 64px;
  height: 64px;
  img {
    width: 32px;
    height: 32px;
  }
  border-radius: 50%;
  &[default] {
    padding: 16px;
    width: 64px;
    height: 64px;
    img {
      width: 32px;
      height: 32px;
    }
  }
  &[small] {
    padding: 12px;
    width: 48px;
    height: 48px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  &[xsmall] {
    padding: 8px;
    width: 32px;
    height: 32px;
    img {
      width: 16px;
      height: 16px;
    }
  }
  &.orange {
    background-color: $orange;
  }
  &.purple {
    background-color: $purple;
  }
  &.green {
    background-color: $green;
  }
  &.blue {
    background-color: $blue;
  }
}
</style>
