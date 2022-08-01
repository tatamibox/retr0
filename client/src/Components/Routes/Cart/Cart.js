import React from 'react'
import AuthContext from '../../store/auth-context'
import { useContext, useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { ClipLoader } from 'react-spinners'
import getTotal from './get-total'
import CartTotal from './CartTotal'
import axios from 'axios'
function Cart() {
    const authCtx = useContext(AuthContext)
    // holds cart information
    const [cartId, setCartId] = useState()
    const [cartProductIds, setCartProductIds] = useState()
    const [productsContent, setProductsContent] = useState()
    const [changes, setChanges] = useState(0)
    const [user, setUser] = useState()

    // loading spinner to prevent remove errors
    const [loading, setLoading] = useState()

    // responsible for empty cart screen which shows up on having no items
    const [emptyCart, setEmptyCart] = useState(false)
    useEffect(() => {
        if (authCtx.isLoggedIn) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
                idToken: localStorage.getItem('token')
            })
                .then((res) => {
                    const localId = (res.data.users[0].localId)
                    axios.post('https://retrobackend.herokuapp.com/userInfo', { localId: localId })
                        .then((res) => {
                            console.log(res.data)
                            setUser(res.data)
                            if (!res.data.cart) { setEmptyCart(true); setCartId(undefined) }
                            else { setCartId(res.data.cart) }
                        })
                })
        }
    }, [changes])

    // if there is a cart id, will set cart products state to the response

    useEffect(() => {
        if (cartId) {
            setLoading(true)
            axios.post('https://retrobackend.herokuapp.com/getCartContents', { cartId })
                .then((res) => {
                    console.log(res.data)
                    setLoading(false)
                    if (res.data === null) { setEmptyCart(true); setCartProductIds(undefined) } else { setCartProductIds(res.data.products) }
                })
        }
    }, [cartId])

    // gets each product information from the list of product ids
    useEffect(() => {

        if (cartProductIds) {
            setLoading(true)
            axios.post('https://retrobackend.herokuapp.com/getMultipleProducts', { cartProductIds })
                .then((res) => {
                    console.log(res.data)
                    setLoading(false)
                    setProductsContent(res.data)
                })
        }
        else { setProductsContent(undefined) }
    }, [cartProductIds])
    // removes items from the cart on the backend
    const removeHandler = (i) => {
        setLoading(true)
        axios.put('https://retrobackend.herokuapp.com/removeCartItem', {
            cartId: cartId,
            index: i,
            username: user.username
        })
            .then((res) => {

                if (!res.data.products) { setEmptyCart(true); setLoading(false); setCartProductIds(null) }
                else { setCartProductIds(res.data.products); setLoading(false) }


            })

    }
    useEffect(() => {
        if (productsContent) { authCtx.qtyHandler(productsContent.length) }
    }, [productsContent])
    console.log(authCtx.cartQuantity)
    return (
        <section className={styles.cart__container}>

            <div className={styles.cartProducts__container}>
                <h2>Your cart</h2>
                {emptyCart && <h3>Your cart is empty.</h3>}
                <div>{loading && <ClipLoader />}</div>
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
                <div>{productsContent && <CartTotal total={getTotal(productsContent)} emptyCart={emptyCart} products={productsContent} />}</div>
            </div>
        </section>
    )
}

export default Cart