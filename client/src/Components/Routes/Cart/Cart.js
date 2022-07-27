import React from 'react'
import AuthContext from '../../store/auth-context'
import { useContext, useState, useEffect } from 'react'
import styles from './Cart.module.css'
import getTotal from './get-total'
import axios from 'axios'
function Cart() {
    const authCtx = useContext(AuthContext)
    const [cartId, setCartId] = useState()
    const [cartProductIds, setCartProductIds] = useState()
    const [productsContent, setProductsContent] = useState()
    const [changes, setChanges] = useState(0)
    if (authCtx.isLoggedIn) {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
            idToken: localStorage.getItem('token')
        })
            .then((res) => {
                const localId = (res.data.users[0].localId)
                axios.post('http://localhost:3001/userInfo', { localId: localId })
                    .then((res) => {
                        setCartId(res.data.cart)
                    })
            })
    }

    useEffect(() => {
        if (cartId) {
            axios.post('/getCartContents', { cartId })
                .then((res) => {
                    setCartProductIds(res.data.products)
                })
        }
    }, [cartId, changes])

    useEffect(() => {
        if (cartProductIds) {
            axios.post('/getMultipleProducts', { cartProductIds })
                .then((res) => {
                    setProductsContent(res.data)
                })
        }
    }, [cartProductIds])
    console.log(productsContent)

    const removeHandler = (i) => {
        axios.put('/removeCartItem', {
            cartId: cartId,
            index: i
        })
        setChanges(changes + 1)
    }
    return (
        <section className={styles.cart__container}>

            <div className={styles.cartProducts__container}>
                <h2>Your cart</h2>
                {productsContent && productsContent.map((product, i) => (
                    <div className={styles.product__card}>
                        <img src={product.imageURL} className={styles.product__image} alt='product preview'></img>
                        <div className={styles.product__description}>
                            <h3>{product.name}</h3>
                            <p>${product.price} / Size {(product.size).toUpperCase()}</p>
                            <button type='submit' className={`btn btn-dark ${styles.button__remove}`} onClick={() => removeHandler(i)}>Remove</button>
                        </div>
                    </div>



                ))}
            </div>

            <div className={styles.cartProducts__container}>
                <h2>Total: {productsContent && getTotal(productsContent)}</h2>
            </div>
        </section>
    )
}

export default Cart