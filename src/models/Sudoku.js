
import { Cell } from './Cell';
import { Chain } from './Chain';

export class Sudoku {
    constructor() {
        this.cells = [];
        this.rows = [];
        this.cols = [];
        this.groups = [];
        this._initialize();
    }

    get emptyCellCount() {
        return this.cells.filter(cell => !cell.isFilled).length;
    }

    get value() {
        return this.rows.map(row => row.value);
    }

    _add(cell) {
        this.cells.push(cell);
        this.rows[cell.row].add(cell, cell.col);
        this.cols[cell.col].add(cell, cell.row);
        this.groups[cell.group].add(cell, this._getGroupIndex(cell.row, cell.col));
    }

    _initialize() {
        for (let index = 0; index < 9; index++) {
            this.rows.push(new Chain());
            this.cols.push(new Chain());
            this.groups.push(new Chain());
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this._add(new Cell(row, col));
            }
        }
    }

    _getGroupIndex(row, col) {
        return 3 * (row % 3) + (col % 3);
    }

    _getGroupValue(row, col) {
        return 3 * Math.floor(row / 3) + Math.floor(col / 3);
    }

    updateCellValue(row, col, value) {
        const index = 9 * row + col;
        this.updateValue(this.cells[index], value);
    }

    updateValue(cell, value) {
        const prevValue = cell.value;
        let curValue = value;
        if (value !== "") {
            curValue = Number(value);
        }
        if (prevValue !== curValue) {
            cell.value = curValue;
            this.rows[cell.row].updateValue(prevValue, curValue, cell.col);
            this.cols[cell.col].updateValue(prevValue, curValue, cell.row);
            this.groups[cell.group].updateValue(prevValue, curValue, this._getGroupIndex(cell.row, cell.col));
        }
    }

    updateFillable(chainArray) {
        let fillable = [];
        chainArray.forEach(chain => {
            fillable = fillable.concat(chain.fillable);
        });
        const needUpdate = fillable.length > 0
        if (needUpdate) {
            fillable.forEach(cell => this.updateValue(cell, cell.possibleValue));
        }
        return needUpdate;
    }

    autoFill() {
        if (this.emptyCellCount > 0) {
            let filled = false;
            do {
                // scan rows
                filled = this.updateFillable(this.rows);

                // scan columns
                filled = this.updateFillable(this.cols) || filled;

                // scan groups
                filled = this.updateFillable(this.groups) || filled;

            } while (filled);
        }
    }
}