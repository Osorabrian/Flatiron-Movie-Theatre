// Function used to fetch data from JSON server (db.json file)
function fetchMoviesList(){
    fetch("https://flatiron-movie-theatre.vercel.app/db.json")
    .then(response => response.json())
    .then(data => generateMovieList(data.films))
}

/*
This function takes the data fetched and uses it to render the list of movies
*/
function generateMovieList(movies){

    // grabs unordered list film
    const films = document.getElementById('films')
    const deleteMovie = document.getElementById('delete_movie')

    movies.forEach(movie => {

        // create a link that also serves as list element
        const list = document.createElement('a')
        list.href ="#"
        list.innerText = movie.title
        list.classList.add('film-item','list-group-item' )

        //append list element to the ul element
        films.appendChild(list)

        // eventLister for the list element if clicked to display movie details
        list.addEventListener('click', (e) => {
            e.preventDefault()
            generateMovieDetails(movie)
        })
    }); 
}

// function used to generate movie details to the right side of the webpage
function generateMovieDetails(movie){

    // selects divs for displaying image and movie details
    const movieImage = document.getElementById('movie_image')
    const movieDescription= document.getElementById('movie_description')

    // image and book ticket form is rendered in the image div if the movie is selected
    movieImage.innerHTML =
    `<img src="${movie.poster}" alt="movie poster" height="200px" width="150px"></img>
    <form id="form_book">
        <label class="form-label" >Number of tickets: </label>
        <input id="tickets" type="number" placeholder="Input Number of tickets" class="form-control" style="width:400px" min="0" step="1" max="${movie.capacity - movie.tickets_sold}" required>
        <button type="submit" class="btn btn-primary mt-2" id="book_ticket">Book Ticket</button>
    </form>
    `
    
    // html element rendered in the decription div if the movie is selected
    movieDescription.innerHTML = 
        `
         <h4>${movie.title}</h4>
         <p>${movie.description}</p>
         <p>Show Time: ${movie.showtime}</p>
         <p id="seats">Remaining Seats: ${movie.capacity - movie.tickets_sold}</p>
        `
   
     
    
    if((movie.capacity - movie.tickets_sold) === 0){
            document.getElementById('tickets').disabled = true
            const button = document.getElementById('book_ticket')
            button.innerText = 'Sold Out'
            button.disabled = true
        }

    // get the form for booking movie tickets
    const form = document.getElementById('form_book') 
   

        // eventListener for form submit used to book
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const tickets = document.getElementById('tickets')
            movie.tickets_sold += parseInt(tickets.value,10)
            document.getElementById('seats').innerText = `Remaining Seats: ${movie.capacity - movie.tickets_sold}`

            // if condition that makes changes to button and input field when the seats are sold out
            if((movie.capacity - movie.tickets_sold) === 0){
                document.getElementById('tickets').disabled = true
                const button = document.getElementById('book_ticket')
                button.innerText = 'Sold Out'
                button.disabled = true
            }

            // prevent users from entering data that exceeds the range that will result in negative results
            tickets.max = movie.capacity - movie.tickets_sold
            tickets.min = 0
            tickets.step = 1

            form.reset()
        }) 
    
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMoviesList()
})
