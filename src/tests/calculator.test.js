import CalculatorApp from '../modules/calculator';

jest.mock('../modules/calculator');

it('creates new calculator app', () => {
    const calculatorApp = new CalculatorApp();
    expect(CalculatorApp).toHaveBeenCalledTimes(1);
});

it('First and Second Nums are initially 0 and operator is null', () => {
    const calculatorApp = new CalculatorApp();
    // console.log(calculatorApp);
    const multiply = calculatorApp.multiply;
    console.log(multiply);
    expect(multiply(4,5)).toBe(20);
})
