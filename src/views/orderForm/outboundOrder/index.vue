<script lang="ts" setup>
import { orderTotalPageList, totalPageListType } from "@/api";
import { computed } from "vue";
import { tableColumn, typeCode } from "@/views/data";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "MonthlyRent"
});
const { t } = useI18n();
const isAdmin = useUserStore().isAdmin;
const userId = useUserStore().userInfo.id;
const dataList = ref<totalPageListType[]>([]);
const editIndex = ref(-1);
const params = reactive({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  totalNumber: 0
});
const route = useRoute();
const searchParams = reactive({
  discount: "",
  endTime: "",
  mainlandLicensePlates: "",
  orderNumber: "",
  startTime: "",
  totalAmount: "",
  totalDiscountAmount: "",
  totalDuration: "",
  totalIncomeAmount: "",
  typeCode: +route.query?.typeCode || "",
  typeName: "",
  userId: route.query?.userId || userId,
  userName: ""
});
//获取数据
const getData = () => {
  const { pageSize, pageNumber } = params;
  orderTotalPageList({
    pageSize,
    pageNumber,
    ...searchParams
  }).then((res: any) => {
    editIndex.value = -1;
    const { pageNumber, pageSize, total, totalNumber, list } = res.data;
    dataList.value = list;
    Object.assign(params, { pageNumber, pageSize, total, totalNumber });
  });
};
const tooltipOptions: any = {
  popperClass: "tool-tip",
  placement: "bottom"
};
const outboundOrderFields = computed(() => ({
  mainlandLicensePlates: t("orderForm.outboundOrder.fields.mainlandLicensePlates"),
  orderNumber: t("orderForm.outboundOrder.fields.orderNumber"),
  userName: t("orderForm.outboundOrder.fields.userName"),
  typeCode: t("orderForm.outboundOrder.fields.typeCode"),
  startTime: t("orderForm.outboundOrder.fields.startTime"),
  endTime: t("orderForm.outboundOrder.fields.endTime"),
  totalAmount: t("orderForm.outboundOrder.fields.totalAmount"),
  totalDiscountAmount: t("orderForm.outboundOrder.fields.totalDiscountAmount"),
  totalIncomeAmount: t("orderForm.outboundOrder.fields.totalIncomeAmount"),
  totalDuration: t("orderForm.outboundOrder.fields.totalDuration")
}));
const outboundOrderPlaceholders = computed(() => ({
  mainlandLicensePlates: t("orderForm.outboundOrder.placeholders.mainlandLicensePlates"),
  orderNumber: t("orderForm.outboundOrder.placeholders.orderNumber"),
  userName: t("orderForm.outboundOrder.placeholders.userName"),
  typeCode: t("orderForm.outboundOrder.placeholders.typeCode"),
  startTime: t("orderForm.outboundOrder.placeholders.startTime"),
  endTime: t("orderForm.outboundOrder.placeholders.endTime"),
  totalAmount: t("orderForm.outboundOrder.placeholders.totalAmount"),
  totalDiscountAmount: t("orderForm.outboundOrder.placeholders.totalDiscountAmount"),
  totalIncomeAmount: t("orderForm.outboundOrder.placeholders.totalIncomeAmount"),
  totalDuration: t("orderForm.outboundOrder.placeholders.totalDuration")
}));
const indexMethod = (index: number) => {
  const { pageSize, pageNumber } = params;
  return index + 1 + (pageNumber - 1) * pageSize;
};
onBeforeMount(getData);
const tableRef = ref<any>(null);
const tableHeight = computed(() => {
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  return windowHeight - 460;
});
const tableColumnLocal = computed(() => tableColumn(t));
const typeCodeLocal = computed(() => typeCode(t));
</script>
<template>
  <div class="bg-white dark:bg-[#141414] content">
    <div class="c_box">
      <div class="title">
        <div class="lf">{{ t("orderForm.outboundOrder.title") }}</div>
      </div>
      <div class="form_box_p">
        <div class="form_box">
          <div class="form_item_box">
            <div>{{ outboundOrderFields.mainlandLicensePlates }}：</div>
            <el-input
              v-model="searchParams.mainlandLicensePlates"
              clearable
              :placeholder="outboundOrderPlaceholders.mainlandLicensePlates"
            />
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.orderNumber }}：</div>
            <el-input
              v-model="searchParams.orderNumber"
              clearable
              :placeholder="outboundOrderPlaceholders.orderNumber"
            />
          </div>
          <div v-if="isAdmin" class="form_item_box">
            <div>{{ outboundOrderFields.userName }}：</div>
            <el-input
              v-model="searchParams.userName"
              clearable
              :placeholder="outboundOrderPlaceholders.userName"
            />
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.typeCode }}：</div>
            <el-select
              v-model="searchParams.typeCode"
              clearable
              :placeholder="outboundOrderPlaceholders.typeCode"
              style="width: 100%"
            >
              <el-option
                v-for="item in typeCodeLocal"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.startTime }}：</div>
            <div class="time_picker_date">
              <el-date-picker
                v-model="searchParams.startTime"
                :placeholder="outboundOrderPlaceholders.startTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.endTime }}：</div>
            <div class="time_picker_date">
              <el-date-picker
                v-model="searchParams.endTime"
                :placeholder="outboundOrderPlaceholders.endTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          </div>

          <div class="form_item_box">
            <div>{{ outboundOrderFields.totalAmount }}：</div>
            <el-input
              v-model="searchParams.totalAmount"
              clearable
              :placeholder="outboundOrderPlaceholders.totalAmount"
              type="number"
            />
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.totalDiscountAmount }}：</div>
            <el-input
              v-model="searchParams.totalDiscountAmount"
              clearable
              :placeholder="outboundOrderPlaceholders.totalDiscountAmount"
              type="number"
            />
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.totalIncomeAmount }}：</div>
            <el-input
              v-model="searchParams.totalIncomeAmount"
              clearable
              :placeholder="outboundOrderPlaceholders.totalIncomeAmount"
              type="number"
            />
          </div>
          <div class="form_item_box">
            <div>{{ outboundOrderFields.totalDuration }}：</div>
            <el-input
              v-model="searchParams.totalDuration"
              clearable
              :placeholder="outboundOrderPlaceholders.totalDuration"
              type="number"
            />
          </div>
        </div>
        <el-button class="flex-shrink-1" type="primary" @click="getData">
          {{ t("button.search") }}
        </el-button>
      </div>
      <el-table
        ref="tableRef"
        :data="dataList"
        :height="tableHeight"
        :tooltip-options="tooltipOptions"
        show-overflow-tooltip
      >
        <el-table-column
          :index="indexMethod"
          :show-overflow-tooltip="false"
          align="center"
          :label="t('label.serialNumber')"
          min-width="60"
          type="index"
        />
        <el-table-column
          v-for="(item, index) in tableColumnLocal"
          :key="index"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template #default="scope">
            {{ scope.row[item.prop] ?? "--" }}
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-pagination
          v-if="params.total"
          v-model:current-page="params.pageNumber"
          v-model:page-size="params.pageSize"
          :page-sizes="[10, 50, 100, 150]"
          :small="false"
          :total="params.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getData"
          @current-change="getData"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-popper {
  max-width: 200px !important;
}

.content {
  margin-bottom: 20px;

  .c_box {
    padding: 20px;
    border-radius: 5px;
  }

  .title_box {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
  }

  .pagination_box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.title {
  margin-bottom: 18px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  .lf {
    font-weight: bold;
    flex-shrink: 0;
    margin-right: 20px;
  }

  .rg {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    gap: 20px;
    flex: 1;
  }
}

.form_box_p {
  display: flex;
  font-size: 14px;
  gap: 20px;
  margin-bottom: 10px;
  align-items: flex-end;
}

.form_box {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 31%);
  justify-content: flex-end;
  gap: 10px 20px;
  flex-wrap: wrap;

  .form_item_box {
    display: flex;
    align-items: center;

    & > div:nth-child(1) {
      min-width: 170px;
      text-align: right;
      flex-shrink: 0;
    }

    .el-row,
    .time_picker_date {
      flex: 1;
    }
  }
}

:deep .el-date-editor.el-input {
  width: 100%;
}

.logo_img {
  margin: 0 auto;
  height: 40px;
  width: 40px;
}
</style>
