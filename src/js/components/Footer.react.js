import React from "react";
import TimeActions from "../actions/TimeActions";

// Spoiler timer will fire after this many milliseconds.
const SPOILER_UPDATE_FREQUENCY = 40;
// Spoiler will be displayed after this many milliseconds.
const SPOILER_TIMEOUT = 500;
// Spoiler will be displayed when spoiler counter reaches this value.
const SPOILER_MAX = 100;

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      spoiler: 0,
    };
    this._onPause = (e) => {
      TimeActions.togglePaused();
      e.preventDefault();
    };
    this._onSpoilerStart = (e) => {
      this._startSpoilerTimer();
      this.setState({ spoiler: 0 });
      e.preventDefault();
    };
    this._onSpoilerTick = () => {
      const spoilerIncrease = SPOILER_MAX / (SPOILER_TIMEOUT / SPOILER_UPDATE_FREQUENCY);
      let nextSpoiler = this.state.spoiler + spoilerIncrease;
      if (nextSpoiler >= SPOILER_MAX) {
        nextSpoiler = SPOILER_MAX;
        TimeActions.setSpoiled(true);
      }
      this.setState({ spoiler: nextSpoiler });
    };
    this._onSpoilerEnd = (e) => {
      this._stopSpoilerTimer();
      TimeActions.setSpoiled(false);
      this.setState({ spoiler: 0 });
      e.preventDefault();
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isPaused !== nextProps.isPaused
      || this.state.spoiler !== nextState.spoiler;
  }

  _startSpoilerTimer() {
    if (!this._spoilerTimer) {
      this._spoilerTimer = setInterval(this._onSpoilerTick, SPOILER_UPDATE_FREQUENCY);
    }
  }

  _stopSpoilerTimer() {
    if (this._spoilerTimer) {
      clearInterval(this._spoilerTimer);
      this._spoilerTimer = null;
    }
  }

  render() {
    const text = this.props.isPaused ? "Run" : "Pause";
    const spoiler = this.state.spoiler;
    const spoilerStyle = {
      background: `linear-gradient(90deg, #88CC88 ${spoiler}%, #2D882D ${spoiler}%)`,
    };
    return (<div className="footer">
        <a href="https://github.com/prvak/stripeclock">Github</a>
        <a href="#" onClick={this._onPause}>{text}</a>
        <a href="#" style={spoilerStyle}
          onMouseOver={this._onSpoilerStart}
          onMouseOut={this._onSpoilerEnd}
        >
          Spoiler?
        </a>
      </div>);
  }
}

Footer.propTypes = {
  isPaused: React.PropTypes.bool.isRequired,
  isSpoiled: React.PropTypes.bool.isRequired,
};

export default Footer;
