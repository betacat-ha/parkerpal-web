<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { deleteIotDevice, getSpaceReservationRecordList, newOrUpdateSpaceReservationRecord } from "@/api";
import { ElMessage } from "element-plus";
import { parkingSpaceFNumList, parkingSpaceReservationStatus, parkingSpaceModelNameList } from "@/views/data";
import { computed } from "vue";
import { number } from "echarts";

defineOptions({
  name: "ParkingSpaceManagement"
});
type DataListType = {
  createdAt?: string;
  id?: number;
  parkingSpaceId?: string;
  reservationEnd?: string;
  reservationStart?: string;
  reservationStatus?: string;
  reservationUserId?: string;
  updatedAt?: string;
  [property: string]: any;
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

// 车牌号校验
const validateLicenseNo = (errorMessage: string) => {
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}·[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}·(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

  return (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
    const flag = value.length === 8 ? creg.test(value) : value.length === 9 ? xreg.test(value) : false;
    callback(flag ? undefined : value.length === 0 ? new Error("请输入车牌号") : new Error(errorMessage));
  };
};

const rules = reactive<FormRules<any>>({
  id: [
    { required: true, message: '请输入记录ID', trigger: 'blur' },
  ],
  modelName: [
    { required: true, message: '请选择车位所在位置', trigger: 'blur' },
  ],
  parkingSpaceId: [
    { required: true, message: '请选择车位号', trigger: 'change' },
  ],
  'parkingSpace.name': [
    { required: true, message: '请输入车位名称', trigger: 'blur' },
  ],
  licensePlate: [
    { required: true, message: '请输入车牌号', trigger: 'blur' },
    { validator: validateLicenseNo("车牌号示例：粤A·12345"), required: true, trigger: "change" },
  ],
  reservationUserId: [
    { required: true, message: '请选择预约用户', trigger: 'change' },
  ],
  reservationStatus: [
    { required: true, message: '请选择预约状态', trigger: 'change' },
  ],
  reservationStart: [
    { required: true, message: '请选择预约开始时间', trigger: 'change' },
  ],
  reservationEnd: [
    { required: false, message: '请选择预约结束时间', trigger: 'change' },
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
      return newOrUpdateSpaceReservationRecord(data.row);
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
  licensePlate: "",
  modelName: "",
  reservationUserId: "",
  role: "",
  parkingSpaceId: "",
  reservationEnd: "",
  reservationStart: "",
  reservationStatus: "",
  fnum: ""
});

//获取数据
const getData = () => {
  const { pageSize, pageNumber } = params;
  getSpaceReservationRecordList({
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
      macAddress: "",
      name: "",
      location: "",
      role: 0,
      groupId: 1,
      createUserId: 1,
      isDisabled: 0,
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
      <div class="lf">车位预约管理</div>
    </div>
    <div class="form_box_p">
      <div class="form_box">
        <div class="form_item_box">
          <div>车场名：</div>
          <el-select v-model="searchParams.modelName" clearable placeholder="请选择车场名" style="width: 100%">
            <el-option v-for="item in parkingSpaceModelNameList" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>楼层：</div>
          <el-select v-model="searchParams.fnum" clearable placeholder="请选择楼层" style="width: 100%">
            <el-option v-for="item in parkingSpaceFNumList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="form_item_box">
          <div>车位ID：</div>
          <el-input v-model="searchParams.parkingSpaceId" clearable placeholder="请输入车位ID" />
        </div>
        <div class="form_item_box">
          <div>车牌号：</div>
          <el-input v-model="searchParams.licensePlate" clearable placeholder="请输入车牌号" />
        </div>
        <div class="form_item_box">
          <div>预约时间段：</div>
          <div class="time_picker_date">
            <el-date-picker v-model="time" end-placeholder="结束时间" range-separator="To" start-placeholder="开始时间"
              type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')" />
          </div>
        </div>
      </div>
      <el-button type="primary" @click="getData">搜索</el-button>
    </div>
    <el-table ref="tableRef" :data="dataList" :height="tableHeight" :tooltip-options="tooltipOptions"
      show-overflow-tooltip>
      <el-table-column :index="indexMethod" :show-overflow-tooltip="false" align="center" label="序号" min-width="60"
        type="index" />
      <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" label="车位名称" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
            class="row_edit" :rules="rules">
            <el-form-item prop="parkingSpace.name">
              <el-input v-model="scope.row.parkingSpace.name" placeholder="车位名称" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.parkingSpace.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号" min-width="150px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" class="row_edit"
            :rules="rules">
            <el-form-item prop="licensePlate">
              <el-input v-model="scope.row.licensePlate" clearable placeholder="车牌号" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.licensePlate }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约状态" width="150">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules"
            class="row_edit">
            <el-form-item prop="reservationStatus">
              <el-select v-model="scope.row.reservationStatus" placeholder="请选择预约状态" style="width: 100%">
                <el-option v-for="item in parkingSpaceReservationStatus" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
              parkingSpaceReservationStatus.find(item => item.value == scope.row.reservationStatus)?.label
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约开始时间" width="250">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules"
            class="row_edit">
            <el-form-item prop="reservationStart">
              <el-date-picker v-model="scope.row.reservationStart" placeholder="开始时间" type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss" @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{
              scope.row.reservationStart
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约结束时间" width="250">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules"
            class="row_edit">
            <el-form-item prop="reservationEnd">
              <el-date-picker v-model="scope.row.reservationEnd" placeholder="结束时间" type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss" @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')" />
            </el-form-item>
          </el-form>

          <template v-else>
            {{
              scope.row.reservationEnd
            }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createdAt" width="200" />
      <el-table-column align="center" label="更新时间" prop="updatedAt" width="200">
        <template #default="{ row }">
          {{ row.updatedAt || '--' }}
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template #default="scope">
          <template v-if="scope.$index != editIndex">
            <el-button icon="Delete" size="small" type="danger" @click="deleteFn(scope.row.id)">
              删除
            </el-button>
            <el-button icon="Edit" size="small" @click="editIndex = scope.$index">
              编辑
            </el-button>
          </template>
          <div v-else class="row_edit" style="margin-bottom: 20px">
            <el-button icon="FolderChecked" size="small" type="primary" @click="saveFn(scope)">
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
      <el-pagination v-if="params.total" v-model:current-page="params.pageNumber" v-model:page-size="params.pageSize"
        :page-sizes="[10, 50, 100, 150]" :small="false" :total="params.total"
        layout="total, sizes, prev, pager, next, jumper" @size-change="getData" @current-change="getData" />
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

.row_edit {
  padding-top: 15px;
}
</style>
