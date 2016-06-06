import React from "react";

class Pixel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
      || this.props.isSpoiled !== nextProps.isSpoiled
      || this.props.size !== nextProps.size;
  }

  render() {
    const size = this.props.size;
    let className = "right";
    if (this.props.value > 0.5) {
      if (this.props.isSpoiled) {
        className = "spoiled";
      } else {
        className = "left";
      }
    }
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    };
    return <div className={className} style={style}></div>;
  }
}

Pixel.propTypes = {
  value: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  isSpoiled: React.PropTypes.bool.isRequired,
};

export default Pixel;
