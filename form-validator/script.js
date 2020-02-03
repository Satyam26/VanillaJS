// get dom element to be manipulated
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmPassword');


function showError(input,message) {
  const formControl = input.parentElement;
  formControl.className ='formControl error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'formControl success'
}

//email validation
function checkEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    showError(email, 'Email not valid');
  }
  else {
    showSuccess(email);
  }
}

function checkPwd(input1,input2){
  console.log(input1.value,input2.value)
  if(input1.value !== input2.value){
    showError(input1, 'Password did not match');
    showError(input2, 'Password did not match');
  }
  else {
    showSuccess(input2);
  }
}

function checkInput(inputArray) {
  inputArray.forEach(input => {
    if(input.value.trim() === ''){
      showError(input, `${input.placeholder} is required`);
    } else {
      showSuccess(input)
    }
  });
}

function checkLength(input,min,max){
  if(input.value.length < max && input.value.length > min){
    showSuccess(input);
  } else {
    showError(input, `${input.placeholder} should be > ${min} and < ${max}`);
  }
}

//get form element submit
form.addEventListener('submit', event => {
  event.preventDefault();

  checkInput([username,email,password,confirmpassword]);
  checkLength(username,3,15);
  checkLength(password,6,15);
  checkEmail(email);
  checkPwd(password,confirmpassword);

})