<script lang="ts" setup>
import mapView from '@/components/mapView.vue'
import { default as mapApp } from '@/utils/map/init'
import { ref, onMounted } from 'vue'

// 获取地图组件 DOM
const mapViewRef = ref(null);

onMounted(() => {
  // 赋值到 mapApp 对象中方便调用子组件方法
  mapApp.mapContainer = mapViewRef.value;
                      	// //调用批量修改颜色接口来修改
                        // mapApp.changeModelColor({
                        //     id: 70090,
                        //     fnum: 1,
                        //     color: "#ff0000"
                        // });
});

// 让 mapViewRef 在父组件中可访问
defineExpose({ mapViewRef });

defineOptions({
  name: "iotMap"
});
</script>

<template>
  <div class="home">
    <!-- 地图资源加载组件 -->
    <mapView ref="mapViewRef"></mapView>

    <!-- 公共气泡模块 -->
    <!-- <commonPopControl></commonPopControl> -->
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 0 12px !important;
  line-height: 38px;
  font-weight: bold;
}
.home {
  width: 80%;
  height: 600px;
  box-sizing: border-box;
  margin: auto;
  position: relative;
  overflow: hidden;
}
</style>
