<!-- 
 * @desc: 
 * @params: 
 * @attention: 
 * @date: 2023-05-27 19:39:50
!-->
<template>
  <div class="container">
    <el-card>
      <el-button type="primary" @click="back">撤回</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { eventBus } from "@/utils/eventBus";

const back = () => {
  eventBus.emit("backCreate");
};
</script>

<style lang="scss" scoped></style>
