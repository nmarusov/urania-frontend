<template>
  <div id="modeler">
    <BpmnModeler
      ref="modeler"
      v-model="modeler"
      :diagramXML="propXmlData"
      propertiesPanel
    ></BpmnModeler>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { BpmnModeler } from "@/lib/vue-bpmn-modeler"

import demo from "@/assets/demo.bpmn"
import view from "@/assets/view.bpmn"

@Component({ components: { BpmnModeler } })
export default class Modeler extends Vue {
  public propXmlData = demo
  public viewData = view
  public modeler = {
    xmlData: "",
    svgImage: "",
  }
}
</script>

<style lang="sass" scoped>
#modeler
  margin-bottom: 100%
</style>
