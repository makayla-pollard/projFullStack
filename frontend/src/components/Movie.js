import React from 'react'
import  './MovieStyle.css'
import poster from '../img/temp movie poster.png'

function Movie({movies}) {
	function bookSelected(id){
		window.location.replace(`http://localhost:3000/Movie/${id}`);
	}

	// console.log(movies);

	return (
		<>
			{
				movies.map((movie) => {
					return (
					<div className='movieContainer' key={movie.id} onClick={() => bookSelected(movie.id)} > 
						{/* <img src={movie.poster_path} alt={movie.title}/> */}
						<img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className='poster'/>
						<div className='details'>
							<h3>{movie.title}</h3>
							<br/>
							<p>{movie.overview}</p>
						</div>
					</div>
					)
				})

			}
		</>
	)
}

export default Movie