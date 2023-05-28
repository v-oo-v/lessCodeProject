<!--
 * @author: wangbin
 * @since: 2023-02-27
-->
<script setup lang="ts">
import sketchRule from "./components/commonRule.vue";
import contorlPanel from "../components/contorlPanel.vue";
</script>

<template>
  <div class="index-container">
    <sketchRule class="rule-cont" />
    <contorlPanel class="control" />
  </div>
</template>

<style lang="scss" scoped>
.index-container {
  width: 100vw;
  height: calc(100vh - 40px);
  .rule-cont {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .control {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
