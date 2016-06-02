import React from "react";

class Pixel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
      || this.props.size !== nextProps.size;
  }

  render() {
    const size = this.props.size;
    const className = this.props.value < 0.5 ? "right" : "left";
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
};

export default Pixel;
