<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { deleteIotDevice, pageParkingSpaceList, newOrUpdateParkingSpace, SystemParkingSpace } from "@/api";
import { ElMessage } from "element-plus";
import { iotRoleList, parkingSpaceModelNameList, parkingSpaceFNumList, parkingSpaceStatusList } from "@/views/data";
import { computed } from "vue";
import { id } from "element-plus/es/locale/index.mjs";
import { status } from "nprogress";
import { number } from "echarts";
import { integer } from "vue-types";

defineOptions({
  name: "ParkingSpaceManagement"
});
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
    { required: true, message: '请输入车位ID', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入车位名称', trigger: 'blur' },
  ],
  deviceId: [
    { required: true, message: '请输入设备ID', trigger: 'change' },
  ],
  modelName: [
    { required: true, message: '请选择楼层名', trigger: 'change' },
  ],
  status: [
    { required: true, message: '请选择车位状态', trigger: 'change' },
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
    ElMessage.warning("编辑状态不可新增！");
  }
};

</script>
<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="title">
      <div class="lf">车位管理</div>
    </div>
    <div class="form_box_p">
      <div class="form_box">
        <div class="form_item_box">
          <div>车位名称：</div>
          <el-input v-model="searchParams.name" clearable placeholder="请输入车位名称" />
        </div>
        <div class="form_item_box">
          <div>车场：</div>
          <el-select v-model="searchParams.modelName" clearable placeholder="请选择车场" style="width: 100%">
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
          <div>绑定的设备ID：</div>
          <el-input v-model="searchParams.deviceId" clearable placeholder="请输入绑定的设备ID" />
        </div>
        <div class="form_item_box">
          <div>车位状态：</div>
          <el-select v-model="searchParams.status" clearable placeholder="请选择车位状态" style="width: 100%">
            <el-option v-for="item in parkingSpaceStatusList" :key="Number(item.value)" :label="item.label"
              :value="Number(item.value)" />
          </el-select>
        </div>
        <!-- <div class="form_item_box">
          <div>创建时间段：</div>
          <div class="time_picker_date">
            <el-date-picker v-model="time" end-placeholder="结束时间" range-separator="To" start-placeholder="开始时间"
              type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
              @change="(e: any) => changeFnTime(e, 'startTime', 'endTime')" />
          </div>
        </div> -->
      </div>
      <el-button type="primary" @click="getData">搜索</el-button>
    </div>
    <el-table ref="tableRef" :data="dataList" :height="tableHeight" :tooltip-options="tooltipOptions"
      show-overflow-tooltip>
      <el-table-column :index="indexMethod" :show-overflow-tooltip="false" align="center" label="序号" min-width="60"
        type="index" />
      <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" label="车位ID" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
            :rules="rules">
            <el-form-item prop="id">
              <el-input v-model="scope.row.id" placeholder="请输入车位ID" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.id }}
          </template>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="editIndex < 0" align="center" label="车位名" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" id="form_item_box" :ref="setItemRef" :model="scope.row"
            :rules="rules">
            <el-form-item prop="name">
              <el-input v-model="scope.row.name" placeholder="请输入车位名" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.name }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备ID" min-width="100px">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="location">
              <el-input v-model="scope.row.deviceId" clearable placeholder="请输入设备ID" />
            </el-form-item>
          </el-form>
          <template v-else>
            {{ scope.row.deviceId }}
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车位状态" min-width="130">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="groupId">
              <el-select v-model="scope.row.status" clearable placeholder="请选择车位状态" style="width: 100%">
                <el-option v-for="item in parkingSpaceStatusList" :key="Number(item.value)" :label="item.label"
                  :value="Number(item.value)" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceStatusList.find(item => item.value == scope.row.status)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" label="车场名" min-width="180">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="modelName">
              <el-select v-model="scope.row.modelName" clearable placeholder="请选择车场名" style="width: 100%">
                <el-option v-for="item in parkingSpaceModelNameList" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceModelNameList.find(item => item.value == scope.row.modelName)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" label="楼层" width="130">
        <template #default="scope">
          <el-form v-if="scope.$index == editIndex" :ref="setItemRef" :model="scope.row" :rules="rules">
            <el-form-item prop="fnum">
              <el-select v-model="scope.row.fnum" clearable placeholder="请选择楼层" style="width: 100%">
                <el-option v-for="item in parkingSpaceFNumList" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <template v-else>
            {{
            parkingSpaceFNumList.find(item => item.value == scope.row.fnum)
            ?.label
            }}
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" prop="createTime" width="200" />
      <el-table-column align="center" label="修改时间" prop="updateTime" width="200" />

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
          <div v-else style="margin-bottom: 20px">
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
</style>
