import React, { Component } from 'react';

import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTurn: "O",
            turns: 0,
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            winner: false,
            useAi: false
        }
    }


    handleClick(index) {
        if(this.state.board[index] === "" && !this.state.winner) {
            let board = this.state.board;
            board[index] = this.state.currentTurn === "X" ? "O" : "X";
            let isOver = this.hasWon(board);
            if(this.state.useAi && !isOver) {
                let i = 0;
                while(true) {
                    if(board[i] === "" && (Math.floor(Math.random() * Math.floor(2)) || i === 8)) {
                        board[i] = this.state.currentTurn;
                        this.setState({
                            board: board,
                            winner: this.hasWon(board),
                            turns: this.state.turns + 2
                        });
                        break;
                    }
                    i += 1;
                }
            } else {
                this.setState({
                    board: board,
                    currentTurn: this.state.currentTurn === "X" ? "O" : "X",
                    winner: isOver,
                    turns: this.state.turns + 1
                });
            }
        }
    }


    reset() {
        this.setState({
            currentTurn: "O",
            turns: 0,
            board: [
                "", "", "", "", "", "", "", "", ""
            ],
            winner: false
        });
    }


    handleAi() {
        this.setState({
            useAi: !this.state.useAi
        });
    }


    hasWon(symbols) {
        let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return winningCombos.find(combo => {
            return symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  &&
                symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]
        });
    }


    render() {
        return (
            <div className="app-container">
                <div className="title">React Tic Tac Toe Game</div>
                {this.state.winner && <div className="winner">{`The winner is ${this.state.currentTurn}!`}</div>}
                {!this.state.winner && this.state.turns === 9 && <div className="loser">Tie Game!</div>}
                <div className="board">
                    {this.state.board.map((cell, index) => {
                        return <div key={index} onClick={() => this.handleClick(index)} className="cell">{cell}</div>;
                    })}
                </div>
                <div className="buttons">
                    <button className="reset" onClick={() => this.reset()}>Reset</button>
                    <button className="ai" onClick={() => this.handleAi()}>
                        {this.state.useAi ? "Disable AI" : "Enable AI"}
                    </button>
                </div>
            </div>
        );
    }
}
