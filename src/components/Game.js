import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      indexesClicked: [null]
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const historyCoor = this.state.indexesClicked.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: [
        ...history,
        {
          squares: squares
        }
      ],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      indexesClicked: historyCoor.concat(i)
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const x = (this.state.indexesClicked[move] % 3) + 1;
      const y = () => {
        const coor = this.state.indexesClicked[move];
        if (coor === 0 || coor === 1 || coor === 2) {
          return 1;
        } else if (coor === 3 || coor === 4 || coor === 5) {
          return 2;
        } else if (coor === 6 || coor === 7 || coor === 8) {
          return 3;
        }
      };

      const desc = move
        ? `Go to move #${move} | x:${x} y:${y()}`
        : "Go to game start";

      return (
        <li key={move}>
          <button
            className="moves__btn"
            style={
              move === this.state.stepNumber ? { fontWeight: "bold" } : null
            }
            onClick={_ => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    const getAllSquares = [...document.querySelectorAll(".square")];
    if (winner) {
      const [winningSquare, a, b, c] = winner;
      const winningLine = [
        getAllSquares[a],
        getAllSquares[b],
        getAllSquares[c]
      ];
      winningLine.map(square => square.classList.add("underline"));
      status = `Winner: ${winningSquare}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
      getAllSquares.map(square => square.classList.remove("underline"));

      if (this.state.stepNumber === 9) {
        status = "Draw!";
      }
    }

    return (
      <div className="game">
        <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        <div className="game-info">
          <div className="status">{status}</div>
          <ul className="moves">{moves}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}

export default Game;
