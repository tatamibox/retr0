import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token => { }),
    logout: () => { },
    cartQuantity: 0
});

export const AuthContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [cartQuantity, setCartQuantity] = useState(0)
    const userIsLoggedIn = !!token;
    const quantityHandler = (quantity) => {
        setCartQuantity(quantity)
    }
    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        qtyHandler: quantityHandler,
        cartQuantity: cartQuantity
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;