let input1 = [];
let input2 = [];
let operator = [];
let display = [];

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

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', (event) => handleInputEvent(event));
});

function handleInputEvent(event){
    console.log(event.target.id);
};