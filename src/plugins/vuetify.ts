import "@mdi/font/css/materialdesignicons.css"
import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

import ruLocale from "vuetify/src/locale/ru"

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  lang: {
    locales: { ruLocale },
    current: "ruLocale",
  },
})
