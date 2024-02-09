// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import CSS file for styling

import Home from './Home';
import TicTacToe from './TicTacToe'; // Assuming you have a Tic Tac Toe component
import Connect4 from './Connect4'; // Assuming you have a Connect 4 component


const App = (props) => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/tic-tac-toe/:numPlayers" element={<TicTacToe/>} />
                    <Route path="/connect-c4/:numPlayers" element={<Connect4/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
