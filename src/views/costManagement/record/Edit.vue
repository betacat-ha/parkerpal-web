<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus/es/components/form";
import { countMoney, createOrUpdate, getChargeRules } from "@/api";
import Carnumber from "@/components/Carnumber.vue";
import { carTypeList } from "@/views/data";
import { useI18n } from "vue-i18n";

interface Props {
  modelValue: boolean;
  fromData: any;
}

interface Emits {
  (e: "update:modelValue", isShow: boolean): void;

  (e: "updateFn"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { t } = useI18n();
const form = ref({
  carTypeCode: "",
  cardId: "",
  id: "",
  longTerm: 0,
  mainlandLicensePlates: "",
  monthlyEndTime: "",
  monthlyFree: 0,
  monthlyStartTime: "",
  parkingLotCode: "",
  phoneNumber: "",
  userName: ""
});
const ruleFormRef = ref<FormInstance>();
const monthlyMoney = ref(0);

const phoneNumberValidator = (rule: any, value: any, callback: any) => {
  if (value && !/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
    callback(new Error(t("costManagement.record.errors.phoneNumber")));
  } else {
    callback();
  }
};
const cardIdValidator = (rule: any, value: any, callback: any) => {
  if (
    value &&
    !/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
      value
    )
  ) {
    callback(new Error(t("costManagement.record.errors.cardId")));
  } else {
    callback();
  }
};
const mainlandLicensePlatesValidator = (
  rule: any,
  value: any,
  callback: any
) => {
  if (
    !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(
      value
    )
  ) {
    callback(new Error(t("costManagement.record.errors.licensePlate")));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<any>>({
  phoneNumber: [{ validator: phoneNumberValidator, trigger: "blur" }],
  cardId: [{ required: false, validator: cardIdValidator, trigger: "blur" }],
  carTypeCode: [{ required: true, message: t("costManagement.record.rules.carTypeCode"), trigger: "blur" }],
  monthlyStartTime: [
    { required: true, message: t("costManagement.record.rules.monthlyStartTime"), trigger: "blur" }
  ],
  mainlandLicensePlates: [
    { required: true, message: t("costManagement.record.rules.mainlandLicensePlates"), trigger: "blur" },
    { validator: mainlandLicensePlatesValidator, trigger: "blur" }
  ]
});
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return createOrUpdate(form.value);
    })
    .then(() => {
      ruleFormRef.value.resetFields();
      ElMessage.success(form.value.id ? t("costManagement.record.messages.editSuccess") : t("costManagement.record.messages.addSuccess"));
      emits("update:modelValue", false);
      emits("updateFn");
    });
};
const closeFn = () => {
  ruleFormRef.value?.resetFields(); // 重置表单验证器
  monthlyMoney.value = 0;
};
const carVisible = ref(false);
const carNumber = ref<InstanceType<typeof Carnumber> | null>(null);
watchEffect(() => {
  if (props.modelValue) {
    form.value = JSON.parse(JSON.stringify(props.fromData));
  }
});
watchEffect(() => {
  carNumber.value?.updateValue(form.value.mainlandLicensePlates);
});
const carVisibleChange = () => {
  carVisible.value = false;
};
const changeValue = (item: string) => {
  carNumber.value.updateValue(item);
  carVisible.value = true;
};

const chargeMap = ref<Record<string, number>>({});
const options = computed(() =>
  carTypeList(t).map(item => ({
    ...item,
    charge: chargeMap.value[item.key] ?? 0
  }))
);
const freeTimePeriod = computed<any>({
  get() {
    return [form.value.monthlyStartTime, form.value.monthlyEndTime];
  },
  set(value) {
    form.value.monthlyStartTime = value?.[0] ?? "";
    form.value.monthlyEndTime = value?.[1] ?? "";
  }
});
onBeforeMount(() => {
  getChargeRules().then(res => {
    chargeMap.value = res.data;
  });
});
watchEffect(() => {
  form.value.monthlyFree =
    options.value.find(item => item.value === form.value.carTypeCode)?.charge ||
    0;
});

watch(
  [
    () => form.value.carTypeCode,
    () => form.value.longTerm,
    () => form.value.monthlyFree,
    () => form.value.monthlyStartTime
  ],
  () => {
    const {
      carTypeCode,
      longTerm,
      monthlyEndTime,
      monthlyFree,
      monthlyStartTime
    } = form.value;
    if (carTypeCode && monthlyFree && (monthlyStartTime || longTerm)) {
      countMoney({
        carTypeCode,
        longTerm,
        monthlyEndTime,
        monthlyFree,
        monthlyStartTime
      }).then(res => {
        monthlyMoney.value = res.data;
      });
    }
  }
);
</script>

<template>
  <el-dialog
    :destroy-on-close="true"
    :modelValue="modelValue"
    :title="form.id ? t('costManagement.record.dialog.editTitle') : t('costManagement.record.dialog.addTitle')"
    width="600px"
    @close="closeFn"
    @update:modelValue="$emit('update:modelValue', false)"
  >
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="135px">
      <el-form-item :label="t('costManagement.record.fields.mainlandLicensePlates')" prop="mainlandLicensePlates">
        <el-popover
          v-model="carVisible"
          placement="bottom"
          trigger="click"
          width="600"
        >
          <Carnumber
            ref="carNumber"
            v-model="form.mainlandLicensePlates"
            @fatherMethod="carVisibleChange"
          />
          <template #reference>
            <el-input
              v-model="form.mainlandLicensePlates"
              :maxlength="8"
              :validate-event="carVisible"
              :placeholder="t('costManagement.record.placeholders.mainlandLicensePlates')"
              @input="changeValue(form.mainlandLicensePlates)"
            />
          </template>
        </el-popover>
      </el-form-item>
        <el-form-item :label="t('vehicle.vehicleType')" prop="carTypeCode">
          <el-select v-model="form.carTypeCode" :placeholder="t('costManagement.record.placeholders.carTypeCode')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :required="!form.longTerm"
        :label="t('costManagement.record.fields.monthlyTimeRange')"
        prop="monthlyStartTime"
      >
        <div class="flex gap-[20px] items-center w-[100%]">
          <el-date-picker
            v-model="freeTimePeriod"
            :disabled="!!form.longTerm"
            :end-placeholder="t('costManagement.record.placeholders.endMonth')"
            :range-separator="t('device.placeholders.rangeSeparator')"
            :start-placeholder="t('costManagement.record.placeholders.startMonth')"
            style="flex: 1"
            type="monthrange"
            value-format="YYYY-MM"
          />
          <el-checkbox
            v-model="form.longTerm"
            :false-value="0"
            :true-value="1"
            :label="t('costManagement.record.labels.longTerm')"
            size="large"
          />
        </div>
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.monthlyFree')" prop="monthlyFree">
        <el-input v-model="form.monthlyFree" disabled type="number">
          <template #append>{{ t('costManagement.record.units.month') }}</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.parkingLotCode')" prop="parkingLotCode">
        <el-input v-model="form.parkingLotCode" :placeholder="t('costManagement.record.placeholders.parkingLotCode')" />
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.userName')" prop="userName">
        <el-input v-model="form.userName" :placeholder="t('costManagement.record.placeholders.userName')" />
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.phoneNumber')" prop="phoneNumber">
        <el-input
          v-model="form.phoneNumber"
          maxlength="11"
          :placeholder="t('costManagement.record.placeholders.phoneNumber')"
          type="number"
        />
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.cardId')" prop="cardId">
        <el-input v-model="form.cardId" maxlength="18" :placeholder="t('costManagement.record.placeholders.cardId')" />
      </el-form-item>
      <el-form-item :label="t('costManagement.record.fields.charge')">
        <div class="font-bold text-[16px] text-[#e4393c]">
          ￥<span class="ml-1 text-[20px]">{{ monthlyMoney }}</span>
        </div>
      </el-form-item>
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
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
