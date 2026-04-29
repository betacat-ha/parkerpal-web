<script lang="ts" setup>
import { useI18n } from "vue-i18n";

interface Props {
  modelValue: boolean;
  data: any;
}

interface Emits {
  (e: "update:modelValue", isShow: boolean): void;
}

const form = ref({
  discount: "",
  endTime: "",
  id: "",
  isItOver: 0,
  mainlandLicensePlates: "",
  receiveTime: "",
  startTime: "",
  totalAmount: "",
  totalDiscountAmount: "",
  totalDuration: "",
  totalIncomeAmount: "",
  userId: ""
});
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { t } = useI18n();
watchEffect(() => {
  form.value = JSON.parse(JSON.stringify(props.data));
});
</script>

<template>
  <el-dialog
    :destroy-on-close="true"
    :modelValue="modelValue"
    :title="t('couponIssuance.dialog.title')"
    width="400px"
    @update:modelValue="$emit('update:modelValue', false)"
  >
    <div>
      <div class="mb-[20px]">{{ t('couponIssuance.dialog.parkingLot') }}</div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.licensePlate') }}：</div>
        <div>{{ form.mainlandLicensePlates ?? "--" }}</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.startTime') }}：</div>
        <div>{{ form.startTime ?? "--" }}</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.endTime') }}：</div>
        <div>{{ form.endTime ?? "--" }}</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.totalDuration') }}：</div>
        <div>{{ form.totalDuration ?? "--" }}</div>
      </div>
      <el-divider />
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.totalAmount') }}：</div>
        <div>{{ form.totalAmount ?? "--" }}元</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.discountAmount') }}：</div>
        <div>{{ form.totalDiscountAmount ?? "--" }}元</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.discountInfo') }}：</div>
        <div>{{ form.discount ?? "--" }}</div>
      </div>
      <div class="flex justify-between mb-[20px]">
        <div>{{ t('couponIssuance.dialog.payableAmount') }}：</div>
        <div>{{ form.totalIncomeAmount ?? "--" }}元</div>
      </div>
      <div class="mt-[40px] text-[#e4393c] text-[30px] text-center">
        {{ t('couponIssuance.dialog.success') }}
      </div>
      <div class="mt-[20px] text-center">
        {{ t('couponIssuance.dialog.noticePrefix') }}
        <span class="text-[#e4393c]">{{ t('couponIssuance.dialog.noticeHighlight') }}</span>
        {{ t('couponIssuance.dialog.noticeSuffix') }}
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
