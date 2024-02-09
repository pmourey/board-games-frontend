import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

// Fonction pour vérifier s'il y a un gagnant
export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Supposons que gameBoard est un tableau 3x3 représentant l'état du jeu.
// Chaque élément du tableau peut être 'X', 'O' ou vide (' ').

export function isValidMove(move, gameBoard) {
    const row = move.row;
    const col = move.col;

    // Vérifier si les coordonnées de la case sont valides
    if (row < 0 || row >= gameBoard.length || col < 0 || col >= gameBoard[0].length) {
        return false;
    }

    // Vérifier si la case est vide
    if (gameBoard[row][col] !== ' ') {
        return false;
    }

    // Vérifier si le jeu n'est pas déjà terminé
    if (isGameOver(gameBoard)) {
        return false;
    }

    return true;
}

export function isGameOver(gameBoard) {
    // Vérification des lignes
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][0] !== ' ' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
            return true; // Gagné par ligne
        }
    }

    // Vérification des colonnes
    for (let j = 0; j < gameBoard[0].length; j++) {
        if (gameBoard[0][j] !== ' ' && gameBoard[0][j] === gameBoard[1][j] && gameBoard[1][j] === gameBoard[2][j]) {
            return true; // Gagné par colonne
        }
    }

    // Vérification des diagonales
    if ((gameBoard[0][0] !== ' ' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
        (gameBoard[0][2] !== ' ' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])) {
        return true; // Gagné par diagonale
    }

    // Vérification du match nul
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === ' ') {
                return false; // Il reste des cases vides, le jeu n'est pas terminé
            }
        }
    }

    return true; // Toutes les cases sont remplies, match nul
}

