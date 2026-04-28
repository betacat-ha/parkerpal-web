<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import Edit from "./Edit.vue";
import SelectUser from "../../vehicle/carRentalSpace/SelectUser.vue";

import {
  getParking,
  pageParkingDetailList,
  parkingDetailCreateOrUpdate,
  parkingDetailDelete,
  ParkingDetailListType,
  parkingDetailSum
} from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "ZombieCar"
});
const { t } = useI18n();
const isShowSelect = ref(false);

let refList = ref<FormInstance[]>([]);
const isShow = ref(false);
const dataList = ref<ParkingDetailListType[]>([]);
let backups: ParkingDetailListType[] = [];
const editIndex = ref(-1);
const rules = reactive<FormRules<any>>({
  assignedNumber: [
    { required: true, message: t('vehicle.carRentalSpace.rules.assignedNumber'), trigger: "blur" }
  ],
  userName: [{ required: true, message: t('vehicle.carRentalSpace.rules.userName'), trigger: "blur" }],
  startTime: [{ required: true, message: t('vehicle.carRentalSpace.rules.startTime'), trigger: "blur" }],
  assignedStatus: [{ required: true, message: t('vehicle.carRentalSpace.rules.assignedStatus'), trigger: "blur" }]
});
const params = reactive({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  totalNumber: 0
});
const parkingData = ref({
  disposableNumber: 0,
  id: "",
  parkingNumber: 0
});
const getParkingFn = () => {
  getParking().then(res => {
    if (res.data) {
      parkingData.value = res.data;
    }
  });
};
// 设置多个ref
const setItemRef = (el: any) => {
  if (el) {
    refList.value.push(el);
  }
};
//保存
const saveFn = (data: { row: ParkingDetailListType }) => {
  Promise.all(refList.value.map(v => v.validate()))
    .then(() => {
      return parkingDetailCreateOrUpdate(data.row);
    })
    .then(() => {
      editIndex.value = -1;
      getData();
      ElMessage.success(t('message.saveSuccess'));
    });
};
//取消
const cancellation = () => {
  editIndex.value = -1;
  dataList.value = JSON.parse(JSON.stringify(backups));
};
//删除
const deleteFn = (id: string) => {
  ElMessageBox.confirm(t('message.confirmDelete'), t('message.warning'), {
    confirmButtonText: t('button.confirm'),
    cancelButtonText: t('button.cancel'),
    type: "warning"
  })
    .then(() => {
      return parkingDetailDelete({ ids: [id] });
    })
    .then(() => {
      ElMessage.success(t('message.deleteSuccess'));
      if (dataList.value.length == 1 && params.pageNumber > 1) {
        params.pageNumber = params.pageNumber - 1;
      }
      getData();
    });
};
const searchParams = reactive({
  assignedNumber: "",
  assignedStatus: "",
  endTime: "",
  startTime: "",
  userName: ""
});
const freeTimePeriod2 = computed<any>({
  get() {
    return [searchParams?.startTime, searchParams?.endTime];
  },
  set(value) {
    searchParams.startTime = value?.[0] ?? "";
    searchParams.endTime = value?.[1] ?? "";
  }
});
//获取数据
const getData = () => {
  statisticsFn();
  const { pageSize, pageNumber } = params;
  pageParkingDetailList({
    pageSize,
    pageNumber,
    ...searchParams
  }).then((res: any) => {
    editIndex.value = -1;
    const { pageNumber, pageSize, total, totalNumber, list } = res.data;
    dataList.value = list;
    Object.assign(params, { pageNumber, pageSize, total, totalNumber });
    backups = JSON.parse(JSON.stringify(list));
  });
};
const indexMethod = (index: number) => {
  const { pageSize, pageNumber } = params;
  return index + 1 + (pageNumber - 1) * pageSize;
};
onBeforeMount(() => {
  getData();
  getParkingFn();
});
const tableRef = ref<any>(null);
//新增
const addData = () => {
  if (editIndex.value == -1) {
    dataList.value.unshift({
      assignedNumber: 1,
      assignedStatus: "",
      endTime: "",
      id: "",
      startTime: "",
      userId: "",
      userName: ""
    });
    editIndex.value = 0;
    tableRef.value.$refs.scrollBarRef.setScrollTop(0);
  } else {
    ElMessage.warning(t('message.warning'));
  }
};
const changeFnTime = (e: any, start: string, end: string) => {
  if (e) {
    dataList.value[editIndex.value][start] = e[0];
    dataList.value[editIndex.value][end] = e[1];
  } else {
    dataList.value[editIndex.value][start] = "";
    dataList.value[editIndex.value][end] = "";
  }
};

const tableHeight = computed(() => {
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  return windowHeight - 340;
});
const statistics = ref(0);
// 统计
const statisticsFn = () => {
  parkingDetailSum().then((res: any) => {
    statistics.value = res.data;
  });
};
const handleCurrentChange = (val: any) => {
  dataList.value[editIndex.value].userId = val.id;
  dataList.value[editIndex.value].userName = val.userName;
};
const freeTimePeriod = computed<any>({
  get() {
    return [
      dataList.value[editIndex.value]?.startTime,
      dataList.value[editIndex.value]?.endTime
    ];
  },
  set(value) {
    dataList.value[editIndex.value].startTime = value[0];
    dataList.value[editIndex.value].endTime = value[1];
  }
});
const statusList = computed(() => [
  {
    label: t('vehicle.carRentalSpace.status.valid'),
    value: "1"
  },
  {
    label: t('vehicle.carRentalSpace.status.invalid'),
    value: "2"
  }
]);
</script>
<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="c_box">
      <div class="title">
        <div class="lf">{{ t('vehicle.carRentalSpace.title') }}</div>
        <div class="form_box_p">
          <div class="form_box">
            <div class="form_item_box">
              {{ t('vehicle.carRentalSpace.stats.issued') }}：{{ statistics ?? "--" }}
            </div>
            <div class="form_item_box">
              {{ t('vehicle.carRentalSpace.stats.disposable') }}：{{ parkingData?.disposableNumber ?? "--" }}
            </div>
            <div class="form_item_box">
              {{ t('vehicle.carRentalSpace.stats.parkingNumber') }}：{{ parkingData?.parkingNumber ?? "--" }}
            </div>
          </div>
          <el-button type="primary" @click="
              () => {
                isShow = true;
              }
            ">{{ t('button.edit') }}
          </el-button>
        </div>
      </div>
      <div class="form_box_p">
        <div class="form_box form_box2">
          <div class="form_item_box">
            <div>{{ t('vehicle.carRentalSpace.fields.userName') }}：</div>
            <el-input v-model="searchParams.userName" clearable :placeholder="t('vehicle.carRentalSpace.placeholders.userName')" />
          </div>
          <div class="form_item_box">
            <div>{{ t('vehicle.carRentalSpace.fields.assignedStatus') }}：</div>
            <el-select v-model="searchParams.assignedStatus" clearable :placeholder="t('vehicle.carRentalSpace.placeholders.assignedStatus')" style="width: 100%">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="form_item_box">
            <div>{{ t('vehicle.carRentalSpace.fields.timeRange') }}：</div>
            <div class="time_picker_date">
              <el-date-picker v-model="freeTimePeriod2" :end-placeholder="t('vehicle.carRentalSpace.placeholders.endTime')" :range-separator="t('device.placeholders.rangeSeparator')"
                :start-placeholder="t('vehicle.carRentalSpace.placeholders.startTime')" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" />
            </div>
          </div>
        </div>
        <el-button type="primary" @click="getData">{{ t('button.search') }}</el-button>
      </div>
      <el-table ref="tableRef" :data="dataList" :height="tableHeight">
        <el-table-column :index="indexMethod" :show-overflow-tooltip="false" align="center" :label="t('journal.warehousing.serialNumber')" min-width="60"
          type="index" />
        <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" :label="t('vehicle.carRentalSpace.fields.userName')" min-width="200px">
          <template #default="scope">
            <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
              :rules="rules">
              <el-form-item prop="userName">
                <div class="flex justify-center items-center w-[100%]">
                  <el-button size="small" style="margin-right: 10px" type="primary" @click="
                      () => {
                        isShowSelect = true;
                      }
                    ">
                    {{ scope.row.userName ? t('vehicle.carRentalSpace.actions.changeUser') : t('vehicle.carRentalSpace.actions.bindUser') }}
                  </el-button>
                  {{ scope.row.userName }}
                </div>
              </el-form-item>
            </el-form>
            <template v-else>
              {{ scope.row.userName ?? "--" }}
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('vehicle.carRentalSpace.fields.assignedNumber')" min-width="200px" prop="freePoints">
          <template #default="scope">
            <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
              :rules="rules">
              <el-form-item prop="assignedNumber">
                <el-input v-model="scope.row.assignedNumber" clearable :placeholder="t('vehicle.carRentalSpace.placeholders.assignedNumber')" type="number" />
              </el-form-item>
            </el-form>
            <template v-else>
              {{ scope.row.assignedNumber }}
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('vehicle.carRentalSpace.fields.timeRange')" min-width="250px">
          <template #default="scope">
            <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
              <el-form-item prop="startTime">
                <el-date-picker v-model="freeTimePeriod" :end-placeholder="t('vehicle.carRentalSpace.placeholders.endTime')" :range-separator="t('device.placeholders.rangeSeparator')"
                  :start-placeholder="t('vehicle.carRentalSpace.placeholders.startTime')" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
                  @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')" />
              </el-form-item>
            </el-form>
            <template v-else>
              {{ scope.row.startTime }} / {{ scope.row.endTime }}
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('vehicle.carRentalSpace.fields.assignedStatus')" width="200">
          <template #default="scope">
            {{ statusList.find(item => item.value == scope.row?.assignedStatus)?.label ?? scope.row?.assignedStatus ?? '--' }}
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" :label="t('label.operation')" min-width="100">
          <template #default="scope">
            <template v-if="scope.$index != editIndex">
              <el-button icon="Delete" size="small" type="danger" @click="deleteFn(scope.row.id)">
                {{ t('button.delete') }}
              </el-button>
              <el-button icon="Edit" size="small" @click="editIndex = scope.$index">
                {{ t('button.edit') }}
              </el-button>
            </template>
            <div v-else style="margin-bottom: 20px">
              <el-button icon="FolderChecked" size="small" type="primary" @click="saveFn(scope)">
                {{ t('button.save') }}
              </el-button>
              <el-button icon="Close" size="small" @click="cancellation">
                {{ t('button.cancel') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-button icon="Plus" size="small" type="primary" @click="addData">
          {{ t('button.add') }}
        </el-button>
        <el-pagination v-if="params.total" v-model:current-page="params.pageNumber" v-model:page-size="params.pageSize"
          :page-sizes="[10, 50, 100, 150]" :small="false" :total="params.total"
          layout="total, sizes, prev, pager, next, jumper" @size-change="getData" @current-change="getData" />
      </div>
    </div>
    <Edit v-model="isShow" :from-data="parkingData" @update-fn="getParkingFn" />
    <SelectUser v-model="isShowSelect" @handle-current-change="handleCurrentChange" />
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
    justify-content: space-between;
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
  align-items: center;
}

.form_box {
  flex: 1;
  display: flex;
  gap: 20px;
  align-content: center;

  .form_item_box {
    display: flex;
    align-items: center;

    & > div:nth-child(1) {
      width: 190px;
      text-align: right;
      flex-shrink: 0;
    }

    .el-row,
    .time_picker_date {
      flex: 1;
    }
  }
}

.form_box2 {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 31%);
  justify-content: flex-end;
  gap: 10px 20px;
  flex-wrap: wrap;
}

:deep .el-range-editor.el-input__wrapper {
  width: 100%;
}

.logo_img {
  margin: 0 auto;
  height: 40px;
  width: 40px;
}
</style>
