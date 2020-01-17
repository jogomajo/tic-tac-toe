import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard = () => {
    let board = [];
    let number = 0;

    for (let row = 0; row < 3; row++) {
      let squares = [];

      for (let i = number; i < number + 3; i++) {
        squares.push(this.renderSquare(i));
      }

      number += 3;
      board.push(<div className="board-row">{squares}</div>);
    }

    return board;
  };

  render() {
    return <div>{this.createBoard()}</div>;
  }
}

export default Board;
