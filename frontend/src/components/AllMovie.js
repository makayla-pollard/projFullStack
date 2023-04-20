import {useState, useEffect} from 'react'
import  './MovieStyle.css'
import Movie from './Movie'

const AllMovie = () => {
	const [page, setPage ] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [movies, setMovies] = useState([]);

	const next = () => {
			setPage(page + 1)
			getMovieData();
	}
	
	const back = async () => {
			setPage(page - 1)
			getMovieData()
	}

	const getPageChange = () => {
		if(page == 1){
			return(
				<div>
					<button onClick={() => next()}>Next</button>
				</div>
			)
		}else if(page == maxPage){
			return(
				<button onClick={() => back()}>Back</button>
			)
		}else{
			return(
				<div>
					<button onClick={() => back()}>Back</button>
					<button onClick={() => next()}>Next</button>
				</div>
			)
		}
	}

	const getMovieData = () =>{
		var urlMovie = `http://localhost:4000/popular/${page.toString()}`;

		fetch(urlMovie)
			.then(resp => resp.json(0))
			.then(data => {
				setMovies(data.results);
				setMaxPage(data.total_pages)
				console.log(data.total_pages)
			}).catch(error => console.log(error))
	}

	useEffect(() =>{
		getMovieData();
	},[])


//do arrows for flipping through pages???
	return (
		<>
			<div className='listOfMovies'>
				{getPageChange()}
				<Movie movies={movies}/>
			</div>
		</>
	)
}

export default AllMovie