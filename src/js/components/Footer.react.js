import React from "react";

class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div className="footer">
        <a href="https://github.com/prvak/stripeclock">Github</a>
        <a href="https://github.com/prvak/stripeclock">About</a>
      </div>);
  }
}

export default Footer;
