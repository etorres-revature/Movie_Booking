const conatinerEl = document.querySelector(".container");
const seatsEl = document.querySelectorAll(".row .seat:not(.occupied)");
const countEl = document.querySelector("#count");
const totalEl = document.querySelector("#total");
const movieSelectEl = document.querySelector("#movie");

let ticketPrice = parseInt(movieSelectEl.value);

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //copy selected seats into an array
  //map through array
  //return new array of indexes
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...seatsEl].indexOf(seat)
  );

  //saving array of seats selected by the user into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  //creating a variabel to hold the length aka number of seats selected
  const selectedSeatsCount = selectedSeats.length;

  //setting the innerHTML for the two spans with number of seats and total price
  countEl.innerText = selectedSeatsCount;
  totalEl.innerText = selectedSeatsCount * ticketPrice;
}

//movie select event
movieSelectEl.addEventListener("change", (e) => {
  //setting the ticket price to the value of the selected option
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  //running the update Select Count to change price and total (along with selected seats)
  updateSelectedCount();
});

//seat click event
conatinerEl.addEventListener("click", (event) => {
  //if logic for click event
  if (
    //if that click target has a class of seat but not occupied
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    //
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
