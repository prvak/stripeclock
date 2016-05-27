import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";

const TimeActions = {
  setTimestamp: (timestamp) => {
    AppDispatcher.dispatch({
      actionType: TimeConstants.TIME_SET,
      timestamp,
    });
  },
};

export default TimeActions;
