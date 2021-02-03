<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        BP Manager Application
      </v-col>
      <v-col cols="12">
        <v-btn @click="callGet()">GET</v-btn>
        <v-btn @click="callPost()">POST</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import {
  dispatchGetBpManagerData,
  dispatchPostBpManagerData,
} from "@/store/bpmanager/actions"

@Component
export default class BpManager extends Vue {
  public callGet() {
    dispatchGetBpManagerData(this.$store)
  }

  public callPost() {
    dispatchPostBpManagerData(this.$store, { msg: "Данные для BP Manager" })
  }
}
</script>
