<template>
  <div class="i18n-demo">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t('menu.vehicle') }} - {{ $t('menu.parkingSpace') }}</span>
          <LanguageSwitcher />
        </div>
      </template>

      <!-- 表单示例 -->
      <el-form :model="form" label-width="120px" class="demo-form">
        <el-form-item :label="$t('vehicle.licensePlate')">
          <el-input v-model="form.licensePlate" :placeholder="$t('label.name')" />
        </el-form-item>
        <el-form-item :label="$t('vehicle.owner')">
          <el-input v-model="form.owner" />
        </el-form-item>
        <el-form-item :label="$t('vehicle.phone')">
          <el-input v-model="form.phone" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">
            {{ $t('button.submit') }}
          </el-button>
          <el-button @click="handleReset">
            {{ $t('button.reset') }}
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 表格示例 -->
      <h3>{{ $t('parkingSpace.title') }}</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :label="$t('parkingSpace.spaceNumber')" prop="spaceNumber" />
        <el-table-column :label="$t('parkingSpace.floor')" prop="floor" />
        <el-table-column :label="$t('parkingSpace.price')" prop="price" />
        <el-table-column :label="$t('parkingSpace.occupiedStatus')">
          <template #default="{ row }">
            <el-tag :type="row.occupiedStatus ? 'danger' : 'success'">
              {{ row.occupiedStatus ? $t('parkingSpace.occupied') : $t('parkingSpace.empty') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.operation')" width="200">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">
              {{ $t('button.edit') }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage, ElMessageBox } from "element-plus";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default defineComponent({
  name: "I18nDemo",
  components: {
    LanguageSwitcher
  },
  setup() {
    const { t } = useI18n();

    const form = {
      licensePlate: "",
      owner: "",
      phone: ""
    };

    const tableData = [
      {
        spaceNumber: "A001",
        floor: "1F",
        price: "¥50/day",
        occupiedStatus: true
      },
      {
        spaceNumber: "A002",
        floor: "1F",
        price: "¥50/day",
        occupiedStatus: false
      },
      {
        spaceNumber: "B001",
        floor: "2F",
        price: "¥40/day",
        occupiedStatus: false
      }
    ];

    const handleSubmit = () => {
      ElMessage.success(t("message.saveSuccess"));
    };

    const handleReset = () => {
      form.licensePlate = "";
      form.owner = "";
      form.phone = "";
    };

    const handleEdit = (row: any) => {
      ElMessage.info(t("button.edit") + ": " + row.spaceNumber);
    };

    const handleDelete = (row: any) => {
      ElMessageBox.confirm(
        t("message.confirmDelete"),
        t("message.warning"),
        {
          confirmButtonText: t("button.confirm"),
          cancelButtonText: t("button.cancel"),
          type: "warning"
        }
      ).then(() => {
        ElMessage.success(t("message.deleteSuccess"));
      });
    };

    return {
      form,
      tableData,
      handleSubmit,
      handleReset,
      handleEdit,
      handleDelete,
      t
    };
  }
});
</script>

<style scoped>
.i18n-demo {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-form {
  margin-top: 20px;
}

h3 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.el-table {
  margin-top: 20px;
}
</style>
