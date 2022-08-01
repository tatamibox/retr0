import { useState, Fragment, useRef } from 'react'
import styles from './Navbar.module.css'
import { useContext, useEffect } from 'react'
import AuthContext from '../store/auth-context'
import shoppingcart from '../../assets/shoppingcart.png'
import filledcart from '../../assets/filledcart.png'
import { useNavigate } from 'react-router-dom'
import verified from '../../assets/verified.png'
import axios from 'axios'
const Navbar = () => {
    const submitHandler = () => {
        navigate(`/shop/${searchRef.current.value}`)
    }
    const navigate = useNavigate()
    const searchRef = useRef()

    const [currentUser, setCurrentUser] = useState();
    const [verifiedUser, setVerifiedUser] = useState(false)
    const [cartStatus, setCartStatus] = useState(false)

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    useEffect(() => {
        if (isLoggedIn) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
                idToken: localStorage.getItem('token')
            })
                .then((res) => {
                    const localId = (res.data.users[0].localId)
                    axios.post('https://retrobackend.herokuapp.com/userInfo', { localId: localId })
                        .then((res) => {
                            setVerifiedUser(res.data.verified)
                            setCurrentUser(res.data.username)
                            if (res.data.cart) {
                                setCartStatus(true)
                            }
                        })
                })


        }
    }, [])
    const [burgerStatus, setBurgerStatus] = useState(false)
    const burgerHandler = () => {
        setBurgerStatus(!burgerStatus)
        changeStyle();
    }
    const [style, setStyle] = useState('none')
    const changeStyle = () => {
        if (burgerStatus) { setStyle('none') } else { setStyle('flex') }
    }
    console.log(burgerStatus)

    return (
        <Fragment>
            <nav className={styles.navbar__container}>
                <div className={`${styles.logo}`}><a className={styles.logo} href="/">retr0</a></div><button onClick={burgerHandler} className={`${styles.burger__open} btn btn-light`}>
                    <svg viewBox="0 0 100 80" width="40" height="40">
                        <rect width="100" height="20"></rect>
                        <rect y="30" width="100" height="20"></rect>
                        <rect y="60" width="100" height="20"></rect>
                    </svg>
                </button>
                <form className={styles.search__form}>
                    <input ref={searchRef} type='text' className={`${styles.search__bar}`} placeholder='Search'></input>
                    <button className='btn btn-outline-dark' type="submit" onClick={submitHandler}>Search</button>
                </form>
                <div className={styles.navbar__links} style={{ display: `${style}` }} >
                    {!authCtx.isLoggedIn && (
                        <>
                            <div className="signup"><a href='/signup'>Sign
                                Up</a>
                            </div>
                            <div className="login"><a href='/login'>Log in</a></div>
                        </>

                    )}
                    <div>
                        <button type='submit' onClick={burgerHandler} className={styles.burger__open}>x</button></div>
                    {burgerStatus && <form className={styles.search__form__mobile}>


                        <input ref={searchRef} type='text' className={`${styles.search__bar__mobile}`} placeholder='Search'></input>
                        <button className='btn btn-outline-dark' type="submit" onClick={submitHandler}>Search</button>
                    </form>}
                    {authCtx.isLoggedIn && (<><a href="/post" className="btn btn-outline-dark">Post</a>{cartStatus && <a href='/cart'><img src={filledcart}></img></a>}{!cartStatus && <a href='/cart'><img src={shoppingcart}></img></a>}<a className="text-decoration-none text-dark" href={`/user/${currentUser}`}><div>{currentUser}{verifiedUser && (<img src={verified} className={`${styles.verifiedIcon}`}></img>)}</div></a><div className="logout"><a href='/' onClick={authCtx.logout}>Log out</a></div></>)}

                </div>
            </nav>
        </Fragment >
    )


}

export default Navbar