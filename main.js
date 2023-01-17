const previousNumber = document.querySelector('.previousNumber p');
const currentNumber = document.querySelector('.currentNumber ');
const mathSign = document.querySelector('.mathSign');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculationsHistory = document.querySelector('.history');
const historyClearButton = document.querySelector('.historyClear');

let results = '';

function displayNumbers () {
    if(this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
    if(this.textContent === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '.0';

    currentNumber.innerHTML += this.textContent;
}

function operate() {
    if(currentNumber.innerHTML === '' && this.textContent === '-'){
        currentNumber.innerHTML = '-';
        return;
    }else if (currentNumber.innerHTML === ''){
        return;
    };

    if(mathSign.innerHTML !== ''){
        showResult();
    }
    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = '';
}

function showResult() {
    if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;

    switch(operator){
        case '+':
            results = a+b;
            break;
        case '-':
            results = b-a;
            break;
        case ':':
            results = b/a;
            break;
        case 'x':
            results = a*b;
            break;
        case '^':
            results = b**a;
            break;
    };

    addToHistory();
    historyClearButton.classList.add('active')
    currentNumber.innerHTML = results;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';

}

function addToHistory(){
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${results}`
    newHistoryItem.classList.add('historyItem');
    calculationsHistory.appendChild(newHistoryItem);
}

function clearScreen() {
    results = 0;
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function clearHistory() {
    calculationsHistory.textContent = '';
    if(calculationsHistory.textContent === ''){
        historyClearButton.classList.remove('active');
    };
}


operatorsButtons.forEach((button) =>button.addEventListener('click',operate));
equalsButton.addEventListener('click', showResult);
clearButton.addEventListener('click', clearScreen);
numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
})
historyClearButton.addEventListener('click', clearHistory);