const userInterface = document.querySelector('.grid-container');
const buttons = userInterface.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', displayInput));
buttons.forEach(button => button.addEventListener('click', operate));
const equals = userInterface.querySelector('#equals');
const multi = userInterface.querySelector('#multi');
const divis = userInterface.querySelector('#divis');
const add = userInterface.querySelector('#add');
const sub = userInterface.querySelector('#sub');
const comma = userInterface.querySelector('#comma');

const display = userInterface.querySelector('.display');



let operant1 = '';
let operant2 = '';
let operantNext = '';
let firstNumberCaptured = false;
let firstNumberCapturedForReal = false;
let secondNumberCaptured = false;
let secondNumberCapturedForReal = false;
let operator1 = '';
let operator2 = '';
let operatorNext = '';
let operatorLast = '';
let tempResult = 0;
let firstCalcEvaluated = false;
let round = 0;
let i_o = false;
let lastInputMadeEmpty = false;

let commaSet = false;


equals.setAttribute('disabled', '');
multi.setAttribute('disabled', '');
divis.setAttribute('disabled', '');
add.setAttribute('disabled', '');
sub.setAttribute('disabled', '');
comma.setAttribute('disabled', '');

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function displayInput(){
    if (i_o){
        display.textContent = '';
    }
    i_o = false;
    // if (this.textContent === 'backspace'){
    //     display.textContent = display.textContent.substring(0, display.textContent.length-1);
    // }

    // else {
    // display.textContent += this.textContent;
    // }
    
}

function operate(){
   
    lastInputMadeEmpty = false;

    if(this.textContent === 'clear'){
        display.textContent = '';
        operant1 = '';
        operant2 = '';
        operantNext = '';
        firstNumberCaptured = false;
        
        secondNumberCaptured = false;
        operator1 = '';
        operator2 = '';
        operatorNext = '';

        tempResult = 0;
        firstCalcEvaluated = false;
        round = 0;
        commaSet = false;
        comma.setAttribute('disabled', '');
        multi.setAttribute('disabled', '');
        divis.setAttribute('disabled', '');
        add.setAttribute('disabled', '');
        sub.setAttribute('disabled', '');
        return;
    }
    if(!firstNumberCaptured){
        
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x'){
            if (this.textContent === '.'){
                commaSet = true;
            }
            if(this.textContent !== 'backspace'){
                operant1 += this.textContent;
                display.textContent = operant1; 
            }
                
            multi.removeAttribute('disabled');  
            divis.removeAttribute('disabled'); 
            add.removeAttribute('disabled'); 
            sub.removeAttribute('disabled');
            if(!commaSet && !lastInputMadeEmpty){
                comma.removeAttribute('disabled');
                
            } 
            else if (commaSet){
                comma.setAttribute('disabled', '');
            }
            if (this.textContent === 'backspace'){
                if (operant1.slice(-1) === '.'){
                    commaSet = false;
                    comma.removeAttribute('disabled');
                }
                operant1 = operant1.substring(0, operant1.length-1);
              
                if (operant1 === ''){
                   
                    equals.setAttribute('disabled', '');
                    multi.setAttribute('disabled', '');
                    divis.setAttribute('disabled', '');
                    add.setAttribute('disabled', '');
                    sub.setAttribute('disabled', '');
                    
                    comma.setAttribute('disabled', '');
                    lastInputMadeEmpty = true;
                    
                }

                
                display.textContent = operant1;
            }

        }
        else {
            multi.setAttribute('disabled', '');
            divis.setAttribute('disabled', '');
            add.setAttribute('disabled', '');
            sub.setAttribute('disabled', '');
            comma.setAttribute('disabled', '');
            commaSet = false;
            operator1 = this.textContent;   
            firstNumberCaptured = true;
            display.textContent += operator1;
            
            return;
        }
    }

    if(this.textContent === 'backspace' && !firstNumberCapturedForReal && firstNumberCaptured){
        firstNumberCaptured = false;
        display.textContent = operant1;
        if (operant1.indexOf('.') !== -1){
            commaSet = true;
        }
        else{
            comma.removeAttribute('disabled');
        }
    }


    
    if(firstNumberCaptured && !secondNumberCaptured){
        firstNumberCapturedForReal = true;
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x' && this.textContent !== '='){
            
            if (this.textContent === '.'){
                commaSet = true;
            }
            
            if(this.textContent !== 'backspace'){
                operant2 += this.textContent;
                display.textContent = operant1 + operator1 + operant2;
            }
           
            equals.removeAttribute('disabled');
            multi.removeAttribute('disabled');
            divis.removeAttribute('disabled');
            add.removeAttribute('disabled');
            sub.removeAttribute('disabled');
            if(!commaSet){
                comma.removeAttribute('disabled');
                
            } 
            else if (commaSet){
                comma.setAttribute('disabled', '');
 
            }
            if (this.textContent === 'backspace'){
                if (operant2.slice(-1) === '.'){
                    commaSet = false;
                    comma.removeAttribute('disabled');
                }
                
                operant2 = operant2.substring(0, operant2.length-1);
                if (operant2 === ''){
                    equals.setAttribute('disabled', '');
                    multi.setAttribute('disabled', '');
                    divis.setAttribute('disabled', '');
                    add.setAttribute('disabled', '');
                    sub.setAttribute('disabled', '');
                    comma.setAttribute('disabled', '');
                }
                display.textContent = operant1 + operator1 + operant2;
            }
        }
        
        else {
            operator2 = this.textContent;
            secondNumberCaptured = true;
            equals.setAttribute('disabled', '');
            multi.setAttribute('disabled', '');
            divis.setAttribute('disabled', '');
            add.setAttribute('disabled', '');
            sub.setAttribute('disabled', '');
            comma.setAttribute('disabled', '');
            commaSet = false;
            display.textContent += operator2;
        }
    }

 

   

    if (firstNumberCaptured && secondNumberCaptured && !firstCalcEvaluated){
        secondNumberCapturedForReal = true;
    
        if (operator1 === '/'){
            tempResult = +operant1 / (+operant2);

        }
        else if (operator1 === 'x'){
            tempResult = +operant1 * (+operant2);
        }
        else if (operator1 === '-'){
            tempResult = +operant1 - (+operant2);
        }
        else if (operator1 === '+'){
            tempResult = +operant1 + (+operant2);
        }
        tempResult = precisionRound(tempResult, 10);
        if (operator2 === '='){
            display.textContent = tempResult;
            operant1 = '';
            operant2 = '';
            operantNext = '';
            firstNumberCaptured = false;
            secondNumberCaptured = false;
            operator1 = '';
            operator2 = '';
            operatorNext = '';
            tempResult = 0;
            firstCalcEvaluated = false;
            round = 0;
            i_o = true;
            commaSet = false;
            comma.setAttribute('disabled', '');
            equals.setAttribute('disabled', '');
            multi.setAttribute('disabled', '');
            divis.setAttribute('disabled', '');
            add.setAttribute('disabled', '');
            sub.setAttribute('disabled', '');
            return;
        }
        


        
        
        display.textContent = `${tempResult}${operator2}`;
        firstCalcEvaluated = true;
        
        operatorNext = operator2;
        return;
    }

    if (firstNumberCaptured && secondNumberCaptured && firstCalcEvaluated ){
        operatorLast = operatorNext;
        equals.removeAttribute('disabled');
        multi.removeAttribute('disabled');
        divis.removeAttribute('disabled');
        add.removeAttribute('disabled');
        sub.removeAttribute('disabled');
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x' && this.textContent !== '='){
            
            if (this.textContent === '.'){
                commaSet = true;
            }
            if(this.textContent !== 'backspace'){
                operantNext += this.textContent;
                
            }
            equals.removeAttribute('disabled');
            multi.removeAttribute('disabled');
            divis.removeAttribute('disabled');
            add.removeAttribute('disabled');
            sub.removeAttribute('disabled');
            if(!commaSet){
                comma.removeAttribute('disabled');
                
            } 
            else if (commaSet){
                comma.setAttribute('disabled', '');
                
            }
            if (this.textContent === 'backspace'){
                if (operantNext.slice(-1) === '.'){
                    commaSet = false;
                    comma.removeAttribute('disabled');
                }
                
                operantNext = operantNext.substring(0, operantNext.length-1);
                if (operantNext === ''){
                    equals.setAttribute('disabled', '');
                    multi.setAttribute('disabled', '');
                    divis.setAttribute('disabled', '');
                    add.setAttribute('disabled', '');
                    sub.setAttribute('disabled', '');
                    comma.setAttribute('disabled', '');
                }
                
                
                display.textContent = tempResult + operatorLast + operantNext;
            }
            
            display.textContent = tempResult + operatorNext + operantNext;
        }
        else {
            operatorNext = this.textContent;
            equals.setAttribute('disabled', ''); 
            multi.setAttribute('disabled', '');
            divis.setAttribute('disabled', '');
            add.setAttribute('disabled', '');
            sub.setAttribute('disabled', '');
            comma.setAttribute('disabled', '');
            if (round < 1){
                
                if (operator2 === '/'){
                    tempResult = tempResult / (+operantNext);
        
                }
                else if (operator2 === 'x'){
                    tempResult = tempResult * (+operantNext);
                }
                else if (operator2 === '-'){
                    tempResult = tempResult - (+operantNext);
                }
                else if (operator2 === '+'){
                    tempResult = tempResult + (+operantNext);
                }
                tempResult = precisionRound(tempResult, 10);
                if (this.textContent === '='){
                    display.textContent = tempResult;
                    operant1 = '';
                    operant2 = '';
                    operantNext = '';
                    firstNumberCaptured = false;
                    secondNumberCaptured = false;
                    operator1 = '';
                    operator2 = '';
                    operatorNext = '';
                    tempResult = 0;
                    firstCalcEvaluated = false;
                    round = 0;
                    i_o = true;
                    equals.setAttribute('disabled', '');
                    multi.setAttribute('disabled', '');
                    divis.setAttribute('disabled', '');
                    add.setAttribute('disabled', '');
                    sub.setAttribute('disabled', '');
                    comma.setAttribute('disabled', '');
                    return;
                }
                
                
                
                operantNext = '';
            }
            else {
                
                
                if (operatorLast === '/'){
                    tempResult = tempResult / (+operantNext);
        
                }
                else if (operatorLast === 'x'){
                    tempResult = tempResult * (+operantNext);
                }
                else if (operatorLast === '-'){
                    tempResult = tempResult - (+operantNext);
                }
                else if (operatorLast === '+'){
                    tempResult = tempResult + (+operantNext);
                }
                tempResult = precisionRound(tempResult, 10);
                if (this.textContent === '='){
                    display.textContent = tempResult;
                    operant1 = '';
                    operant2 = '';
                    operantNext = '';
                    firstNumberCaptured = false;
                    secondNumberCaptured = false;
                    operator1 = '';
                    operator2 = '';
                    operatorNext = '';
                    tempResult = 0;
                    firstCalcEvaluated = false;
                    round = 0;
                    i_o = true;
                    commaSet = false;
                    equals.setAttribute('disabled', '');
                    multi.setAttribute('disabled', '');
                    divis.setAttribute('disabled', '');
                    add.setAttribute('disabled', '');
                    sub.setAttribute('disabled', '');
                    comma.setAttribute('disabled', '');
                    return;
                }
                operantNext = '';
            }
            
            
            
            display.textContent = `${tempResult} ${operatorNext}`;
            
            round++;
            commaSet = false;
        }
    }   

}



function buttonHover() {
    this.style.border = '3px solid rgba(209, 162, 162, 0.9)';
    this.style.padding = '19px';
}

function buttonStandard(){
    this.style.border = '2px solid rgba(209, 162, 162, 0.8)';
    this.style.padding = '20px'
}


buttons.forEach(button => button.addEventListener('mouseover', buttonHover));
buttons.forEach(button => button.addEventListener('mouseout', buttonStandard));

