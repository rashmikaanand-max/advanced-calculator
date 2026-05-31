function appendToResult(value) { 
  // find the calculator screen
  const resultField = document.getElementById("result"); 

  // get the last character currently shown on the screen
  const lastChar = resultField.value.slice(-1); 
// stop if user tries to enter two operators in a row (like ++ or */)
  if ("+-*/%".includes(value) && "+-*/%".includes(lastChar)) {
    return; // do nothing
  }
  
// stop if user tries to enter two dots in a row (..)
  if (value === '.' && lastChar === '.') {
    return; // do nothing
  }
  // remove starting zero if a number is pressed
  // allow 0. to happen for decimals
  if (resultField.value === "0" && value !== ".") {
    resultField.value = value; // Replace 0 with the new number
  } 
  else {
    // otherwise simply add the new value to the screen
    resultField.value += value;
  }
}
function clearResult()
{
  document.getElementById("result").value = '0';
}

function deleteLastDigit() 
{
  // get the calculator screen 
  const resultField = document.getElementById("result");

  // remove the last digit/symbol from the screen
  resultField.value = resultField.value.slice(0, -1);

  // if screen becomes empty after deleting, show 0 again
  if (resultField.value === "") 
  {
    resultField.value = "0";
  }
}
function calculateResult() 
{
  // get the calculator screen 
  const resultField = document.getElementById("result");

  try 
  {
    // replace 'x' with '*' and '÷' with '/' so javascript can calculate it
    let expression = resultField.value.replace(/x/g, '*').replace(/÷/g, '/');

    // solve the expression and show the answer on the screen
    resultField.value = eval(expression);
  } 
  catch(error) 
  {
    // if something goes wrong, show "error" instead of breaking the calculator
    resultField.value = 'Error';
  }
}
// listen for any key pressed on the keyboard
document.addEventListener("keydown", function(event) {

  // store the key that was pressed
  const key = event.key;
  // if the key pressed is a number, show it on the screen
  if (!isNaN(key)) 
  {
    appendToResult(key);
  }

  // if the key pressed is an operator or a dot, add it on the screen
  else if ("+-*/%.".includes(key)) 
  {
    appendToResult(key);
  }

  // if the enter key is pressed calculate the result
  else if (key === "Enter") 
  {
    event.preventDefault(); // stops the page from refreshing when enter is pressed
    calculateResult();
  }

  // if backspace key is pressed delete the last digit
  else if (key === "Backspace") 
  {
    deleteLastDigit();
  }

  // if esc key is pressed clear the screen
  else if (key === "Escape") 
  {
    clearResult();
  }

});
