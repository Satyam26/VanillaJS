const selectedMovie = document.querySelector('.movie-select');
const count = document.getElementById('count');
const totalPrice = document.getElementById('totalPrice');

const seats = document.querySelectorAll('.row .seat:not(occupied)');
const container = document.querySelector('.container');

let ticketPrice = document.querySelector('select');

function populateUI(){

  const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedIndex');
  ticketPrice.selectedIndex = selectedMovieIndex;
  updateTotalPrice();
}

function saveMovieDetails(selectedIndex = 0, ticketPrice = 10){
  localStorage.setItem('selectedIndex', selectedIndex);
  localStorage.setItem('ticketPrice', ticketPrice);
}

const updateTotalPrice = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(singleNode => [...seats].indexOf(singleNode))
  localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));
  
  const seatCount = +selectedSeats.length;
  const total = +selectedSeats.length * ticketPrice.value;
  count.innerText = seatCount;
  totalPrice.innerText = total;
}

container.addEventListener('click', (event) => {
  if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');
    
    updateTotalPrice();
  }
})

ticketPrice.addEventListener('change', (event) => {

  saveMovieDetails(event.target.selectedIndex, event.target.value);
  updateTotalPrice();
})

//Initial functionCall
populateUI();