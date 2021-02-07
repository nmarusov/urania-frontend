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
        this.$router.push("/apps/modeler").catch((err) => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
            err.name !== "NavigationDuplicated" &&
            !err.message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            // But print any other errors to the console
            console.error(err)
          }
        })
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
