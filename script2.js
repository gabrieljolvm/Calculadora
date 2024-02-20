class Calculator {
    constructor() {
        this.operator = document.querySelector("#op-type");
    }

    display(numbers) {
        return numbers.textContent
    }

    simpleOperations(previus, current) {
        switch (this.operator.textContent) {
            case "+":
                return parseFloat(previus) + parseFloat(current);
            case "-":
                return parseFloat(previus) - parseFloat(current)
            case "×":
                return parseFloat(previus) * parseFloat(current)
            case "÷":
                return parseFloat(previus) / parseFloat(current)
        }
    }

    operations(operator) {
        switch (operator) {
            case "%":
                this.porcentage = true;
                return currentOperation.textContent = (currentOperation.textContent * operationNumber.textContent) / 100,
                    finalResult.textContent = currentOperation.textContent
            case "√x":
            case "@":
                return currentOperation.textContent = Math.sqrt(currentOperation.textContent)
            case "x²":
            case "²":
                return currentOperation.textContent *= currentOperation.textContent
            case "1/x":
            case "R":
                return currentOperation.textContent = (1 / currentOperation.textContent)
            case "+/-":
            case "F9":
                return currentOperation.textContent = -currentOperation.textContent
        }
    }

    clearAll() {
        currentOperation.textContent = ""
        operationNumber.textContent = ""
        typeOperation.textContent = ""
        finalResult.textContent = ""
    }

    clear() {
        currentOperation.textContent = ""
    }

    erase() {
        currentOperation.textContent = currentOperation.textContent.slice(0, -1);
    }

    result() {
        if (finalResult.textContent == "") {
            finalResult.textContent = currentOperation.textContent;
            currentOperation.textContent = this.simpleOperations(operationNumber.textContent, finalResult.textContent);
        }
        else if (this.porcentage) {
            currentOperation.textContent = this.simpleOperations(operationNumber.textContent, finalResult.textContent);
            this.porcentage = false;
        }
        else {
            operationNumber.textContent = currentOperation.textContent;
            currentOperation.textContent = this.simpleOperations(operationNumber.textContent, finalResult.textContent);
        }
    }
}


let Calculators = new Calculator

const numberButtons = document.querySelectorAll(".number");
const typeOperation = document.querySelector("#op-type");
const currentOperation = document.querySelector("#current-operation");
const simpleOperationsButtons = document.querySelectorAll(".simple-operation");
const operations = document.querySelectorAll(".operation");
const operationNumber = document.querySelector("#op-number");
const clear = document.querySelectorAll(".operation-del");
const finalResult = document.querySelector("#result");
const equal = document.querySelector("#equal");
let unrepeatOperation = true;
let uncontinueNumber = true;


function engine(button){
    operationNumber.textContent = currentOperation.textContent,
    typeOperation.textContent = button.textContent
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperation.textContent.includes(".") && button.textContent === ".") return
        if (uncontinueNumber) {
            currentOperation.textContent += Calculators.display(button)
        }
        else {
            currentOperation.textContent = ""
            currentOperation.textContent = Calculators.display(button);
            uncontinueNumber = true
        }
        unrepeatOperation = true;
    })
})

simpleOperationsButtons.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        if (operationNumber.textContent == "") {
            engine(operationButton);
            currentOperation.textContent = "";
        }
        else if (operationNumber.textContent != "" && currentOperation.textContent == "") {
            typeOperation.textContent = operationButton.textContent;
        }
        else if (finalResult.textContent != "") {
            engine(operationButton);
        }
        else {
            if (unrepeatOperation) {
                currentOperation.textContent = Calculators.simpleOperations(operationNumber.textContent, currentOperation.textContent);
                engine(operationButton);
                unrepeatOperation = false;
                uncontinueNumber = false
            }
            else {
                typeOperation.textContent = operationButton.textContent;
            }
        }
        finalResult.textContent = "";
    })
})

operations.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        Calculators.operations(operationButton.textContent);
    })
})


clear.forEach(clearButton => {
    clearButton.addEventListener("click", () => {
        switch (clearButton.textContent) {
            case "C":
                Calculators.clearAll()
                break;
            case "CE":
                Calculators.clear();
                break;
            case "Backspace":
                Calculators.erase();
                break;
        }
    })
})

equal.addEventListener("click", () => {
    Calculators.result();
    unrepeatOperation = false;
    uncontinueNumber = false
})

//------------------------------------------------------------------------------------------------------------------------------||
// comandos por teclado.

numberButtons.forEach(buttons => {
    document.addEventListener("keypress", (e) => {
        if (e.key === ",") {
            if (currentOperation.textContent.includes(".") && button.textContent === ",") return
            currentOperation.textContent += "."
        }

        if (e.key == buttons.textContent) {
            if (uncontinueNumber) {
                currentOperation.textContent += e.key;
            }
            else {
                currentOperation.textContent = ""
                currentOperation.textContent = e.key;
                uncontinueNumber = true
            }
            unrepeatOperation = true;
        }
    })
})

simpleOperationsButtons.forEach(operationButton => {
    document.addEventListener("keypress", (e) => {
        if (e.key == operationButton.textContent || e.key == operationButton.id) {
            if (operationNumber.textContent == "") {
                engine(operationButton);
                currentOperation.textContent = "";
            }
            else if (operationNumber.textContent != "" && currentOperation.textContent == "") {
                typeOperation.textContent = operationButton.textContent
            }
            else if (finalResult.textContent != "") {
                engine(operationButton);
            }
            else {
                if (unrepeatOperation) {
                    currentOperation.textContent = Calculators.simpleOperations(operationNumber.textContent, currentOperation.textContent);
                    engine(operationButton);
                    unrepeatOperation = false;
                    uncontinueNumber = false
                }
                else {
                    typeOperation.textContent = operationButton.textContent;
                }
            }
            finalResult.textContent = "";
        }
    })
})

operations.forEach(operationButton => {
    document.addEventListener("keydown", (e) => {
        if (e.key == operationButton.textContent || e.key == operationButton.id)
            Calculators.operations(operationButton.textContent);
    })
})

clear.forEach(clearButton => {
    document.addEventListener("keydown", (e) => {
        if (e.key == clearButton.id) {
            switch (e.key) {
                case "Escape":
                    Calculators.clearAll()
                    break;
                case "Delete":
                    Calculators.clear();
                    break;
                case "Backspace":
                    Calculators.erase();
                    break;
            }
        }
    })
})

document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        Calculators.result();
        unrepeatOperation = false;
        uncontinueNumber = false
    }
})