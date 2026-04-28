<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import {
  deleteTurnstiles,
  newOrUpdatedTurnstiles,
  systemManagement
} from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { effectList } from "@/views/data";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "Turnstile"
});
const { t } = useI18n();
const effectListLocal = computed(() => effectList(t));
type DataListType = {
  createTime: string;
  deviceIp: string;
  deviceLocation: string;
  deviceName: string;
  devicePort: string;
  deviceRole: number;
  deviceUserName: string;
  devicePassword: string;
  id: string;
  updateTime: string;
};
let refList = ref<FormInstance[]>([]);

const dataList = ref<DataListType[]>([]);
let backups: DataListType[] = [];
const editIndex = ref(-1);
const rules = reactive<FormRules<any>>({
  deviceName: [{ required: true, message: t('device.rules.deviceName'), trigger: "blur" }],
  deviceLocation: [
    { required: true, message: t('device.rules.deviceLocation'), trigger: "blur" }
  ],
  devicePassword: [
    { required: true, message: t('device.rules.devicePassword'), trigger: "blur" }
  ],
  deviceUserName: [
    { required: true, message: t('device.rules.deviceUserName'), trigger: "blur" }
  ],
  deviceIp: [{ required: true, message: t('device.rules.deviceIp'), trigger: "blur" }],
  deviceRole: [{ required: true, message: t('device.rules.deviceRole'), trigger: "blur" }],
  devicePort: [{ required: true, message: t('device.rules.devicePort'), trigger: "blur" }]
});
// 设置多个ref
const setItemRef = (el: any) => {
  if (el) {
    refList.value.push(el);
  }
};
//保存
const saveFn = (data: any) => {
  Promise.all(refList.value.map(v => v.validate()))
    .then(() => {
      return newOrUpdatedTurnstiles(data.row);
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
      return deleteTurnstiles({ ids: [id] });
    })
    .then(() => {
      ElMessage.success(t('message.deleteSuccess'));
      getData();
    });
};
const searchParams = reactive({
  deviceIp: "",
  deviceLocation: "",
  deviceName: "",
  devicePort: "",
  deviceRole: ""
});

//获取数据
const getData = () => {
  systemManagement({
    ...searchParams
  }).then((res: any) => {
    editIndex.value = -1;
    dataList.value = res.data;
    backups = JSON.parse(JSON.stringify(res.data));
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
      createTime: "",
      deviceIp: "",
      deviceLocation: "",
      deviceName: "",
      devicePort: "",
      deviceRole: 0,
      id: "",
      devicePassword: "",
      deviceUserName: "",
      updateTime: ""
    });
    editIndex.value = 0;
    tableRef.value.$refs.scrollBarRef.setScrollTop(0);
  } else {
    ElMessage.warning(t('message.warning'));
  }
};
const time = ref("");
const changeFnTime = (e: any, start: string, end: string) => {
  console.log(e, start, end);
  if (e) {
    searchParams[start] = e[0];
    searchParams[end] = e[1];
  } else {
    searchParams[start] = "";
    searchParams[end] = "";
  }
  console.log();
};
</script>
<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="title">
      <div class="lf">{{ t('device.turnstile.title') }}</div>
    </div>
    <div class="form_box_p">
      <div class="form_box">
        <div class="form_item_box">
          <div>{{ t('device.fields.deviceName') }}：</div>
          <el-input
            v-model="searchParams.deviceName"
            clearable
            :placeholder="t('device.placeholders.deviceName')"
          />
        </div>
        <div class="form_item_box">
          <div>{{ t('device.fields.deviceLocation') }}：</div>
          <el-input
            v-model="searchParams.deviceLocation"
            clearable
            :placeholder="t('device.placeholders.deviceLocation')"
          />
        </div>
        <div class="form_item_box">
          <div>{{ t('device.fields.deviceIp') }}：</div>
          <el-input
            v-model="searchParams.deviceIp"
            clearable
            :placeholder="t('device.placeholders.deviceIp')"
          />
        </div>

        <div class="form_item_box">
          <div>{{ t('device.fields.devicePort') }}：</div>
          <el-input
            v-model="searchParams.devicePort"
            clearable
            :placeholder="t('device.placeholders.devicePort')"
          />
        </div>

        <div class="form_item_box">
          <div>{{ t('device.fields.deviceRole') }}：</div>
          <el-select
            v-model="searchParams.deviceRole"
            clearable
            :placeholder="t('device.placeholders.deviceRole')"
            style="width: 100%"
          >
            <el-option
              v-for="item in effectListLocal"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>{{ t('device.placeholders.startTime') }} / {{ t('device.placeholders.endTime') }}：</div>
          <div class="time_picker_date">
            <el-date-picker
              v-model="time"
              :end-placeholder="t('device.placeholders.endTime')"
                :range-separator="t('device.placeholders.rangeSeparator')"
                :start-placeholder="t('device.placeholders.startTime')"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')"
            />
          </div>
        </div>
      </div>
      <el-button type="primary" @click="getData">{{ t('button.search') }}</el-button>
    </div>
    <el-table
      ref="tableRef"
      :data="dataList"
      :height="500"
      :tooltip-options="tooltipOptions"
      show-overflow-tooltip
    >
        <el-table-column
        :index="indexMethod"
        :show-overflow-tooltip="false"
        align="center"
        :label="t('journal.warehousing.serialNumber')"
        min-width="60"
        type="index"
      />
      <el-table-column
        :show-overflow-tooltip="editIndex < 0"
        align="center"
        :label="t('device.fields.deviceName')"
        min-width="200px"
      >
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            id="form_item_box"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="deviceName">
              <el-input
                v-model="scope.row.deviceName"
                :placeholder="t('device.placeholders.deviceName')"
              />
            </el-form-item>
          </el-form>
          <template v-else class="text_box">
            {{ scope.row.deviceName ?? "--" }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('device.fields.deviceLocation')" min-width="200px">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="deviceLocation">
              <el-input
                v-model="scope.row.deviceLocation"
                clearable
                :placeholder="t('device.placeholders.deviceLocation')"
              />
            </el-form-item>
          </el-form>
          <template v-else class="text_box">
            {{ scope.row.deviceLocation }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('device.fields.deviceUserName')" width="200">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="deviceUserName">
              <el-input
                v-model="scope.row.deviceUserName"
                clearable
                :placeholder="t('device.placeholders.deviceUserName')"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row?.deviceUserName ?? "--" }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('device.fields.devicePassword')" width="200">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="devicePassword">
              <el-input
                v-model="scope.row.devicePassword"
                clearable
                :placeholder="t('device.placeholders.devicePassword')"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row?.devicePassword ?? "--" }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('device.fields.deviceIp')" width="200">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="deviceIp">
              <el-input
                v-model="scope.row.deviceIp"
                clearable
                :placeholder="t('device.placeholders.deviceIp')"
              />
            </el-form-item>
          </el-form>
          <template v-else class="text_box">{{ scope.row.deviceIp }}</template>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="t('device.fields.devicePort')" width="200">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="devicePort">
              <el-input
                v-model="scope.row.devicePort"
                clearable
                :placeholder="t('device.placeholders.devicePort')"
                type="number"
              />
            </el-form-item>
          </el-form>
          <template v-else class="text_box">
            {{ scope.row.devicePort }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('device.fields.deviceRole')" width="180">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="deviceRole">
              <el-select
                v-model="scope.row.deviceRole"
                clearable
                :placeholder="t('device.placeholders.deviceRole')"
                style="width: 100%"
              >
                <el-option
                  v-for="item in effectListLocal"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else class="text_box">
            {{
              effectListLocal.find(item => item.value == scope.row.deviceRole)?.label
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('label.created')"
        prop="createTime"
        width="200"
      />

      <el-table-column align="center" fixed="right" :label="t('label.operation')" width="200">
        <template #default="scope">
          <template v-if="scope.$index != editIndex">
            <el-button
              icon="Delete"
              size="small"
              type="danger"
              @click="deleteFn(scope.row.id)"
            >
              {{ t('button.delete') }}
            </el-button>
            <el-button
              icon="Edit"
              size="small"
              @click="editIndex = scope.$index"
            >
              {{ t('button.edit') }}
            </el-button>
          </template>
          <div v-else style="margin-bottom: 20px">
            <el-button
              icon="FolderChecked"
              size="small"
              type="primary"
              @click="saveFn(scope)"
            >
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

:deep .el-range-editor.el-input__wrapper {
  width: 100%;
}

.logo_img {
  margin: 0 auto;
  height: 40px;
  width: 40px;
}
</style>
