import React from "react";

import TimeStore from "../stores/TimeStore";
import TimeActions from "../actions/TimeActions";
import Digit from "../components/Digit.react";
import Space from "../components/Space.react";
import HtmlUtils from "../HtmlUtils";
import TimeConstants from "../constants/TimeConstants";

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
      TimeActions.setTimestamp(now);
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
    const digits = [0, 1];
    const elements = [];
    const size = 50;
    digits.forEach((digit, index) => {
      const x = (index * TimeConstants.DIGIT_COLUMNS + 1 + index) * size;
      const key = `${index}`;
      const style = {
        left: `${x}px`,
      };
      elements.push(<div className="digit" style={style} key={key}>
          <Digit value={digit} size={size} />
        </div>);
    });
    return (<div id="app">
        {elements}
      </div>);
  }
}

export default App;
