function renderPage(pag) {
    /* ____get the data from the backend____ */
    fetch(`/api/${pag}`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)

        /* ____check if the movie has a poster____ */
        function checkPoster(poster, element) {
            if (poster == null) {
               element.innerHTML = `
                <img src="https://higipratic.com.br/site/wp-content/uploads/2017/12/indisponivel.jpg" alt="Imagem indisponível">
                `
            }
        }

        /* ____reset the movie area section____ */
        document.getElementById('movies-area').innerHTML = ''

        /* ____show the movies on the page____ */
        data.results.forEach(movie => {
            const poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            document.getElementById('movies-area').innerHTML += `
            <div id="movie-box" class="movie-box" 
                data-poster="${poster}"
                data-movie-release="${movie.release_date}"
                data-title="${movie.title}"
                data-orig-title="${movie.original_title}"
                data-orig-lang="${movie.original_language}"
                data-vote-avg="${movie.vote_average}"
                data-overview="${movie.overview}"
                onclick="openMovieModal()">
                <img src="${poster}" alt="">
            </div> 
            `
            checkPoster(poster, document.getElementById('movies-area'))
        });
    })
}
let actualPag = 1
renderPage(actualPag)

/* ____render the page by the arrows____ */
document.querySelector('#left-arrow').addEventListener('click', () => {
    if (actualPag > 1) {
        actualPag = Number(actualPag) - 1
        renderPage(actualPag)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(actualPag)
    }
})

document.querySelector('#rigth-arrow').addEventListener('click', () => {
    if (actualPag < 500) {
        actualPag = Number(actualPag) + 1
        renderPage(actualPag)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(actualPag)
    }
})

/* ____render the page by the input____ */
const pageInput = document.getElementById('page-input')
pageInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        if (pageInput.value <= 500 && pageInput.value > 0) {
            renderPage(pageInput.value)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            actualPag = pageInput.value
            console.log(actualPag)
            pageInput.innerText = ''
            pageInput.blur()
        }        
    }
})

function openMovieModal() {
    document.querySelector('.movie-modal').innerHTML = `
    <div class="content-box">
        <div class="close-btn-box" onClick="fecha()">
            <span class="close-btn-stick"></span>
        </div>
        <div class="content2-box">
            <div class="poster-rate-box">
                <img src="${event.currentTarget.getAttribute('data-poster')}" alt="">
                <div class="title-box"><h3 id="release-title">Lançamento:</h3><time datetime="${event.currentTarget.getAttribute('data-movie-release')}">${event.currentTarget.getAttribute('data-movie-release')}<time></div>
            </div>
            <div class="movie-general-info-box">
                <div class="text-box"><h3>Título:</h3><p>${event.currentTarget.getAttribute('data-title')}<p></div>
                <div class="text-box release"><h3 id="release-title">Lançamento:</h3><time datetime="${event.currentTarget.getAttribute('data-movie-release')}">${event.currentTarget.getAttribute('data-movie-release')}<time></div>
                <div class="text-box"><h3>Título original:</h3><p>${event.currentTarget.getAttribute('data-orig-title')}<p></div>
                <div class="text-box"><h3>Linguagem original:</h3><p>${event.currentTarget.getAttribute('data-orig-lang')}<p></div>
                <div class="text-box"><h3>Nota média:</h3><p>${event.currentTarget.getAttribute('data-vote-avg')}<p></div>
                <div class="text-overview"><h3>Sinopse:</h3><p>${event.currentTarget.getAttribute('data-overview')}<p></div>
            </div>
        </div>
    </div>
    `
    document.querySelector('.movie-modal').style.display = 'flex';    
    console.log('abrindo modal...')
} 

document.querySelector('.movie-modal').addEventListener('click', function(e) {
    if (e.target == this) fecha();
});

function fecha() {
    document.querySelector('.movie-modal').style.display = 'none'
}

