<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus/es/components/form";
import { updateParking } from "@/api";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

interface Props {
  modelValue: boolean;
  fromData: {
    disposableNumber: number;
    id: string;
    parkingNumber: number;
  };
}

interface Emits {
  (e: "update:modelValue", isShow: boolean): void;

  (e: "updateFn"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { t } = useI18n();
const form = ref<any>({
  disposableNumber: 0,
  id: "",
  parkingNumber: 0
});

watchEffect(() => {
  form.value = JSON.parse(JSON.stringify(props.fromData));
});

const ruleFormRef = ref<FormInstance>();
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return updateParking(form.value);
    })
    .then(() => {
      ElMessage.success(t('message.saveSuccess'));
      emits("updateFn");
      emits("update:modelValue", false);
    });
};
const rules = reactive<FormRules<any>>({
  disposableNumber: [
    { required: true, message: t('parkingRental.rules.disposableNumber'), trigger: "blur" }
  ],
  parkingNumber: [{ required: true, message: t('parkingRental.rules.parkingNumber'), trigger: "blur" }]
});
const closeFn = () => {
  ruleFormRef.value?.resetFields(); // 重置表单验证器
};
</script>

<template>
  <el-dialog :destroy-on-close="true" :modelValue="modelValue" :title="t('parkingRental.title')" width="500px" @close="closeFn"
    @update:modelValue="$emit('update:modelValue', false)">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-position="top" label-width="120px">
      <el-form-item :label="t('parkingRental.fields.disposableNumber')" prop="disposableNumber">
        <el-input v-model="form.disposableNumber" clearable :placeholder="t('parkingRental.placeholders.disposableNumber')" type="number" />
      </el-form-item>
      <el-form-item :label="t('parkingRental.fields.parkingNumber')" prop="parkingNumber">
        <el-input v-model="form.parkingNumber" clearable :placeholder="t('parkingRental.placeholders.parkingNumber')" type="number" />
      </el-form-item>

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
