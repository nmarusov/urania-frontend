<template>
  <div>
    <v-snackbar :color="currentNotificationColor" v-model="show">
      <v-progress-circular
        class="ma-2"
        indeterminate
        v-show="showProgress"
      ></v-progress-circular
      >{{ currentNotificationContent }}
      <v-btn text @click.native="close">Закрыть</v-btn>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import { IAppNotification } from "@/interfaces"
import { commitRemoveNotification } from "@/store/main/mutations"
import { readFirstNotification } from "@/store/main/getters"
import { dispatchRemoveNotification } from "@/store/main/actions"

@Component
export default class NotificationsManager extends Vue {
  public show = false
  public text = ""
  public showProgress = false
  public currentNotification: IAppNotification | false = false

  public async hide() {
    this.show = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await new Promise((resolve, reject) => setTimeout(() => resolve(0), 500))
  }

  public async close() {
    await this.hide()
    await this.removeCurrentNotification()
  }

  public async removeCurrentNotification() {
    if (this.currentNotification) {
      commitRemoveNotification(this.$store, this.currentNotification)
    }
  }

  public get firstNotification() {
    return readFirstNotification(this.$store)
  }

  public async setNotification(notification: IAppNotification | false) {
    if (this.show) {
      await this.hide()
    }
    if (notification) {
      this.currentNotification = notification
      this.showProgress = notification.showProgress || false
      this.show = true
    } else {
      this.currentNotification = false
    }
  }

  @Watch("firstNotification")
  public async onNotificationChange(
    newNotification: IAppNotification | false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    oldNotification: IAppNotification | false
  ) {
    if (newNotification !== this.currentNotification) {
      await this.setNotification(newNotification)
      if (newNotification) {
        dispatchRemoveNotification(this.$store, {
          notification: newNotification,
          timeout: 6500,
        })
      }
    }
  }

  public get currentNotificationContent() {
    return (this.currentNotification && this.currentNotification.content) || ""
  }

  public get currentNotificationColor() {
    return (
      (this.currentNotification && this.currentNotification.color) || "info"
    )
  }
}
</script>
