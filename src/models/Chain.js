import { Base } from "./Base";

export class Chain extends Base {
    constructor() {
        super();
        this._cells = []
        this._emptyCells = [];
    }
    get isFilled() {
        return this._emptyCells.length === 0;
    }
    get isValid() {
        return this._emptyCells.length === this._possibleValues.length;
    }
    get fillable() {
        const fillable = []
        if (this.isValid && !this.isFilled) {
            if (this.possibleValue !== null) {
                fillable.push(this._emptyCells[0]);
            } else {
                this._emptyCells.forEach(cell => {
                    if (cell.possibleValue !== null) {
                        fillable.push(cell);
                    }
                });
            }
            if (fillable.length === 0) {
                this._possibleValues.forEach(
                    possibleValue => {
                        const possibleCells = this._emptyCells.filter(cell => cell.isPossibleValue(possibleValue));
                        if (possibleCells.length === 1) {
                            const cell = possibleCells.pop();
                            cell.possibleValue = possibleValue;
                            fillable.push(cell);
                        }
                    }
                )
            }
        }
        return fillable;
    }
    get value() {
        return this._cells.map(cell => cell.value);
    }
    add(cell, index) {
        this._cells[index] = cell;
        if (cell.value === "") {
            this._emptyCells.push(cell);
        } else {
            this.removePossibleValue(cell.value);
        }
    }
    updateValue(prevValue, curValue, index) {
        if (prevValue !== "") {
            this._cells.forEach((cell, cellIndex) => {
                if (cellIndex !== index) {
                    cell.addPossibleValue(prevValue);
                } else {
                    this._emptyCells.push(cell);
                }
            });
            this.addPossibleValue(prevValue);
        }
        if (this.isPossibleValue(curValue)) {
            this._cells.forEach((cell, cellIndex) => {
                if (cellIndex !== index) {
                    cell.removePossibleValue(curValue);
                }
            });
            this.removePossibleValue(curValue);
        } else {
            this._cells[index].value = curValue;
        }
        this._emptyCells = this._emptyCells.filter(emptyCell => emptyCell.value === "");
    }
}