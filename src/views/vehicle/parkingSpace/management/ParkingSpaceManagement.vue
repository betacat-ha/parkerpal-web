<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { deleteIotDevice, pageParkingSpaceList, newOrUpdateParkingSpace, SystemParkingSpace } from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { iotRoleList, parkingSpaceModelNameList, parkingSpaceFNumList, parkingSpaceStatusList } from "@/views/data";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { id } from "element-plus/es/locale/index.mjs";
import { status } from "nprogress";
import { number } from "echarts";
import { integer } from "vue-types";

defineOptions({
  name: "ParkingSpaceManagement"
});
const { t } = useI18n();
const parkingSpaceModelNameListLocal = computed(() => parkingSpaceModelNameList(t));
const parkingSpaceFNumListLocal = computed(() => parkingSpaceFNumList(t));
const parkingSpaceStatusListLocal = computed(() => parkingSpaceStatusList(t));
let refList = ref<FormInstance[]>([]);
const dataList = ref<SystemParkingSpace[]>([]);
let backups: SystemParkingSpace[] = [];
const params = reactive({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  totalNumber: 0
});
const editIndex = ref(-1);
const rules = reactive<FormRules<any>>({
  id: [
    { required: true, message: t('parking.rules.id'), trigger: 'blur' },
  ],
  name: [
    { required: true, message: t('parking.rules.name'), trigger: 'blur' },
  ],
  deviceId: [
    { required: true, message: t('parking.rules.deviceId'), trigger: 'change' },
  ],
  modelName: [
    { required: true, message: t('parking.rules.modelName'), trigger: 'change' },
  ],
  status: [
    { required: true, message: t('parking.rules.status'), trigger: 'change' },
  ],
});
// 设置多个ref
const setItemRef = (el: any) => {
  if (el) {
    refList.value.push(el);
  }
};
const tableHeight = computed(() => {
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  return windowHeight - 420;
});
//保存
const saveFn = (data: any) => {
  Promise.all(refList.value.map(v => v.validate()))
    .then(() => {
      return newOrUpdateParkingSpace(data.row);
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
      return deleteIotDevice({ ids: [id] });
    })
    .then(() => {
      ElMessage.success(t('message.deleteSuccess'));
      getData();
    });
};
const searchParams = reactive({
  id: "",
  name: "",
  type: "",
  deviceId: "",
  modelName: "",
  fnum: "",
  status: undefined,
});

//获取数据
const getData = () => {
  const { pageSize, pageNumber } = params;
  pageParkingSpaceList({
    pageSize,
    pageNumber,
    ...searchParams
  }).then((res: any) => {
    editIndex.value = -1;
    const { pageNumber, pageSize, total, totalNumber, list } = res.data;
    dataList.value = list;
    console.log(dataList);
    Object.assign(params, { pageNumber, pageSize, total, totalNumber });
    backups = JSON.parse(JSON.stringify(list));
  });
};
const tooltipOptions: any = {
  popperClass: "tool-tip",
  placement: "bottom"
};
const indexMethod = (index: number) => {
  return index + 1;
};

onBeforeMount(getData);
const tableRef = ref<any>(null);
//新增
const addData = () => {
  if (editIndex.value == -1) {
    dataList.value.unshift({
      id: "",
      name: "",
      deviceId: "",
      modelName: "",
      fnum: "",
      status: 2,
      parkingSpaces: undefined
    });
    editIndex.value = 0;
    tableRef.value.$refs.scrollBarRef.setScrollTop(0);
  } else {
    ElMessage.warning(t('message.warning'));
  }
};

</script>
<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="title">
      <div class="lf">{{ t('menu.parkingSpaceManagement') }}</div>
    </div>
    <div class="form_box_p">
      <div class="form_box">
        <div class="form_item_box">
          <div>{{ t('parking.fields.name') }}：</div>
          <el-input v-model="searchParams.name" clearable :placeholder="t('parking.placeholders.name')" />
        </div>
        <div class="form_item_box">
          <div>{{ t('parking.fields.modelName') }}：</div>
          <el-select v-model="searchParams.modelName" clearable :placeholder="t('parking.placeholders.modelName')" style="width: 100%">
            <el-option v-for="item in parkingSpaceModelNameListLocal" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>{{ t('parking.fields.floor') }}：</div>
          <el-select v-model="searchParams.fnum" clearable :placeholder="t('parking.placeholders.floor')" style="width: 100%">
            <el-option v-for="item in parkingSpaceFNumListLocal" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>{{ t('parking.fields.deviceId') }}：</div>
          <el-input v-model="searchParams.deviceId" clearable :placeholder="t('parking.placeholders.deviceId')" />
        </div>
        <div class="form_item_box">
          <div>{{ t('parking.fields.status') }}：</div>
          <el-select v-model="searchParams.status" clearable :placeholder="t('parking.placeholders.status')" style="width: 100%">
            <el-option v-for="item in parkingSpaceStatusListLocal" :key="Number(item.value)" :label="item.label"
              :value="Number(item.value)" />
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="getData">{{ t('button.search') }}</el-button>
    </div>
    <el-table ref="tableRef" :data="dataList" :height="tableHeight" :tooltip-options="tooltipOptions"
      show-overflow-tooltip>
      <el-table-column :index="indexMethod" :show-overflow-tooltip="false" align="center" :label="t('journal.warehousing.serialNumber')" min-width="60"
        type="index" />
      <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" :label="t('parking.fields.parkingSpaceId')" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
            :rules="rules">
            <el-form-item prop="id">
              <el-input v-model="scope.row.id" :placeholder="t('parking.placeholders.parkingSpaceId')" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.id }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" :label="t('parking.fields.name')" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
            :rules="rules">
            <el-form-item prop="name">
              <el-input v-model="scope.row.name" :placeholder="t('parking.placeholders.name')" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('parking.fields.deviceId')" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="location">
              <el-input v-model="scope.row.deviceId" clearable :placeholder="t('parking.placeholders.deviceId')" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.deviceId }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('parking.fields.status')" min-width="130">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="groupId">
              <el-select v-model="scope.row.status" clearable :placeholder="t('parking.placeholders.status')" style="width: 100%">
                <el-option v-for="item in parkingSpaceStatusListLocal" :key="Number(item.value)" :label="item.label"
                  :value="Number(item.value)" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceStatusListLocal.find(item => item.value == scope.row.status)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="t('parking.fields.modelName')" min-width="180">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="modelName">
              <el-select v-model="scope.row.modelName" clearable :placeholder="t('parking.placeholders.modelName')" style="width: 100%">
                <el-option v-for="item in parkingSpaceModelNameListLocal" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceModelNameListLocal.find(item => item.value == scope.row.modelName)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="t('parking.fields.floor')" width="130">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="fnum">
              <el-select v-model="scope.row.fnum" clearable :placeholder="t('parking.placeholders.floor')" style="width: 100%">
                <el-option v-for="item in parkingSpaceFNumListLocal" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceFNumListLocal.find(item => item.value == scope.row.fnum)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="t('label.created')" prop="createTime" width="200" />
      <el-table-column align="center" :label="t('label.updated')" prop="updateTime" width="200" />

      <el-table-column align="center" fixed="right" :label="t('label.operation')" width="200">
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
      <el-pagination v-if="params.total" v-model:current-page="params.pageNumber" v-model:page-size="params.pageSize"
        :page-sizes="[10, 50, 100, 150]" :small="false" :total="params.total"
        layout="total, sizes, prev, pager, next, jumper" @size-change="getData" @current-change="getData" />
      <el-button icon="Plus" size="small" type="primary" @click="addData">
        {{ t('button.add') }}
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .el-popper {
  max-width: 200px !important;
}

.content {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;

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
  align-items: flex-start;
  font-size: 14px;
  gap: 20px;
  margin-bottom: 10px;
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

    &>div:nth-child(1) {
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

:deep .el-range-editor.el-input__wrapper {
  width: 100%;
}

.logo_img {
  margin: 0 auto;
  height: 40px;
  width: 40px;
}
</style>
