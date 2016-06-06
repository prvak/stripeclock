import events from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import TimeConstants from "../constants/TimeConstants";
import HtmlUtils from "../HtmlUtils";

const EventEmitter = events.EventEmitter;
const CHANGE_EVENT = "change";

class PixelStore extends EventEmitter {
  constructor() {
    super();
    this._timestamp = HtmlUtils.now();
    this._isPaused = false;
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

  getTimestamp() {
    return this._timestamp;
  }

  togglePaused() {
    this._isPaused = !this._isPaused;
  }

  isPaused() {
    return this._isPaused;
  }

  setSpoiled(isSpoiled) {
    this._isSpoiled = isSpoiled;
  }

  isSpoiled() {
    return this._isSpoiled;
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
    case TimeConstants.TIME_TOGGLE_PAUSED:
      store.togglePaused();
      store.emitChange();
      break;
    case TimeConstants.TIME_SET_SPOILED:
      store.setSpoiled(action.isSpoiled);
      store.emitChange();
      break;
    default:
      // no op
  }
});

export default store;
