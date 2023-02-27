<!--
 * @author: wangbin
 * @since: 2023-02-27
-->
<script setup lang="ts">
  import sketchRule from './components/sketchRule1.vue';
</script>

<template>
  <div class="container">
    <div class="side"></div>
    <div class="content">
      <sketchRule />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .side  {
    width: 40%;
    height: 100%;
    border-right: 1px solid;
  }
  .content {
    width: 60%;
    height: 100%;
    position: relative;
  }
}
</style>
