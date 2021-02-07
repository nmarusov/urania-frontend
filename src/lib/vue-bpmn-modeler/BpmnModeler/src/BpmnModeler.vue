<template>
  <div ref="container" class="containers">
    <div ref="canvas" class="canvas"></div>
    <div id="properties-panel-parent" class="properties-panel-parent"></div>
  </div>
</template>

<script>
import BpmnModeler from "../../CustomModeler"
import CustomTranslate from "../../CustomTranslate"
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json"
import propertiesPanelModule from "bpmn-js-properties-panel"
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda"
import minimapModule from "diagram-js-minimap"
import CliModule from "bpmn-js-cli"
import { debounce } from "min-dash"
const customTranslateModule = {
  translate: ["value", CustomTranslate],
}
export default {
  name: "BpmnModeler",
  props: {
    diagramXML: String,
    propertiesPanel: null,
  },
  data() {
    return {
      modeler: {},
      xmlData: "",
      svgImage: "",
      isSvg: false,
    }
  },
  watch: {
    diagramXML(val) {
      this.openDiagram(val)
    },
  },
  async mounted() {
    const canvas = this.$refs["canvas"]
    let additionalModules = [customTranslateModule, minimapModule, CliModule]
    if (this.propertiesPanel === "" || this.propertiesPanel) {
      additionalModules = additionalModules.concat([
        propertiesPanelModule,
        propertiesProviderModule,
      ])
    }
    this.modeler = new BpmnModeler({
      container: canvas,
      additionalModules: additionalModules,
      cli: {
        bindTo: "cli",
      },
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
      propertiesPanel: {
        parent: "#properties-panel-parent",
      },
    })
    await this.openDiagram(this.diagramXML).then(() => {
      // Автоматически сохранять текущий проект модели
      const _self = this
      const exportArtifacts = debounce(async () => {
        try {
          const { svg } = await _self.modeler.saveSVG()
          _self.svgImage = svg
        } catch (err) {
          console.error(`saveSVG error ${err}`)
        }
        try {
          const { xml } = await _self.modeler.saveXML({ format: true })
          _self.xmlData = xml
        } catch (err) {
          console.error(`saveXML error ${err}`)
        }
        const modelInfo = {
          xmlData: _self.xmlData,
          svgImage: _self.svgImage,
        }
        _self.$emit("input", modelInfo)
      }, 10)
      this.modeler.on("commandStack.changed", exportArtifacts)
      exportArtifacts()
    })
  },
  methods: {
    async replace(data) {
      const _self = this
      await this.openDiagram(this.diagramXML)
      const incomingTask = []
      const outgoingTask = []
      return new Promise((resolve) => {
        if (data && data.taskList.length > 0) {
          const modelerCanvas = _self.modeler.get("canvas")
          const rootElement = modelerCanvas.getRootElement()
          const cli = window.cli
          let activityType = ""
          // Удалить целевую задачу
          rootElement.children.forEach((n) => {
            if (n.id === data.replaceActivity) {
              if (n.type === "bpmn:SequenceFlow") {
                incomingTask.push(n.source.id)
                outgoingTask.push(n.target.id)
              } else {
                n.incoming.forEach((nn) => {
                  incomingTask.push(nn.source.id)
                })
                n.outgoing.forEach((nn) => {
                  outgoingTask.push(nn.target.id)
                })
              }
              activityType = n.type
            }
          })
          let taskActivity =
            activityType === "bpmn:SequenceFlow"
              ? incomingTask[0]
              : data.replaceActivity
          for (let index = 0; index < data.taskList.length; index++) {
            taskActivity = cli.append(taskActivity, "bpmn:UserTask")
            data.taskList[index].taskActivity = taskActivity
            cli.setLabel(taskActivity, data.taskList[index].label)
            cli.move(taskActivity, { x: -200, y: 120 })
          }
          activityType === "bpmn:SequenceFlow"
            ? cli.removeConnection(data.replaceActivity)
            : cli.removeShape(data.replaceActivity)
          incomingTask.forEach((n) => {
            cli.connect(n, data.taskList[0].taskActivity, "bpmn:SequenceFlow")
          })
          outgoingTask.forEach((n) => {
            cli.connect(
              data.taskList[data.taskList.length - 1].taskActivity,
              n,
              "bpmn:SequenceFlow"
            )
          })
          resolve(data.taskList)
        } else {
          this.openDiagram(this.diagramXML)
        }
      })
    },
    openDiagram(xml) {
      return new Promise((resolve, reject) => {
        if (xml) {
          try {
            this.modeler.importXML(xml)
            resolve()
          } catch (err) {
            reject(err)
          }
          this.xmlData = xml
        } else {
          this.modeler.createDiagram()
          setTimeout(() => {
            /**
             * 修改xml属性值 isExecutable = false => true
             * isExecutable = false 后端部署流程时 不会创建流程定义数据
             */
            const modelerCanvas = this.modeler.get("canvas")
            const rootElement = modelerCanvas.getRootElement()
            const modeling = this.modeler.get("modeling")
            // modeling.updateProperties(rootElement, {
            //   // isExecutable: true
            // });
            // 设定开始节点名称和结束节点名称
            rootElement.children.forEach((n) => {
              if (n.type === "bpmn:StartEvent") {
                modeling.updateProperties(n, {
                  name: "开始",
                })
              } else if (n.type === "bpmn:EndEvent") {
                modeling.updateProperties(n, {
                  name: "结束",
                })
              }
            })
            resolve()
          })
        }
      })
    },
    saveSVG(done) {
      this.modeler.saveSVG(done)
    },
    // todo
    focusOut(event) {
      const layerBase = document.querySelector(".layer-base")
      const zoom = layerBase.parentNode.getBoundingClientRect()
      if (
        event.pageX < zoom.left ||
        event.pageX > zoom.left + zoom.width + 100 ||
        event.pageY < zoom.top ||
        event.pageY > zoom.top + zoom.height + 40
      ) {
        // 鼠标移出编辑区域 完成输入 并 失去焦点
        const directEditing = this.modeler.injector.get("directEditing", false)
        directEditing.complete()
        const eventBus = this.modeler.injector.get("eventBus", false)
        eventBus.fire("element.click", "")
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import url(~bpmn-js/dist/assets/diagram-js.css)

@import url(~bpmn-js/dist/assets/bpmn-font/css/bpmn.css)

@import url(~diagram-js-minimap/assets/diagram-js-minimap.css)

@import url(~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css)

.containers
  position: absolute
  background-color: #ffffff
  top: 0
  left: 0
  width: 100%
  height: 100%

.canvas
  width: 100%
  height: 100%

.properties-panel-parent
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif
  font-size: 12px
  position: absolute
  top: 0
  bottom: 0
  right: 0
  width: 260px
  z-index: 10
  border-left: 1px solid #ccc
  overflow: auto

  &:empty
    display: none

  > .djs-properties-panel
    padding-bottom: 70px
    min-height: 100%

  ::v-deep
    .bpp-textfield input
      padding-right: 0

    .bpp-properties-panel
      .bpp-properties .bpp-properties-header .label
        word-wrap: break-word

      [type=text], textarea
        width: calc(100% - 6px)

      [contenteditable]
        width: calc(100% - 12px)

    .bpp-table-row >
      label.bpp-table-row-columns-2.bpp-table-row-removable, input.bpp-table-row-columns-2.bpp-table-row-removable
        width: calc(50% - 12px)
</style>
