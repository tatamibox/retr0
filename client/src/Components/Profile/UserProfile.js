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

    console.log(userProducts)
    const renderUserProductImages = () => {

    }


    return (
        <>
            <h1 className={styles.usernameHeader}>{username}</h1>
            <div className={styles.image__container}>
                {userProducts.map((product, i) => (

                    <img src={product} key={i}></img>
                ))}
            </div>
        </>
    )

}

export default UserProfile;
