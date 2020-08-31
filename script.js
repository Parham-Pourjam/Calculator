const numberBtns = document.querySelectorAll('.numbers');
const output = document.querySelector('.display');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const clearButton = document.querySelector('#clear');
let firstNumber;
let secondNumber;
let operator;

// boolean is used to clear screen after calculation is done 
let calculationIsDone = false;

// boolean is used to check if calculation should be made when stringing 
// together several operations
let operatorUsed = false;

function displayNum() {
    if (calculationIsDone) {
        output.textContent = "";
        calculationIsDone = false;
    }
    const value = this.textContent;
    const displayNum = document.createTextNode(value);
    output.appendChild(displayNum);
}

function displayOperator() {
    // if an operator has already been used, store the second number and call operate
    if (operatorUsed) {
        secondNumber = parseFloat(output.textContent);
        firstNumber = operate(operator, firstNumber, secondNumber);
        operator = this.textContent;
        decimalButton.addEventListener('click', inputDecimal);
    } 
    // else store the first number and clear screen
    else {
        firstNumber = parseFloat(output.textContent);
        output.textContent = "";
        operator = this.textContent;
        operatorUsed = true;
        // re-enable decimal button after operator is used
        decimalButton.addEventListener('click', inputDecimal);
    }
}

// display result of intermediate calculation on screen
function displayResult(result) {
    output.textContent = result;
    calculationIsDone = true;
}

// calculate the final result
function calculate() {
    // alert user if they are attempting to make a calculation without any operands
    if (!firstNumber) {
        alert("No input given");
    }

    secondNumber = parseFloat(output.textContent);
    operate(operator, firstNumber, secondNumber);
    operatorUsed = false;
}


function add(num1, num2) {
    result = (num1 + num2).toFixed(3);
    displayResult(result);
    calculationIsDone = true;
    return result;
}

function subtract(num1, num2) {
    result = (num1 - num2).toFixed(3);
    displayResult(result);
    calculationIsDone = true;
    return result;
}

function multiply(num1, num2) {
    result = (num1 * num2).toFixed(3);
    displayResult(result);
    calculationIsDone = true;
    return result;
}

function divide(num1, num2) {
    num2 === 0 ? result = ("Error, division by 0") : result = (num1 / num2).toFixed(3);
    displayResult(result);
    calculationIsDone = true;
    return result;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Invalid operation";
    }
}

// if decimal is used, remove the option of inputting another one until operator is used
function inputDecimal() {
    const value = this.textContent;
    const decimal = document.createTextNode(value);
    output.appendChild(decimal);
    decimalButton.removeEventListener('click', inputDecimal);
}

// clear all previous inputs and display outputs
function clear() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    output.textContent = "";
    decimalButton.addEventListener('click', inputDecimal);
}

numberBtns.forEach(numBtn => {
    numBtn.addEventListener('click', displayNum);
});

operatorButtons.forEach(operatorButtons => {
    operatorButtons.addEventListener('click', displayOperator);
});

equalButton.addEventListener('click', calculate);

decimalButton.addEventListener('click', inputDecimal);

clearButton.addEventListener('click', clear);