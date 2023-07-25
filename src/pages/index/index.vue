<template>
  <div class="content">
    <image class="logo" src="/static/logo.png"></image>
    <div class="text-area">
      <text class="title">{{ title }}</text>
    </div>
    <div class="count">count: {{ count }}</div>
    <div class="btn" @click="increment">increase</div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
