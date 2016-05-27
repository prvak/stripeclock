import React from "react";

import TimeStore from "../stores/TimeStore";
import SpaceActions from "../actions/TimeActions";
import Digit from "../components/Digit.react";
import HtmlUtils from "../HtmlUtils";

function getAppState() {
  return {
    timestamp: 12345678,
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
      SpaceActions.nextTick(now);
    };
    this._onResize = () => {
      // const w = window;
      // const d = document;
      // const e = d.documentElement;
      // const g = d.getElementsByTagName("body")[0];
      // const width = w.innerWidth || e.clientWidth || g.clientWidth;
      // const height = w.innerHeight || e.clientHeight || g.clientHeight;
      // const unit = Math.min(width, height) / SpaceConstants.SPACE_SIZE;
      // document.getElementsByTagName("html")[0].style["font-size"] = `${unit}px`;
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

  componentWillUnmount() {
    TimeStore.removeChangeListener(this._onChange);
    document.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("keyup", this._onKeyUp);
    window.removeEventListener("resize", this._onResize);
    this._stopTickTimer();
  }

  _startTickTimer() {
    if (!this._tickTimer) {
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
    const style = {
      width: `${200}px`,
      height: `${200}px`,
    };
    const value = 0;
    const size = 100;
    return (<div id="app" className="pixel right" style={style}>
        <Digit value={0} size={size} key={0} />
      </div>);
  }
}

export default App;
