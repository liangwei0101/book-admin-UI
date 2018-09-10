<template>
  <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <custom-avatar :iconName="book.iconName" :bgColor="book.bgColor"></custom-avatar>
        </div>
        <div class="card-panel-description">
          <div>
          <count-to class="card-panel-num" :startVal="0" :endVal="book.count" :duration="2600"></count-to>
          <div class="card-panel-text">{{ book.title}}</div>
          </div>
        </div>
      </div>
</template>

<script>
import CountTo from 'vue-count-to'
import CustomAvatar from '@/components/CustomAvatar'
export default {
  name: 'card',
  components: {
    CountTo,
    CustomAvatar
  },
  created() {},
  props: {
    book: {
      iconName: '',
      count: 0,
      title: '',
      bgColor: ''
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/common.scss";
.card-panel {
  display: flex;
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  margin-right: 10px;
  &:hover {
    .card-panel-icon-wrapper {
      color: $white;
    }
  }
  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    font-size: $font-48;
  }
  .card-panel-description {
    font-weight: bold;
    margin-left: 0px;
    display: flex;
    align-items: center;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
    }
    .card-panel-num {
      font-size: 20px;
      display: block;
    }
  }
}
</style>
