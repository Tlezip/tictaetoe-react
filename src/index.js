import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    if(props.squarewinners !== "none"){
        return (
            <button className="squareright" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        if(this.props.squarewinners !== null && this.props.squarewinners.includes(i)){
            return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    squarewinners = "true"
                />
            );
        }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                squarewinners = "none"
            />
        );
    }

    render() {
        let indents = [];
        for(let i=0 ; i<9 ; i+=3){
            indents.push(<div className="board-row" key={"render"+i}>{this.renderSquare(i)}{this.renderSquare(i+1)}{this.renderSquare(i+2)}</div>);
        }
        return (
            <div>
                {indents}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    location: null,
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            toggled: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    location: i,
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history.slice();
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let squarewinners = null;
        let moves = null;
        if(!this.state.toggled){
            moves = history.map((step, move) => {
                const x = parseInt(history[move].location/3, 10);
                const y = parseInt(history[move].location%3, 10);
                const desc = move ? "Move #" + x+","+y : "Game start";
                if(move === this.state.stepNumber){
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => this.jumpTo(move)}><b>{desc}</b></a>
                        </li>
                    );
                }
                else{
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                        </li>
                    );
                }
            });
        }
        else{
            moves = history.reverse().map((step, move) => {
                const x = parseInt(history[move].location/3, 10);
                const y = parseInt(history[move].location%3, 10);
                const keepmove = history.length-move-1;
                const desc = (move !== history.length-1) ? "Move #" + x+","+y : "Game start";
                if(keepmove === this.state.stepNumber){
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => this.jumpTo(keepmove)}><b>{desc}</b></a>
                        </li>
                    );
                }
                else{
                    return (
                        <li key={move}>
                            <a href="#" onClick={() => this.jumpTo(keepmove)}>{desc}</a>
                        </li>
                    );
                }
            });
        }

        let status;
        if (winner) {
            status = "Winner: " + winner;
            squarewinners = squarewinner(current.squares);
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        squarewinners = {squarewinners}
                    />
                </div>
                <div className="game-info">
                    {status}
                    <div className="margin">
                        <button onClick={()=> this.setState({toggled: !this.state.toggled})}>Toggle</button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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

function squarewinner(squares){
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
            return [a,b,c];
        }
    }
    return null;
}
