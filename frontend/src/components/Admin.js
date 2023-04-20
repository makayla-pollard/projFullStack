import {useState} from 'react';
import './AdminStyle.css'


const Admin = () => {
    const [gottenUser, setGottenUser] = useState([])
    const [gottenReview, setGottenReview] = useState([]);
    const [username, setUsername] = useState('');
    const [usernameTwo, setUsernameTwo] = useState('');
    const [movieId,setMovieId] = useState('');
    const user = window.localStorage.getItem("LoggedIn");
	const userInfo = JSON.parse(user);
    console.log(userInfo)
    const getUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query{
                        userByUsername(username: "${username}"){
                            username,
                            firstName,
                            lastName,
                            email
                        }
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            setGottenUser(data.data.userByUsername)
        }).catch(err => {
            console.log(err)
        });
    }
    
    const deleteUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        deleteUser(username: "${username}")
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            setGottenUser([]);
            setUsername("");
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteReviews = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        deleteReviews(username: "${username}")
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {

        }).catch(err => console.log(err));
    }

    const deleteReview = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation{
                        deleteReview(username: "${usernameTwo}", movieId: ${movieId})
                    }
                `
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            setGottenReview([]);
            setUsernameTwo("");
            setMovieId("");
        }).catch(err => console.log(err));

        
    }

    const getReviewDetails = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        reviewByUsernameAndMovie(username: "${usernameTwo}", movieId: ${movieId}){
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
            setGottenReview(data.data.reviewByUsernameAndMovie);
            
        }).catch(err => {
            console.log(err);
        })

        
    }

    function deleteUserData(e){
        e.preventDefault();
        deleteUser(e);
        deleteReviews(e);
    }

    function tryShowUserInfo(){
        if(gottenUser.length != 0){
            return (
                <div className='infoContainer'>
                    <div>Username: {gottenUser.username}</div>
                    <div>First Name: {gottenUser.firstName}</div>
                    <div>Last Name: {gottenUser.lastName}</div>
                    <div>Email: {gottenUser.email}</div>
                    <button onClick={(e) => deleteUserData(e)} className="btn">Delete</button>
                </div>
                
            )
        }else{
            return(
                <div>
                    NO USER
                </div>
            )
        }
    }

    function tryShowReview(){
        if(gottenReview.length != 0){
            return(
                <div className='infoContainer'>
                    <div>Username: {gottenReview.username}</div>
                    <div>Rating: {gottenReview.rating}</div>
                    <div>Comment: {gottenReview.comment}</div>
                    <button onClick={(e) => deleteReview(e)} className="btn">Delete</button>
                </div>
            )
        }else{
            return(
                <div>
                    NO REVIEW
                </div>
            )
        }
    }

    if(userInfo.username == "admin"){
        return(
            <div>
                <div>
                    <h1>Search User</h1>
                    <form>
                        <input value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="inputBox"/>
                        <input type="submit" value='Search' onClick={(e) => getUser(e)} className="btn"/>
                    </form>
                    <div>
                        {tryShowUserInfo()}
                    </div>
                </div>
                <div>
                    <h1>Search Reviews</h1>
                    <form>
                        <input value={movieId} type="text" placeholder="Movie Id" onChange={(e) => setMovieId(e.target.value)} className="inputBox"/>
                        <input value={usernameTwo} type="text" placeholder="Username" onChange={(e) => setUsernameTwo(e.target.value)} className="inputBox"/>
                        <input type="submit" value='Search' onClick={(e) => getReviewDetails(e)} className="btn"/>
                    </form>
                    <div>
                        {tryShowReview()}
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                NO ACCESS
            </div>
        )
    }

    
}

export default Admin;