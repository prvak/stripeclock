import React from "react";
import TimeActions from "../actions/TimeActions";

class Footer extends React.Component {
  constructor() {
    super();
    this._onPause = (e) => {
      TimeActions.togglePaused();
      e.preventDefault();
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isPaused !== nextProps.isPaused;
  }

  render() {
    const text = this.props.isPaused ? "Run" : "Pause";
    return (<div className="footer">
        <a href="https://github.com/prvak/stripeclock">Github</a>
        <a href="#" onClick={this._onPause}>{text}</a>
      </div>);
  }
}

Footer.propTypes = {
  isPaused: React.PropTypes.bool.isRequired,
};

export default Footer;
