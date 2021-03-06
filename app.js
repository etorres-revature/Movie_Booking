//variables to select DOM elements from HTML
const conatinerEl = document.querySelector(".container");
const seatsEl = document.querySelectorAll(".row .seat:not(.occupied)");
const countEl = document.querySelector("#count");
const totalEl = document.querySelector("#total");
const movieSelectEl = document.querySelector("#movie");

//function to populate UI elements seats selected, ticket count, and total
populateUI();

//parsing the value of the option in the HTML for ticket price
let ticketPrice = parseInt(movieSelectEl.value);

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  //setting local storage with movie index
  localStorage.setItem("selectedMovieIndex", movieIndex);
  //setting local storage with corresponding movie price
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
  //
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

//get data from localStorage and populate the UI accordingly
function populateUI() {
  //parsing out the array of selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //logic if the array isn't empty
  if (selectedSeats !== null && selectedSeats.length > 0) {
    //for each function to set the class of each seat to selected corresponding to index number contained in the array
    seatsEl.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  //getting the selected Movie index for the option of the movie
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    //setting movie select element on HTML page to the movie index form local storage
    movieSelectEl.selectedIndex = selectedMovieIndex;
  }
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

// initial count and total set
updateSelectedCount();
