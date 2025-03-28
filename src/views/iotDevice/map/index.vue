<script lang="ts" setup>
import mapView from '@/components/mapView.vue'
import { getParkingSpaceStatus, newOrUpdateSpaceReservationRecord } from "@/api";
import { default as mapApp } from '@/utils/map/init'
import { ref, onMounted } from 'vue'
import { get } from 'sortablejs';
import { number } from 'echarts';
import { useSocket } from '@/utils/websocket'
import { useUserStoreHook } from "@/store/modules/user";
import { parkingSpaceFNumList } from '@/views/data';

// 获取地图组件 DOM
const mapViewRef = ref(null);

const color = ["#7eacca", "#ff0000", "#00ff00"];

// websocket
const account = useUserStoreHook().userInfo.account;
const token = useUserStoreHook().userInfo.token;
const { socket, on } = useSocket(import.meta.env.VITE_WEBSOCKET_HOST + account, { protocol: [token] })

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
  getParkingSpaceStatus({ modelName: "10005" }).then(res => {
    for (let space of res.data) {
      mapApp.changeModelColor({
        id: Number(space.id),
        fnum: Number(space.fnum),
        color: color[space.status]
      })
    }
  })
}

on('close', () => console.log('Socket closed!'))

// webSocket连接上服务器时
on('open', (event: any) => {
  console.log('webSocket连接上服务器时', event)
})

socket.on('message', (data: any) => {
  if (data) {
    // TODO: 此处拿到后端推送过来的数据，进行你后续的数据渲染逻辑
    const jsonData = JSON.parse(JSON.parse(data).data);

    console.log(jsonData.id);
    console.log(jsonData.status);

    if (jsonData != null) {
      mapApp.changeModelColor({
        id: Number(jsonData.id),
        fnum: 1,
        color: color[Number(jsonData.status)]
      })
    }
  }
})

// 车位弹窗
const isDialogVisible = ref(false); // 控制弹窗显示

// 处理弹窗关闭
const handleDialogClose = () => {
  DialogVisible.value.visible = false;
  DialogVisible.value.title = "";
  DialogVisible.value.content = "";
  DialogVisible.value.showCancel = false;
  DialogVisible.value.showClose = true;
  DialogVisible.value.onConfirm = () => { };
  DialogVisible.value.onCancel = handleDialogClose;
  DialogVisible.value.onBeforeClose = handleDialogClose;
}

// 预约车位请求
const reserveParkingSpace = () => {
  console.log('预约车位请求');
  handleDialogClose();
  newOrUpdateSpaceReservationRecord({
    parkingSpaceId: selectedParkingSpace.value.id.toString(),
    reservationUserId: "2" // TODO: 此处为了测试，写死了用户ID，实际不需要传，后端会自动获取
  }).then(res => {
    console.log('预约车位请求成功', res);
    DialogVisible.value.title = "预约成功";
    DialogVisible.value.content = "车位预约成功，请在15分钟内到达车位，超时将自动取消预约。";
    DialogVisible.value.showClose = false;
    DialogVisible.value.onConfirm = handleDialogClose;
    DialogVisible.value.visible = true;
  })
}

const DialogVisible = ref({
  visible: false,
  title: "",
  content: "",
  showCancel: false,
  showClose: true,
  onConfirm: () => { },
  onCancel: handleDialogClose,
  onBeforeClose: handleDialogClose
});



const selectedParkingSpace = ref({
  name: "",
  id: 0,
  fnum: 0
}); // 存储选中的车位信息

mapApp.setClickNodeCallback((eventData) => {
  console.log('地图点击事件:', eventData);

  if (eventData.nodeType != 5) {
    return;
  }

  const { FloorNum, mapCoord, ID, name } = eventData;

  selectedParkingSpace.value = { name, id: ID, fnum: FloorNum };
  DialogVisible.value.title = "车位预约";
  DialogVisible.value.content = `是否预约${parkingSpaceFNumList.find(item => Number(item.value) == selectedParkingSpace.value.fnum)?.label}${selectedParkingSpace.value.name}，15分钟内未到达车位，将自动取消预约，当月3次超时取消后将无法使用预约功能。`;
  DialogVisible.value.showCancel = true;
  DialogVisible.value.onConfirm = reserveParkingSpace;
  DialogVisible.value.visible = true;

  // mapApp.createParkingSpaceDetailPop({ x: mapCoord.x, y: mapCoord.y, fnum: FloorNum, id: ID, name: name });
});


// 让 mapViewRef 在父组件中可访问
defineExpose({ mapViewRef });

defineOptions({
  name: "iotMap"
});
</script>

<template>
  <div class="home">
    <div>
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

      <div class="parking fix" id="parking"><span id="carid"></span>车位{{ selectedParkingSpace.name }}情况：<span
          id="YorN"></span></div>
    </div>


    <!-- 预约对话框 -->
    <el-dialog title="车位预约" v-model="DialogVisible.visible" width="30%" :before-close="DialogVisible.onBeforeClose"
      :show-close="DialogVisible.showClose" :close-on-click-modal="false" align-center>
      <span> {{ DialogVisible.content }} </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="DialogVisible.onConfirm">确定</el-button>
          <el-button v-if="DialogVisible.showCancel" @click="DialogVisible.onCancel">取消</el-button>
        </div>
      </template>
    </el-dialog>
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

.parking {
  width: 320px;
  height: 46px;
  line-height: 46px;
  left: 350px;
  bottom: 70px;
  border: 1px solid #083344;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgba(71, 92, 105, 0.8);
  font-size: 16px;
  text-align: center;
}

.fix {
  position: fixed;
}

.m-pop .title {
  font-size: 18px;
  text-align: center;
  margin: 10px 10px 10px 10px;
}

.pop-img {
  width: 20px;
  cursor: pointer;
}

.m-pop {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0px 5px;
  background: url(/public/image/pop-background.png) no-repeat center top/100% 100%;
  color: #fff;
  font-size: 12px;
}

.m-pop h4 {
  margin-top: 15px;
  /* margin-bottom: 10px; */
  margin-left: 10px;
  color: #52CBF6;
  font-weight: 700;
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

.m-box {
  display: flex;
  justify-content: space-between;
}

.m-text {
  font-size: 14px;
  text-align: center;
  width: 100%;
  line-height: 30px;
}

.m-text p {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.m-span {
  color: #97A6B9;
  width: 33%;
}

.m-span2 {
  width: 33%;
  color: #86C341;
}

.m-label {
  margin: 5px;
  display: contents;
}
</style>
