<template>
  <div class="wrapper">
    <!--  这个可以传入图标 -->
    <SketchRule
      :thick="state.thick"
      :scale="state.scale"
      :width="1600"
      :height="800"
      :start-x="state.startX"
      :start-y="state.startY"
      :shadow="shadow"
      :isShowReferLine="state.isShowReferLine"
      @onCornerClick="handleCornerClick"
      :lines="state.lines"
    >
    </SketchRule>
    <div
      id="screens"
      ref="screensRef"
      @wheel="handleWheel"
      @scroll="handleScroll"
    >
      <div ref="containerRef" class="screen-container">
        <div id="canvas" :style="canvasStyle" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { computed, ref, reactive, onMounted, nextTick } from 'vue'

const rectWidth = 600
const rectHeight = 320
const screensRef: any = ref(null)
const containerRef: any = ref(null)
const state = reactive({
  scale: 0.75, //658813476562495, //1,
  startX: 0,
  startY: 0,
  lines: {
    h: [433, 588],
    v: [33, 143],
  },
  thick: 20,
  isShowRuler: true, // 显示标尺
  isShowReferLine: false, // 显示参考线
})
const shadow = computed(() => {
  return {
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight,
  }
})
const canvasStyle = computed(() => {
  return {
    width: rectWidth,
    height: rectHeight,
    transform: `scale(${state.scale})`,
  }
})
onMounted(() => {
  // 滚动居中
  screensRef.value.scrollLeft =
    containerRef.value.getBoundingClientRect().width / 2 - 400
})
const handleScroll = () => {
  const screensRect = document
    .querySelector('#screens')!
    .getBoundingClientRect()
  const canvasRect = document.querySelector('#canvas')!.getBoundingClientRect()
  // 标尺开始的刻度
  const startX =
    (screensRect.left + state.thick - canvasRect.left) / state.scale
  const startY = (screensRect.top + state.thick - canvasRect.top) / state.scale
  state.startX = startX
  state.startY = startY
}
const handleCornerClick = (e: any) => {
  console.log('handleCornerClick', e)
}
// 控制缩放值
const handleWheel = (e: {
  ctrlKey: any
  metaKey: any
  preventDefault: () => void
  deltaY: number
}) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    const nextScale = parseFloat(
      Math.max(0.2, state.scale - e.deltaY / 500).toFixed(2)
    )
    state.scale = nextScale
  }
  nextTick(() => {
    handleScroll()
  })
}
</script>
<style lang="scss">
.top {
  position: absolute;
  left: 0px;
  font-size: 20px;
}
.right {
  top: 200px;
  position: absolute;
  left: 0px;
  font-size: 20px;
}
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: sans-serif;
}
body * {
  box-sizing: border-box;
  user-select: none;
}
.wrapper {
  position: absolute;
  /* 特别注意,这个width要和传入组件的width成对应关系,
   也就是 780width +thick20 =800
   否则影子不和容器搭配
    */
  width: 1600px;
  height: 800px;
  background-color: #fafafc;
  border: 1px solid #dadadc;
  background-image: linear-gradient(#fafafc 14px, transparent 0),
    linear-gradient(90deg, transparent 14px, #373739 0);
  background-size: 15px 15px, 15px 15px;
}
#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}
.scale-value {
  position: absolute;
  bottom: 100%;
  left: 0;
}
.button {
  position: absolute;
  bottom: 100%;
  left: 100px;
}
#canvas {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 600px;
  height: 320px;
  background-size: 100% 100%;
  transform-origin: 50% 0;
}
</style>
