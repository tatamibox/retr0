import styles from './UserProfile.module.css'
import { React, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import verified from '../../assets/verified.png'
import { useParams } from 'react-router-dom';
const UserProfile = () => {

    const [userProducts, setUserProducts] = useState([])
    const [userVerified, setUserVerified] = useState([])
    const { username } = useParams();

    useEffect(() => {
        axios.post('http://localhost:3001/findByUser', {
            username: username
        })
            .then((res) => {
                setUserVerified(res.data.foundUser.verified)
                const totalProducts = res.data.foundUser.products;
                axios.post('/getUserProducts', { totalProducts: totalProducts })
                    .then((res) => {
                        setUserProducts(res.data)
                    })
            })
    }, [])
    console.log(userProducts)
    const renderUserProductImages = () => {

    }

    return (
        <>
            <h1 className='text-center my-5'>{username}{userVerified && (<img src={verified} className={styles.verified__icon}></img>)}</h1>
            <div className={styles.image__container}>
                {userProducts.map((product, i) => (
                    <div className="d-flex flex-column justify-content-center text-center align-items-center">
                        <a href={`/product/${product.id}`}><img src={product.imageURL} key={i}></img></a>
                        <h2 className={styles.product__title}>{product.name}</h2>
                        <p className={styles.product__price}>${product.price}</p>
                        <div className={`${styles.tags__container}`}>
                            {product.tags.map((tag, i) => (
                                <div className={`card ${styles.tag}`}><a className={styles.product__link} href={`/shop/${tag}`}>{tag}</a></div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>


        </>

    )

}

export default UserProfile;
