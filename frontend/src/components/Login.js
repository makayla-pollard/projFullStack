import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css'

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    async function loginuser(event){
        event.preventDefault();
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify ({
                query: `
                    query {
                        login(username: "${username}", password: "${password}") {
                            userId
                            token
                            tkExp
                            username
                        }
                    }
                `
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.errors){
                alert(data.errors[0].message)
            }else{
                const userObject = {
                    id: data.data.login.userId,
                    token: data.data.login.token,
                    username: data.data.login.username
                }
                window.localStorage.setItem("LoggedIn", JSON.stringify(userObject));
                navigate("/")

            }
        }).catch(err => {
            console.log(err);
        });

        
    }

    function handleClick() {
        navigate('/register');
    }

        const user = window.localStorage.getItem("LoggedIn");
        if(user == null){
            return(
                <div className="mainContainerLog">
                    <h1 className="headerLog">Login Here</h1>

                <div className="formContainer">
                    <form onSubmit={(e) => loginuser(e)} className="formLog">
                        <label className="usernameLog">Username: </label>
                        <br/>
                        <input value= {username} onChange={(e) => setUsername(e.target.value)} type="text" className="usernameInputLog"></input>
                        <br/>
                        <label className="passwordLog">Password: </label>
                        <br/>
                        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)} className="passwordInputLog"></input>
                        <br/>
                        <input type="submit" value="Login" className="btnSubmitLog"></input>
                    </form>
                </div>

                    <div className="regLinkContainer">
                        <h2 className="reg">Don't have an account yet, register here.</h2>
                        <br/>
                        <input type="submit" value="Register Here" className="btnReg" onClick={handleClick}/>
                    </div>
                </div> 
            )
        }else{
            return(
                <></>
            )
        }
}

export default Login