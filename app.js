// ---------------GLOBAL VARIABLES---------------

let billValue = null;
let tipFactor = null;
let qtyPpl = null;

// ---------------DOM ELEMENTS---------------

const billInput = document.querySelector('#bill');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipInput = document.querySelector('#custom');
const pplInput = document.querySelector('#ppl');

// ---------------EVENT LISTENERS---------------

billInput.addEventListener('input', (e) => {
    billValue = e.target.value;
    console.log(billValue);
})

tipButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        tipFactor = parseInt(e.target.textContent) / 100;
        console.log(tipFactor);
    })
})

tipInput.addEventListener('input', (e) => {
    tipFactor = parseInt(e.target.value) / 100;
    console.log(tipFactor);
})

pplInput.addEventListener('input', (e) => {
    qtyPpl = parseInt(e.target.value);
    console.log(qtyPpl);
})