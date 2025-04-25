<script lang="ts" setup>
import CountTo from "@/components/CountTo/src/CountTo.vue";
import { useUserStore } from "@/store/modules/user";
import { getStatistics } from "@/api";
import { is } from "@/utils/is";

const isAdmin = useUserStore().isAdmin;
const userId = useUserStore().userInfo.id;
const data = ref<any>({
  todayPaymentAmount: 0,
  todayTemporaryAmount: 0,
  totalAccumulatePaymentAmount: 0,
  totalTemporaryAmount: 0
});
const getData = () => {
  getStatistics({ userId }).then((res: any) => {
    data.value = res.data;
  });
};

const isDataEmpty = computed(() => {
  return (
    data.value.todayPaymentAmount === 0 &&
    data.value.todayTemporaryAmount === 0 &&
    data.value.totalAccumulatePaymentAmount === 0 &&
    data.value.totalTemporaryAmount === 0
  );
});
onBeforeMount(getData);
</script>

<template>
  <div class="bg-white px-[20px] mt-[20px] rounded-[4px] dark:bg-[#141414] flex-1">
    <div class="font-bold text-[20px] leading-[60px]">{{ isAdmin ? "收益统计" : "支出统计" }}</div>
    <el-empty v-if="isDataEmpty" description="暂无数据" class="h-[400px] w-[100%]" />
    <div v-if="!isDataEmpty" class="flex gap-[20px] flex-col items-center">
      <el-card class="flex-1 w-[80%]">
        <div class="flex items-center gap-20 mb-[20px]">
          <div class="h-[100%] w-[100px]">{{ isAdmin ? "临保今日收益" : "临保今日支出" }}</div>
          <CountTo :endVal="data.todayTemporaryAmount" :startVal="0" class="text-2xl flex-1 text-right" suffix="元"
            :decimals="2" />
        </div>
        <div class="flex items-center gap-20">
          <div class="h-[100%] w-[100px]">{{ isAdmin ? "临保总收益" : "临保总支出" }}</div>
          <CountTo :endVal="data.totalTemporaryAmount" :startVal="0" class="text-2xl flex-1 text-right" suffix="元"
            :decimals="2" />
        </div>
        <RouterLink active-class="select" to="/orderForm/outboundOrder?typeCode=1">
          <div class="mt-[20px] text-right cursor-pointer">
            点击查看临保订单流水>
          </div>
        </RouterLink>
      </el-card>
      <el-card v-if="isAdmin" class="flex-1 w-[80%]">
        <div class="flex items-center gap-20 mb-[20px]">
          <div class="h-[100%] w-[100px]">月保今日收益</div>
          <CountTo :endVal="data.todayPaymentAmount" :startVal="0" class="text-2xl flex-1 text-right" suffix="元"
            :decimals="2" />
        </div>
        <div class="flex items-center gap-20">
          <div class="h-[100%] w-[100px]">月保总收益</div>
          <CountTo :endVal="data.totalAccumulatePaymentAmount" :startVal="0" class="text-2xl flex-1 text-right"
            suffix="元" :decimals="2" />
        </div>
        <RouterLink active-class="select" to="/management/record">
          <div class="mt-[20px] text-right cursor-pointer">
            点击查看月保订单流水>
          </div>
        </RouterLink>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
