let expect = require('chai').expect;
const sinon = require('sinon');

import CalculatorApp from '../src/modules/calculator';

describe('CalculatorApp', () => {

    let calculator;
    let sandbox;

    beforeEach(() => {
        calculator = new CalculatorApp();
        sandbox = sinon.createSandbox();
        sandbox.stub(calculator, 'displayAnswer');

    });

    it('adds two numbers correctly', () => {
        expect(calculator.add(2, 3)).to.equal(5);
    });

    it('subtracts two numbers correctly', () => {
        expect(calculator.subtract(2, 3)).to.equal(2-3);
    });

    it('multiplies two numbers correctly', () => {
        expect(calculator.multiply(2, 3)).to.equal(2*3);
    });

    it('divides two numbers correctly', () => {
        expect(calculator.divide(3, 3)).to.equal(1);
    });

    it('correctly passes click sequence: 5 + 3 = 8', () => {

        calculator.handleNumbers(5);
        calculator.handleOperators('add');
        calculator.handleNumbers(3);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(8);

    });

    it('correctly passes click sequence: 55 + 33 = 88', () => {

        calculator.handleNumbers(5);
        calculator.handleNumbers(5);
        calculator.handleOperators('add');
        calculator.handleNumbers(3);
        calculator.handleNumbers(3);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(88);

    });

    it('correctly passes click sequence: 5 * 8 = 40 + 7 = 47', () => {

        calculator.handleNumbers(5);
        calculator.handleOperators('multiply');
        calculator.handleNumbers(8);
        calculator.handleEvaluation();
        calculator.handleOperators('add');
        calculator.handleNumbers(7);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(47);

    });

    it('correctly passes click sequence: 4 * + 4 = 8', () => {

        calculator.handleNumbers(4);
        calculator.handleOperators('multiply');
        calculator.handleOperators('add');
        calculator.handleNumbers(4);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(8);
        
    });

    it('correctly passes click sequence: 8 + 0 + 5 = 13', () => {

        calculator.handleNumbers(8);
        calculator.handleOperators('add');
        calculator.handleNumbers(0);
        calculator.handleOperators('add');
        calculator.handleNumbers(5);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(13);

    });

    it('correctly passes click sequence: 0 + 0 - 9 * 12 - 4 = -112', () => {

        calculator.handleNumbers(0);
        calculator.handleOperators('add');
        calculator.handleNumbers(0);
        calculator.handleOperators('subtract');
        calculator.handleNumbers(9);
        calculator.handleOperators('multiply');
        calculator.handleNumbers(12);
        calculator.handleOperators('subtract');
        calculator.handleNumbers(4);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(-112);

    });

    it('correctly passes click sequence: 5 - 4 = 1 + = 5 - 7 = + 1 = = = 1', () => {
        calculator.handleNumbers(5);
        calculator.handleOperators('subtract');
        calculator.handleNumbers(4);
        calculator.handleEvaluation();
        calculator.handleOperators('add');
        calculator.handleEvaluation();
        calculator.handleNumbers(5);
        calculator.handleOperators('subtract');
        calculator.handleNumbers(7);
        calculator.handleEvaluation();
        calculator.handleOperators('add');
        calculator.handleNumbers(1);
        calculator.handleEvaluation();
        calculator.handleEvaluation();
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(1);
    });

    it('correctly passes click sequence: 12345 * 123456789 + 300 = 1.52407e12', () => {
        calculator.handleNumbers(12345);
        calculator.handleOperators('multiply');
        calculator.handleNumbers(123456789);
        calculator.handleOperators('add');
        calculator.handleNumbers(300);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(12345 * 123456789 + 300);
    });

    it('correctly passes click sequence: 554.556 * 333.545 / 55 = 3363.07965', () => {
        calculator.handleNumbers(554.556);
        calculator.handleOperators('multiply');
        calculator.handleNumbers(333.545);
        calculator.handleOperators('divide');
        calculator.handleNumbers(55);
        calculator.handleEvaluation();
        expect(calculator.answer).to.equal(554.556 * 333.545 / 55);
    });

});
