export class Base {
    constructor() {
        this._possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    get possibleValue() {
        if (this._possibleValues.length === 1) {
            return this._possibleValues[0];
        }
        return null;
    }
    set possibleValue(value) {
        this._possibleValues = [value];
    }
    addPossibleValue(value) {
        if (!this.isPossibleValue(value)) this._possibleValues.push(value);
    }
    isPossibleValue(value) {
        return this._possibleValues.includes(value);
    }
    removePossibleValue(value) {
        this._possibleValues = this._possibleValues.filter(possibleValue => possibleValue !== value);
    }
}