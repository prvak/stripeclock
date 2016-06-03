import React from "react";

import TimeStore from "../stores/TimeStore";
import TimeActions from "../actions/TimeActions";
import Line from "../components/Line.react";
import Space from "../components/Space.react";
import HtmlUtils from "../HtmlUtils";
import TimeConstants from "../constants/TimeConstants";

function getAppState() {
  return {
    timestamp: TimeStore.getTimestamp(),
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

    const size = 25;
    const elements = [];
    const renderLine = (text, index) => {
      const x = 1 * size;
      const y = (index * TimeConstants.CHAR_ROWS + 1 + index) * size;
      const key = `d-${index}`;
      const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      };
      return (<div style={style} key={key}>
          <Line text={text} size={size} />
        </div>);
    };
    const renderHorizontalSpace = (index, length) => {
      const x = 1 * size;
      const y = index * (TimeConstants.CHAR_ROWS + 1) * size;
      const key = `s-${index}`;
      const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      };
      return (<div style={style} key={key}>
          <Space width={length} height={1} size={size} />
        </div>);
    };
    const lines = [time, date];
    const pixels = Math.max(time.length, date.length) * (TimeConstants.CHAR_COLUMNS + 1) + 1;
    lines.forEach((text, index) => {
      if (index === 0) {
        elements.push(renderHorizontalSpace(index, pixels));
      }
      elements.push(renderLine(text, index));
      elements.push(renderHorizontalSpace(index + 1, pixels));
    });
    return (<div id="app">{elements}</div>);
  }
}

export default App;
