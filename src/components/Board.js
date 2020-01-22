import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard = () => {
    let board = [];

    for (let i = 0; i < 9; i++) {
      board.push(this.renderSquare(i));
    }

    return board;
  };

  render() {
    return <div className="game-board">{this.createBoard()}</div>;
  }
}

export default Board;
