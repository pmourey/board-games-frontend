import React from 'react';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <button className="square" onClick={() => this.props.onClick(i)}>
                {this.props.squares[i]}
            </button>
        );
    }

    render() {
        const elements = [];
        const size = 3;
        for (let i = 0; i < size; i++) {
            const rowElements = []; // Create a new array for each row
            for (let j = 0; j < size; j++) {
                rowElements.push(this.renderSquare(j + size * i));
            }
            elements.push(<div className="board-row">{rowElements}</div>);
        }
        return <div>{elements}</div>;
    }

}

export default Board;
