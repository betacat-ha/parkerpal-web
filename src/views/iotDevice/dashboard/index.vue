<script lang="ts" setup>
import TrendChart from "./TrendChart.vue";
import DeviceStatusCell from "./DeviceStatusCell.vue";
import PaymentTable from "./Statistics.vue";

// 车位类型枚举
enum ParkingSlotType {
  Small = 'small', // 小型车辆车位
  Large = 'large', // 货车车辆车位
  ParentChild = 'parentChild', // 子母车位
  LoadingZone = 'loadingZone', // 卸货区
}

// 车位类型配置
const parkingSlotConfig = {
  [ParkingSlotType.Small]: { width: 20, height: 40, color: '#95de64', occupiedColor: '#ff4d4f' },
  [ParkingSlotType.Large]: { width: 30, height: 20, color: '#69c0ff', occupiedColor: '#ff7a45' },
  [ParkingSlotType.ParentChild]: { width: 80, height: 40, color: '#b37feb', occupiedColor: '#ff85c0' },
  [ParkingSlotType.LoadingZone]: { width: 100, height: 50, color: '#ffd666', occupiedColor: '#ff9c6e' },
};

const svgWidth = ref(800);
const svgHeight = ref(600);
const scale = ref(1); // 缩放比例

// 停车位数据
interface ParkingSlot {
  id: number;
  x: number;
  y: number;
  type: ParkingSlotType;
  occupied: boolean;
}

const parkingSlots = ref<ParkingSlot[]>([
  // 第一排停车位
  { id: 1, x: 10, y: 10, type: ParkingSlotType.Small, occupied: false },
  { id: 2, x: 40, y: 10, type: ParkingSlotType.Small, occupied: true },
  { id: 3, x: 70, y: 10, type: ParkingSlotType.Small, occupied: false },
  { id: 3, x: 100, y: 10, type: ParkingSlotType.Small, occupied: false },
  { id: 3, x: 130, y: 10, type: ParkingSlotType.Small, occupied: false },
  { id: 3, x: 160, y: 10, type: ParkingSlotType.Small, occupied: false },
  // // 第二排停车位
  // { id: 4, x: 10, y: 100, width: 40, height: 20, occupied: true },
  // { id: 5, x: 60, y: 100, width: 40, height: 20, occupied: false },
  // { id: 6, x: 110, y: 100, width: 40, height: 20, occupied: true },
]);

const lanes = ref([
  { path: 'M10,60 H200 M10,90 H200', stroke: '#666', strokeWidth: 2 }, // 车道
]);

const isDragging = ref(false); // 是否正在拖动
const startX = ref(0); // 鼠标按下的初始 X 坐标
const startY = ref(0); // 鼠标按下的初始 Y 坐标
const offsetX = ref(0); // 画布偏移量 X
const offsetY = ref(0); // 画布偏移量 Y

const handleZoom = (event: WheelEvent) => {
  event.preventDefault();
  const scaleFactor = event.deltaY < 0 ? 1.1 : 0.9; // 缩放比例

  svgWidth.value *= scaleFactor;
  svgHeight.value *= scaleFactor;
  scale.value *= scaleFactor; // 更新缩放比例
};

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
};

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    const dx = (event.clientX - startX.value) / scale.value; // 考虑缩放比例
    const dy = (event.clientY - startY.value) / scale.value; // 考虑缩放比例

    // 更新偏移量
    offsetX.value += dx;
    offsetY.value += dy;

    // 更新 viewBox
    startX.value = event.clientX;
    startY.value = event.clientY;
  }
};

const handleMouseUp = () => {
  isDragging.value = false;
};

const getSlotPath = (slot: ParkingSlot) => {
  const { x, y, type } = slot;
  const { width, height } = parkingSlotConfig[type];
  return `
    M${x},${y}
    L${x + width},${y}
    L${x + width},${y + height - 10}
    L${x + width - 20},${y + height}
    L${x},${y + height}
    Z
  `;
};

const getTrianglePath = (slot: ParkingSlot) => {
  const { x, y, type } = slot;
  const { width, height } = parkingSlotConfig[type];
  return `
    M${x + width - 20},${y + height}
    L${x + width},${y + height - 10}
    L${x + width - 20},${y + height - 20}
    Z
  `;
};

const activeSlot = ref<ParkingSlot | null>(null);
const tooltipStyle = ref({ top: '0', left: '0' });
let hideTimeout: number | null = null;

const showTooltip = (slot: ParkingSlot) => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  activeSlot.value = slot;
  tooltipStyle.value = {
    top: `${slot.y + parkingSlotConfig[slot.type].height + 20}px`,
    left: `${slot.x + parkingSlotConfig[slot.type].width / 2}px`,
  };
};

const hideTooltip = () => {
  hideTimeout = setTimeout(() => {
    activeSlot.value = null;
  }, 1000); // 1秒后隐藏
};

defineOptions({
  name: "iotDashboard"
});
</script>

<template>
  <div>
    <!--      <CountTo :endVal="item.value" :startVal="1" class="text-2xl" />-->
    <div class="flex gap-[20px]">
      <!-- <DeviceStatusCell :data-list="[]" />
      <PaymentTable :data-list="[]" /> -->
          <svg
      ref="parkingSvg"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      preserveAspectRatio="xMidYMid meet"
      @wheel="handleZoom"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
      :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"
    >
      <!-- 绘制车道 -->
      <path
        v-for="(lane, index) in lanes"
        :key="`lane-${index}`"
        :d="lane.path"
        :stroke="lane.stroke"
        :stroke-width="lane.strokeWidth"
        fill="none"
      />
      
      <!-- 绘制停车位 -->
      <g
        v-for="slot in parkingSlots"
        :key="slot.id"
        @mouseenter="showTooltip(slot)"
        @mouseleave="hideTooltip"
      >
        <!-- 车位主体 -->
        <path
          :d="getSlotPath(slot)"
          :fill="slot.occupied ? parkingSlotConfig[slot.type].occupiedColor : parkingSlotConfig[slot.type].color"
          stroke="#666"
          stroke-width="1"
        />
        <!-- 三角形指示 -->
        <!-- <path
          :d="getTrianglePath(slot)"
          fill="#666"
        /> -->
        <!-- 车位编号 -->
        <text
          :x="slot.x + parkingSlotConfig[slot.type].width / 2"
          :y="slot.y + parkingSlotConfig[slot.type].height + 15"
          text-anchor="middle"
          font-size="12"
          fill="#000"
        >
          {{ slot.number }}
        </text>
      </g>
    </svg>
    </div>
    <!-- <TrendChart /> -->
         <!-- 悬浮窗 -->
    <div
      v-if="activeSlot"
      class="tooltip"
      :style="tooltipStyle"
    >
      <div class="tooltip-content">
        <h3>车位 {{ activeSlot.number }}</h3>
        <p>{{ activeSlot.details }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 0 12px !important;
  line-height: 38px;
  font-weight: bold;
}
svg {
  width: 100%;
  height: 100%;
}
svg:active {
  cursor: grabbing;
}
.tooltip {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.tooltip-content h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
}
.tooltip-content p {
  margin: 0;
  font-size: 12px;
}
</style>
