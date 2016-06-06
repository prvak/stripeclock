import React from "react";

import TimeStore from "../stores/TimeStore";
import TimeActions from "../actions/TimeActions";
import DateTime from "../components/DateTime.react";
import Footer from "../components/Footer.react";
import HtmlUtils from "../HtmlUtils";
import TimeConstants from "../constants/TimeConstants";

function getAppState() {
  return {
    timestamp: TimeStore.getTimestamp(),
    isPaused: TimeStore.isPaused(),
    isSpoiled: TimeStore.isSpoiled(),
    windowSize: HtmlUtils.getWindowSize(),
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = getAppState();
    this._onChange = () => {
      this.setState(getAppState());
    };
    this._onTick = () => {
      const now = HtmlUtils.now();
      TimeActions.setTimestamp(now);
    };
    this._onResize = () => {
      this.setState(getAppState());
    };
  }

  componentDidMount() {
    TimeStore.addChangeListener(this._onChange);
    document.addEventListener("keydown", this._onKeyDown);
    document.addEventListener("keyup", this._onKeyUp);
    window.addEventListener("resize", this._onResize);
    this._startTickTimer();
    this._onResize();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isPaused !== this.state.isPaused) {
      if (nextState.isPaused) {
        this._stopTickTimer();
      } else {
        this._startTickTimer();
      }
    }
  }

  componentWillUnmount() {
    TimeStore.removeChangeListener(this._onChange);
    document.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("keyup", this._onKeyUp);
    window.removeEventListener("resize", this._onResize);
    this._stopTickTimer();
  }

  _startTickTimer() {
    if (!this._tickTimer) {
      setTimeout(this._onTick, 0);
      this._tickTimer = setInterval(this._onTick, 1000);
    }
  }

  _stopTickTimer() {
    if (this._tickTimer) {
      clearInterval(this._tickTimer);
      this._tickTimer = null;
    }
  }

  render() {
    const pad = (number, length) => {
      const s = `000000000${number}`;
      return s.substr(s.length - length);
    };

    const d = new Date(this.state.timestamp);
    const year = pad(d.getFullYear(), 2);
    const month = pad(d.getMonth() + 1, 2);
    const day = pad(d.getDate(), 2);
    const hours = pad(d.getHours(), 2);
    const minutes = pad(d.getMinutes(), 2);
    const seconds = pad(d.getSeconds(), 2);

    const time = `${hours}${minutes}${seconds}`;
    const date = `${year}${month}${day}`;
    const size = Math.floor(this.state.windowSize.width / TimeConstants.WINDOW_COLUMNS);
    const isPaused = this.state.isPaused;
    const isSpoiled = this.state.isSpoiled;
    return (<div id="app">
        <DateTime date={date} time={time} size={size} isSpoiled={isSpoiled} />
        <Footer isPaused={isPaused} isSpoiled={isSpoiled} />
      </div>);
  }
}

export default App;
