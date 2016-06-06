import React from "react";
import Line from "../components/Line.react";
import Space from "../components/Space.react";
import TimeConstants from "../constants/TimeConstants";

class DateTime extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.date !== nextProps.date
      || this.props.time !== nextProps.time
      || this.props.size !== nextProps.size;
  }

  render() {
    const date = this.props.date;
    const time = this.props.time;
    const size = this.props.size;

    const elements = [];
    const renderLine = (text, index) => {
      const x = 0;
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
      const x = 0;
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
    const dateTimeStyle = {
      width: TimeConstants.WINDOW_COLUMNS * size,
      height: TimeConstants.WINDOW_ROWS * size,
    };
    const dateTimeWrapperStyle = {
      width: "100%",
      height: TimeConstants.WINDOW_ROWS * size,
      backgroundSize: `${size}px ${size}px`,
    };
    return (<div className="dateTimeWrapper" style={dateTimeWrapperStyle}>
        <div className="dateTime" style={dateTimeStyle}>
          {elements}
        </div>
      </div>);
  }
}

DateTime.propTypes = {
  date: React.PropTypes.string.isRequired,
  time: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
};

export default DateTime;
