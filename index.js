function fetchMoviesList(){
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(data => generateMovieList(data))
}

function generateMovieList(movies){
    const films = document.getElementById('films')

    movies.forEach(movie => {
        const list = document.createElement('a')
        list.href ="#"
        list.innerText = movie.title
        list.classList.add('film-item','list-group-item' )
        films.appendChild(list)

        list.addEventListener('click', (e) => {
            e.preventDefault()
            generateMovieDetails(movie)
        })
    }); 
}

function generateMovieDetails(movie){

    const movieImage = document.getElementById('movie_image')
    const movieDescription= document.getElementById('movie_description')

    const remainingSeats = movie.capacity - movie.tickets_sold

    movieImage.innerHTML =
    `<img src="${movie.poster}" alt="movie poster" height="200px" width="150px"></img>
    <form id="form_book">
        <label class="form-label" >Number of tickets: </label>
        <input id="tickets" type="number" placeholder="Input Number of tickets" class="form-control" style="width:400px" min="0" step="1" max="${remainingSeats}" required>
        <button type="submit" class="btn btn-primary mt-2" id="book_ticket">Book Ticket</button>
    </form>
    `
    

    movieDescription.innerHTML = 
        `
         <h4>${movie.title}</h4>
         <p>${movie.description}</p>
         <p>Show Time: ${movie.showtime}</p>
         <p id="seats">Remaining Seats: ${remainingSeats}</p>
        `
    const tickets = document.getElementById('tickets').value
    
    
    if(remainingSeats === 0){
            document.getElementById('tickets').disabled = true
            const button = document.getElementById('book_ticket')
            button.innerText = 'Sold Out'
            button.disabled = true
        }

    const form = document.getElementById('form_book')
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            generateTicket(movie)  
        })    

    

    
}

function generateTicket(movie){

    const remainingSeats = movie.capacity - movie.tickets_sold
    const tickets = document.getElementById('tickets').value
    movie.tickets_sold += parseInt(tickets,10)

    fetch(`http://localhost:3000/films/${movie.id}`,{
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(data => data)

     alert(`Thank you!\n You have bought ${tickets} tickets\n for ${movie.title}`)

}

document.addEventListener('DOMContentLoaded', () => {
    fetchMoviesList()
})
