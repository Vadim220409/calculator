const numbers = Array.from(document.querySelectorAll('.numeric-button'));
const result = document.querySelector('.calculate-line');
const operationButtons = document.querySelectorAll('.operation-button');
const buttonResult = document.querySelectorAll(".result-button");
const buttonReset = document.querySelector(".button-reset");
const buttonClear = document.querySelector(".button-clear");



function removeZeros(str) {
    while (str.startsWith('0')) {
        str = str.slice(1);
    }
    return str;
}

function numKeyHandler(event) {
    if (result.textContent === "Error") {
        result.textContent = event.target.textContent;
    } else {
        result.textContent += event.target.textContent;
    }
    result.textContent = removeZeros(result.textContent);
}


function operationKeyHandler(event) {
    const operationRegex = /[+\-*/]/;
    const lastCharacter = result.textContent.slice(-1);
    if (operationRegex.test(lastCharacter)) {
        return;
}
    result.textContent += event.target.textContent;
}

numbers.forEach(key => {
    key.addEventListener('click', numKeyHandler);
});

operationButtons.forEach(key => {
    key.addEventListener('click', operationKeyHandler);
});


function calculateResult(){
    const s = result.textContent;
    const operands = s.split(/[+\-*/]/);
    const operator = s.match(/[+\-*/]/);
    if (!operator || operator.length !== 1) {
        return;
    }


    const num1 = parseFloat(operands[0]);
    const num2 = parseFloat(operands[1]);


    const operation = operator[0];

    let resultValue;

    let afterError = false;

    switch(operation){
        case '+':
            resultValue = num1 + num2
            break;
        case '-':
            resultValue = num1 - num2;
            break;
        case '*':
            resultValue = num1 * num2;
            break;
        case '/':
            if (num2 === 0){
                resultValue = "Error"
                afterError = true
                
            }
            else {
                resultValue = num1 / num2;
            }
            break;
        default:
            return
    }

    result.textContent = resultValue;
}


buttonResult.forEach(key => {
    key.addEventListener('click', calculateResult);
});

function clearResult(){
    result.textContent = 0;
}


buttonReset.addEventListener('click', resultReset);


function resultClear() {
    let resultText = result.textContent;
    resultText = resultText.slice(0, -1);
    result.textContent = resultText;
}

buttonClear.addEventListener('click', resultClear);

