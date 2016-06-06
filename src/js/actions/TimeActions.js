import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";

const TimeActions = {
  setTimestamp: (timestamp) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_SET,
      timestamp,
    });
  },
  togglePaused: () => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_TOGGLE_PAUSED,
    });
  },
  setSpoiled: (isSpoiled) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_SET_SPOILED,
      isSpoiled,
    });
  },
};

export default TimeActions;
