<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus/es/components/form";
import { getWeChatJsapiPay, weChatJsapiPayCreateOrUpdate } from "@/api";
import { UploadUserFile } from "element-plus";
import type { UploadProps } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useI18n } from "vue-i18n";

const form = ref({
  apiV3Key: "",
  appId: "",
  currency: "",
  id: "",
  macId: "",
  macSerialNo: "",
  privateKeyPath: "",
  secret: ""
});
const { t } = useI18n();
const token = useUserStore().userInfo.token;
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  appId: [{ required: true, message: t('system.wxManage.rules.appId'), trigger: 'blur' }],
  currency: [{ required: true, message: t('system.wxManage.rules.currency'), trigger: 'blur' }],
  apiV3Key: [{ required: true, message: t('system.wxManage.rules.apiV3Key'), trigger: 'blur' }],
  macId: [{ required: true, message: t('system.wxManage.rules.macId'), trigger: 'blur' }],
  macSerialNo: [{ required: true, message: t('system.wxManage.rules.macSerialNo'), trigger: 'blur' }],
  secret: [{ required: true, message: t('system.wxManage.rules.secret'), trigger: 'blur' }],
  privateKeyPath: [{ required: true, message: t('system.wxManage.rules.privateKeyPath'), trigger: 'blur' }]
});
const fileList = ref<UploadUserFile[]>([]);
const action = import.meta.env.VITE_API_HOST + '/systemManagement/uploadPrivateKey';
let Loading: any = null;
const handleAvatarError = () => {
  Loading.close();
  ElMessage.error(t('system.wxManage.messages.uploadFailed'));
};
const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
  if (response.code == 200) {
    ElMessage.success(t('system.wxManage.messages.uploadSuccess'));
    form.value.privateKeyPath = response.data;
    fileList.value = [{
      name: response.data,
      url: response.data,
    }];
  } else {
    ElMessage.error(response.message);
  }
  Loading.close();
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = () => {
  Loading = ElLoading.service({
    lock: true,
    text: t('system.wxManage.messages.loading'),
    background: 'rgba(255, 255, 255, 0.8)'
  });
  return true;
};
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      return weChatJsapiPayCreateOrUpdate(form.value);
    })
    .then(() => {
      ElMessage.success(t('message.saveSuccess'));
    });
};
onBeforeMount(() => {
  getWeChatJsapiPay().then(res => {
    form.value = res.data;
    fileList.value.push({
      name: res.data.privateKeyPath,
      url: res.data.privateKeyPath,
    });
  });
});
</script>

<template>
  <div class="content bg-white dark:bg-[#141414]">
    <div class="max-w-[600px]">
      <div class="title">
        <div class="lf">{{ t('system.wxManage.title') }}</div>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="176px"
      >
        <el-form-item :label="t('system.wxManage.fields.appId')" prop="appId">
          <el-input
            v-model="form.appId"
            :placeholder="t('system.wxManage.placeholders.appId')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="t('system.wxManage.fields.currency')" prop="currency">
          <el-input
            v-model="form.currency"
            :placeholder="t('system.wxManage.placeholders.currency')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="t('system.wxManage.fields.apiV3Key')" prop="apiV3Key">
          <el-input
            v-model="form.apiV3Key"
            :placeholder="t('system.wxManage.placeholders.apiV3Key')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="t('system.wxManage.fields.macId')" prop="macId">
          <el-input
            v-model="form.macId"
            :placeholder="t('system.wxManage.placeholders.macId')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="t('system.wxManage.fields.macSerialNo')" prop="macSerialNo">
          <el-input
            v-model="form.macSerialNo"
            :placeholder="t('system.wxManage.placeholders.macSerialNo')"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="t('system.wxManage.fields.secret')"
          prop="secret"
        >
          <el-input
            v-model="form.secret"
            :placeholder="t('system.wxManage.placeholders.secret')"
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="t('system.wxManage.fields.privateKeyPath')"
          prop="privateKeyPath"
        >
          <div style="width: 100%">
            <el-upload
              v-model:file-list="fileList"
              ref="upload"
              :action="action"
              multiple
              :on-error="handleAvatarError"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept=".pem"
              name="files"
              :headers="{ Authorization: token }"
            >
              <el-button type="primary">{{ t('system.wxManage.actions.upload') }}</el-button>
            </el-upload>
          </div>
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
