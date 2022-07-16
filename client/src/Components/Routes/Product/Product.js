import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import styles from './Product.module.css'
import AuthContext from "../../store/auth-context";
import axios from "axios";
const Product = () => {

    useEffect(() => {
        axios.post('/getProduct', { id: id })
            .then((res) => {
                axios.post('/getComment', { comments: res.data.comments })
                    .then((res) => {
                        setProductComments(res.data)
                    })


            })

    }, [])
    const [productComments, setProductComments] = useState([]);
    const commentRef = useRef();

    const submitCommentHandler = (e) => {
        if (!authCtx.isLoggedIn) {
            return;
        }
        e.preventDefault();
        const comment = commentRef.current.value;
        const time = new Date().toLocaleString();
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
            idToken: authCtx.token
        })
            .then((res) => {
                axios.post('/userinfo', { localId: res.data.users[0].localId })
                    .then((res) => {
                        axios.post('/postComment', { time: time, username: res.data.username, comment: comment, productId: id })
                    })
            })
    }



    const authCtx = useContext(AuthContext)

    const [currentProduct, setCurrentProduct] = useState('')

    const { id } = useParams();
    useEffect(() => {
        axios.post('http://localhost:3001/getProduct', { id: id })
            .then((res) => {
                setCurrentProduct(res.data)
            })
    }, [])
    console.log(productComments)
    return <>
        <div className={styles.item__container}>
            <img src={currentProduct.imageURL}></img>
            <div className={styles.item__description}>
                <h1>{currentProduct.name}</h1>
                <p>${currentProduct.price}</p>
                <div className={styles.buttons}><button className={`${styles.buy__button} btn btn-dark`}>Buy Now</button><button className='btn btn-outline-dark'>Offer</button></div>
            </div>
        </div>

        <div className="comments__container">
            <h2 className="text-center">Comments</h2>


            {authCtx.isLoggedIn && (
                <form className={styles.comment__form}>
                    <textarea placeholder='Type comment here...' ref={commentRef} ></textarea>
                    <button type='submit' className="btn btn-outline-dark" onClick={submitCommentHandler}>Post</button>
                </form>
            )}
            {productComments.map((comment, i) => (
                <div className="d-flex flex-column justify-content-center text-center align-items-center" key={i}>
                    <h2 className={styles.product__title}>{comment.username}</h2>
                    <p className={styles.product__price}>{comment.comment}</p>
                    <p className={styles.product__price}>{comment.time}</p>
                </div>
            ))}
        </div>
    </>
}

export default Product;