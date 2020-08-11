import { AnyAction, Action } from 'redux';
import { RootState } from './store';
interface RecordState {
  dateStart: string;

}

const initialState: RecordState = {
  dateStart: '',
}


// const START = 'recorder/start';
// const STOP = 'recorder/stop';

enum RecorderAction {
  START = 'recorder/start',
  STOP = 'recorder/stop'
}


type StartAction = Action<typeof RecorderAction.START>
type StopAction = Action<typeof RecorderAction.STOP>

export const start = (): StartAction => ({
  type: RecorderAction.START
})

export const stop = (): StopAction => ({
  type: RecorderAction.STOP
})



const recorderReducer = (state: RecordState = initialState, action: StartAction | StopAction) => {
  switch(action.type) {
    case RecorderAction.START:
      return {
        ...state,
        dateStart: new Date().toISOString(),
      };
    case RecorderAction.STOP:
      return {
        ...state,
        dateStart: '',
      }
    default:
      return state;
  }
};

// selector

export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) => rootState.recorder.dateStart;


export default recorderReducer;