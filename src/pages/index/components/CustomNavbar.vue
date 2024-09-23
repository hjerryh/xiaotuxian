<template>
  <view class="" navbar>
    <!-- logo 文字 -->
    <view class="logo">
      <image class="logo-image" src="@/static/images/logo.png"></image>
      <text class="logo-text">新鲜 · 亲民 · 快捷</text> </view
    >>
    <!-- 搜索框 -->
    <view class="search">
      <text class="icon-search">搜索商品</text>
      <text class="icon-scan"></text> </view
    >>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: url(@/static/images/navigator_bg.png);
  background-size: cover;
  padding-top: 20px;

  .logo {
    display: flex;
  }
}
</style>
