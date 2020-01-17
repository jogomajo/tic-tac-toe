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
      indexesClicked: [null],
      sort: true
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
      history: history.concat([
        {
          squares: squares
        }
      ]),
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

  handleSort = () => {
    this.setState({
      sort: !this.state.sort,
      history: this.state.history.reverse(),
      indexesClicked: this.state.indexesClicked.reverse()
    });
  };

  render() {
    const history = this.state.history;

    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      // console.log("render map");
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

      const sortDesc =
        move === this.state.history.length - 1
          ? "Go to game start"
          : `Go to move #${this.state.history.length -
              1 -
              move} | x:${x} y:${y()}`;

      return (
        <li key={move}>
          <button
            style={
              move === this.state.stepNumber ? { fontWeight: "bold" } : null
            }
            onClick={_ => this.jumpTo(move)}
          >
            {this.state.sort ? desc : sortDesc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner};`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol reversed={this.state.sort ? false : true}>{moves}</ol>
          <button onClick={this.handleSort}>Sort</button>
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
      return squares[a];
    }
  }
  return null;
}

export default Game;
