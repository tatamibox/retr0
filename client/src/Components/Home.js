import styles from './Home.module.css'
import Navbar from './Navbar/Navbar'
import React, { useContext, useState } from 'react';
import AuthContext from './store/auth-context';
const Home = () => {

    const authCtx = useState(AuthContext);

    return (
        <>
            {authCtx.isLoggedIn && (
                <div>
                    Hello
                </div>
            )}
        </>
    )
}

export default Home;