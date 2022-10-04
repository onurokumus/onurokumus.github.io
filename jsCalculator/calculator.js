const buttons = document.querySelectorAll(".btn");
const equation = document.querySelector(".equation");
const answer = document.querySelector(".answer");

const significantNumber = 4;
const operators = ['+', '-', '*', '/']

let finalValue = 0;
let lastValue = 0;
let calculatedEquation = '';

for (var i = 0 ; i < buttons.length; i++) {
    buttons[i].addEventListener('click' , function () {
        buttonClick(this.innerText);
      }); 
}

function buttonClick(value) {
    // Symbol or Number switch
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }

    // Answer appear & disappear
    if (equation.innerText === '0'){
        answerDisappear();
    } else{
        answerAppear();
    }

    try{
        answer.innerText = "= " + roundNumber(calculateAnswer(calculatedEquation));
    } catch(err){}
}

function calculateAnswer(equationText){
    // Calculating answer of equation with Function
    return Function(`"use strict";return (${equationText})`)();
}

function handleNumber(value){
    // If equation is zero change it, else add it.
    if (equation.innerText === '0') {
        equation.innerText = value;
        calculatedEquation = value;
    }
    else{
        equation.innerText += value;
        calculatedEquation += value;
    }
}

function handleSymbol(value){

    if (value === 'C'){
        // Clear
        answerDisappear();
        
        equation.innerText = '0';
        answer.innerText   = '0';
        calculatedEquation = '';
    }
    else if (value === '←'){
        // Remove 1
        if (equation.innerText.length != 1){
            equation.innerText = equation.innerText.slice(0,-1);
            calculatedEquation = calculatedEquation.slice(0,-1);
        } else{
            equation.innerText = '0';
            calculatedEquation = '';
        }
    }
    else if(value === '='){
        // Equals
        equation.innerText = '' + roundNumber(calculateAnswer(calculatedEquation));
        calculatedEquation = '' + roundNumber(calculateAnswer(calculatedEquation));
    }
    else if(value === '.' && calculatedEquation.slice(-1) != '.'){
        // Float
        equation.innerText += value;
        calculatedEquation += value;
    }
    else if( operators.includes(calculatedEquation.slice(-1)) ){
        // Change operator
        if(value === '+'){
            calculatedEquation = calculatedEquation.slice(0,-1) + '+';
            equation.innerText = equation.innerText.slice(0,-1) + '+';
        }
        else if(value === '-'){
            calculatedEquation = calculatedEquation.slice(0,-1) + '-';
            equation.innerText = equation.innerText.slice(0,-1) + '-';
        }
        else if(value === '÷'){
            calculatedEquation = calculatedEquation.slice(0,-1) + '/';
            equation.innerText = equation.innerText.slice(0,-1) + '÷';
        }
        else if(value === 'x'){
            calculatedEquation = calculatedEquation.slice(0,-1) + '*'; 
            equation.innerText = equation.innerText.slice(0,-1) + 'x';
        }
    }
    else if( !operators.includes(calculatedEquation.slice(-1)) ) {
        // Add operator
        if(value === '+'){
            calculatedEquation += '+';
            equation.innerText += '+';
        }
        else if(value === '-'){
            calculatedEquation += '-';
            equation.innerText += '-';
        }
        else if(value === '÷'){
            calculatedEquation += '/';
            equation.innerText += '÷';
        }
        else if(value === 'x'){
            calculatedEquation += '*'; 
            equation.innerText += 'x';
        }
    }
}

function answerAppear(){
    // Answer appear animation
    equation.classList.add('w-answer');

    answer.style.visibility = 'visible';
    answer.classList.add('appear-animation');
}


function answerDisappear(){
    // Answer disappears
    equation.classList.remove('w-answer');

    answer.style.visibility = 'hidden';
    answer.classList.remove('appear-animation');
}

function roundNumber(num){
    // Rounds number to specified significant number
    return Math.round((num + Number.EPSILON) * Math.pow(10, significantNumber)) / Math.pow(10, significantNumber);
}