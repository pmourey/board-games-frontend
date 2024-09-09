import React, { Component } from 'react';
import Board from "./components/Board";
import Player from './Player';
import {Link} from "react-router-dom";
import {withRouter} from "./functions";

class Checkers extends Component {
    constructor(props) {
        super(props);
        const board = [
            [' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
            ['W', ' ', 'W', ' ', 'W', ' ', 'W', ' '],
            [' ', 'W', ' ', 'W', ' ', 'W', ' ', 'W'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' '],
            [' ', 'B', ' ', 'B', ' ', 'B', ' ', 'B'],
            ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' ']
        ];
        const { numPlayers } = this.props.router.params;
        this.rows = 8
        this.cols = 8
        this.player1 = new Player(1, 'Human', 'B')
        this.player2 = new Player(2, 'Computer', 'W')
        this.state = {
            "squares": board.flat(),
            // "nextPlayer": JSON.stringify(this.player1),
            "nextPlayer": this.player1,
            "gameOver": false,
            "status": this.player1.type + " '" + this.player1.color + "' starts",
            "numPlayers": numPlayers,
            "selectedPiece": null // Add selectedPiece state to track the selected piece
        };
        this.new_game();
        // console.log("state = " + this.state);
    }

    // Select a piece to move
    selectPiece(pieceIndex) {
        console.log("state = " + this.state);
        if (this.state.squares[pieceIndex] != this.state.nextPlayer.color) {
            // Only allow selection of the player's own pieces
            this.setState({ selectedPiece: pieceIndex });
        }
    }

    // Reset selected piece
    deselectPiece() {
        this.setState({ selectedPiece: null });
    }

    new_game() {
        fetch('/api/new_game_checkers', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: this.state,
                rows: this.rows,
                cols: this.cols
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
        console.log(typeof this.state.nextPlayer + this.state.nextPlayer);
        // alert(typeof this.state.nextPlayer + this.state.nextPlayer);
        const player = JSON.parse(this.state.nextPlayer);
        console.log(player.color);
        if (this.state.selectedPiece == null && this.state.squares[i] == player.color) {
            this.selectPiece(i);
        }
        else if (this.state.selectedPiece !== i) {
            // Perform move logic
            // Dans votre composant React où vous envoyez la requête HTTP
            fetch('/api/move_checkers', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    //credentials: 'same-origin',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selected: this.state.selectedPiece,
                    move: i,
                    player: this.state.nextPlayer,
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
            // ...
            // Reset selected piece after move
            this.deselectPiece();
        }
    }

    render() {
        // Retrieving state from localStorage (web) or AsyncStorage (React Native)
        // const boardState = JSON.parse(localStorage.getItem('boardState'));
        // console.log('this.props: ' + this.props);

        return (
            <div className="app">
                <h1>Checkers ({this.state.numPlayers} players)</h1>
                <div className="status">{this.state.status}</div>
                <Board
                    rows={this.rows}
                    cols={this.cols}
                    squares={this.state.squares}
                    // selectedPiece={this.state.selectedPiece} // Pass selectedPiece to Board component
                    // onSelect={(pieceIndex) => this.selectPiece(pieceIndex)} // Pass selectPiece method as prop
                    onClick={(i) => this.handleMove(i)}
                    selectedPiece={this.state.selectedPiece} // Pass selectedPiece to Board component
                />
                {/* Autres composants ou éléments de votre application */}
                {this.state.gameOver && <button onClick={() => this.new_game()}>New Game</button>}
                <Link to="/">
                    <button>Leave Game</button>
                </Link>
            </div>
        );
    }
}

export default withRouter(Checkers);

