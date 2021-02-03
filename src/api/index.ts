/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import auth from "./auth"
import tasklist from "./tasklist"
import bpmanager from "./bpmanager"

export const api = {
  auth: auth,
  tasklist: tasklist,
  bpmanager: bpmanager,
}
