'use strict';

// The calculator App
export default class CalculatorApp {

    // Initializes the Calcualtor App
    constructor() {

        this.firstNum = '';
        this.secondNum = '';
        this.answer = '0';
        this.operator = null;
        this.previousOperator = null;

        this.computeButton = document.querySelector('.compute-btn-js');
        this.allClearButton = document.querySelector('.project-calculator .all-clear');
        this.numButtons = document.querySelectorAll('.num-btn-js');
        this.operatorButtons = document.querySelectorAll('.operator-js');
        this.displayArea = document.querySelector('.project-calculator .display-area');
        this.spanClose = document.querySelector(".project-calculator .close-js");

        this.numButtons.forEach(num => {
            num.addEventListener('click', e => this.handleNumbers(e.target.value));
        });

        this.operatorButtons.forEach(operator => {
            operator.addEventListener('click', e => this.handleOperators(e.target.value));
        });

        this.computeButton.addEventListener('click', e => this.handleEvaluation());
        this.allClearButton.addEventListener('click', e => this.clearAll());
        this.spanClose.addEventListener('click', e => this.clearAll());

    }

    handleNumbers(val) {

        // if previous operator was equal, reset calculation
        if (this.previousOperator === 'equal') {
            this.firstNum = '0';
            this.secondNum = '0';
            this.operator = null;
            this.previousOperator = null;
        }

        // check if operator has been selected
        if (this.operator === null) {

            // assign target number to firstNum
            if (this.numDigits(this.firstNum) > 11) {
                return;
            }

            // check if decimal has been clicked, prevent multiple decimal points
            if (val === '.') {
                if (String(this.firstNum).includes('.')) {
                    return;
                }
            }

            this.firstNum += val;
            // remove leading zeroes
            this.firstNum = this.removeLeadingZero(this.firstNum);
            // display in text area
            this.displayAnswer(this.firstNum);

        } else {

            // assign target number to firstNum
            if (this.numDigits(this.secondNum) > 11) {
                return;
            }

            // check if decimal has been clicked, prevent multiple decimal points
            if (val === '.') {
                if (String(this.secondNum).includes('.')) {
                    return;
                }
            }

            this.secondNum += val;
            // remove leading zeroes
            this.secondNum = this.removeLeadingZero(this.secondNum);
            // display in text area
            this.displayAnswer(this.secondNum);
        }

    }

    handleOperators(val) {

        // if previous operation was equal, set first number to answer to set up next calc
        if (this.previousOperator === 'equal') {
            this.firstNum = "" + this.answer;
        }

        if (this.firstNum !== '' && this.secondNum !== '' && this.previousOperator !== 'equal' && this.previousOperator === 'operator') {
            this.compute(this.firstNum, this.secondNum, this.operator);
            this.firstNum = "" + this.answer;
        }

        // set operator value
        this.operator = val;

        // reset second num
        this.secondNum = '';

        // set previous operation to operator
        this.previousOperator = 'operator';
    }

    handleEvaluation() {
        if (this.operator === null) {
            return;
        }

        // if previous click was equal, repeat firstNum operator secondNum, replacing firstNum with the answer
        if (this.previousOperator === 'equal') {
            this.firstNum = "" + this.answer;
            this.compute(this.firstNum, this.secondNum, this.operator);
        }

        // compute answer
        this.compute(this.firstNum, this.secondNum, this.operator);
        this.previousOperator = 'equal';
    }

    removeLeadingZero(str) {
        if (str.length > 1) {
            if (str[0] === '0') {
                return str.slice(1);
            } else {
                return str;
            }
        } else {
            return str;
        }
    }

    // computes result if equals button is clicked OR operator button is clicked after a second number is chosen
    compute(x, y, op) {
        // switch on operation string, call proper function with appropriate values
        switch (op) {
            case 'add':
                this.answer = this.add(Number(x), Number(y));
                this.displayAnswer(this.cleanse(this.answer));
                break;
            case 'subtract':
                this.answer = this.subtract(Number(x), Number(y));
                this.displayAnswer(this.cleanse(this.answer));
                break;
            case 'multiply':
                this.answer = this.multiply(Number(x), Number(y));
                this.displayAnswer(this.cleanse(this.answer));
                break;
            case 'divide':
                this.answer = this.divide(Number(x), Number(y));
                this.displayAnswer(this.cleanse(this.answer));
                break;
            default:
                console.log('no operator');
        }
    }

    // check size of number, if floating point, precision, rounding
    cleanse(num) {
        // check if number is integer
        if (this.isInt(num)) {
            if (this.numDigits(num) > 20) {
                return (num.toExponential(5));
            }
            return num;
        } else { // is floating point
            num = +num.toFixed(5);
            if (this.numDigits(num) > 20) {
                return (num.toExponential(5));
            }

            return num;
        }


    }

    // checks if number is integer or floating point
    isInt(num) {
        return num % 1 === 0
    }

    // returns number of digits
    numDigits(num) {
        let numDigits = 0;
        if (typeof num === 'string') {
            numDigits = num.length;
        } else {
            numDigits = num.toString().length;
        }

        return numDigits;
    }

    add(x, y) {
        return x + y;
    }

    subtract(x, y) {
        return x - y;
    }

    multiply(x, y) {
        return x * y;
    }

    divide(x, y) {
        return x / y;
    }

    // Display answer
    displayAnswer(value) {
        this.displayArea.innerHTML = '';
        this.displayArea.innerHTML = value;
    }

    // Clear display area
    clearAll() {
        this.firstNum = '';
        this.secondNum = '';
        this.answer = 0;
        this.previousOperator = null;
        this.operator = null;
        this.displayArea.innerHTML = '0';
    }

}

// create app on window load
window.addEventListener('load', () => new CalculatorApp());
