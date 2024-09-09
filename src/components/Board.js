import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }
    renderSquare(i) {
        return (
            <button className="square" onClick={() => this.props.onClick(i)}>
                {this.props.squares[i]}
            </button>
        );
    }

    render() {
        const elements = [];
        const size = this.props.rows * this.props.cols;
        console.log('size' + size);
        for (let i = 0; i < this.props.rows; i++) {
            const rowElements = []; // Create a new array for each row
            for (let j = 0; j < this.props.cols; j++) {
                rowElements.push(this.renderSquare(j + this.props.cols * i));
            }
            elements.push(<div className="board-row">{rowElements}</div>);
        }
        return <div>{elements}</div>;
    }

}

export default Board;
