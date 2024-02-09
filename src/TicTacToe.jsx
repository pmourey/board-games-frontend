// TicTacToe.js
import React, { useState } from 'react';
import './App.css';
import Board from './components/Board_TTT';
import {Link} from "react-router-dom";
import {withRouter} from './functions';

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        // this.new_game();
        const { numPlayers } = this.props.router.params;
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            gameOver: false,
            status: "Player X starts",
            numPlayers: numPlayers
        };
        // Saving state to localStorage (web) or AsyncStorage (React Native)
        // localStorage.setItem('boardState', JSON.stringify(this.state));

    }

    new_game() {
        fetch('/api/new_game_ttt', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                players: this.state.numPlayers
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update game state with initial state received from server
                this.setState(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Méthode pour envoyer une requête au backend pour gérer un mouvement du joueur
    handleMove(i) {
        if (this.state.gameOver) {
            alert(this.state.status + '\n' + 'Click on button <New Game>');
            return;
        }
        // Dans votre composant React où vous envoyez la requête HTTP
        fetch('/api/move_ttt', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                move: i,
                player: this.state.xIsNext ? 'X' : 'O'
                // Autres données à envoyer au backend si nécessaire
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.headers);
                }
                return response.json();
            })
            .then(data => {
                // Gérer la réponse du backend
                this.setState(data);
                // localStorage.setItem('boardState', JSON.stringify(this.state));
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    render() {
        // Retrieving state from localStorage (web) or AsyncStorage (React Native)
        // const boardState = JSON.parse(localStorage.getItem('boardState'));

        return (
            <div className="app">
                <h1>Connect 4</h1>
                <div className="status">{this.state.status}</div>
                <Board
                    squares={this.state.squares}
                    onClick={(i) => this.handleMove(i)}
                />
                {/* Autres composants ou éléments de votre application */}
                {this.state.gameOver && <button onClick={() => this.new_game()}>New Game</button>}
                <Link to="/">
                    <button>Home</button>
                </Link>
            </div>
        );
    }
}

export default withRouter(TicTacToe);
