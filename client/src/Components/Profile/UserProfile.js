import styles from './UserProfile.module.css'
import { React, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UserProfile = () => {

    const [userProducts, setUserProducts] = useState([])

    const { username } = useParams();

    useEffect(() => {
        axios.post('http://localhost:3001/findByUser', {
            username: username
        })
            .then((res) => {
                const totalProducts = res.data.foundUser.products;
                axios.post('/getUserProducts', { totalProducts: totalProducts })
                    .then((res) => {
                        setUserProducts(res.data)
                    })
            })
    }, [])

    const renderUserProductImages = () => {

    }


    return (
        <>
            <h1 className='text-center my-5'>{username}</h1>
            <div className={styles.image__container}>
                {userProducts.map((product, i) => (
                    <div className="d-flex flex-column justify-content-center text-center align-items-center">
                        <a href={`/product/${product.id}`}><img src={product.imageURL} key={i}></img></a>
                        <h2 className={styles.product__title}>{product.name}</h2>
                        <p className={styles.product__price}>{product.price}</p>
                    </div>
                ))}

            </div>


        </>

    )

}

export default UserProfile;
