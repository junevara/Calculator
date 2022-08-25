const userInterface = document.querySelector('.grid-container');
const buttons = userInterface.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', displayInput));
buttons.forEach(button => button.addEventListener('click', operate));



const display = userInterface.querySelector('.display');

let operant1 = '';
let operant2 = '';
let operantNext = '';
let firstNumberCaptured = false;
let secondNumberCaptured = false;
let operator1 = '';
let operator2 = '';
let operatorNext = '';
let tempResult = 0;
let firstCalcEvaluated = false;
let round = 0;
let i_o = false;


function displayInput(){
    if (i_o){
        display.textContent = '';
    }
    i_o = false;
    if (this.textContent === 'backspace'){
        display.textContent = display.textContent.substring(0, display.textContent.length-1);
    }

    else {
    display.textContent += this.textContent;
    }
    
}

function operate(){
    
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
        return;
    }
    if(!firstNumberCaptured){
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x'){
            operant1 += this.textContent;  
        }
        else {
            operator1 = this.textContent;
            firstNumberCaptured = true;
            return;
        }
    }
    
    if(firstNumberCaptured && !secondNumberCaptured){
        
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x' && this.textContent !== '='){
            operant2 += this.textContent;  
        }
        
        else {
            operator2 = this.textContent;
            secondNumberCaptured = true;
            
        }
    }

    if (firstNumberCaptured && secondNumberCaptured && !firstCalcEvaluated){
        
    
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
            return;
        }
        


        
        
        display.textContent = `${tempResult}${operator2}`;
        firstCalcEvaluated = true;
        console.log('firstCalcDone');
        return;
    }

    if (firstNumberCaptured && secondNumberCaptured && firstCalcEvaluated ){
        
        if (this.textContent !== '+' && this.textContent !== '-' && this.textContent !== '/' && this.textContent !== 'x' && this.textContent !== '='){
            operantNext += this.textContent;
            console.log(operantNext);
        }
        else {
            
            if (round < 1){
                console.log('firstBlock');
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
                    return;
                }
                
                console.log(tempResult);
                operantNext = '';
            }
            else {
                console.log('secondBlock')
                if (operatorNext === '/'){
                    tempResult = tempResult / (+operantNext);
        
                }
                else if (operatorNext === 'x'){
                    tempResult = tempResult * (+operantNext);
                }
                else if (operatorNext === '-'){
                    tempResult = tempResult - (+operantNext);
                }
                else if (operatorNext === '+'){
                    tempResult = tempResult + (+operantNext);
                }
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
                    return;
                }
                operantNext = '';
            }
            operatorNext = this.textContent;
            
            
            display.textContent = `${tempResult} ${operatorNext}`;
            round++;
        }
    }   

}

