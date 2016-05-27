import events from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";

const EventEmitter = events.EventEmitter;
const CHANGE_EVENT = "change";

class TimeStore extends EventEmitter {
  constructor() {
    super();
    this._timestamp = 0;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  setTimestamp(timestamp) {
    this._timestamp = timestamp;
  }
}

const store = new TimeStore();

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case TimeConstants.TIME_SET:
      store.setTimestamp(action.timestamp);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
