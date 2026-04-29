<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue";
import { FormInstance, FormRules } from "element-plus/es/components/form";
import { getChargeRules, updateChargeRules } from "@/api";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 初始化表单数据
const form = ref({
  freeDuration: 0,
  id: "",
  monthlyEnterpriseCar: "",
  monthlyExternalCarMachinery: "",
  monthlyInternalCar: "",
  monthlyInternalCarNoMachinery: "",
  feeCap: "",
  tollStandard: ""
});

// 表单引用
const ruleFormRef = ref<FormInstance>();

// 表单验证规则
const rules = reactive<FormRules<any>>({
  freeDuration: [
    { required: true, message: t("costManagement.feeRules.rules.freeDuration"), trigger: "blur" }
  ],
  tollStandard: [
    { required: true, message: t("costManagement.feeRules.rules.tollStandard"), trigger: "blur" }
  ],
  monthlyInternalCar: [
    { required: true, message: t("costManagement.feeRules.rules.monthlyInternalCar"), trigger: "blur" }
  ],
  monthlyEnterpriseCar: [
    { required: true, message: t("costManagement.feeRules.rules.monthlyEnterpriseCar"), trigger: "blur" }
  ],
  monthlyExternalCarMachinery: [
    { required: true, message: t("costManagement.feeRules.rules.monthlyExternalCarMachinery"), trigger: "blur" }
  ],
  feeCap: [
    { required: true, message: t("costManagement.feeRules.rules.feeCap"), trigger: "blur" }
  ],
  monthlyInternalCarNoMachinery: [
    { required: true, message: t("costManagement.feeRules.rules.monthlyInternalCarNoMachinery"), trigger: "blur" }
  ]
});

// 提交表单
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return updateChargeRules(form.value);
    })
    .then(() => {
      ElMessage.success(t("message.saveSuccess"));
    });
};

// 页面加载时获取初始数据
onBeforeMount(() => {
  getChargeRules().then((res) => {
    form.value = res.data;
  });
});
</script>

<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="max-w-[600px]">
      <div class="title">
        <div class="lf">{{ t('costManagement.feeRules.title') }}</div>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item :label="t('costManagement.feeRules.fields.freeDuration')" prop="freeDuration">
          <el-input
            v-model="form.freeDuration"
            :placeholder="t('costManagement.feeRules.placeholders.freeDuration')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.minute') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('costManagement.feeRules.fields.tollStandard')" prop="tollStandard">
          <el-input
            v-model="form.tollStandard"
            :placeholder="t('costManagement.feeRules.placeholders.tollStandard')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.hour') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('costManagement.feeRules.fields.feeCap')" prop="feeCap">
          <el-input
            v-model="form.feeCap"
            :placeholder="t('costManagement.feeRules.placeholders.feeCap')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.day') }}</template>
          </el-input>
        </el-form-item>
        <div class="title">
          <div class="lf">{{ t('costManagement.feeRules.monthlyFeeTitle') }}</div>
        </div>
        <el-form-item :label="t('costManagement.feeRules.fields.monthlyInternalCar')" prop="monthlyInternalCar">
          <el-input
            v-model="form.monthlyInternalCar"
            :placeholder="t('costManagement.feeRules.placeholders.monthlyInternalCar')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.month') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('costManagement.feeRules.fields.monthlyEnterpriseCar')" prop="monthlyEnterpriseCar">
          <el-input
            v-model="form.monthlyEnterpriseCar"
            :placeholder="t('costManagement.feeRules.placeholders.monthlyEnterpriseCar')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.month') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="t('costManagement.feeRules.fields.monthlyExternalCarMachinery')"
          prop="monthlyExternalCarMachinery"
        >
          <el-input
            v-model="form.monthlyExternalCarMachinery"
            :placeholder="t('costManagement.feeRules.placeholders.monthlyExternalCarMachinery')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.month') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="t('costManagement.feeRules.fields.monthlyInternalCarNoMachinery')"
          prop="monthlyInternalCarNoMachinery"
        >
          <el-input
            v-model="form.monthlyInternalCarNoMachinery"
            :placeholder="t('costManagement.feeRules.placeholders.monthlyInternalCarNoMachinery')"
            type="number"
          >
            <template #append>{{ t('costManagement.feeRules.units.month') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style="width: 100%">
            <el-col :span="12">
              <el-button
                size="large"
                style="width: 100%"
                type="primary"
                @click="onSubmit(ruleFormRef)"
              >
                {{ t('button.save') }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 160px);
  border-radius: 10px;
  padding: 20px;

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
}
</style>