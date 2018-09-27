<template>
  <el-row>
    <el-col>
      <icon :iconName="iconName"></icon>
    </el-col>
    <el-col>
      <el-row ></el-row>
      <el-row></el-row>
    </el-col>
  </el-row>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon
  },
  data: function() {
    return {
      iconName: ""
    };
  }
};
</script>

<style>
</style>
