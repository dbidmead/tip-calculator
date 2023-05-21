// ---------------GLOBAL VARIABLES---------------

let billValue = null;
let tipFactor = null;
let qtyPpl = null;

let tipFactorEntered = false;

// ---------------DOM ELEMENTS---------------

const billInput = document.querySelector('#bill');
billInput.validationType = 'float';
billInput.entered = false ;
const tipButtons = document.querySelectorAll('.tip-btn');
const tipInput = document.querySelector('#custom');
tipInput.validationType = 'float';
// tipInput.entered = false;
const pplInput = document.querySelector('#ppl');
pplInput.validationType = 'int';
pplInput.entered = false;

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
        isInputValid(billInput) &&
        isInputValid(pplInput) &&
        tipFactorEntered
    ) {
        tipDisplay.textContent = !isNaN(calculateTotalTip()) ? '$' + calculateTotalTip() : '$0';
        totalDisplay.textContent = !isNaN(calculateTotalBill()) ? '$' + calculateTotalBill() : '$0';
        resetBtn.classList.remove('disabled');
    }
}


const isInputValid = (input) => {
    resetBtn.classList.add('disabled');
    input.errorType = 'none';
    input.entered = true;
    if(input.value.length == 0) {
        input.entered = false;
        input.errorType = 'empty';
        return false;
    };
    if(input.validationType == 'float') {
        if(!floatRegEx.test(input.value)) {
            input.entered = false;
            input.errorType = 'format';
            return false;
        }
    };
    if(input.validationType == 'int') {
        if(!intRegEx.test(input.value)) {
            input.entered = false;
            input.errorType = 'format';
            return false;
        }
    };
    return true;
}

// ---------------EVENT LISTENERS---------------

billInput.addEventListener('input', (e) => {
    billValue = e.target.value;
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
})
