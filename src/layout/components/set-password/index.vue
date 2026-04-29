<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { updatePassword } from "@/api";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import md5 from "js-md5";
import { useI18n } from "vue-i18n";

const store = useUserStoreHook();
const { t } = useI18n();

interface Props {
  modelValue: boolean;
}

interface Emits {
  (e: "update:modelValue", isShow: boolean): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const form = ref({
  password: "",
  confirmPassword: "",
  oldPassword: ""
});
const ruleFormRef = ref<FormInstance>();
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return updatePassword({
        password: md5(form.value.password),
        oldPassword: md5(form.value.oldPassword),
        account: store.userInfo!.account
      });
    })
    .then(res => {
      store.userInfo = res.data;
      ElMessage.success(t("passwordModal.success"));
      emits("update:modelValue", false);
    });
};
const urlValidator = (rule: any, value: any, callback: any) => {
  if (value != form.value.password) {
    callback(new Error(t("passwordModal.rules.passwordMismatch")));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<any>>({
  password: [{ required: true, message: t("passwordModal.rules.passwordRequired"), trigger: "blur" }],
  confirmPassword: [
    { required: true, message: t("passwordModal.rules.confirmPasswordRequired"), trigger: "blur" },
    { validator: urlValidator, trigger: "blur" }
  ],
  oldPassword: [{ required: true, message: t("passwordModal.rules.oldPasswordRequired"), trigger: "blur" }]
});

const closeFn = () => {
  ruleFormRef.value?.resetFields(); // 重置表单验证器
};
</script>

<template>
  <el-dialog
    :destroy-on-close="true"
    :modelValue="modelValue"
    append-to-body
    :title="t('passwordModal.title')"
    width="400px"
    @close="closeFn"
    @update:modelValue="$emit('update:modelValue', false)"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="120px"
    >
      <el-form-item :label="t('passwordModal.fields.oldPassword')" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          :placeholder="t('passwordModal.placeholders.oldPassword')"
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item :label="t('passwordModal.fields.password')" prop="password">
        <el-input
          v-model="form.password"
          :placeholder="t('passwordModal.placeholders.password')"
          show-password
          type="password"
        />
      </el-form-item>
      <el-form-item :label="t('passwordModal.fields.confirmPassword')" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          :placeholder="t('passwordModal.placeholders.confirmPassword')"
          show-password
          type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-row justify="center" style="width: 100%">
          <el-col :span="12">
            <el-button
              size="large"
              style="width: 100%"
              type="primary"
              @click="onSubmit(ruleFormRef)"
              >{{ t('button.save') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
