import { useState, Fragment } from 'react'
import styles from './Navbar.module.css'
import { useContext, useEffect } from 'react'
import AuthContext from '../store/auth-context'
import axios from 'axios'
const Navbar = () => {

    const [currentUser, setCurrentUser] = useState();

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    console.log(isLoggedIn)

    if (isLoggedIn) {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
            idToken: localStorage.getItem('token')
        })
            .then((res) => {
                const localId = (res.data.users[0].localId)
                axios.post('http://localhost:3001/userInfo', { localId: localId })
                    .then((res) => {
                        setCurrentUser(res.data.username)
                    })
            })

    }




    return (
        <Fragment>
            <nav className="navbar__container d-flex flex-row justify-content-between my-4">
                <div className="logo mx-3">retr0</div>
                <div className="navbar__links gap-3 d-flex flex-row mx-3">
                    {!authCtx.isLoggedIn && (
                        <>
                            <div className="signup"><a href='/signup'>Sign
                                Up</a></div>
                            <div className="login"><a href='/login'>Log in</a></div>
                        </>

                    )}

                    {authCtx.isLoggedIn && (<><div>{currentUser}</div><div className="logout"><a href='/' onClick={authCtx.logout}>Log out</a></div></>)}

                </div>
            </nav>
        </Fragment >
    )


}

export default Navbar