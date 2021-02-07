import { shallowMount } from "@vue/test-utils"
import Tasklist from "@/views/apps/Tasklist.vue"
import "@/plugins/vuetify"

describe("Tasklist.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Tasklist Application"
    const wrapper = shallowMount(Tasklist, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
