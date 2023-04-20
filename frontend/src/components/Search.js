import {useState, useEffect} from 'react';
import  './MovieStyle.css'
import './SearchStyle.css'
import Movie from './Movie'
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [keyword, setKeyword] =useState("");
    const [actor, setActor] = useState("");
    const [genre, setGenre] = useState("28");
    const [page, setPage ] = useState(1);
	const [maxPage, setMaxPage] = useState(1);


        


    const getTitles = () => {
        var url = `http://localhost:4000/search/${keyword}/${page}`;
        fetch(url)
            .then(res => res.json(0))
            .then(data => {
                setMovies(data.results)
                setMaxPage(data.total_pages);
            }).catch(error => console.log(error))
    }

    const getActors = () => {
        var url = `http://localhost:4000/actor/${actor}`;
        fetch(url)
        .then(res => res.json(0))
        .then(data => {
            setMovies(data.results[0].known_for);
        }).catch(err => console.log(err));
    }

    const getGenres = () => {
        var url = `http://localhost:4000/genreUrl/${genre}/${page}`;
        fetch(url)
        .then(res => res.json(0))
        .then(data => {
            setMovies(data.results)
            setMaxPage(data.total_pages);
        }).catch(err => console.log(err));
    }


    function changeMovies(e) {
        e.preventDefault();
        getTitles();
    }

    function searchByActor(e){
        e.preventDefault();
        getActors();
    }

    function searchByGenre(e){
        e.preventDefault();
        getGenres();
    }

    return (
		<>
			<form>
				<input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="title" className='inputBox'/>
				<input type='submit' value="Search" onClick={(e) => changeMovies(e)} className="btn"/>
			</form>
            <form>
				<input type='text' value={actor} onChange={(e) => setActor(e.target.value)} placeholder="actors" className='inputBox'/>
				<input type='submit' value="Search" onClick={(e) => searchByActor(e)} className="btn"/>
			</form>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} className="inputBox">
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
                <option value="18">Drama</option>
                <option value="10751">Family</option>
                <option value="14">Fantasy</option>
                <option value="36">History</option>
                <option value="27">Horror</option>
                <option value="10402">Music</option>
                <option value="9648">Mystery</option>
                <option value="10749">Romance</option>
                <option value="878">Science Fiction</option>
                <option value="10770">TV Movie</option>
                <option value="53">Thriller</option>
                <option value="10752">War</option>
                <option value="37">Western</option>

            </select>
            <input type='submit' value="Search" onClick={(e) => searchByGenre(e)} className="btn"/>
			<div className='listOfMovies'>
				<Movie movies={movies}/>
			</div>
		</>
	)

}

export default Search;