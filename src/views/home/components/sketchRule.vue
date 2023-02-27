<!--
 * @author: wangbin
 * @since: 2023-02-27
-->
<template>
  <div class="wapper">
    <SketchRule
      :thick="state.thick"
      :scale="state.scale"
      :width="580"
      :height="580"
      :start-x="state.startX"
      :start-y="state.startY"
      :shadow="shadow"
      :isShowReferLine="state.isShowReferLine"
      @onCornerClick="handleCornerClick"
      :lines="state.lines"
    >
    </SketchRule>
    <div id="screens" ref="screensRef">
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
  const screensRef:any = ref(null)
  const containerRef:any = ref(null)

  const state = reactive({
    scale: 0.75, //658813476562495, //1,
    startX: 0,
    startY: 0,
    lines: {
      h: [433, 588],
      v: [33, 143]
    },
    thick: 20,
    isShowRuler: true, // 显示标尺
    isShowReferLine: false // 显示参考线
  })

  const shadow = computed(() => {
    return {
      x: 0,
      y: 0,
      width: rectWidth,
      height: rectHeight
    }
  })

  const canvasStyle = computed(() => {
    return {
      width: rectWidth,
      height: rectHeight,
      transform: `scale(${state.scale})`
    }
  })

  const handleCornerClick = () => {

  }

  onMounted(() => {
    screensRef.value.scrollLeft = containerRef.value!.getBoundingClientRect().width / 2 -400
  })


</script>

<style lang="scss" scoped>
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
  top: 100px;
  left: 140px;
  /* 特别注意,这个width要和传入组件的width成对应关系,
   也就是 780width +thick20 =800
   否则影子不和容器搭配,这个在2X中会进行自动匹配修正,省得配置麻烦
    */
  width: 600px;
  height: 600px;
  background-color: #f5f5f5;
  border: 1px solid #dadadc;
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
