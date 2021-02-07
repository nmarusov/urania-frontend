import { shallowMount } from "@vue/test-utils"
import BpManager from "@/views/apps/BpManager.vue"
import "@/plugins/vuetify"

describe("BpManager.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "BP Manager Application"
    const wrapper = shallowMount(BpManager, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
