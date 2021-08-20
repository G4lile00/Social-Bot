function rangeSlide(event) {
  const value = event.target.value
  document.getElementById('rangeValue').innerHTML = value;
}

function likeRate(){
  const value = document.getElementById('rangeValue').innerHTML;
  document.getElementById('likerate').innerText = value + "%";
}

/**
 * Validates the user interface input
 */
function validateInput () {
  resetErrors();  // Reset errors before checking for another round
  const errMsg = [];
  
  // Check for login credentials
  const userNameField = document.getElementById('login');
  const userName = userNameField.value
  if (!userName || userName.length === 0) errMsg.push('Username is required !')

  const pwdField = document.getElementById('pass');
  const pwd = pwdField.value;
  if (!pwd || pwd.length === 0) errMsg.push('Password is required !')

  const rangeInput = document.querySelector('input[type=range]');
  const rangeValue = parseInt(rangeInput.value)
  if (!rangeValue || rangeValue === 0) errMsg.push('Please select a range for bot !')

  if (errMsg.length > 0) {
    showErrors(errMsg);
    return false;
  }

  return true;
}

function showErrors (errMsg = []) {
  const errStr = [];
  if (errMsg && errMsg.length > 0) errMsg.forEach(msg => errStr.push(`<p>${msg}</p>`))

  if (errStr.length > 0) {
    const errorBlock = document.querySelector('#snackbar');
    errorBlock.innerHTML = errStr.join('\r\n');
    errorBlock.classList.add('show');

    setTimeout(resetErrors, 4000);
  }
}

function resetErrors () {
  const errBlock = document.querySelector('#snackbar');
  errBlock.innerHTML = '';
  if (errBlock.classList.contains('show')) errBlock.classList.remove('show');
  
}


/**
 * Initiate bot after validating input
 */
function runBot () {
  if (validateInput()) {
    likeRate()
    bot();
    return;
  }
  return false;
}

window.onload = () => {
  /************************ Assigning events ***************************/
  ['change', 'mousemove'].forEach(event => document.querySelector('input[type=range]').addEventListener(event, rangeSlide)); // Set the range value
  document.querySelector('#Botrun').addEventListener('click', runBot) // Trigger for bot to start working 
}