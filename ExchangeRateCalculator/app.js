const select_fromCurrency = document.getElementById('select_fromCurrency');
const input_fromCurrency = document.getElementById('input_fromCurrency');
const swapBtn = document.getElementById('swap');
const rate = document.getElementById('rate');
const select_toCurrency = document.getElementById('select_toCurrency');
const input_toCurrency = document.getElementById('input_toCurrency');

//calculate exchange rate and populate on to elements
const calculate = () => {
  const fromCurrency = select_fromCurrency.value;
  const toCurrency = select_toCurrency.value;
  const value_fromCurrency = +input_fromCurrency.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
  .then(response => response.json()).then(result => {
    
    const resultValue = +result.rates[toCurrency];
    rate.innerText = `1 ${fromCurrency} = ${resultValue} ${toCurrency}`;
    const totalAmount = (resultValue * value_fromCurrency).toFixed(3);

    console.log(totalAmount, resultValue, value_fromCurrency);
    input_toCurrency.innerText = totalAmount;
  })
  
}

const swapCurrencies = () => {
  const temp = select_fromCurrency.value;
  select_fromCurrency.value = select_toCurrency.value;
  select_toCurrency.value = temp;
}

select_fromCurrency.addEventListener('change', calculate);
select_toCurrency.addEventListener('change', calculate);
input_fromCurrency.addEventListener('input', calculate);

swapBtn.addEventListener('click', swapCurrencies)
