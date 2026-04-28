<script lang="ts" setup>
import { useECharts } from "@pureadmin/utils";
import { useUserStore } from "@/store/modules/user";
import { parkingSpaceStatistics } from "@/api";
import { Ref } from "vue";
import { useI18n } from "vue-i18n";

const userId = useUserStore().userInfo.id;
const isAdmin = useUserStore().isAdmin;
const { t } = useI18n();
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
const data = ref<any>({
  issuedParkingSpaces: 0,
  ordinaryParkingSpace: 0,
  remainingParkingSpaces: 0,
  rentalParkingSpace: 0,
  totalParkingSpaces: 0,
  unlicensedParkingSpaces: 0,
  usedParkingSpaces: 0
});
const init = () => {
  const label: any = {
    formatter: [
      "{title|{b}}{abg|}",
      `{valueHead|${t("home.parkingLot.labels.issued")}}{rateHead|${t("home.parkingLot.labels.remaining")}}`,
      "{hr|}",
      ` {value|${data.value?.rentalParkingSpace ?? 0}}{weatherHead|${data.value?.ordinaryParkingSpace ?? 0}}`
    ].join("\n"),
    backgroundColor: "#eee",
    borderColor: "#777",
    borderWidth: 1,
    borderRadius: 4,
    rich: {
      title: {
        color: "#eee",
        align: "center"
      },
      abg: {
        backgroundColor: "#333",
        width: "100%",
        align: "right",
        height: 25,
        borderRadius: [4, 4, 0, 0]
      },
      rate: {
        height: 20,
        align: "left"
      },
      weatherHead: {
        color: "#333",
        height: 30,
        align: "left"
      },
      hr: {
        borderColor: "#777",
        width: "100%",
        borderWidth: 0.5,
        height: 0
      },
      value: {
        width: 20,
        padding: [0, 20, 0, 30],
        align: "left"
      },
      valueHead: {
        color: "#333",
        width: 20,
        height: 30,
        padding: [0, 20, 0, 30],
        align: "center"
      },
      rateHead: {
        color: "#333",
        width: 40,
        align: "center",
        padding: [0, 10, 0, 0]
      }
    }
  };
  setOptions({
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      top: 10,
      left: "center",
      data: isAdmin
        ? [t("home.parkingLot.labels.remaining"), t("home.parkingLot.labels.used")]
        : [t("home.parkingLot.labels.unissued"), t("home.parkingLot.labels.issued")]
    },
    series: [
      {
        startAngle: 0,

        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: [
          {
            value: isAdmin
              ? data.value?.usedParkingSpaces
              : data.value?.unlicensedParkingSpaces,
            name: isAdmin
              ? t("home.parkingLot.labels.used")
              : t("home.parkingLot.labels.unissued"),
            label: isAdmin ? label : {}
          },
          {
            value: isAdmin
              ? data.value?.remainingParkingSpaces
              : data.value?.issuedParkingSpaces,
            name: isAdmin
              ? t("home.parkingLot.labels.remaining")
              : t("home.parkingLot.labels.issued")
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });
};
const getData = () => {
  parkingSpaceStatistics({ userId }).then((res: any) => {
    data.value = res.data;
    nextTick(() => {
      init();
    });
  });
};
onBeforeMount(getData);
</script>

<template>
  <div class="bg-white mt-[20px] rounded-[4px] dark:bg-[#141414] flex-1">
    <div class="font-bold text-[20px] px-[20px] leading-[60px]">{{ t("home.parkingLot.title") }}</div>
    <el-empty v-if="data.totalParkingSpaces === 0" :description="t('home.parkingLot.noData')" class="h-[400px] w-[100%]" />
    <div v-if="data.totalParkingSpaces != 0" ref="chartRef" class="h-[400px] w-[100%]" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  .lf {
    font-weight: bold;
  }
}
</style>
