<template>
  <div class="language-switcher">
    <el-dropdown trigger="click" @command="handleLanguageSwitch">
      <span class="language-dropdown-link">
        <i class="iconfont icon-language"></i>
        <span class="lang-text">{{ currentLang }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN" :divided="getLocale() === 'zh-CN'">
            <span :class="{ active: getLocale() === 'zh-CN' }">简体中文</span>
          </el-dropdown-item>
          <el-dropdown-item command="en-US" :divided="getLocale() === 'en-US'">
            <span :class="{ active: getLocale() === 'en-US' }">English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";
import { setLocale, getLocale } from "@/i18n";

const { locale } = useI18n();

const currentLang = computed(() => {
  return getLocale() === "zh-CN" ? "EN" : "中文";
});

const handleLanguageSwitch = (command: string) => {
  setLocale(command);
  locale.value = command as any;
};
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
}

.language-dropdown-link {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 48px;
  padding: 0 12px;
  cursor: pointer;
  color: #000000d9;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.dark) .language-dropdown-link {
  color: #ffffffd9;
}

.language-dropdown-link:hover {
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.iconfont {
  font-size: 16px;
}

.lang-text {
  min-width: 24px;
  text-align: center;
}

.active {
  color: var(--el-color-primary);
  font-weight: 600;
}
</style>
