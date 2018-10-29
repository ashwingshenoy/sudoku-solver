import React, { Component } from 'react';
import './Sudoku.css';

export class Sudoku extends Component {
    getClassName(row, col) {
        let classNames = ["cell"];
        if (row % 3 === 0) {
            classNames.push("border-top");
        }
        if ((col + 1) % 3 === 0) {
            classNames.push("border-right");
        }
        if ((row + 1) % 3 === 0) {
            classNames.push("border-bottom");
        }
        if (col % 3 === 0) {
            classNames.push("border-left");
        }
        if (!this.props.isValid(row, col)) {
            classNames.push("invalid");
        }
        return classNames.join(" ");
    }
    render() {
        return <table className="sudoku">
            <tbody>
                {this.props.sudoku.map(
                    (row, rowIndex) => <tr className="row" key={`sudoku_row_${rowIndex}`}>
                        {row.map(
                            (col, colIndex) => <td key={`sudoku_col_${colIndex}`}
                                className={this.getClassName(rowIndex, colIndex)} >
                                <input value={col} size="1"
                                    type="text" maxLength="1"
                                    onChange={event => this.props.updateValue(rowIndex, colIndex, event.target.value)} />
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>;
    }
}