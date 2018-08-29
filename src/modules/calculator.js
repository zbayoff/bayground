const CalculatorModule = (function () {

    'use strict';

    // The calculator App
    class CalculatorApp {

        // Initializes the Calcualtor App
        constructor() {
            console.log('app is created');

            this.firstNum = '0';
            this.secondNum = '0';
            this.secondNumCopy = '0';
            this.operator = null;

            this.calculatorKeysContainer = document.querySelector('.calculator-keys');
            this.computeButton = document.querySelector('.compute-btn-js');
            this.allClearButton = document.querySelector('.project-calculator .all-clear');
            this.numButtons = document.querySelectorAll('.num-btn-js');

            this.displayArea = document.querySelector('.project-calculator .display-area');

            this.calculatorKeysContainer.addEventListener('click', e => this.handleClick(e))

            this.allClearButton.addEventListener('click', e => this.clearAll());
            this.computeButton.addEventListener('click', e => this.compute())


        }

        handleClick(e) {

            // check if target is a calculator button
            if (e.target.classList.contains('calc-btn-js')) {

                // check if button is a number
                if (e.target.classList.contains('num-btn-js')) {



                    // check if operator has been selected
                    if (this.operator === null) {
                        // assign target number to firstNum
                        this.firstNum += e.target.value;
                        // console.log('firstNum is: ' + this.firstNum);

                    } else {
                        this.secondNum += e.target.value;

                        // console.log('secondNum is: ' + this.secondNum);
                    }

                    // check if leading number is 0
                    this.firstNum = this.removeLeadingZero(this.firstNum);
                    this.secondNum = this.removeLeadingZero(this.secondNum);

                    console.log('firstNum is: ' + this.firstNum);
                    console.log('secondNum is: ' + this.secondNum);
                    console.log('operator is: ' + this.operator);


                }

                // check if button is an operator
                if (e.target.classList.contains('operator-js')) {

                    // Case 1: First Number is selected, not second.
                    // Case 2: First Number and Second Number are selected

                    if (this.firstNum !== '0' && this.secondNum !== '0') {
                        this.compute();
                    } else {
                        // reset secondNum
                        // this.secondNum = 0;
                    }



                    // set operator value
                    this.operator = e.target.value;

                }

            }
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
        compute() {
            // switch on operation string, call proper function with appropriate values
            // console.log('computing...');
            console.log(this.operator);
            if (this.operator === 'add' || this.operator === 'subtract' || this.operator === 'multiply' || this.operator === 'divide') {

                switch (this.operator) {
                    case 'add':
                        this.secondNumCopy = this.secondNum;
                        this.firstNum = this.add(Number(this.firstNum), Number(this.secondNumCopy));
                        // display firstNum;
                        console.log('Computed answer and firstNum is: ' + this.firstNum);
                        // this.secondNumCopy = this.secondNum;
                        this.secondNum = 0;
                        console.log('The second num is: ' + this.secondNum);
                        break;
                    case 'subtract':
                        this.firstNum = this.subtract(Number(this.firstNum), Number(this.secondNum));
                        console.log('Computed answer and firstNum is: ' + this.firstNum);
                        break;
                    case 'multiply':
                        this.firstNum = this.multiply(Number(this.firstNum), Number(this.secondNum));
                        console.log('Computed answer and firstNum is: ' + this.firstNum);
                        break;
                    case 'divide':
                        this.firstNum = this.divide(Number(this.firstNum), Number(this.secondNum));
                        console.log('Computed answer and firstNum is: ' + this.firstNum);
                        break;
                    default:
                        console.log('no operator');

                }



            } else if (this.operator === 'equal') {

            }



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
        displayAnswer() {

        }

        displayCurrentValue(num) {
            this.displayArea.innerHTML += num;
        }

        // Clear display area
        clearAll() {
            this.firstNum = 0;
            this.secondNum = 0;
            this.operator = null;
        }




    }

    window.addEventListener('load', () => new CalculatorApp());



}());