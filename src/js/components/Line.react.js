import React from "react";
import Character from "../components/Character.react";
import Space from "../components/Space.react";
import TimeConstants from "../constants/TimeConstants";

class Line extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.text !== nextProps.text
      || this.props.isSpoiled !== nextProps.isSpoiled
      || this.props.size !== nextProps.size;
  }

  render() {
    const characters = this.props.text.split("");
    const size = this.props.size;
    const isSpoiled = this.props.isSpoiled;
    const elements = [];
    const renderCharacter = (character, index) => {
      const x = (index * TimeConstants.CHAR_COLUMNS + 1 + index) * size;
      const y = 0;
      const key = `d-${index}`;
      const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      };
      return (<div style={style} key={key}>
          <Character value={character} size={size} isSpoiled={isSpoiled} />
        </div>);
    };
    const renderVerticalSpace = (index) => {
      const x = (index * TimeConstants.CHAR_COLUMNS + index) * size;
      const y = 0;
      const key = `s-${index}`;
      const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      };
      return (<div style={style} key={key}>
          <Space width={1} height={TimeConstants.CHAR_ROWS} size={size} isSpoiled={isSpoiled} />
        </div>);
    };
    characters.forEach((character, index) => {
      if (index === 0) {
        elements.push(renderVerticalSpace(index));
      }
      elements.push(renderCharacter(character, index));
      elements.push(renderVerticalSpace(index + 1));
    });
    return (<div>{elements}</div>);
  }
}

Line.propTypes = {
  text: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
  isSpoiled: React.PropTypes.bool.isRequired,
};

export default Line;
