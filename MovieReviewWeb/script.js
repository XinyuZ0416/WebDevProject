const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7b85dacd8cfd8c62474b1f4481424cb9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=7b85dacd8cfd8c62474b1f4481424cb9&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('query');

returnMovies(APILINK)

function returnMovies(url){
    fetch(url) //make an HTTP request to the specified URL
        .then(res => res.json()) //converting the response to JSON format
        .then(function(data){ //a callback function to processes the data obtained from the response
            console.log(data.results);
            data.results.forEach(element => {
                // create a container for each element in the 'results' array
                // and set contents
                const div_card = document.createElement('div'); 
                div_card.setAttribute('class','card');

                const div_row = document.createElement('div'); 
                div_row.setAttribute('class','row');

                const div_column = document.createElement('div'); 
                div_column.setAttribute('class','column');
                
                const image = document.createElement('img'); 
                image.src = IMG_PATH + element.poster_path;
                image.setAttribute('class','thumbnail');
                image.setAttribute('id','image');

                image.addEventListener('click',() => {
                    const movieURL = `movie.html?id=${element.id}&title=${element.title}`;
                    window.location.href = movieURL;
                });

                const title = document.createElement('h3'); 
                title.innerHTML = `<a id="movieTitle" href="movie.html?id=${element.id}&title=${element.title}">${element.title}</a>`;
                // title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
                title.setAttribute('id','title');

                const center = document.createElement('center'); 

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}

form.addEventListener('submit', (e)=>{
    main.innerHTML = ''; //remove previous movie searching results

    const searchItem = search.value;
    if(searchItem.trim() !== ''){
        e.preventDefault();
        sessionStorage.setItem("searchQuery",searchItem);
        // sessionStorage.setItem('searchQuery',searchItem.trim());
        returnMovies(SEARCHAPI+searchItem);
    }
    
});