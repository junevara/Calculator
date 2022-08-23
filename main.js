const userInterface = document.querySelector('.grid-container');
const buttons = userInterface.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', displayInput));
const display = userInterface.querySelector('.display');

function displayInput(){
    display.textContent = this.textContent;
}