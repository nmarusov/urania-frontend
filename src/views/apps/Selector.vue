<template>
  <div>
    <v-tabs v-model="tab" show-arrows active-class="primary" color="white">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab>
        Моделист
      </v-tab>
      <v-tab>
        Список задач
      </v-tab>
      <v-tab>
        Менеджер задач
      </v-tab>
    </v-tabs>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"

import { appName } from "@/env"

@Component
export default class Selector extends Vue {
  public appName = appName
  public tab: number | null = null
  @Watch("tab")
  public async onSectionChange() {
    switch (this.tab) {
      case 0:
        this.$router.push("/apps/modeler")
        break
      case 1:
        this.$router.push("/apps/tasklist")
        break
      case 2:
        this.$router.push("/apps/bpmanager")
        break
    }
  }
}
</script>
