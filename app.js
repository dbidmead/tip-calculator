// ---------------GLOBAL VARIABLES---------------

let billValue = null;
let tipFactor = null;
let qtyPpl = null;

let tipFactorEntered = false;

// ---------------DOM ELEMENTS---------------

const billInput = document.querySelector('#bill');
billInput.validationType = 'float';
billInput.entered = false;
billInput.errorDisplay = document.querySelector('#bill-error-display');

const tipInput = document.querySelector('#custom');
tipInput.validationType = 'float';
tipInput.errorDisplay = document.querySelector('#tip-error-display');

const tipButtons = document.querySelectorAll('.tip-btn');

const pplInput = document.querySelector('#ppl');
pplInput.validationType = 'int';
pplInput.entered = false;
pplInput.errorDisplay = document.querySelector('#ppl-error-display');

const tipDisplay = document.querySelector('#tip-display');
const totalDisplay = document.querySelector('#total-display')
const resetBtn = document.querySelector('.reset-btn');

// ---------------VALIDATION---------------

const floatRegEx = /^[0-9]+\.?[0-9]?[0-9]?$/; // forces regex to only accept numbers, one decimal, and teminate at most 2 decimals after the decimal
const intRegEx = /^[0-9]+$/;

// ---------------FUNCTIONS---------------

function calculateTotalTip() {
    return (billValue * tipFactor / qtyPpl).toFixed(2);
}

function calculateTotalBill() {
    return (billValue * (1 + tipFactor) / qtyPpl).toFixed(2);
}

function setDisplays() {
    if(
        tipFactorEntered &&
        billInput.entered &&
        pplInput.entered
    ) {
        tipDisplay.textContent = !isNaN(calculateTotalTip()) ? '$' + calculateTotalTip() : '$0';
        totalDisplay.textContent = !isNaN(calculateTotalBill()) ? '$' + calculateTotalBill() : '$0';
        resetBtn.classList.remove('disabled');
    }
}

const isInputValid = (input) => {
    resetBtn.classList.add('disabled');
    input.classList.remove('invalid-input');
    input.entered = true;
    if(input.value.length == 0) {
        input.entered = false;
        input.classList.add('invalid-input');
        input.errorDisplay.setAttribute('style', 'opacity: 1');
        input.errorDisplay.textContent = "Can't be empty";
        return false;
    };
    if(input.validationType == 'float') {
        if(!floatRegEx.test(input.value)) {
            input.entered = false;
            input.classList.add('invalid-input');
            input.errorDisplay.setAttribute('style', 'opacity: 1');
            input.errorDisplay.textContent = "Invalid Entry"
            return false;
        }
    };
    if(input.validationType == 'int') {
        if(!intRegEx.test(input.value)) {
            input.entered = false;
            input.classList.add('invalid-input');
            input.errorDisplay.setAttribute('style', 'opacity: 1');
            input.errorDisplay.textContent = "Invalid Entry"
            return false;
        }
        if(input.value == 0) {
            input.entered = false;
            input.classList.add('invalid-input');
            input.errorDisplay.setAttribute('style', 'opacity: 1');
            input.errorDisplay.textContent = "Can't be zero";
            return false;
        }
    };
    input.errorDisplay.setAttribute('style', 'opacity: 0');
    return true;
}

// ---------------EVENT LISTENERS---------------

billInput.addEventListener('input', (e) => {
    billValue = e.target.value;
    isInputValid(e.target);
    setDisplays();
})

tipButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        tipButtons.forEach(btn => btn.classList.remove('active'));
        tipFactor = parseInt(e.target.textContent) / 100;
        tipFactorEntered = true;
        setDisplays();
        e.target.classList.add('active');
        tipInput.value = '';
        tipInput.classList.remove('invalid-input');
        tipInput.errorDisplay.setAttribute('style', 'opacity: 0');
    })
})

tipInput.addEventListener('input', (e) => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipFactor = parseInt(e.target.value) / 100;
    tipFactorEntered = isInputValid(e.target);
    setDisplays();
})

pplInput.addEventListener('input', (e) => {
    qtyPpl = parseInt(e.target.value);
    isInputValid(e.target);
    setDisplays();
})

resetBtn.addEventListener('click', () => {
    billValue = null;
    tipFactor = null;
    qtyPpl = null;

    tipFactorEntered = false;

    billInput.value = '';
    tipInput.value = '';
    pplInput.value = '';
    tipButtons.forEach(button => button.classList.remove('active'));

    tipDisplay.textContent = '$--.--';
    totalDisplay.textContent = '$--.--';

    resetBtn.classList.add('disabled');
})