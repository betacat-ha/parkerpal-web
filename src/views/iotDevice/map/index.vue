<script lang="ts" setup>
import mapView from '@/components/mapView.vue'
import { getParkingSpaceStatus } from "@/api";
import { default as mapApp } from '@/utils/map/init'
import { ref, onMounted } from 'vue'
import { get } from 'sortablejs';

// 获取地图组件 DOM
const mapViewRef = ref(null);

const color = ["#7eacca", "#ff0000", "#00ff00"];

onMounted(() => {
  // 赋值到 mapApp 对象中方便调用子组件方法
  mapApp.map.mapContainer = mapViewRef.value;
  //调用批量修改颜色接口来修改
  mapApp.map.on('modelLoadedAll', () => {
    refreshSpacesStatus();
  })
});

// 定时刷新地图
setInterval(() => {
  // refreshSpacesStatus();
}, 5000);

const refreshSpacesStatus = () => {
  getParkingSpaceStatus({}).then(res => {
    for (let space of res.data) {
      mapApp.changeModelColor({
        id: space.id,
        fnum: space.fnum,
        color: color[space.status]
      })
    }
  })
}


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
    <div class="codition fix">
      <ul>
        <li><span class="codition-first"></span>占用车位</li>
        <li><span class="codition-second"></span>空闲车位</li>
        <li><span class="codition-third"></span>固定车位</li>
      </ul>
    </div>
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
  width: 95%;
  height: 95%;
  box-sizing: border-box;
  margin: auto;
  position: relative;
  overflow: hidden;
}

.codition {
  width: 120px;
  left: 10px;
  bottom: 120px;
}
</style>
