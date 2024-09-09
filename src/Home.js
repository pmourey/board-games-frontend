import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Home.css'; // Import CSS file for styling

// Reusable component for game section with radio buttons
const GameSection = ({gameName, path}) => {
    const [numPlayers, setNumPlayers] = useState(1);
    // console.log(path + '/:' + numPlayers);

    const handlePlayerChange = (e) => {
        setNumPlayers(parseInt(e.target.value));
    };

    return (
        <div>
            <h2>{gameName}</h2>
            <Link to={path + '/' + numPlayers}>
                <button>Play {gameName}</button>
            </Link>

            <div>
                <input
                    type="radio"
                    id={`${gameName}-onePlayer`}
                    name={`${gameName}-numPlayers`}
                    value={1}
                    checked={numPlayers === 1}
                    onChange={handlePlayerChange}
                />
                <label htmlFor={`${gameName}-onePlayer`}>1 Player</label>
                <input
                    hidden disabled
                    type="radio"
                    id={`${gameName}-twoPlayers`}
                    name={`${gameName}-numPlayers`}
                    value={2}
                    checked={numPlayers === 2}
                    onChange={handlePlayerChange}
                />
                <label 
                    hidden
                    htmlFor={`${gameName}-twoPlayers`} 
                    style={{ textDecoration: 'line-through' }}
                > 2 Players </label>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Games Page</h1>
            <GameSection gameName="Tic Tac Toe" path="/tic-tac-toe"/>
            <GameSection gameName="Connect 4" path="/connect-c4"/>
            <GameSection gameName="Checkers" path="/checkers"/>
        </div>
    );
};

export default Home;
