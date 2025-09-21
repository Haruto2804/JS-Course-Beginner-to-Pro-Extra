// lấy calculation từ local Storage
let calculation = localStorage.getItem('calculation') || '';
displayCalculation();
console.log(calculation)


function updateCalculation (value) {
  
  calculation += value;
  displayCalculation();
  localStorage.setItem('calculation',calculation);
}
function displayCalculation () {
  const result = document.querySelector('.result').innerHTML = calculation;
}
function clear () {
  calculation = '';
  localStorage.setItem('calculation',calculation);
}