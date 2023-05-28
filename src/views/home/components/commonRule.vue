<!-- 
 * @desc: 
 * @params: 
 * @attention: 
 * @date: 2023-05-21 22:11:50
!-->
<template>
  <div id="container"></div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { eventBus } from "@/utils/eventBus";
import { debounce } from "lodash";

const state = reactive({});
onMounted(() => {
  // 使用 requestAnimationFrame 优化性能
  requestAnimationFrame(creatDom);
  getStart();

  eventBus.on("backCreate", () => {
    const dom = document.getElementsByClassName(`customer`);
    // 删除最后一个
    dom[dom.length - 1].remove();
  });
});

const creatDom = () => {
  // 使用DocumentFragment创建1w个class为dot的div,并且整齐的分布在屏幕上
  const fragment = document.createDocumentFragment();
  const dom = document.getElementById("container");
  for (let i = 0; i < 2200; i++) {
    const div = document.createElement("div");
    div.className = "dot";
    fragment.appendChild(div);
  }
  dom.appendChild(fragment);
  getStart();
};

let isMouseDown = ref(false);
let selectionArea = null;
const nums = ref(0);

const getStart = () => {
  const container = document.getElementById("container");

  let startX = 0;
  let startY = 0;
  const topHeight = 40;

  const mouseDown = (e) => {
    if (e.button !== 0) return;
    isMouseDown.value = true;
    startX = e.clientX - container.offsetLeft;
    startY = e.clientY - container.offsetTop;
    document.addEventListener("mousemove", mouseMove);
  };
  container.addEventListener("mousedown", mouseDown);

  const mouseMove = (event) => {
    if (!isMouseDown.value) return;
    if (selectionArea) {
      selectionArea.remove();
    }
    const currentX = event.clientX - container.offsetLeft;
    const currentY = event.clientY - container.offsetTop;
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY) + topHeight;
    selectionArea = document.createElement("div");
    selectionArea.className = `customer`;
    selectionArea.style.position = "absolute";
    selectionArea.style.left = x + "px";
    selectionArea.style.top = y + "px";
    selectionArea.style.width = width + "px";
    selectionArea.style.height = height + "px";
    selectionArea.style.border = "1px solid #000";
    selectionArea.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    container.appendChild(selectionArea);
  };

  container.addEventListener("mousemove", mouseMove);

  const mouseUp = () => {
    isMouseDown.value = false;
    selectionArea = null;
    nums.value++;
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };
  container.addEventListener("mouseup", mouseUp);

  const getClosestPoint = (doms, coordinates) => {
    const arr = [];
    for (let i = 0; i < doms.length; i++) {
      const { x, y } = doms[i].getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(coordinates.x - x, 2) + Math.pow(coordinates.y - y, 2)
      );
      arr.push({
        distance,
        x,
        y,
      });
    }
    const min = Math.min(...arr.map((item) => item.distance));
    const minIndex = arr.findIndex((item) => item.distance === min);
    const { x, y } = arr[minIndex];
    return { x, y };
  };
  // watch监听 nums 的变化
  watch(
    () => nums.value,
    debounce((val) => {
      // 获取最后一个选中的区域四个点的坐标
      const dotHeight = 2;
      const dom = document.getElementsByClassName(`customer`);
      const lastDom = dom[dom.length - 1];
      const { x, y, width, height } = lastDom.getBoundingClientRect();
      const leftTop = {
        x,
        y,
      };
      const rightTop = {
        x: x + width,
        y,
      };
      const leftBottom = {
        x,
        y: y + height,
      };
      const rightBottom = {
        x: x + width,
        y: y + height,
      };
      // 根据leftTop坐标，获取距离最近的点的坐标
      const doms = document.getElementsByClassName(`dot`);
      const { x: x1, y: y1 } = getClosestPoint(doms, leftTop);
      const { x: x2, y: y2 } = getClosestPoint(doms, rightTop);
      const { x: x3, y: y3 } = getClosestPoint(doms, leftBottom);
      // 根据四个点的坐标,改变最后一个选中区域的坐标, 并且考虑dot本身的宽高
      lastDom.style.left = x1 + dotHeight / 2 + "px";
      lastDom.style.top = y1 + dotHeight / 2 + "px";
      lastDom.style.width = x2 - x1 + "px";
      lastDom.style.height = y3 - y1 + "px";
      lastDom.style.borderColor = "#409EFF";
      // lastDom添加可编辑属性
      lastDom.setAttribute("draggable", true);
      // lastDom添加 hover属性
      lastDom.setAttribute("hover", true);
      // 四个边框中间位置展示可编辑图标
      // const leftTopDom = document.createElement("div");
      // leftTopDom.className = "left-top";
      // leftTopDom.style.position = "absolute";
      // leftTopDom.style.left = x1 - dotHeight / 2 + "px";
      // leftTopDom.style.top = y1 - dotHeight / 2 + "px";
      // leftTopDom.style.width = dotHeight + "px";
      // leftTopDom.style.height = dotHeight + "px";
      // leftTopDom.style.backgroundColor = "#409EFF";
      // leftTopDom.style.cursor = "move";
      // leftTopDom.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      // leftTopDom.setAttribute("draggable", true);
      // leftTopDom.setAttribute("hover", true);
      container.appendChild(leftTopDom);
    }, 100)
  );
};
</script>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
::v-deep .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 0.5px solid #999;
  margin: 12px;
}
</style>
