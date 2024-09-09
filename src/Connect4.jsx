// App.js
import React, {useState} from 'react';
import './App.css';
import Board from './components/Board';
import Player from './Player';
import {Link} from "react-router-dom";
import {withRouter} from './functions';


class Connect4 extends React.Component {
    constructor(props) {
        super(props);
        // this.new_game();
        const { numPlayers } = this.props.router.params;
        this.rows = 6
        this.cols = 7
        const size = this.rows * this.cols;
        this.player1 = new Player('Human', 'X');
        this.player2 = new Player('Computer', 'O');
        this.state = {
            squares: Array(size).fill(null),
            nextPlayer: this.player2,
            gameOver: false,
            status: "Player " + this.player1.color + " starts",
            numPlayers: numPlayers
        };
        console.log(this.player1);
        console.log(this.player2);
        console.log(this.state);
        this.new_game();
        // Saving state to localStorage (web) or AsyncStorage (React Native)
        // localStorage.setItem('boardState', JSON.stringify(this.state));
    }

/*    componentDidMount() {
        if (this.props.router && this.props.router.numPlayers) {
            // Update the state directly without calling setState
            this.state.numPlayers = this.props.router.params;
            console.log(this.state.numPlayers);
        }
    }*/


    new_game() {
        fetch('/api/new_game_c4', {
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
        fetch('/api/move_c4', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                column: i % this.cols,
                player: this.state.player === this.player1 ? this.player2: this.player1,
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
        // console.log('this.props: ' + this.props);

        return (
            <div className="app">
                <h1>Connect 4 ({this.state.numPlayers} players)</h1>
                <div className="status">{this.state.status}</div>
                <Board
                    rows={this.rows}
                    cols={this.cols}
                    squares={this.state.squares}
                    onClick={(i) => this.handleMove(i)}
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

export default withRouter(Connect4);
