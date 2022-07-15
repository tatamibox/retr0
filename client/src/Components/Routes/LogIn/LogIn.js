import React, { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css'
import axios from 'axios';
import AuthContext from '../../store/auth-context';

const LogIn = () => {
    const navigate = useNavigate();

    const AuthCtx = useContext(AuthContext);

    const enteredEmail = useRef();
    const enteredPassword = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const email = enteredEmail.current.value;
        const password = enteredPassword.current.value;

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_AUTH}`,
            { email: email, password: password })
            .then((res) => {
                AuthCtx.login(res.data.idToken)
            })

        navigate('/')

    }

    return (
        <>
            <form>
                <label for="email">Email</label>
                <input type="text" id="email" ref={enteredEmail}></input>
                <label for="password">Password</label>
                <input type="text" id="password" ref={enteredPassword}></input>
                <button type="submit" onClick={submitHandler}>Log In</button>
            </form>
        </>
    )
}

export default LogIn;