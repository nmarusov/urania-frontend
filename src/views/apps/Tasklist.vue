<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        Tasklist Application
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
  dispatchGetTasklistData,
  dispatchPostTasklistData,
} from "@/store/tasklist/actions"

@Component
export default class Tasklist extends Vue {
  public callGet() {
    dispatchGetTasklistData(this.$store)
  }

  public callPost() {
    dispatchPostTasklistData(this.$store, { msg: "Данные для Tasklist" })
  }
}
</script>
