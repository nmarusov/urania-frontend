import { MainState } from "./main/state"
import { TasklistState } from "./tasklist/state"
import { BpManagerState } from "./bpmanager/state"

export interface State {
  main: MainState
  tasklist: TasklistState
  bpmanager: BpManagerState
}
