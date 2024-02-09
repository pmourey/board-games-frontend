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
        const rows = 6;
        const cols = 7;
        const elements = [];

        for (let row = 0; row < rows; row++) {
            const rowElements = [];
            for (let col = 0; col < cols; col++) {
                const index = col + row * cols;
                rowElements.push(this.renderSquare(index));
            }
            elements.push(<div className="board-row">{rowElements}</div>);
        }
        return <div>{elements}</div>;
    }
}

export default Board;
