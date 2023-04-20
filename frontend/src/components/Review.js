import {useState, useEffect} from 'react';
import ReactStars from 'react-rating-stars-component';
import './ReviewStyle.css'

const Review = ({movieId}) => {
    const [ rating, setRating ] = useState(0);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [reviewExists, setReviewExists] = useState(false);
    const user = window.localStorage.getItem("LoggedIn");
	const userInfo = JSON.parse(user);

    let offensiveWords = [
        'asshole',
        'bitch',
        'fuck',
        'damn',
        'shit',
        'bullshit',
        'cunt',
        'dick'
    ]

    const checkOffensive =(text) => {
        const badWords = offensiveWords.filter(word => 
            text.toLowerCase().includes(word.toLowerCase())
        );
        if(badWords.length){
            alert("Watch your language!")
        }else{
            setComment(text);
        }
    }


    const getReviewDetails = async () => {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        reviewByUsernameAndMovie(username: "${userInfo.username}", movieId: ${movieId}){
                            username
                            rating,
                            comment
                        }
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            if(data.errors){
                setReviewExists(false);
            }else{
                setReviewExists(true);
                setUsername(data.data.reviewByUsernameAndMovie.username);
                setComment(data.data.reviewByUsernameAndMovie.comment);
                setRating(data.data.reviewByUsernameAndMovie.rating);
            }
        }).catch(err => {
            console.log(err);
        })
    }


    const createReview = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createReview(reviewInput: {username: "${userInfo.username}", movieId: ${movieId}, rating: ${rating}, comment: "${comment}"}){
                            username,
                            rating, 
                            comment
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
        }).catch(err => {
            console.log(err)
        })

        window.location.reload(false);
    }


    const editReview = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        editReview(username: "${username}",movieId: ${movieId}, rating: ${rating}, comment: "${comment}"){
                            comment,
                            rating
                        }
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            console.log(rating);
        }).catch(err => {
            console.log(err);
        })
        window.location.reload(false);
    }

    useEffect(() => {
        getReviewDetails();
    },[])

    if(reviewExists == true){
        return(
            <div className='container'>
                <ReactStars
						value={rating}
						activeColor={"#E05F47"}
						size={30}
						onChange={setRating}
					/>
                    <textarea value={comment} placeholder='Insert Comment Here' rows="4" cols="50" maxLength="200" onChange={(e) => checkOffensive(e.target.value)}></textarea>
                    <button onClick={editReview} className='btnEdit'>Edit</button>
            </div>
        )
    }else{
        return(
            <div>
                <div className='container'>
                    <ReactStars
						value={rating}
						activeColor={"#E05F47"}
						size={30}
						onChange={setRating}
					/>
                    <textarea value={comment} placeholder='Insert Comment Here' rows="4" cols="50" maxLength="100" onChange={(e) => checkOffensive(e.target.value)}></textarea>
                    <button onClick={createReview} className='btnSend'>Send</button>
				</div>
            </div>
        )
    }
    
}

export default Review;