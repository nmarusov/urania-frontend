// Import Component hooks before component definitions
import "./component-hooks"
import Vue from "vue"
import router from "@/router"
import store from "@/store"
import vuetify from "@/plugins/vuetify"
import { ValidationProvider, localize } from "vee-validate"
import ruVeeLocale from "vee-validate/dist/locale/ru.json"
import App from "@/App.vue"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")

localize({ ru: ruVeeLocale })
Vue.component("ValidationProvider", ValidationProvider)
