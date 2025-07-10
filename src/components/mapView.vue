<template>
  <div class="container">
    <!-- 禁止点击遮罩层 -->
    <div class="clickShade" v-show="clickShadeSign"></div>
    <!-- loading -->
    <loading-triangle></loading-triangle>

    <!-- 地图容器 -->
    <div id="map-container"></div>

    <!-- 用于装载多个室内图(可能多个，尽量单个iframe) -->
    <div id="map-frames-container" v-show="isShowModelMap">
      <!-- 单模型地图的底层背景遮罩 -->
      <div class="model_map_shade"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from "vue";
import { default as mapApp } from "@/utils/map/init";
import LoadingTriangle from "@/components/LoadingTriangle.vue";

// 定义状态
const clickShadeSign = ref(true); // 初始化的防点击蒙版
const isShowModelMap = ref(false); // 是否展示内嵌地图场景的 iframe
let isLoadedInnerMap = false; // 是否已经加载过室内地图（不需要 ref，因为不会影响视图）

// 挂载时初始化地图
onMounted(() => {
  mapApp.initMap();
  window.mapApp = mapApp; // 方便调试，生产环境可注释

  mapApp.clickShadeSign = clickShadeSign;
  mapApp.isShowModelMap = isShowModelMap;
});

// 创建 iframe 框架
const createFrame = (mapId, pagePath, onLoadCallback) => {
  const frameContainer = document.getElementById("map-frames-container");
  const iframeDom = document.createElement("iframe");

  iframeDom.className = "map_frame animate__animated";
  iframeDom.id = `map-frame-${mapId}`;
  iframeDom.src = pagePath;
  iframeDom.style.display = "none";
  iframeDom.style.border = "none";

  frameContainer.appendChild(iframeDom);

  iframeDom.onload = () => {
    console.log("on iframe loaded");
    if (onLoadCallback) onLoadCallback(iframeDom.contentWindow);
  };
};

// 展示单模型地图
const showInnerMap = (configs = {}) => {
  const mapId = configs.id;
  isShowModelMap.value = configs.isShow;

  if (configs.isShow && isLoadedInnerMap) {
    mapApp.map.stopRender();
    mapApp.floorControl.visible = false;
    mapApp.frameWindows.innerMap.map.reRender();
  } else if (!configs.isShow && isLoadedInnerMap) {
    mapApp.floorControl.visible = true;
    mapApp.map.reRender();
    mapApp.frameWindows.innerMap.map.stopRender();
  }

  if (!isLoadedInnerMap) {
    createFrame(mapId, "./inner.html", (frameWindow) => {
      mapApp.frameWindows.innerMap = frameWindow.mapApp;
      isLoadedInnerMap = true;

      document.getElementById(`map-frame-${mapId}`).style.display = configs.isShow ? "block" : "none";

      let mapOptions = configs.options;
      for (let o in mapOptions) {
        frameWindow.map.options[o] = mapOptions[o];
      }

      frameWindow.mapApp.mapId = mapId;
      frameWindow.mapApp.initMap();

      frameWindow.mapApp.map.on("loadComplete", () => {
        mapApp.dispatchEvent({ type: "mapLoaded", id: mapId });
      });

      mapApp.dispatchEvent({ type: "iframeLoaded", window: frameWindow });
    });
  } else {
    document.getElementById(`map-frame-${mapId}`).style.display = configs.isShow ? "block" : "none";
  }
};

// 让父组件可以访问 showInnerMap 方法
defineExpose({ showInnerMap });
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .clickShade {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: wait;
  }

  #map-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .model_map_shade {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    backdrop-filter: blur(50px);
  }

  #map-frames-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);

    :deep(.map_frame) {
      z-index: 1005;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.m-pop {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0px 5px;
  background: url(/public/image/pop-background.png) no-repeat center top/100% 100%;
  color: #fff;
  font-size: 12px;

  h4 {
    margin-top: 15px;
    /* margin-bottom: 10px; */
    margin-left: 10px;
    color: #52CBF6;
    font-weight: 700;
  }

  .m-box {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-size: 18px;
    text-align: center;
    margin: 10px 10px 10px 10px;
  }

  .pop-img {
    width: 20px;
    cursor: pointer;
  }
}

.myPopClose {
  position: absolute;
  top: 12px;
  right: 15px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #919fb9;
  cursor: pointer;
  font-size: 20px;
  background: url(/public/image/pop-close.png) no-repeat center top/100% 100%;
}
</style>