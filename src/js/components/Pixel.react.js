import React from "react";

class Pixel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
      || this.props.alt !== nextProps.alt
      || this.props.size !== nextProps.size;
  }

  render() {
    const size = this.props.size;
    const dir = this.props.value < 0.5 ? "right" : "left";
    const alt = this.props.alt;
    const className = `${dir}${alt}`;
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    };
    return <div className={className} style={style}></div>;
  }
}

Pixel.propTypes = {
  value: React.PropTypes.number.isRequired,
  alt: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default Pixel;
