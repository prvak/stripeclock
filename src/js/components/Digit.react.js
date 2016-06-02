import React from "react";
import Pixel from "../components/Pixel.react";
import TimeConstants from "../constants/TimeConstants";

class Digit extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  _renderDigit(digit) {
    const size = this.props.size;
    const raster = TimeConstants.DIGITS[digit];
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
    raster.forEach((row, y) => {
      row.forEach((value, x) => {
        pixels.push(createPixel(x, y, value));
      });
    });
    return pixels;
  }

  render() {
    const value = this.props.value;
    const pixels = this._renderDigit(value);
    return <div>{pixels}</div>;
  }
}

Digit.propTypes = {
  value: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default Digit;
