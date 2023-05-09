<!--
 * @author: wangbin
 * @since: 2023-02-27
-->
<script setup>
  import HeaderComp from './Header/index.vue'
  import ContentComp from './Content/index.vue'
</script>

<template>
  <header-comp class="header" />
  <content-comp class="cont" />
</template>

<style lang="scss" scoped>
.header {
  height: 40px;
  overflow: hidden;
}
.cont {
  height: calc( 100vh - 40px);
}
</style>
