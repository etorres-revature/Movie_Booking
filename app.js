const conatinerEl = document.querySelector(".container");
const setsEl = document.querySelectorAll(".row.seat:not(.occupied)");
const countEl = document.querySelector("#count");
const totalEl = document.querySelector("#total");
const movieSelectEl = document.querySelector("#movie");

let ticketPrice = parseInt(movieSelectEl.value);

//update total and count
function updateSelectedCount() {
const selectedSeats = document.querySelectorAll(".row .seat.selected");
const selectedSeatsCount = selectedSeats.length;

countEl.innerText = selectedSeatsCount;
totalEl.innerText = selectedSeatsCount * ticketPrice;
}

//movie select event
movieSelectEl.addEventListener("change", e => { 
    ticketPrice = e.target.value;
    updateSelectedCount();
});

//seat click event
conatinerEl.addEventListener("click", event => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
