import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import styles from './Product.module.css'
import AuthContext from "../../store/auth-context";
import axios from "axios";
import verified from '../../../assets/verified.png'
import heart_empty from '../../../assets/heart_empty.png'
import heart_filled from '../../../assets/heart_filled.png'
import { ClipLoader } from 'react-spinners'
const Product = () => {
    const authCtx = useContext(AuthContext)

    // added to cart message
    const [atcSuccess, setAtcSuccess] = useState(false)
    const [atcFailure, setAtcFailure] = useState('')
    const [loading, setLoading] = useState(false)
    const atcHandler = () => {
        if (authCtx.isLoggedIn) {
            setLoading(true)
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_AUTH}`, {
                idToken: authCtx.token
            })
                .then((res) => {
                    axios.post('/userinfo', { localId: res.data.users[0].localId })
                        .then((res) => {
                            axios.post('/addToCart', {
                                id: id,
                                username: res.data.username
                            })
                                .then((res) => {
                                    setLoading(false)
                                    if (res.data.message) { setAtcSuccess(true) }
                                })
                                .catch((err) => {
                                    setLoading(false)
                                    setAtcFailure(true)
                                })
                        })
                })
        }
        else (setAtcFailure('Please login before adding to cart.'))
    }


    const [commentAmount, setCommentAmount] = useState(5)
    const [likeStatus, setLikeStatus] = useState(false)
    const [newComment, setNewComment] = useState(0)
    const { id } = useParams();
    useEffect(() => {
        axios.post('http://localhost:3001/getProduct', { id: id })
            .then((res) => {
                setCurrentProduct(res.data)
            })
    }, [])
    useEffect(() => {
        axios.post('/getProduct', { id: id })
            .then((res) => {
                const commentsArray = res.data.comments.reverse().splice(0, (commentAmount))

                axios.post('/getComment', { comments: commentsArray })
                    .then((res) => {
                        setProductComments(res.data)
                    })
            })

    }, [newComment])
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
                        axios.post('/postComment', { time: time, username: res.data.username, comment: comment, productId: id, verified: res.data.verified })
                            .then((res) => {
                                setNewComment(newComment + 1)

                            })

                    })
            })
    }


    const alterCommentList = (event) => {
        event.preventDefault();
        setCommentAmount(commentAmount + 5)
        setNewComment(newComment + 1)
    }


    const [currentProduct, setCurrentProduct] = useState('')



    return <>
        <div className={styles.item__container}>
            <img src={currentProduct.imageURL} className={styles.productImage}></img>
            {!likeStatus && (<img src={heart_empty} className={styles.like__button} onClick={() => setLikeStatus(!likeStatus)} alt="heart"></img>)}
            {likeStatus && (<img src={heart_filled} className={styles.like__button} onClick={() => setLikeStatus(!likeStatus)} alt="heart"></img>)}
            <div className={styles.item__description}>
                <h1>{currentProduct.name}</h1>
                <p>${currentProduct.price}</p>
                <div className={`${styles.buttons} mb-3`}><button disabled className={`${styles.buy__button} btn btn-dark`}>Buy Now</button><button className='btn btn-outline-dark' onClick={atcHandler}>Add to Cart</button></div>
                {atcSuccess && <span className="text-success">Successfully added to cart.</span>}{loading && <span><ClipLoader /></span>}
                {atcFailure && <span className="text-danger">{atcFailure}</span>}
            </div>
        </div>

        <div className={styles.comments__container}>
            <h2 className="text-center">Comments</h2>


            {authCtx.isLoggedIn && (
                <form className={styles.comment__form}>
                    <textarea placeholder='Type comment here...' ref={commentRef} ></textarea>
                    <button type='submit' className="btn btn-outline-dark" onClick={submitCommentHandler}>Post</button>
                </form>
            )}
            <div className={styles.comments}>
                {productComments.map((comment, i) => (
                    <div className={styles.comment__individual} key={i}>
                        <a className='text-decoration-none text-dark' href={`/user/${comment.username}`}><div className={styles.username__container}><h2 className={styles.comment__user}>@{comment.username}</h2>{comment.verified && (<img src={verified} className={styles.verifiedIcon}></img>)}</div></a>
                        <p className={styles.comment__comment}>{comment.comment}</p>
                        <p className={styles.comment__time}>{comment.time}</p>
                    </div>
                ))}
            </div>
            <button className={`${styles.loadMore} btn btn-outline-dark`} onClick={alterCommentList}>Load More</button>
        </div>

    </>
}

export default Product;