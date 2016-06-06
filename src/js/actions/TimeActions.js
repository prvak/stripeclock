import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";

const TimeActions = {
  setTimestamp: (timestamp) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_SET,
      timestamp,
    });
  },
  togglePaused: (timestamp) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_TOGGLE_PAUSED,
      timestamp,
    });
  },
};

export default TimeActions;
