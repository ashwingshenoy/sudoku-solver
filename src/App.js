import React, { Component } from 'react';
import { Help as AppHelp, Sudoku as AppSudoku } from './components';
import { Sudoku } from './models/Sudoku';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.sudoku = new Sudoku();
    this.state = {
      sudoku: this.sudoku.value
    };
    this.isValid = this.isValid.bind(this);
    this.resetSudoku = this.resetSudoku.bind(this);
    this.solveSudoku = this.solveSudoku.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  isValid(row, col) {
    const cell = 9 * row + col;
    return this.sudoku.cells[cell].isValid;
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

  render() {
    return <div>
      <div className="display-flex">
        <div>
          <AppHelp solve={this.solveSudoku} reset={this.resetSudoku} />
        </div>
        <div className="fill">
          <h2 className="text-center">Sudoku Solver</h2>
          <AppSudoku sudoku={this.state.sudoku}
            isValid={this.isValid}
            updateValue={this.updateValue} />
        </div>
      </div>
    </div>;
  }
}

export default App;
