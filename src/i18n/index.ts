import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

export const i18n = createI18n({
  // 使用 Composition API 模式
  legacy: false,
  locale: localStorage.getItem('lang') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
});

export const setLocale = (locale: string) => {
  localStorage.setItem('lang', locale);
  i18n.global.locale.value = locale as any;
};

export const getLocale = () => {
  return i18n.global.locale.value;
};
