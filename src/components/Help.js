import React, { Component } from 'react';
export class Help extends Component {
    render() {
        return <div>
            <h3 className="text-center">How to use?</h3>
            <ul>
                <li>Enter values manually to create Sudoku Puzzle</li>
                <br />
                <li>Click <kbd>Solve Sudoku</kbd> button to solve puzzle</li>
                <button className="btn" onClick={this.props.solve}>Solve Sudoku</button>
                <li>Click <kbd>New Sudoku</kbd> button to clear</li>
                <button className="btn" onClick={this.props.reset}>New Sudoku</button>
            </ul>
        </div>;
    }
}