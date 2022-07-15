import styles from './Home.module.css'
import Navbar from './Navbar/Navbar'
import React, { useContext, useState } from 'react';
import Typewriter from 'typewriter-effect';
import AuthContext from './store/auth-context';
const Home = () => {

    const authCtx = useContext(AuthContext);

    return (
        <>
            {authCtx.isLoggedIn && (
                <h1 className={`${styles.header} text-center`}>
                    <Typewriter onInit={(typewriter) => {
                        typewriter
                            .changeDelay(70)
                            .typeString('your place for streetwear')
                            .pauseFor(200)
                            .deleteChars(10)
                            .pauseFor(100)
                            .typeString('sneakers')
                            .pauseFor(200)
                            .deleteChars(8)
                            .pauseFor(100)
                            .typeString('vintage')
                            .pauseFor(100)
                            .deleteAll()
                            .typeString('retr0')
                            .start()
                    }}></Typewriter>
                </h1>
            )
            }
        </>
    )
}

export default Home;