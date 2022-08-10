let operand1 = null;
let operator = null;
let operand2 = null;

document.querySelectorAll(".operator").forEach(_operator => {
    _operator.addEventListener('click', onOperatorClick);
});

document.querySelectorAll(".number").forEach(number => {
    number.addEventListener('click', onNumberClick);
})

document.querySelector("#equals").addEventListener('click', evaluate);
document.querySelector("#delete").addEventListener('click', deleteButton);
document.querySelector("#clear").addEventListener('click', clear);

function onNumberClick(e) {
    if (operator) {
        appendDigit2(e.target.textContent);
    }
    else {
        appendDigit1(e.target.textContent);
    }
}

function onOperatorClick(e) {
    if (!operand1) {
        return;
    }
    operator = e.target.textContent;
    updateWorkingText();
}

function evaluate() {
    if (!operand1 || !operator || !operand2) return;

    operand1 = +operand1;
    operand2 = +operand2;
    let result = 0;
    // let op = null;
    switch (operator) {
        case "+":
            result = operand1 + operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "x":
            result = operand1 * operand2;
            break;
        case "/":
            result = operand1 / operand2;
            break;
        case "^1/x":
            result = Math.pow(operand1, 1/operand2);
            break;
        case "^x":
            result = Math.pow(operand1, operand2);
            break;
        case "%":
            result = operand1 % operand2;
            break;
    }
    operand1 = result;
    operator = null;
    operand2 = null;
    setResultText(result);
}

function deleteButton(e) {
    if (operator) {
        removeDigit2();
    }
    else {
        removeDigit1();
    }
}

function clear() {
    operand1 = null;
    operator = null;
    operand2 = null;
    setResultText("");
    updateWorkingText();
}

function setResultText(txt) {
    const result = document.querySelector(".result");
    result.textContent = txt;
}

function appendDigit1(num) {
    if (!operand1) {
        operand1 = num;
    }
    else {
        operand1 += num;
    }
    updateWorkingText();
}

function appendDigit2(num) {
    if (!operand2) {
        operand2 = num;
    }
    else {
        operand2 += num;
    }
    updateWorkingText();
}

function removeDigit1() {
    if (operand1) {
        operand1 = operand1.substring(0, operand1.length - 1);
    }
    updateWorkingText();
}

function removeDigit2() {
    if (operand2) {
        operand2 = operand2.substring(0, operand2.length - 1);
    }
    updateWorkingText();
}

function updateWorkingText() {
    const working = document.querySelector(".working");
    working.textContent = `${operand1 ?? ""} ${operator ?? ""} ${operand2 ?? ""}`;
}