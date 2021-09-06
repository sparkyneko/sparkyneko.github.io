class MathCalculator {
    constructor(num) {
        this.num = 0;
        this.exp = 0;

        this.load(num);
    }

    result() {
        return this.num / Math.pow(10, this.exp);
    }

    parse(num) {
        if (num.constructor === MathCalculator) {
            num = num.result();
        }
        const decimals = num.toString().split('.')[1] || '';

        return { number: num * Math.pow(10, decimals.length), exponent: decimals.length };
    }

    normalize(num) {
        const diff = this.exp - num.exponent;
        const absdiff = Math.abs(diff);
        if (diff > 0) {
            num.exponent += absdiff;
            num.number *= Math.pow(10, absdiff);
        } else if (diff < 0) {
            this.exp += absdiff;
            this.num *= Math.pow(10, absdiff);
        }

        return num;
    }

    load(num) {
        if (num.constructor === MathCalculator) {
            num = num.result();
        }
        const _num = this.parse(num);
        this.num = _num.number;
        this.exp = _num.exponent;
    }

    add(num) {
        let _num = this.parse(num);
        _num = this.normalize(_num);

        this.num += _num.number;
        return this;
    }

    subtract(num) {
        let _num = this.parse(num);
        _num = this.normalize(_num);

        this.num -= _num.number;
        return this;
    }

    multiply(num) {
        let _num = this.parse(num);

        this.num *= _num.number;
        this.exp += _num.exponent;
        return this;
    }

    divide(num) {
        let _num = this.parse(num);
        _num = this.normalize(_num);

        this.num /= _num.number;
        return this;
    }
}

function Calc(num) {
    return new MathCalculator(num);
}