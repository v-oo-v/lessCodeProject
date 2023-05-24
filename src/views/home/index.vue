<!--
 * @author: wangbin
 * @since: 2023-02-27
-->
<script setup lang="ts">
  import sketchRule from './components/commonRule.vue';
</script>

<template>
  <div class="container">
      <sketchRule class="rule-cont" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .rule-cont {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
