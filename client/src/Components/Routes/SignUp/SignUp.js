import { useRef, React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './SignUp.module.css'
import axios from 'axios';
import AuthContext from '../../store/auth-context';



const SignUp = () => {
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const enteredEmail = useRef();
    const enteredPassword = useRef();
    const enteredUsername = useRef();
    const [localId, setLocalId] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = enteredEmail.current.value;
        const password = enteredPassword.current.value;
        const username = enteredUsername.current.value;
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_AUTH}`,
            { email: email, password: password })
            .then((res) => {
                axios.post('http://localhost:3001/signUp', { username: username, localId: res.data.localId })
            })
        navigate('/login')
    }

    return (
        <>
            <form>
                <label for="email">Email</label>
                <input type="text" id="email" ref={enteredEmail}></input>
                <label for="password">Password</label>
                <input type="text" id="password" ref={enteredPassword}></input>

                <label for="username">Username</label>
                <input type="text" id="username" ref={enteredUsername}></input>
                <button type="submit" onClick={submitHandler}>Submit</button>
            </form>
        </>
    )
}

export default SignUp;