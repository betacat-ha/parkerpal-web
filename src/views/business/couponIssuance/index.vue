<script lang="ts" setup>
import Carnumber from "@/components/Carnumber.vue";
import { FormInstance, FormRules } from "element-plus/es/components/form";
import { useUserStore } from "@/store/modules/user";
import { assignedNumber, createParkCollect, generateQRCode } from "@/api";
import Details from "@/views/business/couponIssuance/Details.vue";
import { _src } from "@/utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const ruleFormRef = ref<FormInstance>();
const isShow = ref(false);
const data = ref({});
const user = useUserStore().userInfo;
const form = ref({
  plates: "",
  userId: user.id
});
const mainlandLicensePlatesValidator = (
  rule: any,
  value: any,
  callback: any
) => {
  if (
    !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(
      value
    ) &&
    !/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
      value
    )
  ) {
    callback(new Error(t("couponIssuance.rules.platesPattern")));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<any>>({
  plates: [
    {
      required: true,
      message: t("couponIssuance.rules.platesRequired"),
      trigger: "blur"
    },
    { validator: mainlandLicensePlatesValidator, trigger: "blur" }
  ]
});
const carVisible = ref(false);
const carNumber = ref<InstanceType<typeof Carnumber> | null>(null);
const carVisibleChange = () => {
  carVisible.value = false;
};
const changeValue = (item: string) => {
  carNumber.value.updateValue(item);
  carVisible.value = true;
};
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (status.value) {
    if (!formEl) return;
    formEl
      .validate()
      .then(() => {
        return createParkCollect(form.value);
      })
      .then(res => {
        ruleFormRef.value.resetFields();
        isShow.value = true;
        data.value = res.data;
      });
  } else {
    ElMessage.error(`${user.userName}${t("couponIssuance.messages.noCouponLeft")}`);
  }
};
const num = ref(0);
const status = ref(0);
const url = ref("");
const qrCodeExpireTime = ref(""); // 二维码失效时间，时间戳
const qrCodeRemainingMinutes = ref(0); // 二维码剩余有效分钟数
let expiryUpdateTimer: any = null; // 更新剩余时间的定时器

// 格式化失效时间为可读的日期时间字符串 (yyyy.mm.dd HH:mm:ss 24小时制)
const formatExpiryTime = () => {
  if (!qrCodeExpireTime.value) return '';
  const expireTimeMs = typeof qrCodeExpireTime.value === 'string'
    ? parseInt(qrCodeExpireTime.value)
    : qrCodeExpireTime.value;
  
  const date = new Date(expireTimeMs);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

// 计算二维码还有多少分钟失效
const calculateRemainingMinutes = () => {
  if (!qrCodeExpireTime.value) return 0;
  const expireTimeMs = typeof qrCodeExpireTime.value === 'string' 
    ? parseInt(qrCodeExpireTime.value) 
    : qrCodeExpireTime.value;
  const now = Date.now();
  const remainingMs = expireTimeMs - now;
  return remainingMs > 0 ? Math.ceil(remainingMs / 60000) : 0;
};

// 启动剩余时间更新定时器
const startExpiryCountdown = () => {
  if (expiryUpdateTimer) clearInterval(expiryUpdateTimer);
  qrCodeRemainingMinutes.value = calculateRemainingMinutes();
  expiryUpdateTimer = setInterval(() => {
    qrCodeRemainingMinutes.value = calculateRemainingMinutes();
    if (qrCodeRemainingMinutes.value <= 0) {
      clearInterval(expiryUpdateTimer);
    }
  }, 60000); // 每分钟更新一次
};

onBeforeMount(() => {
  const userId = user.id;
  getCode();
  assignedNumber({ userId }).then(res => {
    num.value = res.data.assignedNumber ?? 0;
    status.value = res.data.assignedStatus ?? 0;
  });
});
let time = null;
const getCode = () => {
  clearTimeout(time);
  const userId = user.id;
  // TODO: 设置接口url
  generateQRCode({
    userId,
    url: "https://localhost:8848/#/pages/parkingLot/parkingLot"
  }).then(res => {
    url.value = res.data.qrCodeUrl;
    qrCodeExpireTime.value = res.data.expireTime;
    startExpiryCountdown();
    // time = setTimeout(getCode, 1800000);
    ElMessage.success(`${user.userName}${t("couponIssuance.messages.getCouponSuccess")}`);

  });
};
onBeforeUnmount(() => {
  clearTimeout(time);
  if (expiryUpdateTimer) clearInterval(expiryUpdateTimer);
});
</script>

<template>
  <div class="content bg-white dark:bg-[#141414] h-[calc(100vh-155px)]">
    <div class="title">
      <div class="lf">{{ t("couponIssuance.desktop.title") }}</div>
    </div>
    <div class="w-[500px] mx-auto">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <div class="text-center mb-[20px]">{{ t("couponIssuance.desktop.subtitle") }}</div>
        <el-form-item prop="plates">
          <el-popover v-model="carVisible" placement="bottom" trigger="click" width="600">
            <Carnumber ref="carNumber" v-model="form.plates" @fatherMethod="carVisibleChange" />
            <template #reference>
              <el-input v-model="form.plates" :validate-event="carVisible" maxlength="11"
                :placeholder="t('couponIssuance.placeholders.plates')" @input="changeValue(form.plates)" />
            </template>
          </el-popover>
        </el-form-item>
        <div class="flex justify-between mb-[20px]">
          <div>{{ t("couponIssuance.labels.merchantCoupon") }}：</div>
          <div>{{ user.userName }}</div>
        </div>
        <div class="flex justify-between mb-[20px]">
          <div>{{ t("couponIssuance.labels.remainingCoupon") }}：</div>
          <div>{{ num }}{{ t("couponIssuance.units.sheet") }}</div>
        </div>
        <el-row justify="center" style="width: 100%">
          <el-col :span="12">
            <el-button size="large" style="width: 100%" type="primary" @click="onSubmit(ruleFormRef)">
              {{ t("couponIssuance.buttons.receive") }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider />
    <div class="w-[500px] mx-auto">
      <div class="text-center mb-[20px]">{{ t("couponIssuance.desktop.qrTitle") }}</div>
      <img :src="_src(url)" :alt="t('couponIssuance.desktop.qrAlt')" class="w-[200px] h-[200px] mx-auto block mb-[20px]" />
      <div class="text-center mb-[10px]">
        {{ t("couponIssuance.qrExpiry.label") }}<span class="font-semibold">{{ formatExpiryTime() }}</span>
      </div>
      <div class="text-center">
        {{ t("couponIssuance.desktop.qrNotice") }}
        <span v-if="qrCodeRemainingMinutes > 0" class="text-primary">
          {{ t("couponIssuance.qrExpiry.remainingMinutes", { minutes: qrCodeRemainingMinutes }) }}
        </span>
        <span v-else class="text-danger">{{ t("couponIssuance.qrExpiry.expired") }}</span>
      </div>
      <el-row justify="center" style="width: 100%">
        <el-col :span="12">
          <el-button size="large" style="width: 100%; margin-top: 20px" type="primary" @click="getCode">
            {{ t("couponIssuance.buttons.refreshQr") }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <Details v-model="isShow" :data="data" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-bottom: 20px;

  padding: 20px;
  border-radius: 5px;

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
