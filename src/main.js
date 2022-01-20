import Vue from "vue";
import App from "./App.vue";
import { initialize } from "./services/todoServices";

Vue.config.productionTip = false;

initialize();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
