<!-- 
 * @desc: 
 * @params: 
 * @attention: 
 * @date: 2023-05-21 22:11:50
!-->
<template>
  <div id="content"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
const state = reactive({});
onMounted(() => {
  creatDom()
});
const creatDom = () => {
  // 使用DocumentFragment创建1w个class为dot的div,并且整齐的分布在屏幕上
  const fragment = document.createDocumentFragment();
  const dom = document.getElementById("content");
  for (let i = 0; i < 10000; i++) {
    const div = document.createElement("div");
    div.className = "dot";
    fragment.appendChild(div);
  }
  dom.appendChild(fragment);
};


</script>

<style lang="scss" scoped>
#content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
::v-deep .dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 0.5px solid #000;
  margin: 4px;
}
</style>
