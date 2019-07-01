export class KDate {
    constructor(source) {
        const splits = source.split('-');
        this.__year = splits[0];
        this.__month = splits[1];
        this.__day = splits[2];
    }

    getYear() {
        return this.__year;
    }

    getMonth() {
        return this.__month;
    }

    getDay() {
        return this.__day;
    }
}