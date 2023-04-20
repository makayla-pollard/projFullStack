import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieStyle.css'
import Review from './Review';
import ReactStars from 'react-rating-stars-component';


const MovieDetails = () => {

	const { id } = useParams();
	const [movie, setMovie] = useState([]);
	const [imageUrl, setImageUrl] = useState('');
	const [image, setImage] = useState('');
	const [showImage, setShowImage] = useState(false);
	const [background, setBackground] = useState("");

	const user = window.localStorage.getItem("LoggedIn");
	const [reviews, setReviews] = useState([]);
	const loadImageUrl = () => {
		var url = `http://localhost:4000/imageUrl`;
		fetch(url)
			.then(r => r.json())
			.then(data => {
				setImageUrl(data.url)
			}).catch((e) => console.log(e));


	}

	const loadMovie = () => {
		var url = `http://localhost:4000/movie/${id}`;
		fetch(url)
			.then(r => r.json(0))
			.then(data => {
				setMovie(data);
				setBackground("https://image.tmdb.org/t/p/original/" + data.backdrop_path);
			}).catch((e) => console.log(e));
	}

	async function loadReviews() {
		const response = await fetch('http://localhost:4000/graphql', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
				query {
					reviewsByMovie(movieId: ${id}){
						username,
						rating,
						comment
					}
				}`
			})
		}).then(res => {
			return res.json();
		}).then(data => {
			setReviews(data.data.reviewsByMovie)
		}).catch(err => {
			console.log(err);
		})
	}

	useEffect(() => {
		loadImageUrl();
		loadMovie();
		loadReviews();
	}, []);

	function tryLoadMoviePoser() {
		if (imageUrl && movie && movie.poster_path) {
			return <img src={imageUrl + movie.poster_path} className='poster' />
		}
	}



	if (user != null) {
		return (
			<>
				<h1>{movie.title}</h1>
				<div className='detailsDetails' style={{ backgroundImage: `url(${background})` }}>
					<div id='detailMovie'>
						<div className='posterBorder'>
							{tryLoadMoviePoser()}
						</div>
						<div className='movieDetails'>
							<div>
								{movie.overview}
							</div>
							<div>
								Release date: {movie.release_date}
							</div>
						</div>
					</div>{movie && movie.id ? <Review movieId={movie.id} /> : null}
					<div id='reviewContainer'>
						{
							reviews.map((review) => {
								return (
									<div className='reviews'>
										<div>{review.username} : {review.comment}</div>
										<div><ReactStars
											value={review.rating}
											activeColor={"#E05F47"}
											size={30}
											edit={false}
										/></div>
										<div></div>
									</div>
								)
							})
						}
					</div>
				</div>
			</>
		)
	} else {

		return (
			<>
				<h1>{movie.title}</h1>
				<div className='detailsDetails' style={{ backgroundImage: `url(${background})` }}>
					<div id='detailMovie'>
						<div className='posterBorder'>
							{tryLoadMoviePoser()}
						</div>
						<div className='movieDetails'>
							<div>
								{movie.overview}
							</div>
							<div>
								Release date: {movie.release_date}
							</div>
						</div>
					</div>
					<div id='reviewContainer'>
						{
							reviews.map((review) => {
								return (
									<div className='reviews'>
										<div><ReactStars
											value={review.rating}
											activeColor={"#E05F47"}
											size={30}
											edit={false}
										/></div>
										<div>{review.username} : {review.comment}</div>

										<div>{review.comment}</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</>

		)
	}
}

export default MovieDetails