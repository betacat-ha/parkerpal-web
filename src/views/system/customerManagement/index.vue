<script lang="ts" setup>
import { deleteUser, pageCustomerList, resettingPassword } from "@/api";
import md5 from "js-md5";
import UserUpdateCreate from "./UserUpdateCreate.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export type TableType = {
  account: string;
  freeTime: number;
  frontBusinessLicense: string;
  headSculpture: string;
  id: string;
  phoneNumber: string;
  roleId: string;
  status: number;
  userName: string;
  unitAddress: string;
};
const isShow = ref(false);
const { t } = useI18n();
const dataList = ref<TableType[]>([]);
const params = reactive({
  pageNumber: 1,
  pageSize: 10,
  total: 0,
  totalNumber: 0
});
const searchParams = reactive({
  userName: "",
  account: ""
});
const initData = {
  account: "",
  freeTime: 15,
  frontBusinessLicense: "",
  headSculpture: "",
  id: "",
  phoneNumber: "",
  unitAddress: "",
  roleId: "0",
  status: 1,
  userName: ""
};
const data = ref<TableType>(initData);
// 打开编辑
const openFn = (e: any) => {
  data.value = e;
  isShow.value = true;
};

//删除
const resetting = (userId: string) => {
  ElMessageBox.confirm(t('message.confirmDelete'), t('message.info'), {
    confirmButtonText: t('button.confirm'),
    cancelButtonText: t('button.cancel'),
    type: 'warning'
  })
    .then(() => {
      const defaultPassword = (md5 as unknown as (value: string) => string)("123456");
      return resettingPassword({ ids: [userId], password: defaultPassword });
    })
    .then(() => {
      ElMessage.success(t('system.customerManagement.messages.resetSuccess'));
      getData();
    });
};
//删除
const delteFn = (userId: string) => {
  ElMessageBox.confirm(t('message.confirmDelete'), t('message.info'), {
    confirmButtonText: t('button.confirm'),
    cancelButtonText: t('button.cancel'),
    type: 'warning'
  })
    .then(() => {
      return deleteUser({ ids: [userId] });
    })
    .then(() => {
      ElMessage.success(t('message.deleteSuccess'));
      getData();
    });
};
//新增
const addData = () => {
  data.value = initData;
  isShow.value = true;
};
//获取数据
const getData = () => {
  const { pageSize, pageNumber } = params;
  pageCustomerList({
    roleId: "0",
    pageSize,
    pageNumber,
    ...searchParams
  }).then((res: any) => {
    const { pageNumber, pageSize, total, totalNumber, list } = res.data;
    dataList.value = list;
    Object.assign(params, { pageNumber, pageSize, total, totalNumber });
  });
};
onBeforeMount(() => {
  getData();
});

const tableHeight = computed(() => {
  let windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  return windowHeight - 380;
});
const statusList = computed(() => [
  { value: 1, label: t('system.customerManagement.status.normal') },
  { value: 2, label: t('system.customerManagement.status.locked') },
  { value: 3, label: t('system.customerManagement.status.disabled') }
]);
</script>

<template>
  <div class="bg-white dark:bg-[#141414] content">
    <div class="c_box">
      <div class="title">
        <div class="lf">{{ t('system.customerManagement.title') }}</div>
      </div>
      <div class="form_box_p">
        <div class="form_box">
          <div class="form_item_box">
            <div>{{ t('system.customerManagement.fields.account') }}：</div>
            <el-input v-model="searchParams.account" clearable :placeholder="t('system.customerManagement.placeholders.account')" />
          </div>
          <div class="form_item_box">
            <div>{{ t('system.customerManagement.fields.userName') }}：</div>
            <el-input v-model="searchParams.userName" clearable :placeholder="t('system.customerManagement.placeholders.userName')" />
          </div>
        </div>
        <el-button type="primary" @click="getData">{{ t('button.search') }}</el-button>
      </div>

      <el-table :data="dataList" :height="tableHeight" :style="{ width: '100%' }">
        <el-table-column type="index" />

        <el-table-column align="center" :label="t('system.customerManagement.columns.account')">
          <template #default="scope">
            <div class="text_box">{{ scope.row.account ?? "--" }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('system.customerManagement.columns.userName')">
          <template #default="scope">
            <div class="text_box">{{ scope.row.userName ?? "--" }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('system.customerManagement.columns.phoneNumber')">
          <template #default="scope">
            <div class="text_box">
              {{ scope.row.phoneNumber ?? "--" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('system.customerManagement.columns.freeTime')">
          <template #default="scope">
            <div class="text_box">
              {{ scope.row.freeTime ?? "--" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('label.status')">
          <template #default="scope">
            <div class="text_box">
              {{ statusList.find(item => item.value === scope.row.status)?.label ?? "--" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('label.created')">
          <template #default="scope">
            <div class="text_box">
              {{ scope.row.createTime ?? "--" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('label.operation')" width="265">
          <template #default="scope">
            <el-form-item prop="url">
              <el-button icon="Delete" size="small" type="danger" @click="delteFn(scope.row.id)">
                {{ t('button.delete') }}
              </el-button>
              <el-button icon="Edit" size="small" @click="openFn(scope.row)">
                {{ t('button.edit') }}
              </el-button>
              <el-button icon="Edit" size="small" @click="resetting(scope.row.id)">
                {{ t('system.customerManagement.actions.resetPassword') }}
              </el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-pagination v-if="params.total" v-model:current-page="params.pageNumber" v-model:page-size="params.pageSize"
          :page-sizes="[10, 50, 100, 150]" :small="false" :total="params.total"
          layout="total, sizes, prev, pager, next, jumper" @size-change="getData" @current-change="getData" />
      </div>
      <el-button icon="Plus" size="small" style="margin-top: 20px" type="primary" @click="addData">
        {{ t('button.add') }}
      </el-button>
    </div>
    <UserUpdateCreate v-model="isShow" :from-data="data" @update-fn="getData" />
  </div>
</template>

<style lang="scss" scoped>
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
  align-items: flex-start;
  font-size: 14px;
  gap: 20px;
  margin-bottom: 10px;
}

.form_box {
  flex: 1;
  display: flex;
  gap: 20px;

  .form_item_box {
    display: flex;
    align-items: center;
    width: 33%;

    &>div:nth-child(1) {
      text-align: right;
      flex-shrink: 0;
      width: 190px;
    }

    .el-row,
    .time_picker_date {
      flex: 1;
    }
  }
}

.text_box {
  margin-bottom: 18px;
}
</style>
