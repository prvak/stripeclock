import React from "react";
import Pixel from "../components/Pixel.react";

class Digit extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.width !== nextProps.width
      || this.props.height !== nextProps.height
      || this.props.size !== nextProps.size;
  }

  render() {
    const size = this.props.size;
    const pixels = [];
    const createPixel = (x, y, value) => {
      const key = `${x}x${y}`;
      const style = {
        position: "absolute",
        left: `${x * size}px`,
        top: `${y * size}px`,
      };
      return (<div style={style} key={key}>
        <Pixel value={value} size={size} />
      </div>);
    };
    for (let y = 0; y < this.props.height; y++) {
      for (let x = 0; x < this.props.width; x++) {
        pixels.push(createPixel(x, y, 0));
      }
    }
    return <div>{pixels}</div>;
  }
}

Digit.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default Digit;
