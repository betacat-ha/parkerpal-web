<script lang="ts" setup>
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { useNav } from "@/layout/hooks/useNav";
import { useLayout } from "@/layout/hooks/useLayout";
import { useUserStoreHook } from "@/store/modules/user";
import { avatar, bg, illustration } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { onBeforeUnmount, onMounted, reactive, ref, toRaw } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import md5 from "js-md5";
import { usePermissionStoreHook } from "@/store/modules/permission";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { FormInstance } from "element-plus/es/components/form";
import { useI18n } from "vue-i18n";
import { createLoginRules } from "./utils/rule";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

defineOptions({
  name: "Login"
});
const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const loginRules = createLoginRules(t);

const { initStorage } = useLayout();
initStorage();

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title } = useNav();

const ruleForm = reactive({
  account: "admin",
  password: "123456"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({
          account: ruleForm.account,
          password: md5(ruleForm.password)
        })
        .then(res => {
          if (res.code == 200) {
            usePermissionStoreHook().handleWholeMenus([]);
            router.push("/").then(() => {
              message(t("login.success"), { type: "success" });
            });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3 gap-2">
      <LanguageSwitcher />
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        inline-prompt
        @change="dataThemeChange"
      />
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <img :src="avatar" class="w-[100px]" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                :rules="[
                  {
                    required: true,
                      message: t('login.usernameRequired'),
                    trigger: 'blur'
                  }
                ]"
                prop="account"
              >
                <el-input
                  v-model="ruleForm.account"
                  :prefix-icon="useRenderIcon(User)"
                  clearable
                  :placeholder="t('login.username')"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  :prefix-icon="useRenderIcon(Lock)"
                  clearable
                  :placeholder="t('login.password')"
                  show-password
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-button
                :loading="loading"
                class="w-full mt-4"
                size="default"
                type="primary"
                @click="onLogin(ruleFormRef)"
              >
                {{ t("login.login") }}
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
