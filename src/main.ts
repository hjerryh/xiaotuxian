import { createSSRApp } from "vue";
import App from "./App.vue";
// 导入pinia 实例
import pinia from "./stores/index";

export function createApp() {
  const app = createSSRApp(App);

  // 使用 pinia
  app.use(pinia);
  
  return {
    app,
  };
}
