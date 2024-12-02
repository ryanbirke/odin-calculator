const input1 = [];
const input2 = [];
const operator = [];
const output = [];

numberMap = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
};

operatorMap = {
    'add': addTwoNumbers,
    'subtract': subtractTwoNumbers,
    'multiply': multiplyTwoNumbers,
    'divide': divideTwoNumbers,
    'clear': '',
    'equals': '',
};

function addTwoNumbers(num1, num2){
    return num1 + num2;
};

function subtractTwoNumbers(num1, num2){
    return num1 - num2;
};

function multiplyTwoNumbers(num1, num2){
    return num1 * num2;
};

function divideTwoNumbers(num1, num2){
    return num1/num2;
};

function clearInputs(){
    input1.length = 0;
    input2.length = 0;
    operator.length = 0;
    console.log(`All inputs cleared`);
    return;
};

function arrayToNumber(arr){
    const concatArray = arr.join('');
    return Number(concatArray);
};

function handleInputEvent(event){
    console.log(event.target.id);
    const targetID = event.target.id;
    if (targetID in numberMap) {
        handleNumberEvent(event);
    } else if (targetID in operatorMap) {
        handleOperatorEvent(event);
    };
    return;
};

function handleNumberEvent(event){
    const input = numberMap[event.target.id];
    if (operator.length === 0) {
        input1.push(input);
        console.log(`Input 1 is ${arrayToNumber(input1)}`);
    } else if (operator[0] in operatorMap) {
        input2.push(input);
        console.log(`Input 2 is ${arrayToNumber(input2)}`);
    };
    return;
};

function handleOperatorEvent(event){
    const operationID = event.target.id;
    if (operationID === 'clear') {
        clearInputs(); 
        updateDisplay('000000');
    } else if (operator[0] === 'divide' && arrayToNumber(input2) === 0) {
        // handles div by 0 error message
        clearInputs();
        updateDisplay("RESTART: n0t c00l t0 div 0");
        return;
    } else if (operationID === 'equals') {
        if (input1.length > 0 && operator.length > 0 && input2.length > 0) {
            operate(input1, input2, operator);
        };
    } else if (operator[0] === 'resultAsInput1' || (input1.length > 0 && operator.length === 0)) {
        operator.length = 0;
        operator.push(operationID);
        console.log(`Operator is ${operationID}`);
    } else if (input1.length > 0 && operator.length > 0 && input2.length > 0) {
        operate(input1, input2, operator);
        operator.length = 0;
        operator.push(operationID);
    } else {
        updateDisplay('Input number first')
    };
    return;
};

function operate(in1, in2, op){
    const operatorFunction = operatorMap[op[0]];
    const number1 = arrayToNumber(in1);
    const number2 = arrayToNumber(in2);
    let result = operatorFunction(number1, number2);
    if (result.toString().length > 7) {
        result = result.toFixed(5);
    };
    console.log(`Result of ${number1}, ${op[0]}, ${number2} is ${result}`);
    clearInputs();
    output.length = 0;
    output.push(result);
    input1.push(result);
    operator.push('resultAsInput1');
    updateDisplay(result.toString());
    return;
};

function updateDisplay(string){
    console.log(`Set display to ${string}`);
    document.getElementById('display').textContent = string;
    return;
};

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', (event) => handleInputEvent(event));
});