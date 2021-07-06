import { SET_ALL_HISTORY, SET_SINGLE_DETAIL, SET_WAIT_HISTORY, HISTORY_LOADING } from '../type';

const HistoryReducer = (state, action) => {
  switch (action.type) {
    case HISTORY_LOADING:
      return {
        ...state,
        historyLoading: action.payload,
      };
    case SET_WAIT_HISTORY:
      return {
        ...state,
        waitList: action.payload,
      };
    case SET_SINGLE_DETAIL:
      return {
        ...state,
        singleDetail: action.payload,
      };
    case SET_ALL_HISTORY:
      return {
        ...state,
        allHistory: action.payload,
      };
    default:
      return state;
  }
};

export default HistoryReducer;
