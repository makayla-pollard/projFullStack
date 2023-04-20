import { useState, Component } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterStyle.css';



function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    


    async function Register(e) {
        e.preventDefault();

        const response = await fetch ('http://localhost:4000/graphql', {
            method: 'POST',
            headers:  {
                'Content-Type' : "application/json",
            },
            body: JSON.stringify ({
                query: `
                    mutation {
                        createUser(userInput: {username: "${username}", email: "${email}",password: "${password}", firstName: "${firstName}", lastName: "${lastName}"}) {
                            _id
                            username
                        }
                    }
                `
            })
        }).then(res => {
            if(res.status !== 200&& res.status !==201 ){
                throw new Error('request failed');
            }
            return res.json();
        }).then(data => {
            console.log(data);
            if(data.errors){
                alert(data.errors[0].message)
            }
            if(data.data.createUser != null){
                alert("User Created")
                navigate('/login');
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    function handleClick() {
        navigate('/login');
    }

    return (
        <div className="mainContainer">
            <h1 className="header">Register Here</h1>

        <div className="formContainerReg">
            <form onSubmit={(e) => Register(e)} className="form">
                <div align-items='left'>
                    <label className="username">Username: </label>
                    <br/>
                    <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} className="userInput"/>
                    <br/>
                    <label className="firstName">First Name: </label>
                    <br/>
                    <input type="text" placeholder="FirstName..." onChange={(e) => setFirstName(e.target.value)} className="firstNameInput"/>
                    <br/>
                    <label className="lastName">Last Name: </label>
                    <br/>
                    <input type="text" placeholder="LastName..." onChange={(e) => setLastName(e.target.value)} className="lastNameInput"/>
                    <br/>
                    <label className="email">Email: </label>
                    <br/>
                    <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className="emailInput"/>
                    <br/>
                    <label className="password">Password: </label>
                    <br/>
                    <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} className="passwordInput"/>
                </div>
                <input type="submit" value="Register" className="btnSubmit"/>
            </form>
        </div>

            <div className="loginLinkContainer">
                <h2 className="log">Already have an account, login here.</h2>
                <input type="submit" value="Login Here" className="btnLog" onClick={handleClick}/>
            </div>
        </div>
    )
}

export default Register;