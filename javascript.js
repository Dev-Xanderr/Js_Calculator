let display = document.getElementsByClassName("display")[0],
numberKeys = document.getElementsByClassName("num"),
addKey = document.getElementsByClassName("add")[0],
subtractKey = document.getElementsByClassName("subtract")[0],
divideKey = document.getElementsByClassName("divide")[0],
multiplyKey = document.getElementsByClassName("multiply")[0],
clearKey = document.getElementsByClassName("clear")[0],
evalKey = document.getElementsByClassName("equals")[0],
openParenKey = document.getElementsByClassName("open")[0],
closeParenKey = document.getElementsByClassName("close")[0];


let curNumber = 0,
prevNumber = 0,
afterOperation = false,
curOperation = undefined,
expression = "";

//add listener 

for (let i= 0; i < numberKeys.length; i++){
    numberKeys[i].onclick = () => {
        changeDisplayVal(numberKeys[i].innerHTML);
    };
}

clearKey.onclick = () =>{
    clearAll();
};

openParenKey.onclick = () => {
    expression += "(";
    display.innerHTML = expression;
    afterOperation = true;
};

closeParenKey.onclick = () => {
    expression += ")";
    display.innerHTML = expression;
};

addKey.onclick = () => {
    addToExpression("add", "+");
};

subtractKey.onclick = () => {
    addToExpression("subtract", "-");
};

divideKey.onclick = () => {
    addToExpression("divide", "/");
};

multiplyKey.onclick = () => {
    addToExpression("multiply", "*");
};

evalKey.onclick = () => {
    try {
        const result = Function('"use strict"; return (' + expression + ')')();
        display.innerHTML = result;
        expression = result.toString();
        curNumber = result;
    } catch (e) {
        display.innerHTML = "Error";
        expression = "";
    }
};

function addToExpression(operation, symbol) {
    if (expression === "" || expression.endsWith("(")) {
        return;
    }
    expression += symbol;
    display.innerHTML = expression;
    afterOperation = true;
}

function doOperation(operation){
    if (!curOperation) {
        prevNumber = curNumber;
        curOperation = operation;
        afterOperation = true;
    } else if (!afterOperation){
        evaluate(curOperation);
        prevNumber = curNumber;
        curOperation = operation;
        afterOperation = true;
    } else {
        curOperation = operation;
    }
};

function clearAll(){
    curNumber = 0;
    prevNumber = 0;
    curOperation = undefined;
    afterOperation = false;
    expression = "";
    display.innerHTML = "0";
}

function changeDisplayVal(numString){
    if(display.innerHTML === "0" || afterOperation){
        display.innerHTML = "";
        afterOperation = false;
    }

    if( numString === "." && display.innerHTML.indexOf(".") > -1){
        numString = "";
    }

    if (display.innerHTML.length >= 16){
        numString = "";
    } else {
        display.innerHTML += numString;
        expression += numString;
    }
    if (numString !== "") {
        curNumber = Number(display.innerHTML.replace(/[^0-9.]/g, ""));
    }
}

function evaluate(operation){
    if (!afterOperation){
        switch(operation) {
            case "add":
                curNumber = prevNumber + curNumber;
                break;
            case "subtract":
                curNumber = prevNumber - curNumber;
                break;
            case "multiply":
                curNumber = prevNumber * curNumber;
                break;
            case "divide":
                curNumber = prevNumber / curNumber;
                break;
        }
        if (curNumber.toString().length  >= 16){
            curNumber = Number(curNumber.toFixed(16));
        }
        display.innerHTML = curNumber;
    }
    afterOperation = true;
    curOperation = undefined;  
};