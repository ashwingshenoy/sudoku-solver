import React, { Component } from 'react';
import { Sudoku } from './models/Sudoku';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.sudoku = new Sudoku();
    this.state = {
      sudoku: this.sudoku.value
    };
    this.resetSudoku = this.resetSudoku.bind(this);
    this.solveSudoku = this.solveSudoku.bind(this);
  }

  updateValue(row, col, value) {
    if (/^\d?$/.test(value)) {
      this.sudoku.updateCellValue(row, col, value)
      this.updateState();
    }
  }

  solveSudoku() {
    this.sudoku.autoFill();
    this.updateState();
  }

  resetSudoku() {
    this.sudoku = new Sudoku();
    this.updateState();
  }

  updateState() {
    this.setState({ sudoku: this.sudoku.value });
  }

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
    return classNames.join(" ");
  }

  renderSudokuTable() {
    return <table className="sudoku">
      <tbody>
        {this.state.sudoku.map(
          (row, rowIndex) => <tr className="row" key={`sudoku_row_${rowIndex}`}>
            {row.map((col, colIndex) => <td className={this.getClassName(rowIndex, colIndex)} key={`sudoku_col_${colIndex}`}>
              <input value={col} size="1"
                type="text" maxLength="1"
                onChange={event => this.updateValue(rowIndex, colIndex, event.target.value)} />
            </td>)}
          </tr>
        )}
      </tbody>
    </table>
  }

  render() {
    return <div>
      <div>{this.renderSudokuTable()}</div>
      <div>
        <button onClick={this.solveSudoku}>Solve Sudoku</button>
        <button onClick={this.resetSudoku}>New Sudoku</button>
      </div>
    </div>
  }

  componentDidMount() {
    console.table(this.state.sudoku.value);
  }
}

export default App;
