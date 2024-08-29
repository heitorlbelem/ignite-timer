import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            cycle.interruptedDate = new Date()
          }
          return cycle
        })
        draft.activeCycleId = null
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft) => {
        draft.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            cycle.finishedDate = new Date()
          }
          return cycle
        })
        draft.activeCycleId = null
      })
    default:
      return state
  }
}
