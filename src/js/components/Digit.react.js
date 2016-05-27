import React from "react";
import Pixel from "../components/Pixel.react";

const DIGITS = [
  // 0
  [
    [0, 0],
    [0, 0],
  ],
  // 1
  [
    [0, 1],
    [1, 0],
  ],
  // 2
  [
    [1, 0],
    [0, 1],
  ],
  // 3
  [
    [1, 1],
    [1, 1],
  ],
];

class Digit extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  _renderDigit(digit) {
    const size = this.props.size;
    const raster = DIGITS[digit];
    const pixels = [];
    console.log(digit);
    raster.forEach((row, y) => {
      console.log(row);
      row.forEach((value, x) => {
        const key = `${x}x${y}`;
        console.log(value, key);
        const style = {
          position: "absolute",
          left: `${x * size}px`,
          top: `${y * size}px`,
        };
        const alt = (x + y) % 2;
        pixels.push(<div style={style}>
          <Pixel value={value} alt={alt} size={size} key={key} />
        </div>);
      });
    });
    return pixels;
  }

  render() {
    const value = this.props.value;
    const pixels = this._renderDigit(value);
    return <div className="digit">{pixels}</div>;
  }
}

Digit.propTypes = {
  value: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default Digit;
