import { Base } from "./Base";


export class Cell extends Base {
    constructor(row, col) {
        super();
        this.row = row;
        this.col = col;
        this.group = 3 * Math.floor(row / 3) + Math.floor(col / 3);
        this._value = "";
        this._isFilled = false;
        this._isValid = true;
    }
    get isFilled() {
        return this._isFilled && this._isValid;
    }
    get isValid() {
        return this._isValid;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value !== value) {
            if (value === "") {
                this.addPossibleValue(this._value);
                this._isValid = true;
                this._isFilled = false;
            } else if (this.isPossibleValue(value)) {
                this.removePossibleValue(value);
                this._isValid = true;
                this._isFilled = true;
            } else {
                this._isFilled = true;
                this._isValid = false;
            }
            this._value = value;
        }
    }
}
