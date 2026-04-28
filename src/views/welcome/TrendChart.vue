<script lang="ts" setup>
import { useECharts } from "@pureadmin/utils";
import { countOrder } from "@/api";
import { useUserStore } from "@/store/modules/user";
import { useI18n } from "vue-i18n";

const isAdmin = useUserStore().isAdmin;
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
const year = ref(new Date());
const userId = useUserStore().userInfo.id;
const data1 = ref([]);
const data2 = ref([]);
const data3 = ref([]);
const { t, tm } = useI18n();
const months = computed(() => tm("home.trendChart.months") as string[]);
const init = () => {
  setOptions({
    legend: {},
    xAxis: {
      type: "category",
      data: months.value,
      axisTick: {
        alignWithLabel: true
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    yAxis: {
      type: "value"
    },
    grid: {
      // 让图表占满容器
      top: "40px",
      left: "60px",
      right: "60px",
      bottom: "40px"
    },

    series: [
      {
        data: data1.value,
        name: isAdmin ? t("home.trendChart.income") : t("home.trendChart.expense"),
        type: "bar",
        stack: "Ad",
        barWidth: "60%",
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        }
      },
      {
        name: t("home.trendChart.discount"),
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: data2.value
      },
      {
        name: t("home.trendChart.totalAmount"),
        type: "bar",
        barWidth: 10,
        stack: "Search Engine",
        emphasis: {
          focus: "series"
        },
        data: data3.value
      }
    ]
  });
};
const getData = (year: any) => {
  year = year.getFullYear();
  countOrder({ year, userId }).then((res: any) => {
    data1.value = [];
    data2.value = [];
    data3.value = [];
    res.data.forEach(v => {
      data1.value.push(v.totalIncomeAmount);
      data2.value.push(v.totalDiscountAmount);
      data3.value.push(v.totalAmount);
    });
    nextTick(() => {
      init();
    });
  });
};
onBeforeMount(() => getData(year.value));
</script>

<template>
  <div class="bg-white mt-[20px] rounded-[4px] dark:bg-[#141414]">
    <div class="font-bold px-[20px] w-[100%] text-[20px] leading-[60px] flex justify-between items-center">
      <div>{{ t("home.trendChart.title") }}</div>
      <el-date-picker v-model="year" :clearable="false" :placeholder="t('home.trendChart.yearPlaceholder')" type="year" @change="getData" />
    </div>
    <el-empty v-show="data3.length == 0" :description="t('home.trendChart.noData')" />
    <div v-if="data3.length > 0" ref="chartRef" class="h-[400px] w-[100%]"></div>
  </div>
</template>

<style lang="scss" scoped></style>
