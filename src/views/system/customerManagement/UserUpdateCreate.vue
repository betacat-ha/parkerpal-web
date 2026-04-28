<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import UploadImage from "@/components/UploadImage.vue";
import { pageRoleListUser, userCreateOrUpdate } from "@/api";
import { TableType } from "@/views/system/setRole/index.vue";
import { useI18n } from "vue-i18n";

interface Props {
  modelValue: boolean;
  fromData: TableType;
}

interface Emits {
  (e: "update:modelValue", isShow: boolean): void;
  (e: "updateFn"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { t } = useI18n();
const form = ref<TableType>({
  account: "",
  freeTime: 15,
  frontBusinessLicense: "",
  headSculpture: "",
  id: "",
  phoneNumber: "",
  unitAddress: "",
  roleId: "",
  status: 1,
  userName: ""
});
const roleList = ref<any[]>([]);

watchEffect(() => {
  form.value = JSON.parse(JSON.stringify(props.fromData));
});
const getRoleList = () => {
  pageRoleListUser({ pageNumber: 1, pageSize: 1000 }).then((res: any) => {
    roleList.value = res.data.list;
  });
};
onBeforeMount(() => {
  getRoleList();
});
const ruleFormRef = ref<FormInstance>();
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return userCreateOrUpdate(form.value);
    })
    .then(() => {
      if (!form.value.id) {
        ElMessageBox.alert(t('system.customerManagement.messages.defaultPassword'), t('system.customerManagement.messages.createSuccess'), {
          confirmButtonText: t('system.customerManagement.actions.known'),
          callback: () => {
            emits("updateFn");
            emits("update:modelValue", false);
          }
        });
      } else {
        ElMessage.success(t('message.saveSuccess'));
        emits("updateFn");
        emits("update:modelValue", false);
      }
    });
};
const urlValidator = (rule: any, value: any, callback: any) => {
  if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
    callback(new Error(t('system.customerManagement.rules.phoneNumberPattern')));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<any>>({
  account: [{ required: true, message: t('system.customerManagement.rules.account'), trigger: "blur" }],
  userName: [{ required: true, message: t('system.customerManagement.rules.userName'), trigger: "blur" }],
  roleId: [{ required: true, message: t('system.customerManagement.rules.roleId'), trigger: "blur" }],
  status: [{ required: true, message: t('system.customerManagement.rules.status'), trigger: "blur" }],
  phoneNumber: [
    { required: true, message: t('system.customerManagement.rules.phoneNumber'), trigger: "blur" },
    { validator: urlValidator, trigger: "blur" }
  ],
  freeTime: [
    { required: true, message: t('system.customerManagement.rules.freeTime'), trigger: "blur" }
  ],
  frontBusinessLicense: [
    { required: false, message: t('system.customerManagement.rules.frontBusinessLicense'), trigger: "blur" }
  ]
});
const closeFn = () => {
  ruleFormRef.value?.resetFields();
};
const statusList = [
  { value: 1, label: t('system.customerManagement.status.normal') },
  { value: 2, label: t('system.customerManagement.status.locked') },
  { value: 3, label: t('system.customerManagement.status.disabled') }
];
</script>

<template>
  <el-dialog
    :destroy-on-close="true"
    :modelValue="modelValue"
    :title="fromData.id ? t('system.customerManagement.dialog.editTitle') : t('system.customerManagement.dialog.addTitle')"
    @close="closeFn"
    @update:modelValue="$emit('update:modelValue', false)"
  >
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-position="top" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('system.customerManagement.fields.account')" prop="account">
            <el-input v-model="form.account" :placeholder="t('system.customerManagement.placeholders.account')" :disabled="fromData.id ? true : false" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('system.customerManagement.fields.userName')" prop="userName">
            <el-input v-model="form.userName" :placeholder="t('system.customerManagement.placeholders.userName')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('system.customerManagement.fields.phoneNumber')" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" maxlength="11" :placeholder="t('system.customerManagement.placeholders.phoneNumber')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('system.customerManagement.fields.roleId')" prop="roleId">
            <el-select v-model="form.roleId" :placeholder="t('system.customerManagement.placeholders.roleId')" disabled>
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('label.status')" prop="status">
            <el-select v-model="form.status" :placeholder="t('system.customerManagement.placeholders.status')">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.roleId !== '3'" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('system.customerManagement.fields.freeTime')" prop="freeTime">
            <el-input v-model="form.freeTime" :placeholder="t('system.customerManagement.placeholders.freeTime')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-row justify="center" style="width: 100%">
          <el-col :span="12">
            <el-button size="large" style="width: 100%" type="primary" @click="onSubmit(ruleFormRef)">
              {{ t('button.save') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
