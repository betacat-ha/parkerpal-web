<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { deleteIotDevice, getIotDeviceList, newOrUpdateIotDevice } from "@/api";
import { ElMessage } from "element-plus";
import { iotRoleList, groupNumberList, tollList } from "@/views/data";
import { computed } from "vue";

defineOptions({
  name: "DeviceManagement"
});
type DataListType = {
  id: string;
  macAddress: string;
  name: string;
  location: string;
  role: number;
  createTime: number;
  updateTime: number;
  groupId: number;
  createUserId: number;
  isDisabled: number;
  isDeleted: number;
  parkingSpaces: null;
};
let refList = ref<FormInstance[]>([]);
const dataList = ref<DataListType[]>([]);
let backups: DataListType[] = [];
const params = reactive({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  totalNumber: 0
});
const editIndex = ref(-1);
const rules = reactive<FormRules<any>>({
  id: [
    { required: true, message: '请输入设备ID', trigger: 'blur' },
  ],
  macAddress: [
    { required: true, message: '请输入MAC地址', trigger: 'blur' },
    {
      pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      message: 'MAC地址格式不正确',
      trigger: 'blur',
    },
  ],
  name: [
    { required: true, message: '请输入设备名称', trigger: 'blur' },
  ],
  location: [
    { required: true, message: '请输入设备所在位置', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择设备角色', trigger: 'change' },
  ],
  groupId: [
    { required: true, message: '请选择设备所属组', trigger: 'change' },
  ],
  createUserId: [
    { required: true, message: '请选择创建用户', trigger: 'change' },
  ],
  // isDisabled: [
  //   { required: true, message: '请选择设备状态', trigger: 'change' },
  // ],
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
      return newOrUpdateIotDevice(data.row);
    })
    .then(() => {
      editIndex.value = -1;
      getData();
      ElMessage.success(data.row.id ? "编辑成功" : "新增成功");
    });
};
//取消
const cancellation = () => {
  editIndex.value = -1;
  dataList.value = JSON.parse(JSON.stringify(backups));
};
//删除
const deleteFn = (id: string) => {
  ElMessageBox.confirm("此操作不可恢复，是否确认删除？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      return deleteIotDevice({ ids: [id] });
    })
    .then(() => {
      ElMessage.success("删除成功");
      getData();
    });
};
const searchParams = reactive({
  location: "",
  name: "",
  role: "",
  groupId: "",
  macAddress: "",
});

//获取数据
const getData = () => {
  const { pageSize, pageNumber } = params;
  getIotDeviceList({
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
      macAddress: "",
      name: "",
      location: "",
      role: 0,
      groupId: 1,
      createUserId: 1,
      isDisabled: 0,
      createTime: 0,
      updateTime: 0,
      isDeleted: 0,
      parkingSpaces: undefined
    });
    editIndex.value = 0;
    tableRef.value.$refs.scrollBarRef.setScrollTop(0);
  } else {
    ElMessage.warning("编辑状态不可新增！");
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
};
</script>
<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="title">
      <div class="lf">IOT设备管理</div>
    </div>
    <div class="form_box_p">
      <div class="form_box">
        <div class="form_item_box">
          <div>设备名称：</div>
          <el-input
            v-model="searchParams.name"
            clearable
            placeholder="请输入设备名称"
          />
        </div>
        <div class="form_item_box">
          <div>设备所在位置：</div>
          <el-input
            v-model="searchParams.location"
            clearable
            placeholder="请输入设备所在位置"
          />
        </div>
        <div class="form_item_box">
          <div>设备MAC地址：</div>
          <el-input
            v-model="searchParams.macAddress"
            clearable
            placeholder="请输入设备IP地址"
          />
        </div>
        <div class="form_item_box">
          <div>设备类型：</div>
          <el-select
            v-model="searchParams.role"
            clearable
            placeholder="请选择设备类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in iotRoleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>设备组号：</div>
          <el-select
            v-model="searchParams.groupId"
            clearable
            placeholder="请选择设备组号"
            style="width: 100%"
          >
            <el-option
              v-for="item in groupNumberList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>创建时间段：</div>
          <div class="time_picker_date">
            <el-date-picker
              v-model="time"
              end-placeholder="结束时间"
              range-separator="To"
              start-placeholder="开始时间"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')"
            />
          </div>
        </div>
      </div>
      <el-button type="primary" @click="getData">搜索</el-button>
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
        label="序号"
        min-width="60"
        type="index"
      />
      <el-table-column
        :show-overflow-tooltip="editIndex < 0"
        align="center"
        label="设备名称"
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
            <el-form-item prop="name">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入设备名称"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备所在位置" min-width="200px">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="location">
              <el-input
                v-model="scope.row.location"
                clearable
                placeholder="请输入设备所在位置"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.location }}
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="设备账号" width="200">
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
                placeholder="请输入设备账号"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row?.deviceUserName ?? "--" }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备密码" width="200">
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
                placeholder="请输入设备密码"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row?.devicePassword ?? "--" }}
          </template>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="设备MAC地址" width="200">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="macAddress">
              <el-input
                v-model="scope.row.macAddress"
                clearable
                placeholder="请输入设备MAC地址"
              />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row?.macAddress ?? "--" }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备类型" width="180">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="role">
              <el-select
                v-model="scope.row.role"
                clearable
                placeholder="请选择设备类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in iotRoleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
              iotRoleList.find(item => item.value == scope.row.role)?.label
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备组号" width="180">
        <template #default="scope">
          <el-form
            v-if="scope.$index == editIndex"
            :ref="setItemRef"
            :model="scope.row"
            :rules="rules"
          >
            <el-form-item prop="groupId">
              <el-select
                v-model="scope.row.groupId"
                clearable
                placeholder="请选择设备组号"
                style="width: 100%"
              >
                <el-option
                  v-for="item in groupNumberList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
              groupNumberList.find(item => item.value == scope.row.groupId)
                ?.label
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="createTime"
        width="200"
      />

      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template #default="scope">
          <template v-if="scope.$index != editIndex">
            <el-button
              icon="Delete"
              size="small"
              type="danger"
              @click="deleteFn(scope.row.id)"
            >
              删除
            </el-button>
            <el-button
              icon="Edit"
              size="small"
              @click="editIndex = scope.$index"
            >
              编辑
            </el-button>
          </template>
          <div v-else style="margin-bottom: 20px">
            <el-button
              icon="FolderChecked"
              size="small"
              type="primary"
              @click="saveFn(scope)"
            >
              保存
            </el-button>
            <el-button icon="Close" size="small" @click="cancellation">
              取消
            </el-button>
          </div>
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
      <el-button icon="Plus" size="small" type="primary" @click="addData">
        新增
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
